
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Character } from '@/types/character';
import { findHeir, getFamilyLineage } from './familyHelpers';

interface FamilyInfoSidebarProps {
  characters: Character[];
}

export const FamilyInfoSidebar: React.FC<FamilyInfoSidebarProps> = ({ characters }) => {
  // Statistiques de la famille
  const totalMembers = characters.length;
  const livingMembers = characters.filter(c => c.status === 'alive').length;
  const maleMembers = characters.filter(c => c.gender === 'male' && c.status === 'alive').length;
  const femaleMembers = characters.filter(c => c.gender === 'female' && c.status === 'alive').length;
  
  // Trouver l'héritier potentiel
  const heir = findHeir(characters);
  
  // Obtenir le nom de la lignée familiale
  const lineageName = getFamilyLineage(characters);
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{lineageName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium">Membres</h3>
                <p className="text-2xl">{totalMembers}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Vivants</h3>
                <p className="text-2xl">{livingMembers}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Hommes</h3>
                <p className="text-2xl">{maleMembers}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Femmes</h3>
                <p className="text-2xl">{femaleMembers}</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium">Héritier Présomptif</h3>
              {heir ? (
                <div className="mt-2">
                  <p className="font-medium">{heir.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {heir.age} ans, {heir.relation}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-2">
                  Aucun héritier éligible
                </p>
              )}
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium">Traits Familiaux</h3>
              <div className="flex flex-wrap gap-1 mt-2">
                {getFamilyTraits(characters).map((trait, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>État de la Succession</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {getSuccessionStatus(characters)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Fonction utilitaire pour obtenir les traits communs de la famille
const getFamilyTraits = (characters: Character[]): string[] => {
  // Compter l'occurrence de chaque trait
  const traitCount: Record<string, number> = {};
  
  characters.forEach(character => {
    character.traits.forEach(trait => {
      traitCount[trait] = (traitCount[trait] || 0) + 1;
    });
  });
  
  // Sélectionner les traits qui apparaissent dans au moins 30% des membres
  const threshold = characters.length * 0.3;
  return Object.entries(traitCount)
    .filter(([_, count]) => count >= threshold)
    .map(([trait, _]) => trait);
};

// Fonction utilitaire pour obtenir le statut de la succession
const getSuccessionStatus = (characters: Character[]): string => {
  const heir = findHeir(characters);
  const paterFamilias = characters.find(c => c.isHeadOfFamily);
  
  if (!paterFamilias) {
    return "Votre famille n'a pas de chef officiel. La succession est en danger.";
  }
  
  if (!heir) {
    return "Aucun héritier n'est actuellement disponible. Votre lignée risque de s'éteindre.";
  }
  
  if (heir.gender === 'male' && heir.relation.includes('Fils')) {
    return "La succession est assurée par une ligne directe père-fils, comme le veut la tradition romaine.";
  }
  
  if (heir.gender === 'male' && heir.relation.includes('Frère')) {
    return "La succession passerait à un frère du chef de famille. Envisagez d'adopter un fils.";
  }
  
  return "La succession est incertaine. Envisagez des alliances matrimoniales ou l'adoption.";
};
