
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Character } from '@/types/character';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getFamilyMembers } from './familyHelpers';

interface FamilyInfoSidebarProps {
  characters: Character[];
}

export const FamilyInfoSidebar: React.FC<FamilyInfoSidebarProps> = ({ characters }) => {
  const [activeTab, setActiveTab] = useState('info');
  const { paterFamilias, materFamilias, children, otherRelatives } = getFamilyMembers(characters);
  
  // Fonction utilitaire pour afficher le nom complet
  const displayFullName = (character: Character) => {
    // Si firstName et lastName sont définis, les utiliser
    if (character.firstName && character.lastName) {
      return `${character.firstName} ${character.lastName}`;
    }
    // Sinon, utiliser le champ name
    return character.name;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations familiales</CardTitle>
        <CardDescription>Détails sur votre famille et sa lignée</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Sommaire</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Chef de famille</h3>
              {paterFamilias ? (
                <p>{displayFullName(paterFamilias)}</p>
              ) : (
                <p className="text-muted-foreground text-sm">Aucun chef de famille</p>
              )}
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Matrone</h3>
              {materFamilias ? (
                <p>{displayFullName(materFamilias)}</p>
              ) : (
                <p className="text-muted-foreground text-sm">Aucune matrone</p>
              )}
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Descendants <Badge>{children.length}</Badge></h3>
              {children.length > 0 ? (
                <ul className="list-disc pl-5 text-sm">
                  {children.map((child, index) => (
                    <li key={child.id || index}>
                      {displayFullName(child)} ({child.gender === 'male' ? 'Fils' : 'Fille'})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground text-sm">Aucun descendant</p>
              )}
            </div>
            
            <Alert variant="default" className="mt-4">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Conseil</AlertTitle>
              <AlertDescription>
                Avoir des descendants est essentiel pour la perpétuation de votre lignée.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Taille de la famille</h3>
                <p className="text-2xl">{characters.length}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Composition</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span>Hommes</span>
                    <span>{characters.filter(c => c.gender === 'male').length}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Femmes</span>
                    <span>{characters.filter(c => c.gender === 'female').length}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Enfants</span>
                    <span>{children.length}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Alliances maritales</h3>
                <p className="text-sm">
                  {characters.filter(c => c.marriageStatus === 'married' && c.gender === 'female' && c.role !== 'mater familias').length} 
                  {' '}alliances avec d'autres familles
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
