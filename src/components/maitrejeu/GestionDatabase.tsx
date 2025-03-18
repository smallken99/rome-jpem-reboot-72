
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Database, Server, ListTree, Clock, Users, Map, Scroll, Sword } from 'lucide-react';
import { DatabaseTable } from './components/database/DatabaseTable';
import { DatabaseStats } from './components/database/DatabaseStats';
import { DatabaseBackupManager } from './components/database/DatabaseBackupManager';
import { useDatabaseManager } from './components/database/hooks/useDatabaseManager';

export const GestionDatabase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('senateurs');
  const { tables, stats, getTableData, exportTable, importData } = useDatabaseManager();

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Gestionnaire de Base de Données"
        subtitle="Administrez les tables de données du jeu"
        icon={<Database className="h-6 w-6" />}
      />

      <DatabaseStats stats={stats} />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Tables de Données</CardTitle>
          <CardDescription>
            Visualisez et modifiez les données du jeu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-7 mb-4">
              <TabsTrigger value="senateurs" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Sénateurs</span>
              </TabsTrigger>
              <TabsTrigger value="familles" className="flex items-center gap-1">
                <ListTree className="h-4 w-4" />
                <span>Familles</span>
              </TabsTrigger>
              <TabsTrigger value="provinces" className="flex items-center gap-1">
                <Map className="h-4 w-4" />
                <span>Provinces</span>
              </TabsTrigger>
              <TabsTrigger value="lois" className="flex items-center gap-1">
                <Scroll className="h-4 w-4" />
                <span>Lois</span>
              </TabsTrigger>
              <TabsTrigger value="batiments" className="flex items-center gap-1">
                <Server className="h-4 w-4" />
                <span>Bâtiments</span>
              </TabsTrigger>
              <TabsTrigger value="evenements" className="flex items-center gap-1">
                <Sword className="h-4 w-4" />
                <span>Évènements</span>
              </TabsTrigger>
              <TabsTrigger value="histoire" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Histoire</span>
              </TabsTrigger>
            </TabsList>

            {Object.keys(tables).map(tableKey => (
              <TabsContent key={tableKey} value={tableKey} className="mt-0">
                <DatabaseTable 
                  tableName={tableKey}
                  data={getTableData(tableKey)}
                  onExport={() => exportTable(tableKey)}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <DatabaseBackupManager 
        onExportAll={() => tables}
        onImport={importData}
      />
    </div>
  );
};

export default GestionDatabase;
