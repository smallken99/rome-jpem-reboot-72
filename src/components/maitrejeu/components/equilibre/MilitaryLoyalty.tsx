
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Equilibre } from '../../types/equilibre';

interface MilitaryLoyaltyProps {
  equilibreData: Equilibre;
  onMilitaryAction: (action: string) => void;
}

// Générer des données factices pour les graphiques historiques
const generateHistoricalData = (dataPoints: number, startValue: number, variability: number) => {
  const result = [];
  let currentValue = startValue;
  
  for (let i = 0; i < dataPoints; i++) {
    const change = (Math.random() - 0.5) * variability;
    currentValue = Math.max(10, Math.min(95, currentValue + change));
    
    result.push({
      month: i,
      value: Math.round(currentValue)
    });
  }
  
  return result;
};

const historicalArmyLoyalty = generateHistoricalData(12, 75, 8);
const historicalArmyMorale = generateHistoricalData(12, 68, 12);
const historicalArmyReadiness = generateHistoricalData(12, 82, 5);

// Fonction utilitaire pour déterminer le statut basé sur une valeur
const getStatusInfo = (value: number) => {
  if (value >= 80) {
    return { label: 'Excellent', color: 'bg-green-500' };
  } else if (value >= 65) {
    return { label: 'Bon', color: 'bg-emerald-500' };
  } else if (value >= 50) {
    return { label: 'Moyen', color: 'bg-yellow-500' };
  } else if (value >= 35) {
    return { label: 'Faible', color: 'bg-orange-500' };
  } else {
    return { label: 'Critique', color: 'bg-red-500' };
  }
};

export const MilitaryLoyalty: React.FC<MilitaryLoyaltyProps> = ({ equilibreData, onMilitaryAction }) => {
  const armyValue = equilibreData.armée || equilibreData.facteurMilitaire || 50;
  const moraleValue = equilibreData.morale || 50;
  const loyaltyValue = equilibreData.loyauté || 50;
  
  const armyStatus = getStatusInfo(armyValue);
  const moraleStatus = getStatusInfo(moraleValue);
  const loyaltyStatus = getStatusInfo(loyaltyValue);
  
  // Textes descriptifs selon les valeurs actuelles
  const getMilitaryDescription = () => {
    if (armyValue >= 75) {
      return "Les légions romaines sont dans un état exemplaire, équipées et prêtes au combat.";
    } else if (armyValue >= 50) {
      return "L'armée romaine est en condition acceptable, mais certaines unités manquent d'équipement ou d'entraînement.";
    } else {
      return "Les légions sont en mauvais état, manquant cruellement d'équipement et de discipline.";
    }
  };
  
  const getMoraleDescription = () => {
    if (moraleValue >= 75) {
      return "Le moral des troupes est élevé. Les légionnaires sont fiers de servir Rome.";
    } else if (moraleValue >= 50) {
      return "Le moral des troupes est correct, mais pourrait être amélioré.";
    } else {
      return "Le moral des troupes est au plus bas. Des désertions sont à craindre.";
    }
  };
  
  const getLoyaltyDescription = () => {
    if (loyaltyValue >= 75) {
      return "Les légions sont fidèles à la République et au Sénat.";
    } else if (loyaltyValue >= 50) {
      return "La loyauté des légions est fragile. Certains généraux pourraient l'emporter sur le Sénat.";
    } else {
      return "La loyauté des légions est envers leurs généraux, pas envers Rome. La République est en danger.";
    }
  };
  
  // Actions possibles selon l'état actuel
  const getPossibleActions = () => {
    const actions = [];
    
    if (armyValue < 70) {
      actions.push({
        id: "increase_funding",
        label: "Augmenter le financement militaire",
        description: "Allouer plus de fonds aux légions (+10 à l'état de l'armée)"
      });
    }
    
    if (moraleValue < 70) {
      actions.push({
        id: "victory_parade",
        label: "Organiser un triomphe",
        description: "Célébrer les victoires récentes pour remonter le moral (+15 au moral)"
      });
    }
    
    if (loyaltyValue < 70) {
      actions.push({
        id: "oath_senate",
        label: "Faire prêter serment au Sénat",
        description: "Exiger un nouveau serment d'allégeance au Sénat (+10 à la loyauté)"
      });
    }
    
    // Toujours disponibles
    actions.push({
      id: "training_program",
      label: "Programme d'entraînement",
      description: "Améliorer l'entraînement des légions (+5 à l'état de l'armée, +5 au moral)"
    });
    
    actions.push({
      id: "rotate_commanders",
      label: "Rotation des commandements",
      description: "Eviter les liens trop forts entre légions et généraux (+8 à la loyauté, -3 au moral)"
    });
    
    return actions;
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Forces Militaires</CardTitle>
        <CardDescription>
          État, moral et loyauté des légions romaines
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="summary">
        <TabsList className="mx-6 mb-2">
          <TabsTrigger value="summary">Résumé</TabsTrigger>
          <TabsTrigger value="trends">Tendances</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">État des légions</h3>
                <Badge className={armyStatus.color}>{armyStatus.label}</Badge>
              </div>
              <div className="mt-2 text-2xl font-bold">{armyValue}%</div>
              <p className="text-sm text-muted-foreground mt-2">{getMilitaryDescription()}</p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Moral des troupes</h3>
                <Badge className={moraleStatus.color}>{moraleStatus.label}</Badge>
              </div>
              <div className="mt-2 text-2xl font-bold">{moraleValue}%</div>
              <p className="text-sm text-muted-foreground mt-2">{getMoraleDescription()}</p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Loyauté envers Rome</h3>
                <Badge className={loyaltyStatus.color}>{loyaltyStatus.label}</Badge>
              </div>
              <div className="mt-2 text-2xl font-bold">{loyaltyValue}%</div>
              <p className="text-sm text-muted-foreground mt-2">{getLoyaltyDescription()}</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="px-6 pb-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">État des légions (12 derniers mois)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalArmyReadiness}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="État" stroke="#3b82f6" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Moral des troupes (12 derniers mois)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalArmyMorale}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Moral" stroke="#10b981" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Loyauté envers Rome (12 derniers mois)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalArmyLoyalty}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Loyauté" stroke="#f59e0b" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="actions" className="px-6 pb-6">
          <div className="space-y-4">
            {getPossibleActions().map(action => (
              <div key={action.id} className="border rounded-lg p-4">
                <h3 className="font-medium">{action.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onMilitaryAction(action.id)}
                  className="mt-3"
                >
                  Exécuter
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
