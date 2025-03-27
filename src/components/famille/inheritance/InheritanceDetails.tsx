
import React, { useState, useEffect } from 'react';
import { Character } from '@/types/character';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, Heart, Skull, Crown } from 'lucide-react';
import { useCharacters } from '../hooks/useCharacters';
import { getEligibleHeirs } from './inheritanceUtils';

interface InheritanceDetailsProps {
  character?: Character;
  heirs?: Character[];
  heirId?: string;
}

export const InheritanceDetails: React.FC<InheritanceDetailsProps> = ({ 
  character: propCharacter,
  heirs: propHeirs,
  heirId
}) => {
  const { localCharacters } = useCharacters();
  const [character, setCharacter] = useState<Character | undefined>(propCharacter);
  const [heirs, setHeirs] = useState<Character[]>(propHeirs || []);

  useEffect(() => {
    // If we have an heirId, find that character
    if (heirId) {
      const selectedHeir = localCharacters.find(c => c.id === heirId);
      if (selectedHeir) {
        setCharacter(selectedHeir);
      }
    } 
    // If we have neither character nor heirId, use head of family
    else if (!propCharacter) {
      const headOfFamily = localCharacters.find(c => c.isHeadOfFamily) || localCharacters[0];
      setCharacter(headOfFamily);

      // If heirs weren't provided, calculate them
      if (!propHeirs) {
        setHeirs(getEligibleHeirs(headOfFamily, localCharacters).slice(0, 5));
      }
    }
  }, [heirId, localCharacters, propCharacter, propHeirs]);

  if (!character) {
    return <div>Aucun personnage sélectionné</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Testament de {character.name}</CardTitle>
          <CardDescription>
            Chef de famille, {character.age} ans, {character.health || 100}% de santé
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Statut Patriarcal</h3>
                <p className="text-sm text-muted-foreground">{character.relation || "Chef de famille"}</p>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Crown className="h-3.5 w-3.5" />
                Pater Familias
              </Badge>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Espérance de vie estimée</h3>
              <div className="flex items-center space-x-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${character.health || 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">
                  {Math.floor(80 * ((character.health || 100) / 100) - character.age)} ans
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Basé sur votre âge actuel et votre état de santé
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Dernières Volontés</h3>
              <p className="text-sm italic">
                {character.testamentaryWishes || 
                  "Aucune directive spécifique n'a été établie pour la succession."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Héritiers Potentiels</CardTitle>
          <CardDescription>
            Par ordre de priorité selon les traditions romaines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {heirs.length > 0 ? (
                heirs.map((heir, index) => (
                  <Card key={heir.id} className={`border ${index === 0 ? 'border-amber-300 bg-amber-50' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{heir.name}</h3>
                            {index === 0 && (
                              <Badge className="bg-amber-500">Principal</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {heir.relation || "Membre de la famille"}, {heir.age} ans
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium flex items-center">
                            <Heart className="h-4 w-4 text-red-500 mr-1" />
                            {heir.health || 100}%
                          </span>
                          {(!heir.status || heir.status === 'alive') ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Vivant
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
                              <Skull className="h-3 w-3" />
                              Décédé
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      {index === 0 && (
                        <div className="mt-2 text-xs text-muted-foreground flex items-center">
                          <ArrowRight className="h-3 w-3 mr-1" />
                          Héritier principal selon la loi romaine
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Aucun héritier éligible n'a été trouvé.</p>
                  <p className="text-sm mt-2">
                    Envisagez d'adopter un héritier ou d'avoir des enfants.
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
