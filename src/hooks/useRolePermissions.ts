
import { useState, useEffect } from 'react';

export type UserRole = 'player' | 'mj' | 'admin' | 'viewer';

interface RolePermissions {
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
  canView: boolean;
  canManage: boolean;
}

export const useRolePermissions = (role: UserRole): RolePermissions => {
  const [permissions, setPermissions] = useState<RolePermissions>({
    canEdit: false,
    canDelete: false,
    canCreate: false,
    canView: false,
    canManage: false,
  });

  useEffect(() => {
    switch (role) {
      case 'mj':
        setPermissions({
          canEdit: true,
          canDelete: true,
          canCreate: true,
          canView: true,
          canManage: true,
        });
        break;
      case 'admin':
        setPermissions({
          canEdit: true,
          canDelete: true,
          canCreate: true,
          canView: true,
          canManage: true,
        });
        break;
      case 'player':
        setPermissions({
          canEdit: false,
          canDelete: false,
          canCreate: true,
          canView: true,
          canManage: false,
        });
        break;
      case 'viewer':
        setPermissions({
          canEdit: false,
          canDelete: false,
          canCreate: false,
          canView: true,
          canManage: false,
        });
        break;
      default:
        setPermissions({
          canEdit: false,
          canDelete: false,
          canCreate: false,
          canView: true,
          canManage: false,
        });
    }
  }, [role]);

  return permissions;
};
