
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronUp, Save, RefreshCw } from 'lucide-react';
import { 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Equilibre } from '@/components/maitrejeu/types/equilibre';

interface MilitaryLoyaltyProps {
  equilibre: Equilibre;
  onUpdate: (armee: number, loyaute: number, morale: number) => void;
}

interface MilitaryHistory {
  month: string;
  armee: number;
  loyaute: number;
  morale: number;
}

const militaryHistory: MilitaryHistory[] = [
  { month: 'Jan', armee: 65, loyaute: 80, morale: 70 },
  { month: 'Feb', armee: 68, loyaute: 82, morale: 75 },
  { month: 'Mar', armee: 72, loyaute: 78, morale: 72 },
  { month: 'Apr', armee: 75, loyaute: 75, morale: 68 },
  { month: 'May', armee: 70, loyaute: 77, morale: 72 },
  { month: 'Jun', armee: 68, loyaute: 80, morale: 78 },
];

const factorThresholds = {
  danger: 30,
  warning: 50,
  good: 70,
  excellent: 90
};

export const MilitaryLoyalty: React.FC<MilitaryLoyaltyProps> = ({ equilibre, onUpdate }) => {
  const [armee, setArmee] = useState(equilibre.armée || 50);
  const [loyaute, setLoyaute] = useState(equilibre.loyauté || 50);
  const [morale, setMorale] = useState(equilibre.morale || 50);
  const [activeTab, setActiveTab] = useState('vue-generale');
  
  const getStatusColor = (value: number) => {
    if (value < factorThresholds.danger) return 'text-red-500';
    if (value < factorThresholds.warning) return 'text-amber-500';
    if (value < factorThresholds.good) return 'text-blue-500';
    if (value < factorThresholds.excellent) return 'text-emerald-500';
    return 'text-purple-500';
  };
  
  const getStatusText = (value: number) => {
    if (value < factorThresholds.danger) return 'Critique';
    if (value < factorThresholds.warning) return 'Inquiétant';
    if (value < factorThresholds.good) return 'Stable';
    if (value < factorThresholds.excellent) return 'Solide';
    return 'Excellent';
  };
  
  const getProgressColor = (value: number) => {
    if (value < factorThresholds.danger) return 'bg-red-500';
    if (value < factorThresholds.warning) return 'bg-amber-500';
    if (value < factorThresholds.good) return 'bg-blue-500';
    if (value < factorThresholds.excellent) return 'bg-emerald-500';
    return 'bg-purple-500';
  };
  
  const handleArmeePlus = () => {
    setArmee(prev => Math.min(prev + 5, 100));
  };
  
  const handleArmeeMinus = () => {
    setArmee(prev => Math.max(prev - 5, 0));
  };
  
  const handleLoyautePlus = () => {
    setLoyaute(prev => Math.min(prev + 5, 100));
  };
  
  const handleLoyauteMinus = () => {
    setLoyaute(prev => Math.max(prev - 5, 0));
  };
  
  const handleMoralePlus = () => {
    setMorale(prev => Math.min(prev + 5, 100));
  };
  
  const handleMoraleMinus = () => {
    setMorale(prev => Math.max(prev - 5, 0));
  };
  
  const handleSaveChanges = () => {
    onUpdate(armee, loyaute, morale);
  };
  
  const handleResetChanges = () => {
    setArmee(equilibre.armée || 50);
    setLoyaute(equilibre.loyauté || 50);
    setMorale(equilibre.morale || 50);
  };
  
  // Générer des recommandations basées sur l'état actuel
  const generateRecommendations = () => {
    const recommendations = [];
    
    if (armee < factorThresholds.warning) {
      recommendations.push("Augmentez le budget militaire pour renforcer les légions.");
      recommendations.push("Recrutez de nouveaux légionnaires dans les provinces.");
    }
    
    if (loyaute < factorThresholds.warning) {
      recommendations.push("Offrez des terres aux vétérans pour assurer leur loyauté.");
      recommendations.push("Nommez des commandants fidèles au Sénat.");
    }
    
    if (morale < factorThresholds.warning) {
      recommendations.push("Organisez des jeux militaires pour remonter le moral des troupes.");
      recommendations.push("Augmentez la solde des légionnaires.");
    }
    
    return recommendations.length > 0 ? recommendations : ["Aucune action urgente n'est requise. Les forces militaires sont en bon état."];
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Force militaire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={`font-medium ${getStatusColor(armee)}`}>{getStatusText(armee)}</span>
                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="sm" onClick={handleArmeeMinus} className="h-6 w-6 p-0">
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                  <span className="font-bold w-8 text-center">{armee}</span>
                  <Button variant="outline" size="sm" onClick={handleArmeePlus} className="h-6 w-6 p-0">
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Progress className={getProgressColor(armee)} value={armee} />
              <div className="text-xs text-muted-foreground">
                <p>Représente la force brute de vos légions, leur nombre et leur équipement.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Loyauté des généraux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={`font-medium ${getStatusColor(loyaute)}`}>{getStatusText(loyaute)}</span>
                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="sm" onClick={handleLoyauteMinus} className="h-6 w-6 p-0">
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                  <span className="font-bold w-8 text-center">{loyaute}</span>
                  <Button variant="outline" size="sm" onClick={handleLoyautePlus} className="h-6 w-6 p-0">
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Progress className={getProgressColor(loyaute)} value={loyaute} />
              <div className="text-xs text-muted-foreground">
                <p>Indique à quel point vos commandants et généraux sont fidèles au Sénat.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Moral des troupes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={`font-medium ${getStatusColor(morale)}`}>{getStatusText(morale)}</span>
                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="sm" onClick={handleMoraleMinus} className="h-6 w-6 p-0">
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                  <span className="font-bold w-8 text-center">{morale}</span>
                  <Button variant="outline" size="sm" onClick={handleMoralePlus} className="h-6 w-6 p-0">
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Progress className={getProgressColor(morale)} value={morale} />
              <div className="text-xs text-muted-foreground">
                <p>Reflète la motivation et l'état d'esprit des légionnaires.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={handleResetChanges} className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          Réinitialiser
        </Button>
        <Button size="sm" onClick={handleSaveChanges} className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          Sauvegarder
        </Button>
      </div>
      
      <Tabs defaultValue="vue-generale" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vue-generale">Vue générale</TabsTrigger>
          <TabsTrigger value="tendances">Tendances</TabsTrigger>
          <TabsTrigger value="recommandations">Recommandations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vue-generale">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Légions actives</Label>
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">{Math.floor(armee / 10)}</span>
                    <span className="text-muted-foreground">/{Math.floor(100 / 10)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Généraux influents</Label>
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">{Math.ceil(loyaute / 20)}</span>
                    <span className="text-muted-foreground">/{Math.ceil(100 / 20)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Efficacité en combat</Label>
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">{Math.floor((armee + morale) / 2)}%</span>
                    <span className="text-muted-foreground">/100%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Analyse de sécurité</h4>
                <p className="text-sm text-muted-foreground">
                  {armee < factorThresholds.warning ? 
                    "Les forces militaires de la République sont insuffisantes pour assurer sa sécurité. Un renforcement urgent est nécessaire." : 
                    loyaute < factorThresholds.warning ? 
                    "La loyauté des généraux est préoccupante. Des mesures doivent être prises pour éviter un possible coup d'État." :
                    "La situation militaire est stable. Les légions sont en nombre suffisant et les officiers restent loyaux au Sénat."}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tendances">
          <Card>
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={militaryHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="armee" stroke="#3b82f6" activeDot={{ r: 8 }} name="Force militaire" />
                  <Line type="monotone" dataKey="loyaute" stroke="#10b981" name="Loyauté" />
                  <Line type="monotone" dataKey="morale" stroke="#f59e0b" name="Moral" />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Évolution des facteurs militaires sur les 6 derniers mois.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommandations">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-4">Actions recommandées</h4>
              <ul className="space-y-2">
                {generateRecommendations().map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="rounded-full h-5 w-5 bg-primary flex items-center justify-center text-primary-foreground text-xs mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
