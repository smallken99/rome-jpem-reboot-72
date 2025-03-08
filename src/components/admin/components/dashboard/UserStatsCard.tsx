
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserPlus, UserCheck } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const UserStatsCard: React.FC = () => {
  const { stats } = useAdmin();
  
  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Statistiques des Utilisateurs</CardTitle>
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
        <CardTitle>Statistiques des Utilisateurs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-800 mr-4">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total des utilisateurs</p>
              <h4 className="text-2xl font-bold">{stats.usersCount.total}</h4>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-800 mr-4">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Utilisateurs actifs aujourd'hui</p>
              <h4 className="text-2xl font-bold">{stats.usersCount.activeToday}</h4>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-800 mr-4">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nouveaux utilisateurs (mois dernier)</p>
              <h4 className="text-2xl font-bold">{stats.usersCount.newLastMonth}</h4>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
