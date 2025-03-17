
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FamilleInfo, MembreFamille, FamilleAlliance } from '../../../types';
import { FamilleDetailTabContent } from './FamilleDetailTabContent';
import { FamilleMembresTabContent } from './FamilleMembresTabContent';
import { FamilleAlliancesTabContent } from './FamilleAlliancesTabContent';
import { Edit, Trash, UserPlus, Handshake } from 'lucide-react';

interface FamilleDetailProps {
  famille: FamilleInfo;
  membres: MembreFamille[];
  alliances: FamilleAlliance[];
  onUpdateFamille: (famille: Partial<FamilleInfo>) => void;
  onDeleteFamille: (id: string) => void;
  onAddMembre: () => void;
  onEditMembre: (membre: MembreFamille) => void;
  onDeleteMembre: (id: string) => void;
  onAddAlliance: () => void;
  onEditAlliance: (alliance: FamilleAlliance) => void;
}

export const FamilleDetail: React.FC<FamilleDetailProps> = ({
  famille,
  membres,
  alliances,
  onUpdateFamille,
  onDeleteFamille,
  onAddMembre,
  onEditMembre,
  onDeleteMembre,
  onAddAlliance,
  onEditAlliance
}) => {
  const [activeTab, setActiveTab] = React.useState('details');

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>{famille.nom} - Gens {famille.gens}</CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onUpdateFamille(famille)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onDeleteFamille(famille.id)}
            >
              <Trash className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="membres">Membres ({membres.length})</TabsTrigger>
              <TabsTrigger value="alliances">Alliances ({alliances.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <FamilleDetailTabContent 
                famille={famille} 
                onEditFamille={() => onUpdateFamille(famille)} 
                onDeleteFamille={() => onDeleteFamille(famille.id)}
                onBack={() => {}} // Empty function since we handle back in parent
              />
            </TabsContent>
            
            <TabsContent value="membres">
              <div className="flex justify-end mb-4">
                <Button onClick={onAddMembre} className="flex items-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Ajouter un membre
                </Button>
              </div>
              <FamilleMembresTabContent 
                membres={membres} 
                onEditMembre={onEditMembre} 
                onDeleteMembre={onDeleteMembre} 
              />
            </TabsContent>
            
            <TabsContent value="alliances">
              <div className="flex justify-end mb-4">
                <Button onClick={onAddAlliance} className="flex items-center">
                  <Handshake className="mr-2 h-4 w-4" />
                  Créer une alliance
                </Button>
              </div>
              <FamilleAlliancesTabContent 
                alliances={alliances} 
                familleId={famille.id} 
                onEditAlliance={onEditAlliance} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
