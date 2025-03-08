
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CoinsIcon, TrendingUp, ExternalLink } from 'lucide-react';
import { Province } from '../types/maitreJeuTypes';

interface ProvincesDataProps {
  provinces: Province[];
  onViewProvince: (province: Province) => void;
}

export const ProvincesData: React.FC<ProvincesDataProps> = ({ provinces, onViewProvince }) => {
  // Calculer les statistiques des provinces
  const totalPopulation = provinces.reduce((sum, p) => sum + p.population, 0);
  const totalRevenu = provinces.reduce((sum, p) => sum + p.revenuAnnuel, 0);
  const vacantProvinces = provinces.filter(p => !p.gouverneur).length;
  
  // Trier les provinces par revenu
  const sortedProvinces = [...provinces].sort((a, b) => b.revenuAnnuel - a.revenuAnnuel);
  
  // Fonction pour formater les grands nombres
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };
  
  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'pacifiée': return 'bg-green-100 text-green-800 border-green-300';
      case 'instable': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'en révolte': return 'bg-red-100 text-red-800 border-red-300';
      case 'en guerre': return 'bg-red-800 text-white border-red-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Données économiques des provinces</span>
          <div className="flex items-center gap-2 text-sm">
            <CoinsIcon className="h-4 w-4 text-rome-gold" />
            <span>Revenu total: {formatNumber(totalRevenu)} As/an</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-slate-50 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Population totale</div>
            <div className="text-2xl font-semibold">{formatNumber(totalPopulation)}</div>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Revenu annuel moyen</div>
            <div className="text-2xl font-semibold">{formatNumber(Math.round(totalRevenu / provinces.length))} As</div>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Provinces sans gouverneur</div>
            <div className="text-2xl font-semibold">{vacantProvinces} / {provinces.length}</div>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Province</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Population</TableHead>
              <TableHead className="text-right">Revenu</TableHead>
              <TableHead className="text-right">Légions</TableHead>
              <TableHead>Gouverneur</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProvinces.map((province) => (
              <TableRow 
                key={province.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onViewProvince(province)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {province.nom}
                    <ExternalLink className="ml-1 h-3 w-3 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(province.statut)}>
                    {province.statut}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatNumber(province.population)}</TableCell>
                <TableCell className="text-right font-medium">
                  <div className="flex items-center justify-end gap-1">
                    {formatNumber(province.revenuAnnuel)}
                    {province.revenuAnnuel > 100000 && (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">{province.légions}</TableCell>
                <TableCell>{province.gouverneur || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
