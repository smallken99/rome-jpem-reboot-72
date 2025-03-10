
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { useRolePermissions, UserRole } from './useRolePermissions';

export const useGameData = (role: UserRole = 'player') => {
  const { canEdit, canView } = useRolePermissions(role);
  const {
    senateurs,
    provinces,
    evenements,
    lois,
    equilibre,
    currentDate,
    currentPhase,
    familles,
    membres,
    alliances,
    mariages,
    relations,
    clients,
    economieRecords,
    treasury,
    economicFactors,
  } = useMaitreJeu();

  // Filtrer les données sensibles pour les joueurs
  const getFilteredData = () => {
    if (role === 'mj') return senateurs;
    return senateurs.filter(s => s.joueur || s.fonction === 'Consul');
  };

  const getFilteredProvinces = () => {
    if (role === 'mj') return provinces;
    return provinces.filter(p => p.status === 'public' || p.gouverneur === 'player');
  };

  const getFilteredEvenements = () => {
    if (role === 'mj') return evenements;
    return evenements.filter(e => e.resolved || !e.importance.includes('secret'));
  };

  return {
    senateurs: getFilteredData(),
    provinces: getFilteredProvinces(),
    evenements: getFilteredEvenements(),
    lois,
    equilibre,
    currentDate,
    currentPhase,
    familles,
    membres,
    alliances,
    mariages,
    relations,
    clients,
    economieRecords,
    treasury,
    economicFactors,
    canEdit,
    canView,
  };
};
