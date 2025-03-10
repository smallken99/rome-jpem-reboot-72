
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loi } from '../../../types/lois';
import { LoisList } from '../LoisList';
import { Season } from '../../../types/common';

interface LoisActivesTabProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  onEditLoi: (loi: Loi) => void;
  formatSeason: (season: Season) => string;
}

export const LoisActivesTab: React.FC<LoisActivesTabProps> = ({ 
  lois, 
  onViewLoi, 
  onEditLoi,
  formatSeason 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lois en vigueur</CardTitle>
        <CardDescription>
          Lois promulguées et actuellement en application
        </CardDescription>
      </CardHeader>
      <CardContent>
        {lois.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Aucune loi active trouvée
          </p>
        ) : (
          <LoisList 
            lois={lois} 
            onViewLoi={onViewLoi}
            onEditLoi={onEditLoi}
            showAdditionalActions
            actionLabel="Abroger"
            formatSeason={formatSeason}
          />
        )}
      </CardContent>
    </Card>
  );
};
