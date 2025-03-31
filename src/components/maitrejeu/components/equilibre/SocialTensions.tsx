
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from '../../context';
import { getEconomicStability } from '../../utils/equilibreAdapter';

export const SocialTensions = () => {
  const { equilibre, updateEquilibre } = useMaitreJeu();
  const [activeTab, setActiveTab] = useState('patriciens');
  
  // Get a single value for economy to simplify comparisons
  const economyValue = getEconomicStability(equilibre);
  
  // Calculate tension levels
  const patricienTension = calculatePatricienTension(equilibre);
  const plebeienTension = calculatePlebeienTension(equilibre);
  const esclaveTension = calculateEsclaveTension(equilibre);
  
  // Helper to render tension level
  const renderTensionLevel = (tension: number) => {
    if (tension < 20) return { color: 'bg-green-100 text-green-800', label: 'Calme' };
    if (tension < 40) return { color: 'bg-blue-100 text-blue-800', label: 'Stable' };
    if (tension < 60) return { color: 'bg-yellow-100 text-yellow-800', label: 'Inquiet' };
    if (tension < 80) return { color: 'bg-orange-100 text-orange-800', label: 'Tendu' };
    return { color: 'bg-red-100 text-red-800', label: 'Révolte imminente' };
  };
  
  // Handle updates to social values
  const handlePatricienChange = (value: number[]) => {
    updateEquilibre({
      social: {
        ...equilibre.social,
        patriciens: value[0]
      },
      patriciens: value[0]
    });
  };
  
  const handlePlebeienChange = (value: number[]) => {
    updateEquilibre({
      social: {
        ...equilibre.social,
        plebeiens: value[0],
        plébéiens: value[0]
      },
      plébéiens: value[0]
    });
  };
  
  const handleEsclaveChange = (value: number[]) => {
    updateEquilibre({
      social: {
        ...equilibre.social,
        esclaves: value[0]
      }
    });
  };
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Tensions sociales</span>
          <Badge variant="outline" className="ml-2">Impact: Fort</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="patriciens">Patriciens</TabsTrigger>
            <TabsTrigger value="plebeiens">Plébéiens</TabsTrigger>
            <TabsTrigger value="esclaves">Esclaves</TabsTrigger>
          </TabsList>
          
          <TabsContent value="patriciens" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Satisfaction des patriciens</h3>
                <p className="text-sm text-muted-foreground">Le niveau de contentement des familles patriciennes</p>
              </div>
              <Badge className={renderTensionLevel(patricienTension).color}>
                {renderTensionLevel(patricienTension).label}
              </Badge>
            </div>
            
            <Slider
              value={[equilibre.social.patriciens]}
              min={0}
              max={100}
              step={1}
              onValueChange={handlePatricienChange}
            />
            
            <div className="rounded-lg bg-muted p-3 text-sm space-y-2">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span className="font-medium">Facteurs d'influence:</span>
              </div>
              <ul className="space-y-1 pl-6">
                <li className="flex items-center justify-between">
                  <span>Économie:</span> 
                  <div className="flex items-center">
                    {economyValue < 40 ? (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    )}
                    <span className="ml-1">{economyValue}</span>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span>Lois récentes:</span>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="ml-1">+5</span>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span>Équilibre politique:</span>
                  <div className="flex items-center">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="ml-1">-3</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center mt-2"
            >
              <span>Voir détails</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </TabsContent>
          
          <TabsContent value="plebeiens" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Satisfaction des plébéiens</h3>
                <p className="text-sm text-muted-foreground">Le niveau de contentement de la plèbe romaine</p>
              </div>
              <Badge className={renderTensionLevel(plebeienTension).color}>
                {renderTensionLevel(plebeienTension).label}
              </Badge>
            </div>
            
            <Slider
              value={[equilibre.social.plebeiens]}
              min={0}
              max={100}
              step={1}
              onValueChange={handlePlebeienChange}
            />
            
            <div className="rounded-lg bg-muted p-3 text-sm space-y-2">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span className="font-medium">Facteurs d'influence:</span>
              </div>
              <ul className="space-y-1 pl-6">
                <li className="flex items-center justify-between">
                  <span>Prix des céréales:</span> 
                  <div className="flex items-center">
                    {economyValue < 40 ? (
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    )}
                    <span className="ml-1">{economyValue < 40 ? 'Bas' : 'Élevé'}</span>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span>Jeux récents:</span>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="ml-1">+8</span>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span>Populares:</span>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="ml-1">{equilibre.populaires || equilibre.populares}</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center mt-2"
            >
              <span>Voir détails</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </TabsContent>
          
          <TabsContent value="esclaves" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Contrôle des esclaves</h3>
                <p className="text-sm text-muted-foreground">Le niveau de contrôle sur la population servile</p>
              </div>
              <Badge className={renderTensionLevel(esclaveTension).color}>
                {renderTensionLevel(esclaveTension).label}
              </Badge>
            </div>
            
            <Slider
              value={[equilibre.social.esclaves]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleEsclaveChange}
            />
            
            <div className="rounded-lg bg-muted p-3 text-sm space-y-2">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span className="font-medium">Facteurs d'influence:</span>
              </div>
              <ul className="space-y-1 pl-6">
                <li className="flex items-center justify-between">
                  <span>Sévérité des lois:</span> 
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="ml-1">70</span>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span>Révoltes récentes:</span>
                  <div className="flex items-center">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="ml-1">-7</span>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span>Prix du marché:</span>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="ml-1">+4</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center mt-2"
            >
              <span>Voir détails</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Calculate tension for patricians
function calculatePatricienTension(equilibre: any): number {
  // Lower patricien value means higher tension
  const baseTension = 100 - (equilibre.social?.patriciens || 50);
  
  // Economic factors influence patricians strongly
  const economyValue = getEconomicStability(equilibre);
  let tension = baseTension;
  
  if (economyValue < 30) tension += 20;
  if (economyValue < 50) tension += 10;
  
  // Optimates faction strength reduces tension
  if ((equilibre.optimates || 0) > 50) tension -= 10;
  
  return Math.max(0, Math.min(100, tension));
}

// Calculate tension for plebeians
function calculatePlebeienTension(equilibre: any): number {
  // Lower plebeien value means higher tension
  const baseTension = 100 - (equilibre.social?.plebeiens || 50);
  
  // Economic factors influence plebeians more than anything
  const economyValue = getEconomicStability(equilibre);
  let tension = baseTension;
  
  if (economyValue < 30) tension += 25;
  if (economyValue < 50) tension += 15;
  
  // Populares faction strength reduces tension
  if ((equilibre.populaires || equilibre.populares || 0) > 50) tension -= 15;
  
  return Math.max(0, Math.min(100, tension));
}

// Calculate tension for slaves
function calculateEsclaveTension(equilibre: any): number {
  // Lower esclaves value means higher tension
  const baseTension = 100 - (equilibre.social?.esclaves || 50);
  
  // Military strength reduces slave tension
  const militaryStrength = 
    (equilibre.militaire?.effectifs || 50) + (equilibre.militaire?.discipline || 50) / 2;
  
  let tension = baseTension;
  
  if (militaryStrength < 40) tension += 20;
  
  // Economic hardship increases slave tension
  const economyValue = getEconomicStability(equilibre);
  if (economyValue < 40) tension += 15;
  
  return Math.max(0, Math.min(100, tension));
}
