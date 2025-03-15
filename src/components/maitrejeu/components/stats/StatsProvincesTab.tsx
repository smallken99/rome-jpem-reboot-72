
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { Map, BarChart3, PieChart } from 'lucide-react';

export const StatsProvincesTab: React.FC = () => {
  const { provinces } = useMaitreJeu();
  
  // Analyse des données des provinces
  const totalProvinces = provinces.length;
  const provincesStables = provinces.filter(p => (p.stabilité || 0) > 70).length;
  const provincesInstables = provinces.filter(p => (p.stabilité || 0) < 30).length;
  
  // Calcul des revenus totaux des provinces
  const revenuTotal = provinces.reduce((sum, province) => sum + (province.revenuAnnuel || 0), 0);
  
  // Province la plus rentable
  const provincePlusRentable = provinces.length > 0 
    ? provinces.reduce((max, province) => 
        (province.revenuAnnuel || 0) > (max.revenuAnnuel || 0) ? province : max, provinces[0])
    : null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Statistiques des Provinces</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nombre de Provinces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProvinces}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Provinces Stables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{provincesStables}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((provincesStables / totalProvinces) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Provinces Instables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{provincesInstables}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((provincesInstables / totalProvinces) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{revenuTotal} As</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribution des Revenus</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>Province la plus rentable: {provincePlusRentable?.nom || 'Aucune'}</p>
              <p>Revenu: {provincePlusRentable?.revenuAnnuel || 0} As</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Région</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Map className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>Répartition des provinces par région:</p>
              <ul className="mt-2 space-y-1">
                {Array.from(new Set(provinces.map(p => p.région))).map(région => (
                  <li key={région}>
                    {région}: {provinces.filter(p => p.région === région).length} province(s) - 
                    {provinces.filter(p => p.région === région).reduce((sum, p) => sum + (p.revenuAnnuel || 0), 0)} As
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Stabilité des Provinces</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {provinces.map(province => (
              <div key={province.id} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{province.nom}</span>
                    <span>{province.stabilité || 0}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${(province.stabilité || 0) > 70 
                        ? 'bg-green-500' 
                        : (province.stabilité || 0) > 30 
                          ? 'bg-amber-500' 
                          : 'bg-red-500'}`}
                      style={{ width: `${province.stabilité || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
