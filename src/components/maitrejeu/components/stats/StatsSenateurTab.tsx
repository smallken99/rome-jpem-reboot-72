
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { PieChart, BarChart, Users } from 'lucide-react';

export const StatsSenateurTab: React.FC = () => {
  const { senateurs } = useMaitreJeu();
  
  // Analyse des données des sénateurs
  const senateurActifs = senateurs.filter(s => s.statut === 'actif').length;
  const senateursInactifs = senateurs.filter(s => s.statut === 'inactif').length;
  const senateursJoueurs = senateurs.filter(s => s.statut === 'joueur').length;
  
  // Répartition par faction politique
  const populares = senateurs.filter(s => s.tendance === 'populares').length;
  const optimates = senateurs.filter(s => s.tendance === 'optimates').length;
  const neutres = senateurs.filter(s => s.tendance === 'neutre').length;
  
  // Calcul de l'influence moyenne
  const influenceMoyenne = senateurs.reduce((sum, s) => sum + (s.influence || 0), 0) / senateurs.length || 0;
  
  // Répartition par magistrature
  const magistratures = senateurs.reduce((acc, s) => {
    if (s.fonction) {
      acc[s.fonction] = (acc[s.fonction] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Statistiques du Sénat</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sénateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{senateurs.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sénateurs Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{senateurActifs}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((senateurActifs / senateurs.length) * 100).toFixed(1)}% du total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sénateurs Joueurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{senateursJoueurs}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Influence Moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{influenceMoyenne.toFixed(1)}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des Factions</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <PieChart className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <div className="font-semibold">Populares</div>
                  <div className="text-2xl">{populares}</div>
                  <div className="text-xs">{((populares / senateurs.length) * 100).toFixed(1)}%</div>
                </div>
                <div>
                  <div className="font-semibold">Optimates</div>
                  <div className="text-2xl">{optimates}</div>
                  <div className="text-xs">{((optimates / senateurs.length) * 100).toFixed(1)}%</div>
                </div>
                <div>
                  <div className="font-semibold">Neutres</div>
                  <div className="text-2xl">{neutres}</div>
                  <div className="text-xs">{((neutres / senateurs.length) * 100).toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Magistratures</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BarChart className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <div className="mt-2 space-y-1 text-left">
                {Object.entries(magistratures).map(([fonction, count]) => (
                  <div key={fonction} className="flex justify-between">
                    <span>{fonction}:</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Les plus influents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {senateurs
              .sort((a, b) => (b.influence || 0) - (a.influence || 0))
              .slice(0, 5)
              .map(senateur => (
                <div key={senateur.id} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{senateur.nom}</span>
                      <span className="text-sm text-muted-foreground">{senateur.tendance || 'Inconnu'}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div 
                        className="h-2 rounded-full bg-amber-500"
                        style={{ width: `${(senateur.influence || 0) / 100 * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Influence: {senateur.influence || 0}</span>
                      <span>{senateur.fonction || 'Sans fonction'}</span>
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
