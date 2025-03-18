
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatabaseOverview } from './components/database/DatabaseOverview';
import { DatabaseStats } from './components/database/DatabaseStats';
import { DatabaseViewer } from './components/database/DatabaseViewer';
import { DatabaseExporter } from './components/database/DatabaseExporter';
import { DatabaseImporter } from './components/database/DatabaseImporter';
import { DatabaseBackupManager } from './components/database/DatabaseBackupManager';
import { useMaitreJeu } from './context';
import { Database } from 'lucide-react';

export const GestionDatabase = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { familles, senateurs, provinces, lois } = useMaitreJeu();

  // Statistiques de la base de données
  const dbStats = {
    totalTables: 14, // Nombre de tables dans la base de données
    totalRecords: familles.length + senateurs.length + provinces.length + lois.length + 42, // Estimation du nombre total d'enregistrements
    lastUpdated: new Date().toISOString(),
    databaseSize: '4.8 MB', // Taille estimée
    backups: [] // Liste des sauvegardes
  };
  
  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Base de Données du Jeu"
        subtitle="Gérez, exportez et importez les données du jeu"
      />
      
      <DatabaseStats stats={dbStats} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid grid-cols-5 max-w-3xl mx-auto">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="viewer">Explorateur</TabsTrigger>
          <TabsTrigger value="export">Exporter</TabsTrigger>
          <TabsTrigger value="import">Importer</TabsTrigger>
          <TabsTrigger value="backups">Sauvegardes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <DatabaseOverview />
        </TabsContent>
        
        <TabsContent value="viewer" className="mt-6">
          <DatabaseViewer />
        </TabsContent>
        
        <TabsContent value="export" className="mt-6">
          <DatabaseExporter />
        </TabsContent>
        
        <TabsContent value="import" className="mt-6">
          <DatabaseImporter />
        </TabsContent>
        
        <TabsContent value="backups" className="mt-6">
          <DatabaseBackupManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
