
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { FamilleMembres } from '../FamilleMembres';
import { FamilleInfo, MembreFamille } from '../../../types';

interface FamilleMembresTabContentProps {
  famille: FamilleInfo;
  membres: MembreFamille[];
  onBack: () => void;
  onAddMembre: () => void;
  onEditMembre: (membre: MembreFamille) => void;
  onDeleteMembre: (membreId: string) => void;
}

export const FamilleMembresTabContent: React.FC<FamilleMembresTabContentProps> = ({
  famille,
  membres,
  onBack,
  onAddMembre,
  onEditMembre,
  onDeleteMembre
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Membres de la Famille {famille.nom}</CardTitle>
          <CardDescription>
            {membres.length} membres dans cette famille
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onBack}>
            Retour
          </Button>
          <Button onClick={onAddMembre} variant="outline" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Ajouter un Membre
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <FamilleMembres 
          membres={membres}
          familleId={famille.id}
          onEditMembre={onEditMembre}
          onDeleteMembre={onDeleteMembre}
        />
      </CardContent>
    </Card>
  );
};
