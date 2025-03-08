
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, CalendarDays, BarChart3, Clock } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const GameStatsCard: React.FC = () => {
  const { stats } = useAdmin();
  
  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Statistiques de Jeu</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Chargement des données...</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques de Jeu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5 p-4 border rounded-md bg-muted/30">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Familles Actives</h3>
            </div>
            <p className="text-2xl font-bold text-rome-navy">{stats.gameStats.activeFamilies}</p>
          </div>
          
          <div className="flex flex-col space-y-1.5 p-4 border rounded-md bg-muted/30">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Actions en Attente</h3>
            </div>
            <p className="text-2xl font-bold text-rome-navy">{stats.gameStats.pendingActions}</p>
          </div>
          
          <div className="flex flex-col space-y-1.5 p-4 border rounded-md bg-muted/30">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Tour Actuel</h3>
            </div>
            <p className="text-2xl font-bold text-rome-navy">{stats.gameStats.lastGameTurn}</p>
          </div>
          
          <div className="flex flex-col space-y-1.5 p-4 border rounded-md bg-muted/30">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Connexions Totales</h3>
            </div>
            <p className="text-2xl font-bold text-rome-navy">
              {stats.gameStats.totalLogins.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
