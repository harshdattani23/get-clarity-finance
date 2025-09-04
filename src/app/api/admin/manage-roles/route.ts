import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { 
  requireSuperAdmin, 
  setUserRole, 
  UserRole, 
  getUserInfo,
  requirePermission 
} from '@/lib/auth/permissions';
import { clerkClient } from '@clerk/nextjs/server';

// Validation schemas
const SetRoleSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  role: z.enum([UserRole.USER, UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPER_ADMIN])
});

const ListUsersSchema = z.object({
  page: z.number().min(1).optional().default(1),
  limit: z.number().min(1).max(100).optional().default(20),
  role: z.enum([UserRole.USER, UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPER_ADMIN]).optional(),
  search: z.string().optional()
});

/**
 * GET /api/admin/manage-roles - List users with roles
 */
export async function GET(request: NextRequest) {
  const authResult = await requirePermission('manage:users');
  if ('error' in authResult) return authResult.error;

  try {
    const { searchParams } = new URL(request.url);
    const query = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      role: searchParams.get('role') as UserRole | undefined,
      search: searchParams.get('search') || undefined
    };

    const validatedQuery = ListUsersSchema.parse(query);
    
    const clerk = await clerkClient();
    
    // Build query options
    const queryOptions: any = {
      limit: validatedQuery.limit,
      offset: (validatedQuery.page - 1) * validatedQuery.limit
    };

    if (validatedQuery.search) {
      queryOptions.query = validatedQuery.search;
    }

    // Get users from Clerk
    const { data: users, totalCount } = await clerk.users.getUserList(queryOptions);

    // Get user info with roles
    const usersWithRoles = await Promise.all(
      users.map(async (user) => {
        const userInfo = await getUserInfo(user.id);
        return {
          id: user.id,
          email: user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'No name',
          role: userInfo?.role || UserRole.USER,
          permissions: userInfo?.permissions || [],
          createdAt: user.createdAt,
          lastActiveAt: user.lastActiveAt,
          imageUrl: user.imageUrl
        };
      })
    );

    // Filter by role if specified
    const filteredUsers = validatedQuery.role 
      ? usersWithRoles.filter(user => user.role === validatedQuery.role)
      : usersWithRoles;

    const totalPages = Math.ceil(totalCount / validatedQuery.limit);

    return NextResponse.json({
      users: filteredUsers,
      pagination: {
        page: validatedQuery.page,
        limit: validatedQuery.limit,
        totalCount,
        totalPages,
        hasNextPage: validatedQuery.page < totalPages,
        hasPreviousPage: validatedQuery.page > 1
      }
    });

  } catch (error) {
    console.error('[MANAGE_ROLES_GET]', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/manage-roles - Set user role
 */
export async function POST(request: NextRequest) {
  const authResult = await requireSuperAdmin();
  if ('error' in authResult) return authResult.error;

  try {
    const body = await request.json();
    const { userId: targetUserId, role } = SetRoleSchema.parse(body);

    const result = await setUserRole(targetUserId, role, authResult.userId);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 403 }
      );
    }

    // Get updated user info
    const updatedUserInfo = await getUserInfo(targetUserId);

    return NextResponse.json({
      success: true,
      message: `User role updated to ${role}`,
      user: updatedUserInfo
    });

  } catch (error) {
    console.error('[MANAGE_ROLES_POST]', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/manage-roles/me - Get current user's role and permissions
 */
export async function OPTIONS(request: NextRequest) {
  const authResult = await requirePermission('read:users');
  if ('error' in authResult) return authResult.error;

  try {
    const userInfo = await getUserInfo(authResult.userId);
    
    if (!userInfo) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: userInfo,
      roleHierarchy: {
        [UserRole.USER]: 0,
        [UserRole.MODERATOR]: 1,
        [UserRole.ADMIN]: 2,
        [UserRole.SUPER_ADMIN]: 3
      }
    });

  } catch (error) {
    console.error('[MANAGE_ROLES_ME]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
