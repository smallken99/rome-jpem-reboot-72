import React, { useState, useEffect } from 'react';
import { useMaitreJeu } from '../../context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Equilibre, HistoriqueEntry, Politique, Risk, Militaire, Social } from '../../types/equilibre';

export const GestionEquilibreModule = () => {
  const { toast } = useToast();
  const { equilibre, updateEquilibre, historique, addHistoriqueEntry, risques } = useMaitreJeu();
  const [activeTab, setActiveTab] = useState('politique');
  
  // État local pour les modifications
  const [politiqueValues, setPolitiqueValues] = useState<Politique>({
    populares: equilibre.politique?.populares || 33,
    optimates: equilibre.politique?.optimates || 33,
    moderates: equilibre.politique?.moderates || 34
  });
  
  const [socialValues, setSocialValues] = useState<Social>({
    patriciens: equilibre.social?.patriciens || 50,
    plebeiens: equilibre.social?.plebeiens || 50,
    esclaves: equilibre.social?.esclaves || 0,
    cohesion: equilibre.social?.cohesion || 50
  });
  
  const [economieValues, setEconomieValues] = useState({
    stabilite: equilibre.economie?.stabilite || 50,
    croissance: equilibre.economie?.croissance || 50,
    commerce: equilibre.economie?.commerce || 50,
    agriculture: equilibre.economie?.agriculture || 50
  });
  
  const [religionValues, setReligionValues] = useState({
    piete: equilibre.religion?.piete || 50,
    traditions: equilibre.religion?.traditions || 50,
    superstition: equilibre.religion?.superstition || 50
  });
  
  const [stabiliteValues, setStabiliteValues] = useState({
    senat: equilibre.stabilite?.senat || 50,
    tribuns: equilibre.stabilite?.tribuns || 50,
    lois: equilibre.stabilite?.lois || 50
  });
  
  const [militaireValues, setMilitaireValues] = useState<Militaire>({
    morale: equilibre.militaire?.morale || 50,
    loyaute: equilibre.militaire?.loyaute || 50,
    puissance: equilibre.militaire?.puissance || 50,
    discipline: equilibre.militaire?.discipline || 50,
    effectifs: equilibre.militaire?.effectifs || 50,
    equipement: equilibre.militaire?.equipement || 50
  });
  
  const [description, setDescription] = useState('');
  
  useEffect(() => {
    // Mettre à jour l'état local lorsque l'équilibre global change
    setPolitiqueValues({
      populares: equilibre.politique?.populares || 33,
      optimates: equilibre.politique?.optimates || 33,
      moderates: equilibre.politique?.moderates || 34
    });
    
    setSocialValues({
      patriciens: equilibre.social?.patriciens || 50,
      plebeiens: equilibre.social?.plebeiens || 50,
      esclaves: equilibre.social?.esclaves || 0,
      cohesion: equilibre.social?.cohesion || 50
    });
    
    setEconomieValues({
      stabilite: equilibre.economie?.stabilite || 50,
      croissance: equilibre.economie?.croissance || 50,
      commerce: equilibre.economie?.commerce || 50,
      agriculture: equilibre.economie?.agriculture || 50
    });
    
    setReligionValues({
      piete: equilibre.religion?.piete || 50,
      traditions: equilibre.religion?.traditions || 50,
      superstition: equilibre.religion?.superstition || 50
    });
    
    setStabiliteValues({
      senat: equilibre.stabilite?.senat || 50,
      tribuns: equilibre.stabilite?.tribuns || 50,
      lois: equilibre.stabilite?.lois || 50
    });
    
    setMilitaireValues({
      morale: equilibre.militaire?.morale || 50,
      loyaute: equilibre.militaire?.loyaute || 50,
      puissance: equilibre.militaire?.puissance || 50,
      discipline: equilibre.militaire?.discipline || 50,
      effectifs: equilibre.militaire?.effectifs || 50,
      equipement: equilibre.militaire?.equipement || 50
    });
  }, [equilibre]);
  
  const handlePolitiqueChange = (key: keyof Politique, value: number) => {
    setPolitiqueValues(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSocialChange = (key: keyof Social, value: number) => {
    setSocialValues(prev => ({ ...prev, [key]: value }));
  };
  
  const handleEconomieChange = (key: string, value: number) => {
    setEconomieValues(prev => ({ ...prev, [key]: value }));
  };
  
  const handleReligionChange = (key: string, value: number) => {
    setReligionValues(prev => ({ ...prev, [key]: value }));
  };
  
  const handleStabiliteChange = (key: string, value: number) => {
    setStabiliteValues(prev => ({ ...prev, [key]: value }));
  };
  
  const handleMilitaireChange = (key: keyof Militaire, value: number) => {
    setMilitaireValues(prev => ({ ...prev, [key]: value }));
  };
  
  const handleEquilibreUpdate = () => {
    // Assurer que les pourcentages somment à 100%
    const somme = politiqueValues.populares + politiqueValues.optimates + politiqueValues.moderates;
    const ajustement = somme !== 100;
    
    let newValues: Equilibre = {
      social: socialValues,
      politique: {
        populares: politiqueValues.populares,
        optimates: politiqueValues.optimates,
        moderates: politiqueValues.moderates
      },
      stabilite: stabiliteValues,
      economie: economieValues,
      religion: religionValues,
      militaire: militaireValues,
      populares: politiqueValues.populares,
      optimates: politiqueValues.optimates,
      moderates: politiqueValues.moderates,
      patriciens: socialValues.patriciens,
      plebeiens: socialValues.plebeiens,
      morale: militaireValues.morale
    };
    
    // Mettre à jour l'équilibre
    updateEquilibre(newValues);
    
    // Ajouter une entrée à l'historique si une description est fournie
    if (description) {
      const changes = {
        politique: {
          populares: politiqueValues.populares,
          optimates: politiqueValues.optimates,
          moderates: politiqueValues.moderates
        },
        social: socialValues,
        economie: economieValues,
        religion: religionValues,
        stabilite: stabiliteValues,
        militaire: militaireValues
      };
      
      addHistoriqueEntry({
        description,
        date: new Date(),
        changes,
        type: activeTab as any,
        cause: 'Modification manuelle'
      });
      
      setDescription('');
    }
    
    toast({
      title: "Équilibre mis à jour",
      description: ajustement 
        ? "Les valeurs ont été ajustées pour respecter la somme à 100%." 
        : "Les nouveaux paramètres ont été enregistrés.",
      variant: ajustement ? "destructive" : "default"
    });
  };
  
  // Fonction pour calculer les risques actifs
  const getActiveRisks = () => {
    if (!risques) return [];
    return Object.entries(risques).filter(([id, risk]) => (risk as Risk).active);
  };
  
  // Déterminer la couleur en fonction de la valeur
  const getValueColor = (value: number) => {
    if (value < 30) return "text-red-500";
    if (value < 50) return "text-orange-500";
    if (value > 70) return "text-green-500";
    return "text-blue-500";
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Gestion de l'Équilibre de la République</h3>
          <p className="text-sm text-muted-foreground">
            Ajustez les différents facteurs qui influencent la stabilité de Rome
          </p>
        </div>
        <Button onClick={handleEquilibreUpdate}>
          Enregistrer les modifications
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base font-medium">Facteurs Politiques</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="populares">Populares</Label>
                  <span className={getValueColor(politiqueValues.populares)}>
                    {politiqueValues.populares}%
                  </span>
                </div>
                <Slider
                  id="populares"
                  min={0}
                  max={100}
                  step={1}
                  value={[politiqueValues.populares]}
                  onValueChange={val => handlePolitiqueChange('populares', val[0])}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="optimates">Optimates</Label>
                  <span className={getValueColor(politiqueValues.optimates)}>
                    {politiqueValues.optimates}%
                  </span>
                </div>
                <Slider
                  id="optimates"
                  min={0}
                  max={100}
                  step={1}
                  value={[politiqueValues.optimates]}
                  onValueChange={val => handlePolitiqueChange('optimates', val[0])}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="moderates">Moderates</Label>
                  <span className={getValueColor(politiqueValues.moderates)}>
                    {politiqueValues.moderates}%
                  </span>
                </div>
                <Slider
                  id="moderates"
                  min={0}
                  max={100}
                  step={1}
                  value={[politiqueValues.moderates]}
                  onValueChange={val => handlePolitiqueChange('moderates', val[0])}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base font-medium">Facteurs Sociaux</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="patriciens">Patriciens</Label>
                  <span className={getValueColor(socialValues.patriciens)}>
                    {socialValues.patriciens}%
                  </span>
                </div>
                <Slider
                  id="patriciens"
                  min={0}
                  max={100}
                  step={1}
                  value={[socialValues.patriciens]}
                  onValueChange={val => handleSocialChange('patriciens', val[0])}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="plebeiens">Plébéiens</Label>
                  <span className={getValueColor(socialValues.plebeiens)}>
                    {socialValues.plebeiens}%
                  </span>
                </div>
                <Slider
                  id="plebeiens"
                  min={0}
                  max={100}
                  step={1}
                  value={[socialValues.plebeiens]}
                  onValueChange={val => handleSocialChange('plebeiens', val[0])}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="esclaves">Esclaves</Label>
                  <span className={getValueColor(socialValues.esclaves)}>
                    {socialValues.esclaves}%
                  </span>
                </div>
                <Slider
                  id="esclaves"
                  min={0}
                  max={100}
                  step={1}
                  value={[socialValues.esclaves]}
                  onValueChange={val => handleSocialChange('esclaves', val[0])}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="cohesion">Cohésion Sociale</Label>
                  <span className={getValueColor(socialValues.cohesion)}>
                    {socialValues.cohesion}%
                  </span>
                </div>
                <Slider
                  id="cohesion"
                  min={0}
                  max={100}
                  step={1}
                  value={[socialValues.cohesion]}
                  onValueChange={val => handleSocialChange('cohesion', val[0])}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-base font-medium">Facteurs Militaires</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="morale">Morale</Label>
                  <span className={getValueColor(militaireValues.morale)}>
                    {militaireValues.morale}%
                  </span>
                </div>
                <Slider
                  id="morale"
                  min={0}
                  max={100}
                  step={1}
                  value={[militaireValues.morale]}
                  onValueChange={val => handleMilitaireChange('morale', val[0])}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="loyaute">Loyauté</Label>
                  <span className={getValueColor(militaireValues.loyaute)}>
                    {militaireValues.loyaute}%
                  </span>
                </div>
                <Slider
                  id="loyaute"
                  min={0}
                  max={100}
                  step={1}
                  value={[militaireValues.loyaute]}
                  onValueChange={val => handleMilitaireChange('loyaute', val[0])}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="puissance">Puissance</Label>
                  <span className={getValueColor(militaireValues.puissance)}>
                    {militaireValues.puissance}%
                  </span>
                </div>
                <Slider
                  id="puissance"
                  min={0}
                  max={100}
                  step={1}
                  value={[militaireValues.puissance]}
                  onValueChange={val => handleMilitaireChange('puissance', val[0])}
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="discipline">Discipline</Label>
                  <span className={getValueColor(militaireValues.discipline)}>
                    {militaireValues.discipline}%
                  </span>
                </div>
                <Slider
                  id="discipline"
                  min={0}
                  max={100}
                  step={1}
                  value={[militaireValues.discipline]}
                  onValueChange={val => handleMilitaireChange('discipline', val[0])}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Historique des modifications</CardTitle>
          <CardDescription>
            Enregistrez les modifications apportées à l'équilibre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                id="description"
                placeholder="Description de la modification"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
