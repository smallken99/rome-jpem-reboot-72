
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CalculatorIcon, FilePlusIcon, SaveIcon } from 'lucide-react';
import { toast } from 'sonner';

export const ImpotsForecast: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("current");
  const [tributumRate, setTributumRate] = useState<number[]>([1]);
  const [portoriumRate, setPortoriumRate] = useState<number[]>([3]);
  const [scripturaRate, setScripturaRate] = useState<number[]>([2]);
  const [vicesimaTax, setVicesimaTax] = useState<number[]>([5]);
  const [tributumSoliRate, setTributumSoliRate] = useState<number[]>([10]);
  
  // Données pour le graphique de prévision
  const [forecastData, setForecastData] = useState([
    { name: 'Jan', actuel: 85000, projection: 85000 },
    { name: 'Fév', actuel: 88000, projection: 90000 },
    { name: 'Mar', actuel: 95000, projection: 98000 },
    { name: 'Avr', actuel: 90000, projection: 95000 },
    { name: 'Mai', actuel: 98000, projection: 105000 },
    { name: 'Juin', actuel: 100000, projection: 110000 },
    { name: 'Juil', actuel: 105000, projection: 115000 },
    { name: 'Août', actuel: 108000, projection: 120000 },
    { name: 'Sep', actuel: 110000, projection: 125000 },
    { name: 'Oct', actuel: 115000, projection: 130000 },
    { name: 'Nov', actuel: 120000, projection: 135000 },
    { name: 'Déc', actuel: 130000, projection: 145000 }
  ]);

  const recalculateProjection = () => {
    // Simuler un recalcul des projections basé sur les nouveaux taux
    const multiplier = ((tributumRate[0] + portoriumRate[0] + scripturaRate[0] + vicesimaTax[0] + tributumSoliRate[0]) / 21);
    
    const newForecastData = forecastData.map(item => ({
      ...item,
      projection: Math.round(item.actuel * (1 + (multiplier - 1) * 2))
    }));
    
    setForecastData(newForecastData);
    toast.success("Prévisions recalculées avec les nouveaux taux");
  };
  
  const handleSaveProjection = () => {
    toast.success("Prévisions enregistrées avec succès");
  };
  
  const handleCreateProposal = () => {
    toast.success("Proposition de modification des taux créée et envoyée au Sénat");
  };

  // Calculer les totaux
  const totalActuel = forecastData.reduce((sum, item) => sum + item.actuel, 0);
  const totalProjection = forecastData.reduce((sum, item) => sum + item.projection, 0);
  const difference = totalProjection - totalActuel;
  const percentChange = ((difference / totalActuel) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">
            Évaluez l'impact de changements des taux d'imposition sur les revenus fiscaux.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="year">Année:</Label>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner une année" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous">44 av. J.-C.</SelectItem>
              <SelectItem value="current">45 av. J.-C.</SelectItem>
              <SelectItem value="next">46 av. J.-C.</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Graphique de prévision */}
      <div className="h-[300px] w-full border rounded-md p-4 bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={forecastData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actuel" 
              stroke="#8884d8" 
              name="Perception actuelle" 
              activeDot={{ r: 8 }} 
            />
            <Line 
              type="monotone" 
              dataKey="projection" 
              stroke="#82ca9d" 
              name="Projection avec nouveaux taux" 
              strokeDasharray="5 5" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Ajustement des taux */}
      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg">Ajustement des taux d'imposition</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Tributum (Impôt sur les citoyens)</Label>
                <span className="font-medium">{tributumRate[0]}%</span>
              </div>
              <Slider 
                value={tributumRate} 
                onValueChange={setTributumRate} 
                max={5} 
                step={0.1} 
                className="w-full" 
              />
              <p className="text-xs text-muted-foreground">
                L'impôt direct sur la fortune des citoyens romains.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Portorium (Droits de douane)</Label>
                <span className="font-medium">{portoriumRate[0]}%</span>
              </div>
              <Slider 
                value={portoriumRate} 
                onValueChange={setPortoriumRate} 
                max={10} 
                step={0.5} 
                className="w-full" 
              />
              <p className="text-xs text-muted-foreground">
                Droits perçus sur les marchandises importées.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Scriptura (Taxe sur pâturages)</Label>
                <span className="font-medium">{scripturaRate[0]} As par tête</span>
              </div>
              <Slider 
                value={scripturaRate} 
                onValueChange={setScripturaRate} 
                max={5} 
                step={0.5} 
                className="w-full" 
              />
              <p className="text-xs text-muted-foreground">
                Taxe sur l'utilisation des pâturages publics.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Vicesima libertatis (Taxe d'affranchissement)</Label>
                <span className="font-medium">{vicesimaTax[0]}%</span>
              </div>
              <Slider 
                value={vicesimaTax} 
                onValueChange={setVicesimaTax} 
                max={10} 
                step={0.5} 
                className="w-full" 
              />
              <p className="text-xs text-muted-foreground">
                Taxe sur l'affranchissement des esclaves.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Tributum soli (Impôt foncier provincial)</Label>
                <span className="font-medium">{tributumSoliRate[0]}%</span>
              </div>
              <Slider 
                value={tributumSoliRate} 
                onValueChange={setTributumSoliRate} 
                max={20} 
                step={1} 
                className="w-full" 
              />
              <p className="text-xs text-muted-foreground">
                Impôt foncier sur les terres provinciales.
              </p>
            </div>
            
            <div className="flex justify-center gap-3 mt-6">
              <Button 
                variant="outline" 
                className="roman-btn-outline"
                onClick={recalculateProjection}
              >
                <CalculatorIcon className="h-4 w-4 mr-1" />
                Calculer l'impact
              </Button>
              <Button 
                variant="outline" 
                className="roman-btn-outline"
                onClick={handleSaveProjection}
              >
                <SaveIcon className="h-4 w-4 mr-1" />
                Enregistrer
              </Button>
              <Button 
                onClick={handleCreateProposal}
              >
                <FilePlusIcon className="h-4 w-4 mr-1" />
                Créer une proposition
              </Button>
            </div>
          </div>
        </RomanCard.Content>
      </RomanCard>
      
      {/* Résumé de l'impact financier */}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-cinzel">Période</TableHead>
              <TableHead className="font-cinzel">Revenu actuel</TableHead>
              <TableHead className="font-cinzel">Projection</TableHead>
              <TableHead className="font-cinzel">Différence</TableHead>
              <TableHead className="font-cinzel">Variation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Total annuel</TableCell>
              <TableCell>{totalActuel.toLocaleString()} As</TableCell>
              <TableCell>{totalProjection.toLocaleString()} As</TableCell>
              <TableCell>{difference > 0 ? "+" : ""}{difference.toLocaleString()} As</TableCell>
              <TableCell className={difference > 0 ? "text-green-600" : "text-red-600"}>
                {difference > 0 ? "+" : ""}{percentChange}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Composant RomanCard simplifié pour cet exemple
const RomanCard = ({ children }: { children: React.ReactNode }) => (
  <div className="border rounded-md overflow-hidden bg-white">
    {children}
  </div>
);

RomanCard.Header = ({ children }: { children: React.ReactNode }) => (
  <div className="border-b bg-muted/20 px-4 py-3">
    {children}
  </div>
);

RomanCard.Content = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">
    {children}
  </div>
);
