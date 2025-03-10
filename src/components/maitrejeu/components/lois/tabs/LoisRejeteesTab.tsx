
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loi } from '../../../types/lois';
import { LoisList } from '../LoisList';
import { Season } from '../../../types/common';

interface LoisRejeteesTabProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  onEditLoi: (loi: Loi) => void;
  formatSeason: (season: Season) => string;
}

export const LoisRejeteesTab: React.FC<LoisRejeteesTabProps> = ({ 
  lois, 
  onViewLoi, 
  onEditLoi,
  formatSeason 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lois rejetées</CardTitle>
        <CardDescription>
          Projets de loi qui n'ont pas été adoptés
        </CardDescription>
      </CardHeader>
      <CardContent>
        {lois.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Aucune loi rejetée trouvée
          </p>
        ) : (
          <LoisList 
            lois={lois} 
            onViewLoi={onViewLoi}
            onEditLoi={onEditLoi}
            formatSeason={formatSeason}
          />
        )}
      </CardContent>
    </Card>
  );
};
