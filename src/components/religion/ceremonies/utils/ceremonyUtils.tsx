
import { Ceremony } from '../types';
import { Badge } from '@/components/ui/badge';

// Fonction pour afficher le type de cérémonie
export const getCeremonyTypeBadge = (type: string) => {
  switch(type) {
    case 'festival':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Festival</Badge>;
    case 'sacrifice':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Sacrifice</Badge>;
    case 'procession':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Procession</Badge>;
    case 'jeux':
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Jeux</Badge>;
    case 'rituel':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Rituel</Badge>;
    default:
      return <Badge variant="outline">Autre</Badge>;
  }
};

// Calcul du nombre de jours avant la prochaine cérémonie
export const getNextCelebrationStatus = (days: number) => {
  if (days === 0) {
    return <Badge className="bg-green-100 text-green-800">Aujourd'hui</Badge>;
  } else if (days <= 30) {
    return <Badge className="bg-amber-100 text-amber-800">Dans {days} jours</Badge>;
  } else {
    return <span className="text-muted-foreground">Dans {days} jours</span>;
  }
};

// Trier les cérémonies par proximité
export const sortCeremoniesByProximity = (ceremonies: Ceremony[]): Ceremony[] => {
  return [...ceremonies].sort((a, b) => a.nextCelebration - b.nextCelebration);
};
