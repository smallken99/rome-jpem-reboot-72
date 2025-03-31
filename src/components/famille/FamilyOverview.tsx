import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CharacterSheet } from './CharacterSheet';
import { FamilyStats } from './FamilyStats';
import { Character } from '@/types/character';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Users, Scroll, Award } from 'lucide-react';
import { RomanCard } from '@/components/ui-custom/RomanCard';

interface FamilyOverviewProps {
  characters: Character[];
  onCharacterSelect?: (character: Character) => void;
}

export const FamilyOverview: React.FC<FamilyOverviewProps> = ({ 
  characters,
  onCharacterSelect
}) => {
  // Trouve le chef de famille (pater familias)
  const paterFamilias = characters.find(c => c.isHeadOfFamily || c.role?.includes('Chef')) || characters[0];
  
  // Trouve la mère de famille (matrona)
  const matrona = characters.find(c => 
    c.gender === 'female' && 
    (c.role?.includes('Épouse') || c.marriageStatus === 'married')
  );
  
  // Trouve les enfants
  const children = characters.filter(c => 
    c.role?.includes('Fils') || 
    c.role?.includes('Fille') ||
    c.age < 18
  );

  // Trouve les autres membres adultes
  const otherAdults = characters.filter(c => 
    c !== paterFamilias && 
    c !== matrona && 
    !children.includes(c) && 
    c.age >= 18
  );
  
  // Calcul de la santé familiale
  const calculateFamilyHealth = (): 'good' | 'fair' | 'poor' => {
    const healthValues = characters.map(c => c.health || 100);
    const averageHealth = healthValues.reduce((sum, val) => sum + val, 0) / healthValues.length;
    
    if (averageHealth >= 80) return 'good';
    if (averageHealth >= 60) return 'fair';
    return 'poor';
  };
  
  const handleCardClick = (character: Character) => {
    if (onCharacterSelect) {
      onCharacterSelect(character);
    }
  };
  
  return (
    <div className="family-overview space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-cinzel text-xl flex items-center gap-2">
            <Users className="h-5 w-5 text-rome-navy/80" />
            Vue d'ensemble de la Gens {paterFamilias.lastName || paterFamilias.name.split(' ')[1] || ''}
          </CardTitle>
          <CardDescription>
            Consultez l'état actuel de votre famille et de ses membres
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <FamilyStats 
              membersCount={characters.length}
              adultsCount={characters.filter(c => c.age >= 16).length}
              childrenCount={characters.filter(c => c.age < 16).length}
              healthStatus={calculateFamilyHealth()}
            />
            
            <Tabs defaultValue="family" className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="family" className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4" />
                  <span>Famille</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-1.5">
                  <Award className="h-4 w-4" />
                  <span>Statistiques</span>
                </TabsTrigger>
                <TabsTrigger value="legacy" className="flex items-center gap-1.5">
                  <Scroll className="h-4 w-4" />
                  <span>Héritage</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="family">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pater Familias */}
                    {paterFamilias && (
                      <div className="md:col-span-2">
                        <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-rome-navy" />
                          Chef de Famille
                        </h3>
                        <CharacterSheet 
                          character={paterFamilias} 
                          onClick={() => handleCardClick(paterFamilias)}
                        />
                      </div>
                    )}
                    
                    {/* Matrona */}
                    {matrona && (
                      <div>
                        <h3 className="font-medium text-lg mb-2">Matrona</h3>
                        <CharacterSheet 
                          character={matrona} 
                          compact 
                          onClick={() => handleCardClick(matrona)}
                        />
                      </div>
                    )}
                    
                    {/* Other Adults */}
                    {otherAdults.length > 0 && (
                      <div>
                        <h3 className="font-medium text-lg mb-2">Autres Adultes</h3>
                        <ScrollArea className="h-[225px] pr-4">
                          <div className="space-y-3">
                            {otherAdults.map(adult => (
                              <CharacterSheet 
                                key={adult.id} 
                                character={adult} 
                                compact
                                onClick={() => handleCardClick(adult)}
                              />
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    )}
                    
                    {/* Children */}
                    {children.length > 0 && (
                      <div className="md:col-span-2">
                        <h3 className="font-medium text-lg mb-2">Enfants ({children.length})</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {children.map(child => (
                            <CharacterSheet 
                              key={child.id} 
                              character={child} 
                              compact
                              onClick={() => handleCardClick(child)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="stats">
                <RomanCard>
                  <RomanCard.Header>
                    <h3 className="font-cinzel">Statistiques Familiales</h3>
                  </RomanCard.Header>
                  <RomanCard.Content>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Influence Politique</h4>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Cumulative</span>
                          <span className="text-sm font-medium">{
                            characters.reduce((sum, char) => {
                              const val = typeof char.stats.popularity === 'number' 
                                ? char.stats.popularity 
                                : char.stats.popularity.value;
                              return sum + val;
                            }, 0)
                          }</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                          <div className="h-2 bg-rome-gold rounded-full" style={{ 
                            width: `${Math.min(100, characters.reduce((sum, char) => {
                              const val = typeof char.stats.popularity === 'number' 
                                ? char.stats.popularity 
                                : char.stats.popularity.value;
                              return sum + val;
                            }, 0) / (characters.length * 100) * 100)}%` 
                          }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Piété Familiale</h4>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Moyenne</span>
                          <span className="text-sm font-medium">{
                            Math.round(characters.reduce((sum, char) => {
                              const val = typeof char.stats.piety === 'number' 
                                ? char.stats.piety 
                                : char.stats.piety.value;
                              return sum + val;
                            }, 0) / characters.length)
                          }</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                          <div className="h-2 bg-rome-navy rounded-full" style={{ 
                            width: `${Math.min(100, characters.reduce((sum, char) => {
                              const val = typeof char.stats.piety === 'number' 
                                ? char.stats.piety 
                                : char.stats.piety.value;
                              return sum + val;
                            }, 0) / characters.length)}%` 
                          }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Éducation</h4>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Compétence Oratoire</span>
                          <span className="text-sm font-medium">{
                            Math.round(characters.reduce((sum, char) => {
                              const val = typeof char.stats.oratory === 'number' 
                                ? char.stats.oratory 
                                : char.stats.oratory.value;
                              return sum + val;
                            }, 0) / characters.length)
                          }</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                          <div className="h-2 bg-rome-terracotta rounded-full" style={{ 
                            width: `${Math.min(100, characters.reduce((sum, char) => {
                              const val = typeof char.stats.oratory === 'number' 
                                ? char.stats.oratory 
                                : char.stats.oratory.value;
                              return sum + val;
                            }, 0) / characters.length)}%` 
                          }}></div>
                        </div>
                      </div>
                    </div>
                  </RomanCard.Content>
                </RomanCard>
              </TabsContent>
              
              <TabsContent value="legacy">
                <RomanCard>
                  <RomanCard.Header>
                    <h3 className="font-cinzel">Héritage Familial</h3>
                  </RomanCard.Header>
                  <RomanCard.Content>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Information sur l'héritage et la continuité de la lignée familiale
                      </p>
                      
                      {paterFamilias && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Testament</h4>
                          <p className="text-sm bg-gray-50 p-3 border rounded-md">
                            {paterFamilias.testamentaryWishes || "Aucun testament n'a encore été rédigé pour cette famille."}
                          </p>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Héritier Présomptif</h4>
                        {children.find(c => c.gender === 'male') ? (
                          <div className="text-sm bg-amber-50 p-3 border border-amber-200 rounded-md">
                            <span className="font-medium">{children.find(c => c.gender === 'male')?.name}</span>
                            {" est l'héritier désigné de la famille."}
                          </div>
                        ) : (
                          <div className="text-sm bg-red-50 p-3 border border-red-200 rounded-md">
                            Aucun héritier mâle n'a été identifié dans la famille. Envisagez d'adopter un héritier 
                            ou d'établir un testament spécifique.
                          </div>
                        )}
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <Scroll className="h-4 w-4 mr-2" />
                        Voir les détails de succession
                      </Button>
                    </div>
                  </RomanCard.Content>
                </RomanCard>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
