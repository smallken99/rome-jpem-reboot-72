
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Shield, Users, Coins, ChartBar, Archive, Database, Files } from 'lucide-react';
import { useDatabaseManager } from './hooks/useDatabaseManager';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, icon, color = "text-primary" }) => (
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className={`rounded-full p-2 ${color} bg-primary/10`}>
        {icon}
      </div>
    </div>
    <div className="text-2xl font-bold">{value}</div>
    {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
  </div>
);

interface DatabaseStatsProps {
  stats?: {
    totalTables: number;
    totalRecords: number;
    lastUpdated: string;
    databaseSize: string;
    backups: any[];
  };
}

export const DatabaseStats: React.FC<DatabaseStatsProps> = ({ stats: propStats }) => {
  const { stats: hookStats } = useDatabaseManager();
  const stats = propStats || hookStats;
  
  const formatLastUpdated = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: fr });
    } catch {
      return dateString;
    }
  };

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            title="Tables"
            value={stats.totalTables}
            description="Tables de données"
            icon={<Database className="h-4 w-4" />}
          />
          
          <StatsCard
            title="Enregistrements"
            value={stats.totalRecords.toLocaleString()}
            description="Total des enregistrements"
            icon={<Files className="h-4 w-4" />}
            color="text-blue-500"
          />
          
          <StatsCard
            title="Taille"
            value={stats.databaseSize}
            description="Taille estimée"
            icon={<ChartBar className="h-4 w-4" />}
            color="text-green-500"
          />
          
          <StatsCard
            title="Sauvegardes"
            value={stats.backups.length}
            description={`Dernière mise à jour ${formatLastUpdated(stats.lastUpdated)}`}
            icon={<Archive className="h-4 w-4" />}
            color="text-amber-500"
          />
        </div>
      </CardContent>
    </Card>
  );
};
