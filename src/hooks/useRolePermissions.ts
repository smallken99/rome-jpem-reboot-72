
import { useMaitreJeu } from '@/components/maitrejeu/context';

export type UserRole = 'mj' | 'player';

export const useRolePermissions = (role: UserRole = 'player') => {
  const context = useMaitreJeu();

  const canEdit = role === 'mj';
  const canView = true;

  return {
    canEdit,
    canView,
    context,
  };
};
