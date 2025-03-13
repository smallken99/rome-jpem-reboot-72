
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Building, 
  GalleryVerticalEnd, 
  BarChart3,
  TrendingUp, 
  Scale, 
  History
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/formatUtils';

interface MaitreJeuStatsProps {}

interface SenateurJouable {
  id: string;
  nom: string;
  age: number;
  influence: number;
  statut: string;
  famille: string;
}

// Données mockées pour les statistiques
const sénateurs: SenateurJouable[] = [
  { id: '1', nom: 'Marcus Caelius', age: 32, influence: 55, statut: 'actif', famille: 'Caelii' },
  { id: '2', nom: 'Lucius Cornelius', age: 47, influence: 78, statut: 'actif', famille: 'Cornelii' },
  { id: '3', nom: 'Gaius Julius', age: 39, influence: 65, statut: 'actif', famille: 'Julii' },
  { id: '4', nom: 'Quintus Fabius', age: 51, influence: 82, statut: 'actif', famille: 'Fabii' },
  { id: '5', nom: 'Publius Licinius', age: 43, influence: 61, statut: 'actif', famille: 'Licinii' }
];

const budgetData = [
  { name: 'Dépenses Militaires', valeur: 250000 },
  { name: 'Administration', valeur: 120000 },
  { name: 'Travaux Publics', valeur: 180000 },
  { name: 'Jeux et Festivals', valeur: 90000 },
  { name: 'Approvisionnement', valeur: 110000 }
];

const influenceData = [
  { famille: 'Cornelii', influence: 82 },
  { famille: 'Julii', influence: 75 },
  { famille: 'Fabii', influence: 68 },
  { famille: 'Aemilii', influence: 61 },
  { famille: 'Claudii', influence: 57 }
];

export const MaitreJeuStats: React.FC<MaitreJeuStatsProps> = () => {
  const [activeTab, setActiveTab] = useState('budget');
  
  const totalSenateurs = sénateurs.length;
  const senateurActifs = sénateurs.filter(s => s.statut === 'actif').length;
  const influenceMoyenne = Math.round(sénateurs.reduce((acc, s) => acc + s.influence, 0) / totalSenateurs);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Statistiques de la République</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sénateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSenateurs}</div>
            <p className="text-sm text-muted-foreground">
              {senateurActifs} actifs ({Math.round((senateurActifs/totalSenateurs)*100)}%)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Influence Moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{influenceMoyenne}/100</div>
            <p className="text-sm text-muted-foreground">
              Top: {Math.max(...sénateurs.map(s => s.influence))}/100
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trésor Public</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(875000)}</div>
            <p className="text-sm text-muted-foreground">
              +{formatCurrency(25000)} ce mois
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lois Actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">37</div>
            <p className="text-sm text-muted-foreground">
              5 en débat
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Analyse Détaillée</CardTitle>
          <CardDescription>Statistiques diverses sur l'état de la République</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="budget" className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                <span>Budget</span>
              </TabsTrigger>
              <TabsTrigger value="influence" className="flex items-center">
                <Scale className="h-4 w-4 mr-2" />
                <span>Influence</span>
              </TabsTrigger>
              <TabsTrigger value="activites" className="flex items-center">
                <History className="h-4 w-4 mr-2" />
                <span>Activités</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="budget">
              <h3 className="text-lg font-medium mb-4">Répartition du Budget</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={budgetData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => formatCurrency(value).split(' ')[0]} />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Bar dataKey="valeur" fill="#8884d8" name="Montant" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="influence">
              <h3 className="text-lg font-medium mb-4">Influence des Familles</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={influenceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="famille" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="influence" fill="#82ca9d" name="Influence" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="activites">
              <h3 className="text-lg font-medium mb-4">Activités Récentes</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="font-medium">Vote d'une nouvelle loi</div>
                  <div className="text-sm text-muted-foreground">Lex Manlia de vicesima a été promulguée</div>
                  <div className="text-xs text-muted-foreground mt-1">Il y a 3 jours</div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="font-medium">Élection de magistrats</div>
                  <div className="text-sm text-muted-foreground">Quintus Fabius a été élu consul</div>
                  <div className="text-xs text-muted-foreground mt-1">Il y a 7 jours</div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="font-medium">Changement de gouverneur</div>
                  <div className="text-sm text-muted-foreground">Gaius Julius a été nommé gouverneur de Sicile</div>
                  <div className="text-xs text-muted-foreground mt-1">Il y a 12 jours</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Démographie</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Population</div>
                  <div className="text-xl font-semibold">~950,000</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Citoyens</div>
                  <div className="text-xl font-semibold">~120,000</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Patriciens</div>
                  <div className="text-xl font-semibold">~2,500</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Esclaves</div>
                  <div className="text-xl font-semibold">~300,000</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              <span>Provinces</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Provinces</div>
                  <div className="text-xl font-semibold">9</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Revenus</div>
                  <div className="text-xl font-semibold">{formatCurrency(450000)}/an</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Légions</div>
                  <div className="text-xl font-semibold">14</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Stabilité</div>
                  <div className="text-xl font-semibold">72%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
