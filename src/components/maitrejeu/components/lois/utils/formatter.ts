
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Loi, LoiState, ImportanceType } from '@/types/loi';
import { GameDate } from '@/types/game';
import { gameOrJsDateToDate } from './dateConverter';

export const getStatusBadgeColor = (status: LoiState): string => {
  switch (status) {
    case 'proposée':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'en_débat':
      return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
    case 'en_vote':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    case 'adoptée':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'rejetée':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'abrogée':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

export const getStatusLabel = (status: LoiState): string => {
  switch (status) {
    case 'proposée':
      return 'Proposée';
    case 'en_débat':
      return 'En débat';
    case 'en_vote':
      return 'En vote';
    case 'adoptée':
      return 'Adoptée';
    case 'rejetée':
      return 'Rejetée';
    case 'abrogée':
      return 'Abrogée';
    default:
      return status;
  }
};

export const getImportanceBadgeColor = (importance: ImportanceType): string => {
  switch (importance) {
    case 'mineure':
      return 'bg-slate-100 text-slate-800 hover:bg-slate-200';
    case 'moyenne':
      return 'bg-violet-100 text-violet-800 hover:bg-violet-200';
    case 'majeure':
      return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
    case 'critique':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

export const formatLoiDate = (date: GameDate | Date): string => {
  try {
    if (date instanceof Date) {
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    // Convertir la date de jeu en chaîne lisible
    const seasonNames: { [key: string]: string } = {
      'winter': 'Hiver',
      'spring': 'Printemps',
      'summer': 'Été',
      'fall': 'Automne'
    };

    return `${seasonNames[date.season]} ${date.year}`;
  } catch (error) {
    return 'Date invalide';
  }
};

export const getRelativeTimeFromDate = (date: GameDate | Date): string => {
  try {
    const jsDate = date instanceof Date ? date : gameOrJsDateToDate(date);
    
    return formatDistanceToNow(jsDate, { 
      addSuffix: true,
      locale: fr
    });
  } catch (error) {
    return 'Date inconnue';
  }
};

export const getTypeBadgeColor = (type: string): string => {
  switch (type) {
    case 'economie':
      return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
    case 'politique':
    case 'political':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'militaire':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'judiciaire':
      return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200';
    case 'religieuse':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    case 'sociale':
      return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

export const getTypeLabel = (type: string): string => {
  switch (type) {
    case 'economie':
      return 'Économique';
    case 'politique':
    case 'political':
      return 'Politique';
    case 'militaire':
      return 'Militaire';
    case 'judiciaire':
      return 'Judiciaire';
    case 'religieuse':
      return 'Religieuse';
    case 'sociale':
      return 'Sociale';
    default:
      return type;
  }
};
