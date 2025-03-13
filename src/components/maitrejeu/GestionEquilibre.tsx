import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, BarChart, TrendingUp, Users, Scale, ListChecks } from 'lucide-react';
import { useMaitreJeu } from './context';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { EvenementBasicInfo } from './components/evenements/EvenementBasicInfo';
import { EvenementOptions } from './components/evenements/EvenementOptions';
import { useEvenementForm } from './components/evenements/useEvenementForm';
import { CreateEvenementForm } from './components/evenements/CreateEvenementForm';

export const GestionEquilibre: React.FC = () => {
  const { equilibre, updateEquilibre, updateFactionBalance, evenements, lois, currentYear, currentSeason } = useMaitreJeu();
  
  const [showEventForm, setShowEventForm] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const [facteurSenat, setFacteurSenat] = useState(equilibre?.facteurSenat || 50);
  const [facteurPlebs, setFacteurPlebs] = useState(equilibre?.facteurPlebs || 50);
  const [facteurPatriciens, setFacteurPatriciens] = useState(equilibre?.facteurPatriciens || 50);
  const [facteurMilitaire, setFacteurMilitaire] = useState(equilibre?.facteurMilitaire || 50);
  const [facteurReligieux, setFacteurReligieux] = useState(equilibre?.facteurReligieux || 50);
  
  const [populaires, setPopulaires] = useState(equilibre?.populaires || 33);
  const [optimates, setOptimates] = useState(equilibre?.optimates || 33);
  const [moderates, setModerates] = useState(equilibre?.moderates || 34);
  
  const [notes, setNotes] = useState(equilibre?.notes || '');
  
  const recentEvenements = evenements
    .filter(e => e.date.year === currentYear || e.date.year === currentYear - 1)
    .sort((a, b) => (b.date.year - a.date.year) || (b.date.season.localeCompare(a.date.season)));
  
  const recentLois = lois
    .filter(l => l.date.year === currentYear || l.date.year === currentYear - 1)
    .sort((a, b) => (b.date.year - a.date.year) || (b.date.season.localeCompare(a.date.season)));
  
  const appliquerChangements = () => {
    updateEquilibre({
      facteurSenat,
      facteurPlebs,
      facteurPatriciens,
      facteurMilitaire,
      facteurReligieux,
      notes
    });
    
    updateFactionBalance(populaires, optimates, moderates);
  };
  
  const getStatusColor = (value: number) => {
    if (value >= 75) return 'text-green-600';
    if (value >= 50) return 'text-blue-600';
    if (value >= 25) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const getStatusText = (value: number) => {
    if (value >= 75) return 'Excellent';
    if (value >= 50) return 'Bon';
    if (value >= 25) return 'Tendu';
    return 'Critique';
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion de l'Équilibre</h1>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowEventForm(true)} 
            variant="outline"
          >
            Créer un événement
          </Button>
          <Button onClick={appliquerChangements}>Appliquer les changements</Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">État Général</TabsTrigger>
          <TabsTrigger value="factions">Factions</TabsTrigger>
          <TabsTrigger value="evenements">Événements Récents</TabsTrigger>
          <TabsTrigger value="lois">Législation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Équilibre de la République</CardTitle>
              <CardDescription>
                Ajustez les facteurs qui influencent la stabilité générale de Rome
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="flex items-center">
                      <Scale className="mr-2 h-4 w-4" />
                      Satisfaction du Sénat
                    </Label>
                    <span className={getStatusColor(facteurSenat)}>
                      {getStatusText(facteurSenat)} ({facteurSenat}%)
                    </span>
                  </div>
                  <Slider
                    value={[facteurSenat]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setFacteurSenat(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Satisfaction de la Plèbe
                    </Label>
                    <span className={getStatusColor(facteurPlebs)}>
                      {getStatusText(facteurPlebs)} ({facteurPlebs}%)
                    </span>
                  </div>
                  <Slider
                    value={[facteurPlebs]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setFacteurPlebs(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Satisfaction des Patriciens
                    </Label>
                    <span className={getStatusColor(facteurPatriciens)}>
                      {getStatusText(facteurPatriciens)} ({facteurPatriciens}%)
                    </span>
                  </div>
                  <Slider
                    value={[facteurPatriciens]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setFacteurPatriciens(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="flex items-center">
                      Soutien Militaire
                    </Label>
                    <span className={getStatusColor(facteurMilitaire)}>
                      {getStatusText(facteurMilitaire)} ({facteurMilitaire}%)
                    </span>
                  </div>
                  <Slider
                    value={[facteurMilitaire]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setFacteurMilitaire(value[0])}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="flex items-center">
                      Faveur Divine
                    </Label>
                    <span className={getStatusColor(facteurReligieux)}>
                      {getStatusText(facteurReligieux)} ({facteurReligieux}%)
                    </span>
                  </div>
                  <Slider
                    value={[facteurReligieux]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setFacteurReligieux(value[0])}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label>Notes sur l'état actuel</Label>
                <Textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ajoutez des notes sur la situation politique actuelle..."
                  className="mt-2"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Indicateurs Globaux</CardTitle>
              <CardDescription>
                Synthèse de la situation politique actuelle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round((facteurSenat + facteurPatriciens) / 2)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Stabilité Politique
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round((facteurPlebs + facteurPatriciens) / 2)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Harmonie Sociale
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">
                    {Math.round((facteurMilitaire + facteurReligieux) / 2)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Puissance de Rome
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="factions" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Équilibre des Factions</CardTitle>
              <CardDescription>
                Distribuez le pouvoir entre les trois principales factions du Sénat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <Label className="block">Populares</Label>
                    <span className="text-sm text-muted-foreground">Représentants du peuple</span>
                  </div>
                  <Badge>{populaires}%</Badge>
                </div>
                <Slider
                  value={[populaires]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    setPopulaires(value[0]);
                    const totalOthers = 100 - value[0];
                    setOptimates(Math.round(totalOthers / 2));
                    setModerates(totalOthers - Math.round(totalOthers / 2));
                  }}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <Label className="block">Optimates</Label>
                    <span className="text-sm text-muted-foreground">Conservateurs traditionnels</span>
                  </div>
                  <Badge>{optimates}%</Badge>
                </div>
                <Slider
                  value={[optimates]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    setOptimates(value[0]);
                    const totalOthers = 100 - value[0];
                    setPopulaires(Math.round(totalOthers / 2));
                    setModerates(totalOthers - Math.round(totalOthers / 2));
                  }}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <Label className="block">Modérés</Label>
                    <span className="text-sm text-muted-foreground">Centristes et pragmatiques</span>
                  </div>
                  <Badge>{moderates}%</Badge>
                </div>
                <Slider
                  value={[moderates]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    setModerates(value[0]);
                    const totalOthers = 100 - value[0];
                    setPopulaires(Math.round(totalOthers / 2));
                    setOptimates(totalOthers - Math.round(totalOthers / 2));
                  }}
                />
              </div>
              
              <div className="mt-6">
                <div className="h-8 flex rounded-sm overflow-hidden">
                  <div 
                    className="bg-red-500" 
                    style={{ width: `${populaires}%` }}
                    title="Populares"
                  />
                  <div 
                    className="bg-blue-500" 
                    style={{ width: `${optimates}%` }}
                    title="Optimates"
                  />
                  <div 
                    className="bg-amber-500" 
                    style={{ width: `${moderates}%` }}
                    title="Modérés"
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-red-600">Populares</span>
                  <span className="text-blue-600">Optimates</span>
                  <span className="text-amber-600">Modérés</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Impact sur la Gouvernance</CardTitle>
              <CardDescription>
                Comment l'équilibre actuel des factions influence la gouvernance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Tendance législative</h3>
                  <p className="text-sm text-muted-foreground">
                    {(() => {
                      if (populaires > 45) return "Favorable aux réformes sociales et aux intérêts du peuple";
                      if (optimates > 45) return "Conservatrice, privilégiant la tradition et l'autorité sénatoriale";
                      if (moderates > 45) return "Équilibrée, cherchant des compromis entre tradition et réforme";
                      return "Instable, avec des alliances changeantes selon les sujets";
                    })()}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Stabilité politique</h3>
                  <p className="text-sm text-muted-foreground">
                    {Math.abs(populaires - optimates) > 30 
                      ? "Polarisée, avec des tensions importantes entre les factions opposées" 
                      : "Relativement stable, avec un équilibre des pouvoirs"}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Facteurs de risque</h3>
                  <div className="space-y-2">
                    {populaires > 60 && (
                      <Badge variant="outline" className="bg-red-50">Agitation populaire</Badge>
                    )}
                    {optimates > 60 && (
                      <Badge variant="outline" className="bg-blue-50">Résistance au changement</Badge>
                    )}
                    {moderates < 20 && (
                      <Badge variant="outline" className="bg-amber-50">Manque de compromis</Badge>
                    )}
                    {Math.max(populaires, optimates, moderates) - Math.min(populaires, optimates, moderates) > 40 && (
                      <Badge variant="outline" className="bg-purple-50">Déséquilibre majeur</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="evenements" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Événements Récents</CardTitle>
                <CardDescription>
                  Événements qui ont affecté l'équilibre politique
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                {recentEvenements.length > 0 ? (
                  <div className="space-y-4">
                    {recentEvenements.map(evt => (
                      <div key={evt.id} className="border-l-2 pl-4 pb-4">
                        <h3 className="font-medium">{evt.titre}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{evt.description}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="bg-secondary/20">
                            {evt.type}
                          </Badge>
                          <Badge variant="outline" className="bg-secondary/20">
                            {evt.importance}
                          </Badge>
                          <Badge variant={evt.resolved ? "outline" : "secondary"}>
                            {evt.resolved ? "Résolu" : "En cours"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    Aucun événement récent
                  </p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Impact Politique</CardTitle>
                <CardDescription>
                  Comment les événements récents ont modifié l'équilibre
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Impact sur le soutien populaire</Label>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${facteurPlebs}%` }}></div>
                      </div>
                      <span className="text-sm">{facteurPlebs}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Impact sur le soutien sénatorial</Label>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${facteurSenat}%` }}></div>
                      </div>
                      <span className="text-sm">{facteurSenat}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Stabilité générale</Label>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className={`h-2.5 rounded-full ${
                            facteurSenat > 70 ? 'bg-green-600' : 
                            facteurSenat > 40 ? 'bg-amber-600' : 
                            'bg-red-600'
                          }`} 
                          style={{ width: `${facteurSenat}%` }}
                        />
                      </div>
                      <span className="text-sm">{facteurSenat}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="lois" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lois récentes</CardTitle>
              <CardDescription>
                Récentes réformes législatives et leur impact
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              {recentLois.length > 0 ? (
                <div className="space-y-4">
                  {recentLois.map(loi => (
                    <div key={loi.id} className="border-l-2 pl-4 pb-4">
                      <h3 className="font-medium">{loi.titre}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{loi.description}</p>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-secondary/20">
                          {loi.type}
                        </Badge>
                        <Badge variant={loi.état === "adoptée" ? "outline" : 
                                        loi.état === "rejetée" ? "destructive" : 
                                        "secondary"}>
                          {loi.état}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  Aucune loi récente
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <CreateEvenementForm isOpen={showEventForm} onClose={() => setShowEventForm(false)} />
    </div>
  );
};
