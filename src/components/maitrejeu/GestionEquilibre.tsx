
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Scale, RefreshCw, TrendingUp, TrendingDown, ArrowRightLeft, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatMoney, formatSignedMoney, formatSignedPercent } from '@/utils/formatUtils';
import { AlertMessage } from '@/components/ui-custom/AlertMessage';
import { StatBox } from '@/components/ui-custom/StatBox';

export const GestionEquilibre: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('economic');
  const { toast } = useToast();

  const handleSaveBalancing = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Les ajustements d'équilibrage ont été appliqués",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="economic" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="economic" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Économie
          </TabsTrigger>
          <TabsTrigger value="political" className="flex items-center gap-1">
            <ArrowRightLeft className="h-4 w-4" />
            Politique
          </TabsTrigger>
          <TabsTrigger value="military" className="flex items-center gap-1">
            <TrendingDown className="h-4 w-4" />
            Militaire
          </TabsTrigger>
        </TabsList>

        {/* Économie */}
        <TabsContent value="economic" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatBox
              title="Prix des céréales"
              value="120 As"
              description="Par modius"
              trend="up"
              trendValue="15%"
            />
            
            <StatBox
              title="Impôts collectés"
              value="1.2M As"
              description="Dernier trimestre"
              trend="neutral"
              trendValue="2%"
            />
            
            <StatBox
              title="Déficit public"
              value="450K As"
              description="Tendance annuelle"
              trend="down"
              trendValue="8%"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-5 rounded-md border border-rome-gold/30">
              <h3 className="font-cinzel text-lg mb-4">Ajustement des prix</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="grain-price">Prix des céréales</Label>
                    <span className="text-sm font-medium">120 As</span>
                  </div>
                  <Slider defaultValue={[120]} max={250} min={50} step={5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50 As</span>
                    <span>250 As</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="luxury-price">Prix des biens de luxe</Label>
                    <span className="text-sm font-medium">1,500 As</span>
                  </div>
                  <Slider defaultValue={[1500]} max={3000} min={500} step={100} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>500 As</span>
                    <span>3,000 As</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="land-value">Valeur des terres</Label>
                    <span className="text-sm font-medium">5,000 As/jugère</span>
                  </div>
                  <Slider defaultValue={[5000]} max={10000} min={1000} step={500} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1,000 As</span>
                    <span>10,000 As</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-md border border-rome-gold/30">
              <h3 className="font-cinzel text-lg mb-4">Taux d'imposition</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="tributum">Tributum (impôt sur le patrimoine)</Label>
                    <span className="text-sm font-medium">3%</span>
                  </div>
                  <Slider defaultValue={[3]} max={10} min={1} step={0.5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1%</span>
                    <span>10%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="portorium">Portorium (douanes)</Label>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                  <Slider defaultValue={[5]} max={15} min={2} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>2%</span>
                    <span>15%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="vicesima">Vicesima libertatis (affranchissement)</Label>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                  <Slider defaultValue={[5]} max={10} min={1} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1%</span>
                    <span>10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Politique */}
        <TabsContent value="political" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatBox
              title="Stabilité du Sénat"
              value="68%"
              description="Consensus politique"
              trend="down"
              trendValue="7%"
            />
            
            <StatBox
              title="Popularité du Consul"
              value="72%"
              description="Auprès du peuple"
              trend="up"
              trendValue="5%"
            />
            
            <StatBox
              title="Équilibre des factions"
              value="3:2:1"
              description="Populares:Optimates:Neutres"
              trend="neutral"
              trendValue="stable"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-5 rounded-md border border-rome-gold/30">
              <h3 className="font-cinzel text-lg mb-4">Influence des factions</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="populares">Influence des Populares</Label>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Slider defaultValue={[45]} max={80} min={20} step={5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Faible (20%)</span>
                    <span>Dominante (80%)</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="optimates">Influence des Optimates</Label>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <Slider defaultValue={[35]} max={80} min={20} step={5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Faible (20%)</span>
                    <span>Dominante (80%)</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="neutrals">Influence des Modérés</Label>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <Slider defaultValue={[20]} max={50} min={5} step={5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Minoritaire (5%)</span>
                    <span>Équilibrée (50%)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-md border border-rome-gold/30">
              <h3 className="font-cinzel text-lg mb-4">Équilibre des pouvoirs</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="senate-power">Pouvoir du Sénat</Label>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Slider defaultValue={[65]} max={90} min={30} step={5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Faible</span>
                    <span>Absolu</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="tribunes-power">Pouvoir des Tribuns</Label>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <Slider defaultValue={[40]} max={70} min={10} step={5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Symbolique</span>
                    <span>Prépondérant</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="equites-influence">Influence des Chevaliers</Label>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <Slider defaultValue={[35]} max={60} min={10} step={5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Marginale</span>
                    <span>Décisive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Militaire */}
        <TabsContent value="military" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatBox
              title="Force militaire"
              value="8 légions"
              description="Effectifs actifs"
              trend="up"
              trendValue="+1"
            />
            
            <StatBox
              title="Budget militaire"
              value="2.4M As"
              description="Annuel"
              trend="up"
              trendValue="12%"
            />
            
            <StatBox
              title="Victoires militaires"
              value="3"
              description="Année en cours"
              trend="neutral"
              trendValue="=0"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-5 rounded-md border border-rome-gold/30">
              <h3 className="font-cinzel text-lg mb-4">Forces militaires</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="legions-number">Nombre de légions</Label>
                    <span className="text-sm font-medium">8</span>
                  </div>
                  <Slider defaultValue={[8]} max={15} min={4} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>4 légions</span>
                    <span>15 légions</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="auxiliaries">Troupes auxiliaires</Label>
                    <span className="text-sm font-medium">15,000 hommes</span>
                  </div>
                  <Slider defaultValue={[15]} max={30} min={5} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5,000</span>
                    <span>30,000</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="naval-power">Puissance navale</Label>
                    <span className="text-sm font-medium">120 navires</span>
                  </div>
                  <Slider defaultValue={[120]} max={200} min={50} step={10} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50 navires</span>
                    <span>200 navires</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-md border border-rome-gold/30">
              <h3 className="font-cinzel text-lg mb-4">Difficultés des campagnes</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-difficulty">Difficulté moyenne</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la difficulté" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very-easy">Très facile</SelectItem>
                      <SelectItem value="easy">Facile</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="hard">Difficile</SelectItem>
                      <SelectItem value="very-hard">Très difficile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="enemy-strength">Force des ennemis</Label>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Slider defaultValue={[65]} max={100} min={30} step={5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Faible</span>
                    <span>Maximale</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="triumph-threshold">Seuil de triomphe</Label>
                    <span className="text-sm font-medium">5,000 ennemis</span>
                  </div>
                  <Slider defaultValue={[5]} max={10} min={1} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1,000</span>
                    <span>10,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-4 border-t border-muted">
        <Button 
          className="gap-2"
          onClick={handleSaveBalancing}
        >
          <Save className="h-4 w-4" />
          Enregistrer les ajustements
        </Button>
      </div>

      <AlertMessage
        type="warning"
        title="Impact sur l'équilibre du jeu"
        message="Ces ajustements peuvent avoir un impact significatif sur l'expérience des joueurs. Utilisez-les avec précaution."
      />
    </div>
  );
};
