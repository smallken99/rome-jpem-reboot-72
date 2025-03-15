import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useMaitreJeu } from '../../context';

export const StatsGeneralTab: React.FC = () => {
  const { 
    senateurs, 
    provinces, 
    lois, 
    equilibre, 
    clients, 
    familles, 
    economieRecords, 
    treasury 
  } = useMaitreJeu();

  // Remplacer client.statut par client.activeStatus
  const clientsActifs = clients.filter(c => c.activeStatus === "active").length;
  const loyauteTotale = clients.reduce((sum, c) => {
    if (c.loyalty === "forte") return sum + 3;
    if (c.loyalty === "moyenne") return sum + 2;
    if (c.loyalty === "faible") return sum + 1;
    return sum;
  }, 0);
  
  const loyauteMoyenne = clients.length ? loyauteTotale / clients.length : 0;
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sénateurs Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{senateurs.length}</div>
            <p className="text-xs text-muted-foreground">
              {senateurs.filter(s => s.joueur).length} contrôlés par des joueurs
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Provinces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{provinces.length}</div>
            <p className="text-xs text-muted-foreground">
              {provinces.length} provinces sous contrôle romain
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lois Actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lois.filter(l => l.status === "Promulguée").length}</div>
            <p className="text-xs text-muted-foreground">
              {lois.filter(l => l.status === "proposed").length} lois en délibération
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clients Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientsActifs}</div>
            <p className="text-xs text-muted-foreground">
              Loyauté moyenne: {loyauteMoyenne.toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analyse Générale</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">État actuel de la République:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Nombre de sénateurs: {senateurs.length}</li>
            <li>Nombre de provinces: {provinces.length}</li>
            <li>Nombre de lois actives: {lois.filter(l => l.status === "Promulguée").length}</li>
            <li>Nombre de clients actifs: {clientsActifs}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
