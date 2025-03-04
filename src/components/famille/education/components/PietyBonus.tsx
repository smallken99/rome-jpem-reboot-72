
import React from 'react';
import { Heart } from 'lucide-react';

interface PietyBonusProps {
  bonus: number;
  gender?: string;
}

export const PietyBonus: React.FC<PietyBonusProps> = ({ bonus, gender = 'female' }) => {
  // Only show piety bonus for female characters
  if (bonus <= 0 || gender !== 'female') return null;
  
  return (
    <div className="mt-2 flex items-center gap-1 text-xs text-green-600 bg-green-50 p-2 rounded">
      <Heart className="h-3 w-3" />
      <span>Bonus de piété: +{bonus}% de progression</span>
    </div>
  );
};
