
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, CoinsIcon, Edit, Trash } from 'lucide-react';
import { FamilleInfo, MembreFamille } from '../../types';
import { Badge } from '@/components/ui/badge';

interface FamilleCardProps {
  famille: FamilleInfo;
  membres: MembreFamille[];
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  detailMode?: boolean;
}

export const FamilleCard: React.FC<FamilleCardProps> = ({
  famille,
  membres,
  onSelect,
  onEdit,
  onDelete,
  detailMode = false
}) => {
  const chef = membres.find(m => m.id === famille.chefId);
  const matrone = membres.find(m => m.id === famille.matrone);
  
  return (
    <Card 
      className={`overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
        detailMode ? 'cursor-default' : ''
      }`}
      onClick={!detailMode && onSelect ? onSelect : undefined}
      style={{
        borderColor: famille.couleurPrimaire || '#d1d5db'
      }}
    >
      <CardHeader className="p-4" style={{ 
        backgroundColor: famille.couleurPrimaire ? `${famille.couleurPrimaire}10` : undefined 
      }}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">{famille.nom}</h3>
            <p className="text-sm text-muted-foreground">Gens {famille.gens}</p>
          </div>
          <Badge variant={famille.statut === 'Patricien' ? 'default' : 'secondary'}>
            {famille.statut}
          </Badge>
        </div>
      </CardHeader>
      
      {detailMode ? (
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Information</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pater Familias:</span>
                  <span>{chef ? `${chef.prenom} ${chef.nom}` : 'Non défini'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Mater Familias:</span>
                  <span>{matrone ? `${matrone.prenom} ${matrone.nom}` : 'Non défini'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Nombre de membres:</span>
                  <span>{membres.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Nombre d'alliances:</span>
                  <span>{famille.alliances.length}</span>
                </div>
              </div>
              
              {famille.devise && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-1">Devise</h4>
                  <p className="italic text-sm">"{famille.devise}"</p>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Statistiques</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Prestige
                    </span>
                    <span>{famille.prestige}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 rounded-full h-2" 
                      style={{ width: `${famille.prestige}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      Influence
                    </span>
                    <span>{famille.influence}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 rounded-full h-2" 
                      style={{ width: `${famille.influence}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center text-sm">
                      <CoinsIcon className="h-4 w-4 mr-1" />
                      Richesse
                    </span>
                    <span>{famille.richesse} as</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 rounded-full h-2" 
                      style={{ width: `${Math.min(100, (famille.richesse / 1000))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {famille.description && (
            <div className="mt-4">
              <h4 className="font-semibold mb-1">Description</h4>
              <p className="text-sm">{famille.description}</p>
            </div>
          )}
        </CardContent>
      ) : (
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground">Pater Familias</span>
              <span>{chef ? `${chef.prenom} ${chef.nom}` : 'Non défini'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Membres</span>
              <span>{membres.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Prestige</span>
              <span>{famille.prestige}/100</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Influence</span>
              <span>{famille.influence}/100</span>
            </div>
          </div>
        </CardContent>
      )}
      
      <CardFooter className="p-4 bg-gray-50 flex justify-between">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1 text-gray-500" />
          <span className="text-xs text-gray-500">{membres.length} membres</span>
        </div>
        
        <div className="flex space-x-2">
          {onEdit && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Edit className="h-4 w-4 mr-1" />
              Modifier
            </Button>
          )}
          
          {onDelete && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash className="h-4 w-4 mr-1" />
              Supprimer
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
