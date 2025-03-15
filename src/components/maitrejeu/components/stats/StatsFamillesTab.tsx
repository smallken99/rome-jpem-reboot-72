
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { PieChart, BarChart, LineChart } from 'lucide-react';

export const StatsFamillesTab: React.FC = () => {
  const { familles, membres } = useMaitreJeu();
  
  // Analyse des données familiales
  const totalFamilles = familles.length;
  const totalMembres = membres.length;
  
  // Répartition par genre (en utilisant la propriété genre qui devrait exister)
  const hommes = membres.filter(membre => membre.genre === 'homme').length;
  const femmes = membres.filter(membre => membre.genre === 'femme').length;
  
  // Calcul de l'âge moyen (si l'âge est disponible)
  const ageMoyen = membres.reduce((sum, membre) => sum + (membre.age || 0), 0) / totalMembres || 0;
  
  // Répartition par statut
  const famillesPatriciennes = familles.filter(famille => famille.statut === 'patricienne').length;
  const famillesPlebeennes = familles.filter(famille => famille.statut === 'plébéienne').length;
  
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
              <p>Familles Patriciennes: {famillesPatriciennes}</p>
              <p>Familles Plébéiennes: {famillesPlebeennes}</p>
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
