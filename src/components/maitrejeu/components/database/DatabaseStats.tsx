
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Database, Box, Clock, Save } from 'lucide-react';
import { StatBox } from '@/components/ui-custom/StatBox';

interface DatabaseStatsProps {
  stats: {
    totalTables: number;
    totalRecords: number;
    lastUpdated: string;
    databaseSize: string;
    backups: any[];
  };
}

export const DatabaseStats: React.FC<DatabaseStatsProps> = ({ stats }) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatBox
        title="Tables"
        value={stats.totalTables.toString()}
        icon={<Database className="w-5 h-5" />}
        description="Tables de données"
      />
      
      <StatBox
        title="Enregistrements"
        value={stats.totalRecords.toString()}
        icon={<Box className="w-5 h-5" />}
        description="Enregistrements totaux"
      />
      
      <StatBox
        title="Taille estimée"
        value={stats.databaseSize}
        icon={<Save className="w-5 h-5" />}
        description="Espace utilisé"
      />
      
      <StatBox
        title="Dernière mise à jour"
        value={formatDate(stats.lastUpdated).split(',')[0]}
        icon={<Clock className="w-5 h-5" />}
        description={formatDate(stats.lastUpdated).split(',')[1]}
      />
    </div>
  );
};
