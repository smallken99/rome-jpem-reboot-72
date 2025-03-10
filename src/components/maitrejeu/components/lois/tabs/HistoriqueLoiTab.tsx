
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loi } from '../../../types/lois';
import { HistoriqueLois } from '../HistoriqueLois';
import { Season } from '../../../types/common';

interface HistoriqueLoiTabProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  formatSeason: (season: Season) => string;
}

export const HistoriqueLoiTab: React.FC<HistoriqueLoiTabProps> = ({ 
  lois, 
  onViewLoi,
  formatSeason 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique législatif</CardTitle>
        <CardDescription>
          Archives des lois et des votes passés
        </CardDescription>
      </CardHeader>
      <CardContent>
        {lois.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Aucune loi dans l'historique
          </p>
        ) : (
          <HistoriqueLois 
            lois={lois}
            onViewLoi={onViewLoi}
            formatSeason={formatSeason}
          />
        )}
      </CardContent>
    </Card>
  );
};
