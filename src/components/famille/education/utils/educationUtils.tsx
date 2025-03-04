
import { Sword, Building, ScrollText, ShieldQuestion, Coins } from 'lucide-react';

// Get education type icon based on type
export const getEducationTypeIcon = (type: string) => {
  switch(type) {
    case 'military':
      return <Sword className="h-4 w-4" />;
    case 'political':
      return <Building className="h-4 w-4" />;
    case 'commercial':
      return <Coins className="h-4 w-4" />;
    case 'religious':
      return <ScrollText className="h-4 w-4" />;
    default:
      return <ShieldQuestion className="h-4 w-4" />;
  }
};

// Get education type name based on type
export const getEducationTypeName = (type: string) => {
  switch(type) {
    case 'military':
      return 'Militaire';
    case 'political':
      return 'Politique';
    case 'commercial':
      return 'Commerce';
    case 'religious':
      return 'Religieuse';
    default:
      return 'Aucune';
  }
};

// Get related stat name based on education type
export const getRelatedStatName = (type: string): string => {
  switch(type) {
    case 'military':
      return 'Éducation Martiale';
    case 'political':
      return 'Éloquence';
    case 'religious':
      return 'Piété';
    default:
      return 'Caractéristique';
  }
};
