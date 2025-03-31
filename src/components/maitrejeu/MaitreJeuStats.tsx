
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Activity, 
  Users, 
  BookOpen, 
  Star, 
  Map, 
  Banknote, 
  Scale, 
  Landmark, 
  TrendingUp, 
  Medal,
  Award
} from 'lucide-react';
import { useMaitreJeu } from './context';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LoiState } from './types/loisTypes';

export const MaitreJeuStats: React.FC = () => {
  const { 
    senateurs, 
    provinces, 
    lois, 
    equilibre, 
    treasury,
    economicFactors
  } = useMaitreJeu();
  
  // Statistiques calculées
  const statisticsEquilibre = {
    politique: {
      populaires: equilibre.politique.populaires || 0,
      optimates: equilibre.politique.optimates || 0,
      moderates: equilibre.politique.moderates || 0
    },
    social: { 
      patriciens: equilibre.social?.patriciens || 0, 
      plebeiens: equilibre.social?.plebeiens || 0 
    },
    economie: equilibre.economie || {
      stabilite: 0,
      croissance: 0,
      commerce: 0,
      agriculture: 0
    },
    militaire: equilibre.militaire || {
      moral: 0,
      discipline: 0,
      effectifs: 0,
      equipement: 0,
      puissance: 0 // Added this field
    },
    religion: equilibre.religion || {
      piete: 0,
      traditions: 0,
      superstition: 0
    }
  };
  
  // Données simplifiées pour les graphiques
  const senateursByFaction = [
    { name: 'Populares', value: statisticsEquilibre.politique.populaires },
    { name: 'Optimates', value: statisticsEquilibre.politique.optimates },
    { name: 'Modérés', value: statisticsEquilibre.politique.moderates }
  ];
  
  // Tendances économiques fictives sur 6 mois
  const economicTrends = [
    { month: 'Jan', balance: 15000, income: 25000, expenses: 10000 },
    { month: 'Fév', balance: 20000, income: 28000, expenses: 8000 },
    { month: 'Mar', balance: 18000, income: 22000, expenses: 4000 },
    { month: 'Avr', balance: 25000, income: 32000, expenses: 7000 },
    { month: 'Mai', balance: 22000, income: 29000, expenses: 7000 },
    { month: 'Jun', balance: 30000, income: 38000, expenses: 8000 }
  ];
  
  // Fonction pour déterminer la santé économique
  const getEconomicHealth = () => {
    // Simplification pour la démo
    const economicScore = 75;  // score sur 100
    
    if (economicScore >= 80) return { text: 'Excellente', color: 'text-green-500' };
    if (economicScore >= 60) return { text: 'Bonne', color: 'text-emerald-500' };
    if (economicScore >= 40) return { text: 'Stable', color: 'text-blue-500' };
    if (economicScore >= 20) return { text: 'Préoccupante', color: 'text-amber-500' };
    return { text: 'Critique', color: 'text-red-500' };
  };
  
  // Fonction pour déterminer la santé politique
  const getPoliticalStability = () => {
    const politicalScore = Math.floor(
      (statisticsEquilibre.politique.moderates * 100) / 
      (statisticsEquilibre.politique.populaires + 
       statisticsEquilibre.politique.optimates + 
       statisticsEquilibre.politique.moderates)
    );
    
    if (politicalScore >= 40) return { text: 'Stable', color: 'text-green-500' };
    if (politicalScore >= 25) return { text: 'Tendue', color: 'text-amber-500' };
    return { text: 'Instable', color: 'text-red-500' };
  };
  
  // Fonction pour déterminer la puissance militaire
  const getMilitaryPower = () => {
    // Simplification pour la démo
    const militaryScore = 82;  // score sur 100
    
    if (militaryScore >= 80) return { text: 'Supérieure', color: 'text-green-500' };
    if (militaryScore >= 60) return { text: 'Forte', color: 'text-emerald-500' };
    if (militaryScore >= 40) return { text: 'Adéquate', color: 'text-blue-500' };
    if (militaryScore >= 20) return { text: 'Faible', color: 'text-amber-500' };
    return { text: 'Critique', color: 'text-red-500' };
  };
  
  // Stats calculées
  const economicHealth = getEconomicHealth();
  const politicalStability = getPoliticalStability();
  const militaryPower = getMilitaryPower();
  
  // Calculer le nombre de projets de loi en attente
  const pendingLaws = lois.filter(law => 
    law.état === LoiState.PROPOSAL || 
    law.état === LoiState.PROPOSEE || 
    law.état === 'proposed' || 
    law.état === 'proposée').length;
  
  // Calculer le nombre total de provinces
  const totalProvinces = provinces.length;
  
  // Calculer le nombre total de sénateurs
  const totalSenators = senateurs.length;
  
  // Afficher les composants économiques structurés correctement
  const renderEconomicIndicator = (label: string, value: number) => (
    <div className="flex justify-between mb-1">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
  );

  // Helper function to safely access economie object fields
  const getEconomieValue = (field: keyof typeof statisticsEquilibre.economie) => {
    const economie = statisticsEquilibre.economie;
    if (typeof economie === 'object' && economie !== null) {
      return economie[field];
    }
    return 0;
  };

  // Helper function to safely access religion object fields
  const getReligionValue = (field: keyof typeof statisticsEquilibre.religion) => {
    const religion = statisticsEquilibre.religion;
    if (typeof religion === 'object' && religion !== null) {
      return religion[field];
    }
    return 0;
  };

  // Helper function to safely access militaire object fields
  const getMilitaireValue = (field: keyof typeof statisticsEquilibre.militaire) => {
    const militaire = statisticsEquilibre.militaire;
    if (typeof militaire === 'object' && militaire !== null) {
      return militaire[field];
    }
    return 0;
  };
  
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold tracking-tight">Statistiques globales</h1>
      
      {/* Cartes principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Santé Économique</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${economicHealth.color}`}>
              {economicHealth.text}
            </div>
            <p className="text-xs text-muted-foreground">
              Balance: {treasury.balance.toLocaleString()} As
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Stabilité Politique</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${politicalStability.color}`}>
              {politicalStability.text}
            </div>
            <p className="text-xs text-muted-foreground">
              {pendingLaws} lois en attente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Puissance Militaire</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${militaryPower.color}`}>
              {militaryPower.text}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.floor((getMilitaireValue('effectifs')) * 1000)} hommes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Provinces</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalProvinces}
            </div>
            <p className="text-xs text-muted-foreground">
              {provinces.filter(p => p.status === 'pacifiée').length} pacifiées
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Graphique d'évolution économique */}
      <Card>
        <CardHeader>
          <CardTitle>Évolution économique</CardTitle>
          <CardDescription>
            Progression du trésor public sur les 6 derniers mois
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={economicTrends}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value.toLocaleString()} As`, undefined]}
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }}
                  name="Balance"
                />
                <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Revenus" />
                <Line type="monotone" dataKey="expenses" stroke="#ff7300" name="Dépenses" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats détaillées */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Équilibre Politique</CardTitle>
            <CardDescription>
              Distribution des factions politiques
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>Populares</div>
                <div className="font-medium">{Math.round(statisticsEquilibre.politique.populaires * 100)}%</div>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div 
                  className="h-full bg-red-500 rounded" 
                  style={{ width: `${statisticsEquilibre.politique.populaires * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between">
                <div>Optimates</div>
                <div className="font-medium">{Math.round(statisticsEquilibre.politique.optimates * 100)}%</div>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div 
                  className="h-full bg-blue-500 rounded" 
                  style={{ width: `${statisticsEquilibre.politique.optimates * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between">
                <div>Modérés</div>
                <div className="font-medium">{Math.round(statisticsEquilibre.politique.moderates * 100)}%</div>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div 
                  className="h-full bg-green-500 rounded" 
                  style={{ width: `${statisticsEquilibre.politique.moderates * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Équilibre Religieux</CardTitle>
            <CardDescription>
              Mesures de la religiosité romaine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>Piété</div>
                <div className="font-medium">{getReligionValue('piete').toFixed(1)}</div>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div 
                  className="h-full bg-purple-500 rounded" 
                  style={{ width: `${(getReligionValue('piete') / 10) * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between">
                <div>Traditions</div>
                <div className="font-medium">{getReligionValue('traditions').toFixed(1)}</div>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div 
                  className="h-full bg-amber-500 rounded" 
                  style={{ width: `${(getReligionValue('traditions') / 10) * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between">
                <div>Superstition</div>
                <div className="font-medium">{getReligionValue('superstition').toFixed(1)}</div>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div 
                  className="h-full bg-indigo-500 rounded" 
                  style={{ width: `${(getReligionValue('superstition') / 10) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
