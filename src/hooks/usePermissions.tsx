import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { UserRole, Permission, ROLE_PERMISSIONS } from '@/lib/auth/permissions';

export interface UserPermissions {
  role: UserRole;
  permissions: Permission[];
  isLoading: boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  canManageUsers: boolean;
  canManageCourses: boolean;
}

/**
 * Hook to check user permissions and role
 */
export function usePermissions(): UserPermissions {
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    if (!isLoaded || !user) {
      setRole(UserRole.USER);
      setPermissions([]);
      return;
    }

    // Get role from metadata or fallback to email check
    const roleFromMetadata = user.publicMetadata?.role as UserRole;
    
    if (roleFromMetadata && Object.values(UserRole).includes(roleFromMetadata)) {
      setRole(roleFromMetadata);
      setPermissions([...ROLE_PERMISSIONS[roleFromMetadata]]);
      return;
    }

    // Fallback to email check for backward compatibility
    const userEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;

    const ADMIN_EMAILS = [
      process.env.NEXT_PUBLIC_ADMIN_EMAIL_1 || 'dattaniharsh12@gmail.com',
      process.env.NEXT_PUBLIC_ADMIN_EMAIL_2,
      process.env.NEXT_PUBLIC_ADMIN_EMAIL_3,
    ].filter(Boolean);

    const SUPER_ADMIN_EMAILS = [
      process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL || 'dattaniharsh12@gmail.com',
    ].filter(Boolean);

    let userRole = UserRole.USER;
    
    if (userEmail && SUPER_ADMIN_EMAILS.includes(userEmail)) {
      userRole = UserRole.SUPER_ADMIN;
    } else if (userEmail && ADMIN_EMAILS.includes(userEmail)) {
      userRole = UserRole.ADMIN;
    }

    setRole(userRole);
    setPermissions([...ROLE_PERMISSIONS[userRole]]);
  }, [user, isLoaded]);

  const hasPermission = (permission: Permission): boolean => {
    return permissions.includes(permission);
  };

  const hasAnyPermission = (requiredPermissions: Permission[]): boolean => {
    return requiredPermissions.some((permission) => permissions.includes(permission));
  };

  const hasAllPermissions = (requiredPermissions: Permission[]): boolean => {
    return requiredPermissions.every((permission) => permissions.includes(permission));
  };

  return {
    role,
    permissions,
    isLoading: !isLoaded,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin: [UserRole.ADMIN, UserRole.SUPER_ADMIN].includes(role),
    isSuperAdmin: role === UserRole.SUPER_ADMIN,
    canManageUsers: hasPermission('manage:users'),
    canManageCourses: hasPermission('manage:courses'),
  };
}

/**
 * Higher-order component to protect routes based on permissions
 */
export function withPermission<T extends {}>(
  Component: React.ComponentType<T>,
  requiredPermissions: Permission[]
) {
  return function ProtectedComponent(props: T) {
    const { hasAnyPermission, isLoading } = usePermissions();
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    if (!hasAnyPermission(requiredPermissions)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600">
              You don't have permission to access this resource.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Required permissions: {requiredPermissions.join(', ')}
            </p>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
}

/**
 * Hook to get available roles for role management UI
 */
export function useAvailableRoles() {
  const { role } = usePermissions();
  
  // Super admin can assign any role
  if (role === UserRole.SUPER_ADMIN) {
    return Object.values(UserRole);
  }
  
  // Admin can assign user and moderator roles
  if (role === UserRole.ADMIN) {
    return [UserRole.USER, UserRole.MODERATOR];
  }
  
  // Others cannot assign roles
  return [];
}
