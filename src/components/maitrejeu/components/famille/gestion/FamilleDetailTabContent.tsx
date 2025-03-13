
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash } from 'lucide-react';
import { FamilleInfo } from '../../../types';
import { Badge } from '@/components/ui/badge';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          onClick={onBack} 
          variant="outline" 
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        
        <div className="flex items-center gap-2">
          <Button 
            onClick={onEditFamille} 
            variant="outline" 
            className="flex items-center gap-1"
          >
            <Edit className="h-4 w-4" />
            Modifier
          </Button>
          <Button 
            onClick={onDeleteFamille} 
            variant="destructive" 
            className="flex items-center gap-1"
          >
            <Trash className="h-4 w-4" />
            Supprimer
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader 
          className="pb-2" 
          style={{
            backgroundColor: famille.couleurPrimaire || '#f1f5f9',
            color: '#fff',
            borderBottom: `4px solid ${famille.couleurSecondaire || '#64748b'}`
          }}
        >
          <CardTitle className="text-2xl font-bold flex justify-between items-center">
            <span>Famille {famille.nom}</span>
            <Badge className="ml-2" variant={famille.statut === "Patricien" ? "default" : "outline"}>
              {famille.statut}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Gens</h3>
                <p className="text-lg">{famille.gens}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Devise</h3>
                <p className="text-lg italic">{famille.devise || "Aucune devise"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Prestige</h3>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${famille.prestige}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{famille.prestige}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Influence</h3>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full" 
                      style={{ width: `${famille.influence}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{famille.influence}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Richesse</h3>
                <p className="text-lg">{famille.richesse.toLocaleString()} As</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
              <p className="text-gray-700">{famille.description || "Aucune description disponible."}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
