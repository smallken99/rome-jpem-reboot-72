
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scroll, Users, Crown, LayoutList } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { HeirCard } from './inheritance/HeirCard';
import { useInheritance } from './inheritance/useInheritance';
import { formatCurrency } from '@/lib/utils';

// Utilisation d'un ID de famille fictif pour le moment - à remplacer par le contexte utilisateur
const CURRENT_FAMILLE_ID = "famille-1"; // À remplacer par l'ID réel de la famille du joueur

export const Inheritance: React.FC = () => {
  const { selectedHeirId, potentialHeirs, selectHeir, properties } = useInheritance(CURRENT_FAMILLE_ID);
  
  const selectedHeir = potentialHeirs.find(heir => heir.id === selectedHeirId);
  const totalPatrimoine = properties.reduce((sum, property) => sum + property.value, 0);
  
  return (
    <div className="inheritance">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-cinzel mb-1">Succession Familiale</h3>
          <p className="text-sm text-muted-foreground">
            Choisissez l'héritier qui perpétuera le nom et les traditions de votre famille
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 rounded">
            <Users className="h-4 w-4" />
            <span className="font-medium">{potentialHeirs.length} candidats à la succession</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 rounded">
            <Crown className="h-4 w-4" />
            <span className="font-medium">
              Héritier: {selectedHeir ? `${selectedHeir.prenom} ${selectedHeir.nom}` : "Non désigné"}
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <LayoutList className="mr-2 h-5 w-5 text-rome-red" />
              Patrimoine Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPatrimoine)}</div>
            <p className="text-sm text-muted-foreground mt-1">Valeur estimée des biens</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5 text-rome-red" />
              Membres de la Famille
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{potentialHeirs.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Candidats à la succession</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Scroll className="mr-2 h-5 w-5 text-rome-red" />
              Testament
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold">Dernière modification</div>
                <p className="text-sm text-muted-foreground mt-1">Il y a 2 mois</p>
              </div>
              <Button variant="outline" size="sm">Modifier</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Candidats à la succession</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Sélectionnez le membre de votre famille qui deviendra l'héritier principal. 
              Il héritera du nom familial, des titres et de la position politique.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              {potentialHeirs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun héritier potentiel disponible. Votre famille a besoin de descendants masculins.
                </div>
              ) : (
                potentialHeirs.map(heir => (
                  <HeirCard 
                    key={heir.id}
                    heir={{
                      id: heir.id,
                      name: `${heir.prenom} ${heir.nom}`,
                      role: heir.role || "Membre de la famille",
                      gender: heir.genre,
                      age: heir.age
                    }}
                    isSelected={heir.id === selectedHeirId}
                    onSelect={selectHeir}
                  />
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
