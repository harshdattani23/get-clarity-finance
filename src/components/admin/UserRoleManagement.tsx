"use client";

import React, { useState, useEffect } from 'react';
import { usePermissions, useAvailableRoles } from '@/hooks/usePermissions';
import { UserRole } from '@/lib/auth/permissions';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  role: UserRole;
  permissions: string[];
  createdAt: string;
  lastActiveAt?: string;
  imageUrl?: string;
}

interface UserRoleManagementProps {
  className?: string;
}

const roleColors = {
  [UserRole.USER]: 'bg-gray-100 text-gray-800',
  [UserRole.MODERATOR]: 'bg-blue-100 text-blue-800',
  [UserRole.ADMIN]: 'bg-purple-100 text-purple-800',
  [UserRole.SUPER_ADMIN]: 'bg-red-100 text-red-800',
};

const roleDescriptions = {
  [UserRole.USER]: 'Standard user with basic access',
  [UserRole.MODERATOR]: 'Can view reports and logs',
  [UserRole.ADMIN]: 'Can manage courses and view analytics',
  [UserRole.SUPER_ADMIN]: 'Full system access and user management',
};

export default function UserRoleManagement({ className = '' }: UserRoleManagementProps) {
  const { hasPermission, isSuperAdmin, isLoading: permissionsLoading } = usePermissions();
  const availableRoles = useAvailableRoles();
  
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');

  const canManageRoles = hasPermission('manage:users');

  // Fetch users
  const fetchUsers = async () => {
    if (!canManageRoles) return;
    
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(searchTerm && { search: searchTerm }),
        ...(selectedRole && { role: selectedRole }),
      });

      const response = await fetch(`/api/admin/manage-roles?${params}`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users || []);
      } else {
        setError(data.error || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update user role
  const updateUserRole = async (userId: string, newRole: UserRole) => {
    if (!isSuperAdmin) {
      setError('Only super admins can change user roles');
      return;
    }

    try {
      setIsUpdating(userId);
      const response = await fetch('/api/admin/manage-roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state
        setUsers(prev => prev.map(user => 
          user.id === userId 
            ? { ...user, role: newRole }
            : user
        ));
        setError('');
      } else {
        setError(data.error || 'Failed to update user role');
      }
    } catch (err) {
      setError('Failed to update user role');
      console.error('Error updating user role:', err);
    } finally {
      setIsUpdating(null);
    }
  };

  useEffect(() => {
    if (!permissionsLoading && canManageRoles) {
      fetchUsers();
    }
  }, [permissionsLoading, canManageRoles, page, searchTerm, selectedRole]);

  if (permissionsLoading) {
    return <div className="p-4">Loading permissions...</div>;
  }

  if (!canManageRoles) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-medium text-red-800 mb-2">Access Denied</h3>
        <p className="text-red-600">You don't have permission to manage user roles.</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">User Role Management</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as UserRole | '')}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All roles</option>
            {Object.values(UserRole).map(role => (
              <option key={role} value={role}>
                {role.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Role Legend */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Role Descriptions:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {Object.entries(roleDescriptions).map(([role, description]) => (
              <div key={role} className="text-xs">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${roleColors[role as UserRole]}`}>
                  {role.replace('_', ' ').toUpperCase()}
                </span>
                <p className="text-gray-600 mt-1">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No users found matching your criteria.
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                {isSuperAdmin && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.imageUrl ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {user.fullName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleColors[user.role]}`}>
                      {user.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActiveAt 
                      ? new Date(user.lastActiveAt).toLocaleDateString()
                      : 'Never'
                    }
                  </td>
                  {isSuperAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value as UserRole)}
                        disabled={isUpdating === user.id}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                      >
                        {availableRoles.map((role) => (
                          <option key={role} value={role}>
                            {role.replace('_', ' ').toUpperCase()}
                          </option>
                        ))}
                      </select>
                      {isUpdating === user.id && (
                        <div className="inline-block ml-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
