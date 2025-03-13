
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { FamilleCard } from '../FamilleCard';
import { FamilleInfo, MembreFamille } from '../../../types';

interface FamilleDetailTabContentProps {
  famille: FamilleInfo;
  membres: MembreFamille[];
  onBack: () => void;
  onEdit: () => void;
}

export const FamilleDetailTabContent: React.FC<FamilleDetailTabContentProps> = ({
  famille,
  membres,
  onBack,
  onEdit
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Détail de la Famille {famille.nom}</CardTitle>
          <CardDescription>
            Informations sur la famille et ses statistiques
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onBack}>
            Retour
          </Button>
          <Button variant="outline" onClick={onEdit}>
            <Pencil className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <FamilleCard 
          famille={famille} 
          membres={membres}
          detailMode={true}
          onEdit={onEdit}
        />
      </CardContent>
    </Card>
  );
};
