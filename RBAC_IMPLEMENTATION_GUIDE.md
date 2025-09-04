# Role-Based Access Control (RBAC) Implementation Guide

## Overview

This document describes the implementation of a comprehensive Role-Based Access Control (RBAC) system for the SEBI Verify application, replacing the previous inadequate admin access control that relied solely on hardcoded email comparison.

## Security Improvements

### Before (Vulnerable)
```typescript
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "dattaniharsh12@gmail.com";
if (userEmail !== ADMIN_EMAIL) {
  return NextResponse.json({ error: "Forbidden - Admin access only" }, { status: 403 });
}
```

**Issues:**
- Single point of failure
- Hardcoded email in environment
- No granular permissions
- No role hierarchy
- Difficult to scale

### After (Secure)
```typescript
const authResult = await requirePermission('read:analytics');
if (authResult.error) {
  return authResult.error;
}
```

**Improvements:**
- ✅ Granular permission-based access control
- ✅ Role hierarchy with multiple admin levels
- ✅ Clerk metadata integration for role storage
- ✅ Fallback email verification for backward compatibility
- ✅ Detailed error messages with role information
- ✅ Scalable permission system

## Role Hierarchy

### 1. User (Default)
- **Permissions:** None
- **Description:** Standard application user
- **Access:** Public endpoints only

### 2. Moderator
- **Permissions:** 
  - `read:reports` - View fraud reports
  - `read:logs` - View system logs
- **Description:** Can moderate content and view reports
- **Use Case:** Customer support, content moderation

### 3. Admin
- **Permissions:** 
  - `read:reports`, `read:logs`, `read:users`, `write:reports`, `read:analytics`, `manage:courses`
- **Description:** Can manage courses and view analytics
- **Use Case:** Content managers, course administrators

### 4. Super Admin
- **Permissions:** 
  - All Admin permissions plus `manage:users`, `manage:system`, `delete:data`
- **Description:** Full system access and user management
- **Use Case:** System administrators, owners

## Implementation Components

### 1. Permission System (`/lib/auth/permissions.ts`)

#### Core Functions:
- `getUserRole(userId)` - Get user role from Clerk metadata
- `hasPermission(userId, permission)` - Check single permission
- `hasAnyPermission(userId, permissions[])` - Check any of multiple permissions
- `hasAllPermissions(userId, permissions[])` - Check all permissions
- `requirePermission(permission)` - Middleware for API routes
- `setUserRole(targetUserId, role, adminUserId)` - Set user role (Super Admin only)

#### Example Usage in API Routes:
```typescript
import { requirePermission } from '@/lib/auth/permissions';

export async function GET() {
  const authResult = await requirePermission('read:analytics');
  if (authResult.error) return authResult.error;
  
  const { userId } = authResult;
  // Your protected logic here
}
```

### 2. React Hook (`/hooks/usePermissions.ts`)

#### Client-side Permission Checking:
```typescript
import { usePermissions } from '@/hooks/usePermissions';

function AdminComponent() {
  const { hasPermission, isAdmin, role } = usePermissions();
  
  if (!hasPermission('manage:courses')) {
    return <div>Access Denied</div>;
  }
  
  return <div>Admin Content</div>;
}
```

#### Higher-Order Component Protection:
```typescript
import { withPermission } from '@/hooks/usePermissions';

const ProtectedComponent = withPermission(MyComponent, ['read:analytics']);
```

### 3. User Role Management API (`/api/admin/manage-roles`)

#### Endpoints:
- `GET /api/admin/manage-roles` - List users with roles (paginated)
- `POST /api/admin/manage-roles` - Update user role (Super Admin only)
- `OPTIONS /api/admin/manage-roles` - Get current user info and role hierarchy

#### Query Parameters:
- `page` - Page number (default: 1)
- `limit` - Users per page (default: 20, max: 100)
- `role` - Filter by role
- `search` - Search by name or email

### 4. Admin UI Component (`/components/admin/UserRoleManagement.tsx`)

Features:
- User search and filtering
- Role management interface
- Visual role indicators
- Permission validation
- Real-time updates

## Environment Configuration

Add these to your `.env.local`:

```env
# Admin Emails (fallback for backward compatibility)
ADMIN_EMAIL_1=dattaniharsh12@gmail.com
ADMIN_EMAIL_2=admin2@example.com
ADMIN_EMAIL_3=admin3@example.com

# Super Admin Email
SUPER_ADMIN_EMAIL=dattaniharsh12@gmail.com
```

## Setting Up User Roles

### Method 1: Using Clerk Dashboard
1. Go to Clerk Dashboard → Users
2. Select a user
3. Edit Public Metadata
4. Add: `{ "role": "admin" }`

### Method 2: Using API (Super Admin only)
```bash
curl -X POST /api/admin/manage-roles \
  -H "Content-Type: application/json" \
  -d '{"userId": "user_123", "role": "admin"}'
```

