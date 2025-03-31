
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from '../../context/MaitreJeuContext';
import { getEquilibreNumber } from '../../utils/equilibreAdapter';
import { Progress } from '@/components/ui/progress';

export const SocialTensions: React.FC = () => {
  const { equilibre, updateEquilibre } = useMaitreJeu();
  
  const [economieValue, setEconomieValue] = useState<number>(
    getEquilibreNumber(equilibre.economie)
  );
  
  const handleUpdateEconomie = () => {
    updateEquilibre({
      economie: economieValue,
      économie: economieValue,
    });
  };
  
  const calculateTensionLevel = (): 'low' | 'medium' | 'high' | 'critical' => {
    const economieScore = getEquilibreNumber(equilibre.economie);
    
    if (economieScore < 25) {
      return 'critical';
    } else if (economieScore < 50) {
      return 'high';
    } else if (economieScore < 75) {
      return 'medium';
    } else {
      return 'low';
    }
  };
  
  const tensionLevel = calculateTensionLevel();
  
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Tensions Sociales</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="adjustment">Ajuster</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Stabilité Économique</span>
                  <span className="font-semibold">{getEquilibreNumber(equilibre.economie)}%</span>
                </div>
                <Progress value={getEquilibreNumber(equilibre.economie)} className="h-2" />
              </div>
              
              {tensionLevel === 'critical' && (
                <div className="bg-red-100 p-4 rounded-md border border-red-300 text-red-800">
                  <h4 className="font-bold">Alerte Critique</h4>
                  <p>La république est au bord de l'effondrement économique. Des émeutes liées à la faim sont signalées dans plusieurs quartiers. Le Sénat doit agir immédiatement.</p>
                </div>
              )}
              
              {tensionLevel === 'high' && (
                <div className="bg-amber-100 p-4 rounded-md border border-amber-300 text-amber-800">
                  <h4 className="font-bold">Tension Élevée</h4>
                  <p>Des manifestations contre la cherté de la vie se multiplient. Le mécontentement populaire grandit. Des mesures significatives sont nécessaires.</p>
                </div>
              )}
              
              {tensionLevel === 'medium' && (
                <div className="bg-blue-100 p-4 rounded-md border border-blue-300 text-blue-800">
                  <h4 className="font-bold">Tension Modérée</h4>
                  <p>Quelques signes de mécontentement sont visibles mais la situation reste gérable. Une attention continue est recommandée.</p>
                </div>
              )}
              
              {tensionLevel === 'low' && (
                <div className="bg-green-100 p-4 rounded-md border border-green-300 text-green-800">
                  <h4 className="font-bold">Situation Stable</h4>
                  <p>L'économie fonctionne bien, la population est globalement satisfaite. Continuez vos politiques actuelles.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="adjustment" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Équilibre Économique</span>
                  <span className="font-semibold">{economieValue}%</span>
                </div>
                <Slider
                  value={[economieValue]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(values) => setEconomieValue(values[0])}
                />
                <p className="text-sm text-muted-foreground">
                  {economieValue < 25 && "L'économie est en crise profonde, risque d'effondrement imminent."}
                  {economieValue >= 25 && economieValue < 50 && "L'économie est fragile avec des problèmes structurels sérieux."}
                  {economieValue >= 50 && economieValue < 75 && "L'économie est stable mais avec quelques points de vulnérabilité."}
                  {economieValue >= 75 && "L'économie est prospère et solide."}
                </p>
              </div>
              
              <Button onClick={handleUpdateEconomie}>
                Appliquer les Changements
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
