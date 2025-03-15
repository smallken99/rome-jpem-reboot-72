
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMaitreJeu } from '../../context';
import { Globe, MapPin, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const StatsProvincesTab: React.FC = () => {
  const { provinces } = useMaitreJeu();
  
  // Statistiques des provinces
  const totalProvinces = provinces.length;
  const provincesStables = provinces.filter(p => p.stabilite >= 70).length;
  const provincesTroubles = provinces.filter(p => p.stabilite < 50).length;
  
  // Revenus totaux des provinces
  const revenuTotal = provinces.reduce((sum, p) => sum + (p.revenu || 0), 0);
  
  // Provinces triées par revenu
  const provincesByRevenu = [...provinces]
    .sort((a, b) => (b.revenu || 0) - (a.revenu || 0))
    .slice(0, 5);
  
  // Population totale (simulée)
  const populationTotale = provinces.reduce((sum, p) => sum + (p.population || 0), 0);
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Administration provinciale</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total des provinces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProvinces}</div>
            <div className="text-xs text-muted-foreground">Territoires administrés</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stabilité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{provincesStables}</div>
            <div className="text-xs text-muted-foreground">Provinces stables</div>
            <div className="flex items-center gap-1 mt-1 text-red-600">
              <AlertTriangle className="h-3 w-3" />
              <span className="text-xs">{provincesTroubles} en crise</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenus provinciaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{revenuTotal.toLocaleString()} As</div>
            <div className="text-xs text-muted-foreground">Tributs annuels</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Population</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{populationTotale.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Habitants des provinces</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" /> Provinces par revenu
            </CardTitle>
            <CardDescription>
              Classement des provinces les plus lucratives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Province</TableHead>
                  <TableHead>Région</TableHead>
                  <TableHead className="text-right">Revenu annuel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {provincesByRevenu.map((province) => (
                  <TableRow key={province.id}>
                    <TableCell className="font-medium">
                      {province.nom}
                    </TableCell>
                    <TableCell>{province.region}</TableCell>
                    <TableCell className="text-right">{(province.revenu || 0).toLocaleString()} As</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" /> État des provinces
            </CardTitle>
            <CardDescription>
              Situation politique et stabilité
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {provinces.slice(0, 6).map((province) => (
              <div key={province.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium">{province.nom}</div>
                  <div className="text-xs text-muted-foreground">{province.gouverneur || "Sans gouverneur"}</div>
                </div>
                <div className="flex items-center gap-2">
                  {province.stabilite >= 70 ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Stable</Badge>
                  ) : province.stabilite >= 50 ? (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Modérée</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Instable</Badge>
                  )}
                  <span className="text-sm font-medium">{province.stabilite}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
