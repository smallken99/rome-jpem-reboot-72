import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { Map, BarChart3, PieChart } from 'lucide-react';

export const StatsProvincesTab: React.FC = () => {
  const { provinces } = useMaitreJeu();
  
  // Calcul des statistiques
  const provincesCount = provinces.length;
  const stableProvinces = provinces.filter(p => p.stabilite >= 70).length;
  const unstableProvinces = provinces.filter(p => p.stabilite < 70).length;

  // Calcul des revenus totaux des provinces
  const revenuTotal = provinces.reduce((sum, province) => sum + (province.revenuAnnuel || 0), 0);
  
  // Province la plus rentable
  const provincePlusRentable = provinces.length > 0 
    ? provinces.reduce((max, province) => 
        (province.revenuAnnuel || 0) > (max.revenuAnnuel || 0) ? province : max, provinces[0])
    : null;
  
  const renderProvinceCard = (province: Province) => (
    <Card key={province.id} className="overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-base font-medium">{province.nom}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Stabilité:</span>
            <span 
              className={cn(
                province.stabilite > 80 ? "text-green-500" : 
                province.stabilite > 50 ? "text-amber-500" : 
                "text-red-500"
              )}
            >
              {province.stabilite}%
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Revenu Annuel:</span>
            <span>{province.revenuAnnuel || 0} As</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Statistiques des Provinces</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nombre de Provinces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{provincesCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stabilité Moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {provinces.length > 0 
                ? Math.round(provinces.reduce((sum, p) => sum + p.stabilite, 0) / provinces.length) 
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {stableProvinces} provinces stables
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Provinces Instables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unstableProvinces}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((unstableProvinces / provincesCount) * 100).toFixed(1)}% du total
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
            {provinces.map(renderProvinceCard)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
