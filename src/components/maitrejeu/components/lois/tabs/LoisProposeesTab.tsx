
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loi } from '../../../types/lois';
import { LoisList } from '../LoisList';
import { Season } from '../../../types/common';

interface LoisProposeesTabProps {
  lois: Loi[];
  onViewLoi: (loi: Loi) => void;
  onEditLoi: (loi: Loi) => void;
  formatSeason: (season: Season) => string;
}

export const LoisProposeesTab: React.FC<LoisProposeesTabProps> = ({ 
  lois, 
  onViewLoi, 
  onEditLoi,
  formatSeason 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lois proposées</CardTitle>
        <CardDescription>
          Projets de loi en attente de vote
        </CardDescription>
      </CardHeader>
      <CardContent>
        {lois.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Aucune loi proposée trouvée
          </p>
        ) : (
          <LoisList 
            lois={lois} 
            onViewLoi={onViewLoi}
            onEditLoi={onEditLoi}
            showAdditionalActions
            actionLabel="Organiser le vote"
            primaryAction
            formatSeason={formatSeason}
          />
        )}
      </CardContent>
    </Card>
  );
};
