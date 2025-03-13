
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake } from 'lucide-react';
import { FamilleAlliances } from '../FamilleAlliances';
import { FamilleInfo, MembreFamille, FamilleAlliance } from '../../../types';

interface FamilleAlliancesTabContentProps {
  famille: FamilleInfo;
  alliances: FamilleAlliance[];
  familles: FamilleInfo[];
  membres: MembreFamille[];
  onBack: () => void;
  onAddAlliance: () => void;
  onEditAlliance: (alliance: FamilleAlliance) => void;
  onDeleteAlliance: (id: string) => void;
}

export const FamilleAlliancesTabContent: React.FC<FamilleAlliancesTabContentProps> = ({
  famille,
  alliances,
  familles,
  membres,
  onBack,
  onAddAlliance,
  onEditAlliance,
  onDeleteAlliance
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Alliances de la Famille {famille.nom}</CardTitle>
          <CardDescription>
            Gestion des alliances et des relations diplomatiques
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onBack}>
            Retour
          </Button>
          <Button onClick={onAddAlliance} variant="outline" size="sm">
            <Handshake className="h-4 w-4 mr-2" />
            Nouvelle Alliance
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <FamilleAlliances 
          alliances={alliances}
          familleId={famille.id}
          familles={familles}
          membres={membres}
          onEditAlliance={onEditAlliance}
          onDeleteAlliance={onDeleteAlliance}
        />
      </CardContent>
    </Card>
  );
};
