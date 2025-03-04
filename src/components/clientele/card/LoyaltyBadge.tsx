
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface LoyaltyBadgeProps {
  loyalty: string;
}

export const LoyaltyBadge: React.FC<LoyaltyBadgeProps> = ({ loyalty }) => {
  const getLoyaltyColor = (loyalty: string) => {
    switch (loyalty) {
      case 'Très Haute': return 'bg-green-100 text-green-800 border-green-200';
      case 'Haute': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Moyenne': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Basse': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Très Basse': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Badge className={`${getLoyaltyColor(loyalty)} border font-normal`}>
      {loyalty}
    </Badge>
  );
};
