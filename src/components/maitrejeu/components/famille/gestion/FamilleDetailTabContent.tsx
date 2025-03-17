
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FamilleInfo } from '../../../types/familles';
import { ArrowLeft, Edit, Trash } from 'lucide-react';

export interface FamilleDetailTabContentProps {
  famille: FamilleInfo;
  onEditFamille: () => void;
  onDeleteFamille: () => void;
  onBack: () => void;
}

export const FamilleDetailTabContent: React.FC<FamilleDetailTabContentProps> = ({
  famille,
  onEditFamille,
  onDeleteFamille,
  onBack
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <div>
          <Button variant="outline" size="sm" className="mr-2" onClick={onEditFamille}>
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
          <Button variant="destructive" size="sm" onClick={onDeleteFamille}>
            <Trash className="w-4 h-4 mr-2" />
            Supprimer
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">{famille.nom}</h2>
              <p className="text-muted-foreground">Gens {famille.gens}</p>
            </div>
            <div className="flex space-x-2">
              <div
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: famille.couleurPrimaire }}
              ></div>
              <div
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: famille.couleurSecondaire }}
              ></div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Statut</div>
              <div className="font-medium">{famille.statut}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Prestige</div>
              <div className="font-medium">{famille.prestige}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Influence</div>
              <div className="font-medium">{famille.influence}</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm text-muted-foreground">Richesse</div>
            <div className="font-medium">{famille.richesse.toLocaleString()} as</div>
          </div>

          {famille.devise && (
            <div className="mt-4">
              <div className="text-sm text-muted-foreground">Devise</div>
              <div className="font-medium italic">"{famille.devise}"</div>
            </div>
          )}

          <div className="mt-4">
            <div className="text-sm text-muted-foreground">Description</div>
            <div className="mt-1">{famille.description}</div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium">Membres</div>
              <div className="text-xl">{famille.membres.length}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Alliances</div>
              <div className="text-xl">{famille.alliances.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