### Method 3: Using Admin UI
1. Navigate to admin dashboard
2. Go to User Role Management
3. Select role from dropdown (Super Admin required)

## Migration from Old System

### Step 1: Identify Current Admins
Users with emails matching the hardcoded admin emails will automatically be assigned roles based on the fallback system.

### Step 2: Set Proper Roles
Use the role management API or UI to set proper roles for all admin users.

### Step 3: Update All Admin Routes
Replace the old email-based checks with permission-based checks:

```typescript
// OLD
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
if (userEmail !== ADMIN_EMAIL) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// NEW
const authResult = await requirePermission('read:analytics');
if (authResult.error) return authResult.error;
```

## API Route Protection Patterns

### Basic Permission Check
```typescript
export async function GET() {
  const authResult = await requirePermission('read:reports');
  if (authResult.error) return authResult.error;
  // Protected logic
}
```

### Multiple Permission Check
```typescript
export async function POST() {
  const authResult = await requireAnyPermission(['write:reports', 'manage:system']);
  if (authResult.error) return authResult.error;
  // Protected logic
}
```

### Authentication Only
```typescript
export async function GET() {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;
  // Authenticated user logic
}
```

## Frontend Protection Patterns

### Component-level Protection
```typescript
import { usePermissions } from '@/hooks/usePermissions';

function AdminPanel() {
  const { hasPermission } = usePermissions();
  
  return (
    <div>
      {hasPermission('read:analytics') && (
        <AnalyticsDashboard />
      )}
      {hasPermission('manage:courses') && (
        <CourseManagement />
      )}
    </div>
  );
}
```

### Route-level Protection
```typescript
const AdminPage = withPermission(AdminDashboard, ['read:analytics']);
```

### Conditional Rendering
```typescript
const { isAdmin, isSuperAdmin, canManageUsers } = usePermissions();

return (
  <div>
    {isAdmin && <AdminMenu />}
    {isSuperAdmin && <SuperAdminFeatures />}
    {canManageUsers && <UserManagement />}
  </div>
);
```

## Error Handling

The RBAC system provides detailed error responses:

```json
{
  "error": "Insufficient permissions",
  "code": "FORBIDDEN",
  "required": "manage:users",
  "userRole": "admin",
  "message": "Required permission: manage:users. Your role: admin"
}
```

## Testing the Implementation

### 1. Test Permission Middleware
```bash
# Should require authentication
curl /api/admin/dashboard-db

# Should require specific permission
curl -H "Authorization: Bearer <token>" /api/admin/dashboard-db
```

### 2. Test Role Management
```bash
# List users (requires manage:users permission)
curl -H "Authorization: Bearer <token>" /api/admin/manage-roles

# Update user role (requires Super Admin)
curl -X POST -H "Authorization: Bearer <token>" /api/admin/manage-roles \
  -d '{"userId": "user_123", "role": "moderator"}'
```

### 3. Test Frontend Components
1. Login as different role types
2. Verify appropriate UI elements are shown/hidden
3. Test role management interface (Super Admin only)

## Security Best Practices

1. **Principle of Least Privilege**: Users should have minimal permissions needed
2. **Regular Audits**: Review user roles and permissions periodically
3. **Secure Role Assignment**: Only Super Admins can change roles
4. **Fallback Protection**: Email-based fallback for emergency access
5. **Detailed Logging**: All permission checks and role changes are logged
6. **Client-side Validation**: Never rely solely on client-side permission checks

## Troubleshooting

### Issue: User shows as "user" role despite being admin email
**Solution:** Set the role explicitly in Clerk metadata or use the role management API.

### Issue: Permission denied for legitimate admin
**Solution:** Check user's role in Clerk metadata and verify the required permission exists in `ROLE_PERMISSIONS`.

### Issue: Can't access role management
**Solution:** Ensure the user has `manage:users` permission (Super Admin only by default).

### Issue: Role changes not reflecting immediately
**Solution:** The frontend hook caches role info. Refresh the page or implement role change notifications.

## Monitoring and Analytics

The RBAC system automatically logs:
- All permission checks (successful and failed)
- Role assignments and changes
- Admin access attempts
- Permission escalation attempts

Use these logs to:
- Monitor for suspicious activity
- Audit admin access patterns
- Debug permission issues
- Generate compliance reports

## Future Enhancements

1. **Time-based Permissions**: Temporary role assignments
2. **IP-based Restrictions**: Limit admin access to specific IPs
3. **Multi-factor Authentication**: Require 2FA for admin roles
4. **Permission Inheritance**: Complex role hierarchies
5. **Custom Permissions**: User-defined permission sets
6. **Role Templates**: Pre-configured role sets for different use cases

## Conclusion

This RBAC implementation provides a robust, scalable, and secure access control system that addresses all the security vulnerabilities of the previous hardcoded email approach. It offers granular permissions, role hierarchy, and proper separation of concerns while maintaining backward compatibility during the migration period.
