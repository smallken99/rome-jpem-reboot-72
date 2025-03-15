
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Download, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data
const mockRevenueData = [
  {
    id: 'rev-1',
    buildingId: '1',
    buildingName: 'Temple de Jupiter',
    year: 705,
    season: 'Hiems',
    amount: 1500,
    details: 'Offrandes et donations des citoyens',
    collected: true,
    collectedDate: { year: 705, season: 'Hiems', day: 60 }
  },
  {
    id: 'rev-2',
    buildingId: '2',
    buildingName: 'Thermes de Caracalla',
    year: 706,
    season: 'Ver',
    amount: 3000,
    details: 'Droits d\'entrée',
    collected: false,
    collectedDate: null
  },
  {
    id: 'rev-3',
    buildingId: '4',
    buildingName: 'Entrepôt du Port',
    year: 706,
    season: 'Ver',
    amount: 5000,
    details: 'Location d\'espaces de stockage',
    collected: false,
    collectedDate: null
  },
  {
    id: 'rev-4',
    buildingId: '5',
    buildingName: 'Amphithéâtre',
    year: 706,
    season: 'Ver',
    amount: 8000,
    details: 'Vente de billets pour les jeux',
    collected: false,
    collectedDate: null
  },
  {
    id: 'rev-5',
    buildingId: '1',
    buildingName: 'Temple de Jupiter',
    year: 706,
    season: 'Ver',
    amount: 2000,
    details: 'Offrandes et donations des citoyens',
    collected: false,
    collectedDate: null
  }
];

// Mock chart data
const chartData = [
  { name: 'Hiems 705', Temple: 1500, Thermes: 2800, Entrepot: 4500, Amphitheatre: 7000 },
  { name: 'Ver 706', Temple: 2000, Thermes: 3000, Entrepot: 5000, Amphitheatre: 8000 },
  { name: 'Aestas 706 (prév.)', Temple: 2500, Thermes: 4000, Entrepot: 5500, Amphitheatre: 10000 },
  { name: 'Autumnus 706 (prév.)', Temple: 3000, Thermes: 3500, Entrepot: 6000, Amphitheatre: 9000 },
  { name: 'Hiems 706 (prév.)', Temple: 1800, Thermes: 2500, Entrepot: 4000, Amphitheatre: 6000 },
];

interface BuildingRevenueProps {
  currentYear: number;
  currentSeason: string;
}

export const BuildingRevenue: React.FC<BuildingRevenueProps> = ({
  currentYear,
  currentSeason
}) => {
  const [revenues, setRevenues] = useState(mockRevenueData);
  const [seasonFilter, setSeasonFilter] = useState('all');
  const [collectedFilter, setCollectedFilter] = useState('all');

  const handleCollectRevenue = (id: string) => {
    setRevenues(prev => 
      prev.map(revenue => 
        revenue.id === id 
          ? { 
              ...revenue, 
              collected: true, 
              collectedDate: { year: currentYear, season: currentSeason, day: 1 }
            } 
          : revenue
      )
    );
    toast.success('Revenu collecté avec succès!');
  };

  const handleExportData = () => {
    toast.success('Export des données de revenus en cours...');
  };

  const totalExpectedRevenue = revenues
    .filter(r => r.year === currentYear && r.season === currentSeason)
    .reduce((sum, r) => sum + r.amount, 0);
  
  const totalCollectedRevenue = revenues
    .filter(r => r.year === currentYear && r.season === currentSeason && r.collected)
    .reduce((sum, r) => sum + r.amount, 0);

  const filteredRevenues = revenues.filter(revenue => {
    if (seasonFilter !== 'all') {
      const seasonYear = `${revenue.season}-${revenue.year}`;
      if (seasonFilter !== seasonYear) return false;
    }
    
    if (collectedFilter === 'collected' && !revenue.collected) return false;
    if (collectedFilter === 'pending' && revenue.collected) return false;
    
    return true;
  });

  // Get unique season-year combinations for filter
  const seasonOptions = Array.from(
    new Set(revenues.map(r => `${r.season}-${r.year}`))
  ).map(val => {
    const [season, year] = val.split('-');
    return { value: val, label: `${season} ${year}` };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Revenus attendus</CardTitle>
            <CardDescription>Saison actuelle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExpectedRevenue} deniers</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Revenus collectés</CardTitle>
            <CardDescription>Saison actuelle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCollectedRevenue} deniers</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Taux de collecte</CardTitle>
            <CardDescription>Saison actuelle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalExpectedRevenue > 0 
                ? Math.round((totalCollectedRevenue / totalExpectedRevenue) * 100) 
                : 0}%
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Prévisions de revenus</CardTitle>
          <CardDescription>
            Projection des revenus par type de bâtiment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Temple" fill="#8884d8" />
                <Bar dataKey="Thermes" fill="#82ca9d" />
                <Bar dataKey="Entrepot" fill="#ffc658" />
                <Bar dataKey="Amphitheatre" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h3 className="text-lg font-medium">Détail des revenus</h3>
        
        <div className="flex gap-2">
          <Select value={seasonFilter} onValueChange={setSeasonFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Saison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les saisons</SelectItem>
              {seasonOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={collectedFilter} onValueChange={setCollectedFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="collected">Collectés</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportData}>
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bâtiment</TableHead>
              <TableHead>Période</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Détails</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRevenues.map((revenue) => (
              <TableRow key={revenue.id}>
                <TableCell className="font-medium">
                  {revenue.buildingName}
                </TableCell>
                <TableCell>
                  {revenue.season} {revenue.year}
                </TableCell>
                <TableCell>{revenue.amount} deniers</TableCell>
                <TableCell>{revenue.details}</TableCell>
                <TableCell>
                  {revenue.collected ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Collecté
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      <XCircle className="h-3 w-3 mr-1" />
                      En attente
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {!revenue.collected && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleCollectRevenue(revenue.id)}
                    >
                      Collecter
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
