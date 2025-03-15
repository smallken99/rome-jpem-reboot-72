
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PropertyConditionProps {
  condition: number;
}

export const PropertyCondition: React.FC<PropertyConditionProps> = ({ condition }) => {
  const getConditionClass = () => {
    if (condition > 75) return 'bg-green-100 text-green-800 border-green-200';
    if (condition > 50) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };
  
  const getConditionText = () => {
    if (condition > 90) return 'Excellent';
    if (condition > 75) return 'Bon';
    if (condition > 50) return 'Moyen';
    if (condition > 25) return 'Mauvais';
    return 'Critique';
  };

  return (
    <Badge variant="outline" className={getConditionClass()}>
      {getConditionText()} ({condition}%)
    </Badge>
  );
};
