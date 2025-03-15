import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { PieChart, BarChart, LineChart } from 'lucide-react';

export const StatsFamillesTab: React.FC = () => {
  const { familles, membres } = useMaitreJeu();
  
  // Corriger les filtres pour correspondre aux types réels
  const hommes = membres.filter(m => m.genre === "male").length;
  const femmes = membres.filter(m => m.genre === "female").length;
  
  const ages = membres.map(m => m.age);
  const ageMoyen = ages.length ? Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length) : 0;
  
  const famillePat = familles.filter(f => f.statut === "Patricien").length;
  const famillePleb = familles.filter(f => f.statut === "Plébéien").length;
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Statistiques des Familles Romaines</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nombre de Familles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFamilles}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nombre de Membres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembres}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Âge Moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ageMoyen.toFixed(1)} ans</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ratio Hommes/Femmes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hommes}/{femmes}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des Statuts</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <PieChart className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>Familles Patriciennes: {famillePat}</p>
              <p>Familles Plébéiennes: {famillePleb}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Alliances entre Familles</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <LineChart className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>Les données d'alliances seront affichées ici</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
