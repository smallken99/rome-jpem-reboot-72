
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BirthIndicatorProps {
  lastBirthYear: number | null;
  currentYear: number;
}

export const BirthIndicator: React.FC<BirthIndicatorProps> = ({
  lastBirthYear,
  currentYear
}) => {
  const yearsSinceLastBirth = lastBirthYear ? currentYear - lastBirthYear : null;
  
  const getStatusMessage = () => {
    if (!lastBirthYear) return "Aucune naissance dans votre famille récemment";
    if (yearsSinceLastBirth === 0) return "Une naissance a eu lieu cette année";
    if (yearsSinceLastBirth === 1) return "Une naissance a eu lieu l'année dernière";
    return `Dernière naissance il y a ${yearsSinceLastBirth} ans`;
  };
  
  const getStatusColor = () => {
    if (!lastBirthYear) return "bg-gray-100 text-gray-600";
    if (yearsSinceLastBirth === 0) return "bg-green-100 text-green-800";
    if (yearsSinceLastBirth && yearsSinceLastBirth <= 2) return "bg-blue-100 text-blue-800";
    return "bg-amber-100 text-amber-800";
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium">Fertilité familiale</h3>
            <p className="text-xs text-muted-foreground">
              Statut des naissances dans votre famille
            </p>
          </div>
          
          <Badge className={getStatusColor()}>
            {getStatusMessage()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
