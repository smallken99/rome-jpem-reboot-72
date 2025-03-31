
import React from 'react';
import { useMaitreJeu } from '../../context';
import { GestionContainer } from './GestionContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { PoliticalEventsTimeline } from '../PoliticalEventsTimeline';
import { histoireEntryToPoliticalEvent } from '../../types/histoire';
import { toast } from 'sonner';

export const GestionEquilibreModule: React.FC = () => {
  const { equilibre, updateEquilibre, histoireEntries = [] } = useMaitreJeu();
  
  // Fonction pour mettre à jour un aspect de l'équilibre
  const handleUpdateEquilibre = (
    category: 'politique' | 'social' | 'economie' | 'militaire' | 'religion',
    subcategory: string,
    value: number
  ) => {
    // Faire une copie profonde pour éviter les références partagées
    const updatedEquilibre = JSON.parse(JSON.stringify(equilibre));
    
    // Mettre à jour la valeur spécifique
    if (updatedEquilibre[category]) {
      updatedEquilibre[category][subcategory] = value;
    }
    
    // Appliquer la mise à jour
    updateEquilibre(updatedEquilibre);
    toast.success(`${subcategory} mis à jour à ${Math.round(value * 100)}%`);
  };
  
  // Valeurs par défaut si null pour éviter les erreurs
  const economieValues = equilibre.economie || {
    stabilite: 0.5,
    croissance: 0.5,
    commerce: 0.5,
    agriculture: 0.5
  };
  
  // Conversion des événements d'histoire en événements politiques pour la timeline
  const politicalEvents = histoireEntries.map(histoireEntryToPoliticalEvent);
  
  return (
    <GestionContainer
      title="Gestion de l'Équilibre"
      description="Ajustez les différents facteurs d'équilibre de la République"
      showAddButton={false}
    >
      <Tabs defaultValue="politique">
        <TabsList className="mb-6">
          <TabsTrigger value="politique">Politique</TabsTrigger>
          <TabsTrigger value="economie">Économie</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="militaire">Militaire</TabsTrigger>
          <TabsTrigger value="religion">Religion</TabsTrigger>
          <TabsTrigger value="evenements">Événements</TabsTrigger>
        </TabsList>
        
        {/* Onglet Équilibre Politique */}
        <TabsContent value="politique">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Équilibre des Factions</CardTitle>
                <CardDescription>
                  Ajustez la balance des pouvoirs entre les grandes factions politiques romaines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Populares</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(equilibre.politique.populares * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[equilibre.politique.populares * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleUpdateEquilibre('politique', 'populares', value[0]/100)}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Les Populares cherchent à gagner du pouvoir en s'appuyant sur le soutien du peuple
                    et prônent des réformes agraires et sociales.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Optimates</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(equilibre.politique.optimates * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[equilibre.politique.optimates * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleUpdateEquilibre('politique', 'optimates', value[0]/100)}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Les Optimates défendent les privilèges de l'aristocratie et du Sénat,
                    et s'opposent aux réformes populaires.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Modérés</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(equilibre.politique.moderates * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[equilibre.politique.moderates * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleUpdateEquilibre('politique', 'moderates', value[0]/100)}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Les Modérés cherchent à maintenir un équilibre politique et évitent les positions extrêmes,
                    favorisant le compromis et la stabilité.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => {
                      // Normaliser pour que la somme soit égale à 1
                      const total = equilibre.politique.populares + equilibre.politique.optimates + equilibre.politique.moderates;
                      const updatedEquilibre = {
                        ...equilibre,
                        politique: {
                          populares: equilibre.politique.populares / total,
                          optimates: equilibre.politique.optimates / total,
                          moderates: equilibre.politique.moderates / total
                        }
                      };
                      updateEquilibre(updatedEquilibre);
                      toast.success("Les valeurs ont été normalisées");
                    }}
                    variant="outline"
                  >
                    Normaliser les valeurs
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tendances politiques</CardTitle>
                <CardDescription>
                  Visualisez l'évolution des tendances politiques au fil du temps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Le graphique des tendances politiques sera disponible prochainement
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Onglet Équilibre Économique */}
        <TabsContent value="economie">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Indicateurs Économiques</CardTitle>
                <CardDescription>
                  Ajustez les différents aspects de l'économie romaine
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Stabilité</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(economieValues.stabilite * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[economieValues.stabilite * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleUpdateEquilibre('economie', 'stabilite', value[0]/100)}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    La stabilité économique reflète la confiance dans la monnaie et la prévisibilité des marchés.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Croissance</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(economieValues.croissance * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[economieValues.croissance * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleUpdateEquilibre('economie', 'croissance', value[0]/100)}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    La croissance économique représente l'expansion générale de l'économie et la création de richesse.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Commerce</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(economieValues.commerce * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[economieValues.commerce * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleUpdateEquilibre('economie', 'commerce', value[0]/100)}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Le commerce mesure l'activité marchande, les échanges et l'importance des routes commerciales.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Agriculture</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(economieValues.agriculture * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[economieValues.agriculture * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleUpdateEquilibre('economie', 'agriculture', value[0]/100)}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    L'agriculture représente la santé des récoltes, l'approvisionnement alimentaire et les terres cultivées.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Projection économique</CardTitle>
                <CardDescription>
                  Tendances économiques prévisionnelles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Les projections économiques seront disponibles prochainement
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Onglet Équilibre Social */}
        <TabsContent value="social">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Structure Sociale</CardTitle>
                <CardDescription>
                  Ajustez l'équilibre entre les différentes classes sociales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Patriciens</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(equilibre.social.patriciens * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[equilibre.social.patriciens * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleUpdateEquilibre('social', 'patriciens', value[0]/100)}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Influence et pouvoir de l'aristocratie patricienne dans la société romaine.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Plébéiens</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(equilibre.social.plebeiens * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[equilibre.social.plebeiens * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleUpdateEquilibre('social', 'plebeiens', value[0]/100)}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Influence et pouvoir des classes populaires et de la plèbe dans la société.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Esclaves</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round((equilibre.social.esclaves || 0) * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[(equilibre.social.esclaves || 0) * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleUpdateEquilibre('social', 'esclaves', value[0]/100)}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Proportion et importance des esclaves dans l'économie et la société.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Cohésion Sociale</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round((equilibre.social.cohesion || 0) * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[(equilibre.social.cohesion || 0) * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleUpdateEquilibre('social', 'cohesion', value[0]/100)}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    Mesure de l'unité et de la stabilité sociale dans la République.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Onglet Événements */}
        <TabsContent value="evenements">
          <PoliticalEventsTimeline events={politicalEvents} />
        </TabsContent>
      </Tabs>
    </GestionContainer>
  );
};
