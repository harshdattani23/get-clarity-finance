import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define user roles
export enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

// Define permissions for each role
export const ROLE_PERMISSIONS = {
  [UserRole.USER]: [],
  [UserRole.MODERATOR]: ['read:reports', 'read:logs'],
  [UserRole.ADMIN]: [
    'read:reports', 
    'read:logs', 
    'read:users', 
    'write:reports',
    'read:analytics',
    'manage:courses'
  ],
  [UserRole.SUPER_ADMIN]: [
    'read:reports', 
    'read:logs', 
    'read:users', 
    'write:reports',
    'read:analytics',
    'manage:courses',
    'manage:users',
    'manage:system',
    'delete:data'
  ]
} as const;

export type Permission = 
  | 'read:reports'
  | 'read:logs'
  | 'read:users'
  | 'write:reports'
  | 'read:analytics'
  | 'manage:courses'
  | 'manage:users'
  | 'manage:system'
  | 'delete:data';

/**
 * Get user role from Clerk metadata or fallback to email check
 */
export async function getUserRole(userId: string): Promise<UserRole> {
  try {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    
    // First check if role is set in metadata
    const roleFromMetadata = user.publicMetadata?.role as UserRole;
    if (roleFromMetadata && Object.values(UserRole).includes(roleFromMetadata)) {
      return roleFromMetadata;
    }

    // Fallback to email check for backward compatibility
    const userEmail = user.emailAddresses
      .find(email => email.id === user.primaryEmailAddressId)?.emailAddress;
    
    // Define admin emails from environment variables only
    const ADMIN_EMAILS = [
      process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      process.env.ADMIN_EMAIL_2,
      process.env.ADMIN_EMAIL_3,
    ].filter(Boolean);

    const SUPER_ADMIN_EMAILS = [
      process.env.SUPER_ADMIN_EMAIL || process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    ].filter(Boolean);

    if (userEmail && SUPER_ADMIN_EMAILS.includes(userEmail)) {
      return UserRole.SUPER_ADMIN;
    }

    if (userEmail && ADMIN_EMAILS.includes(userEmail)) {
      return UserRole.ADMIN;
    }

    return UserRole.USER;
  } catch (error) {
    console.error('Error getting user role:', error);
    return UserRole.USER;
  }
}

/**
 * Check if user has required permission
 */
export async function hasPermission(userId: string, permission: Permission): Promise<boolean> {
  const userRole = await getUserRole(userId);
  return (ROLE_PERMISSIONS[userRole] as readonly string[]).includes(permission);
}

/**
 * Check if user has any of the required permissions
 */
export async function hasAnyPermission(userId: string, permissions: Permission[]): Promise<boolean> {
  const userRole = await getUserRole(userId);
  const userPermissions = ROLE_PERMISSIONS[userRole] as readonly string[];
  return permissions.some(permission => userPermissions.includes(permission));
}

/**
 * Check if user has all required permissions
 */
export async function hasAllPermissions(userId: string, permissions: Permission[]): Promise<boolean> {
  const userRole = await getUserRole(userId);
  const userPermissions = ROLE_PERMISSIONS[userRole] as readonly string[];
  return permissions.every(permission => userPermissions.includes(permission));
}

/**
 * Middleware to check authentication and authorization
 */
export async function requireAuth() {
  const { userId } = await auth();
  
  if (!userId) {
    return {
      error: NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      )
    };
  }

  return { userId };
}

/**
 * Middleware to check specific permission
 */
export async function requirePermission(permission: Permission) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult;

  const { userId } = authResult;
  const hasRequiredPermission = await hasPermission(userId, permission);

  if (!hasRequiredPermission) {
    const userRole = await getUserRole(userId);
    return {
      error: NextResponse.json(
        { 
          error: 'Insufficient permissions', 
          code: 'FORBIDDEN',
          required: permission,
          userRole,
          message: `Required permission: ${permission}. Your role: ${userRole}`
        },
        { status: 403 }
      )
    };
  }

  return { userId };
}

/**
 * Middleware to check any of the required permissions
 */
export async function requireAnyPermission(permissions: Permission[]) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult;

  const { userId } = authResult;
  const hasRequiredPermissions = await hasAnyPermission(userId, permissions);

  if (!hasRequiredPermissions) {
    const userRole = await getUserRole(userId);
    return {
      error: NextResponse.json(
        { 
          error: 'Insufficient permissions', 
          code: 'FORBIDDEN',
          required: permissions,
          userRole,
          message: `Required any of: ${permissions.join(', ')}. Your role: ${userRole}`
        },
        { status: 403 }
      )
    };
  }

  return { userId };
}

/**
 * Middleware to check admin access (legacy compatibility)
 */
export async function requireAdmin() {
  return requirePermission('read:analytics');
}

/**
 * Middleware to check super admin access
 */
export async function requireSuperAdmin() {
  return requirePermission('manage:system');
}

/**
 * Set user role (should be called by super admin only)
 */
export async function setUserRole(targetUserId: string, role: UserRole, adminUserId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if the admin has permission to manage users
    const canManageUsers = await hasPermission(adminUserId, 'manage:users');
    if (!canManageUsers) {
      return { success: false, error: 'Insufficient permissions to manage users' };
    }

    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(targetUserId, {
      publicMetadata: { role }
    });

    return { success: true };
  } catch (error) {
    console.error('Error setting user role:', error);
    return { success: false, error: 'Failed to set user role' };
  }
}

/**
 * Get user info with role
 */
export async function getUserInfo(userId: string) {
  try {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const role = await getUserRole(userId);
    const permissions = ROLE_PERMISSIONS[role];

    return {
      id: userId,
      email: user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      role,
      permissions,
      createdAt: user.createdAt,
      lastActiveAt: user.lastActiveAt,
    };
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
}
