
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useDatabaseManager } from './hooks/useDatabaseManager';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatabaseTable } from './DatabaseTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, UploadCloud, Save, CheckCircle, Clock, AlertOctagon } from 'lucide-react';
import { toast } from 'sonner';

export const DatabaseOverview: React.FC = () => {
  const { tableDetails, stats, exportTable, exportAllTables, createBackup } = useDatabaseManager();
  
  const tables = Object.keys(tableDetails).map(key => ({
    id: key,
    ...tableDetails[key]
  }));

  // Grouper les tables par catégorie
  const gameDataTables = tables.filter(table => 
    ['senateurs', 'familles', 'membres', 'alliances', 'provinces'].includes(table.id)
  );
  
  const politicalTables = tables.filter(table => 
    ['lois', 'evenements', 'histoire', 'clients'].includes(table.id)
  );
  
  const economicTables = tables.filter(table => 
    ['economie', 'tresor', 'batiments', 'republique', 'population'].includes(table.id)
  );

  // Fonction pour gérer la création d'une sauvegarde
  const handleCreateBackup = () => {
    const description = prompt("Description de la sauvegarde (optionnel):");
    const backupId = createBackup(description || undefined);
    if (backupId) {
      toast.success("Sauvegarde créée avec succès");
    }
  };

  // Fonction pour gérer l'export complet
  const handleExportAll = () => {
    exportAllTables();
  };

  // Rendu de l'icône du statut de synchronisation
  const renderSyncIcon = () => {
    switch (stats.syncStatus) {
      case 'synced':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <AlertOctagon className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Vue d'ensemble</h2>
          <p className="text-muted-foreground">Aperçu des tables et statistiques de la base de données</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCreateBackup}>
            <Save className="mr-2 h-4 w-4" />
            Créer une sauvegarde
          </Button>
          
          <Button variant="outline" onClick={handleExportAll}>
            <Download className="mr-2 h-4 w-4" />
            Exporter tout
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <Badge variant="outline">
          {stats.totalTables} tables
        </Badge>
        <Badge variant="outline">
          {stats.totalRecords} enregistrements
        </Badge>
        <Badge variant="outline">
          {stats.databaseSize}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          {renderSyncIcon()}
          {stats.syncStatus === 'synced' ? 'Synchronisé' : stats.syncStatus === 'pending' ? 'En attente' : 'Erreur'}
        </Badge>
      </div>
      
      <Tabs defaultValue="game-data">
        <TabsList className="mb-4">
          <TabsTrigger value="game-data">Données du jeu</TabsTrigger>
          <TabsTrigger value="political">Politique</TabsTrigger>
          <TabsTrigger value="economic">Économie</TabsTrigger>
        </TabsList>
        
        <TabsContent value="game-data">
          <ScrollArea className="h-[450px] rounded-md border">
            <div className="p-4 space-y-4">
              {gameDataTables.map(table => (
                <Card key={table.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{table.name}</CardTitle>
                      <Badge>{table.recordCount} enregistrements</Badge>
                    </div>
                    <CardDescription>{table.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Taille: {table.size}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => exportTable(table.id)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Exporter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="political">
          <ScrollArea className="h-[450px] rounded-md border">
            <div className="p-4 space-y-4">
              {politicalTables.map(table => (
                <Card key={table.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{table.name}</CardTitle>
                      <Badge>{table.recordCount} enregistrements</Badge>
                    </div>
                    <CardDescription>{table.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Taille: {table.size}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => exportTable(table.id)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Exporter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="economic">
          <ScrollArea className="h-[450px] rounded-md border">
            <div className="p-4 space-y-4">
              {economicTables.map(table => (
                <Card key={table.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{table.name}</CardTitle>
                      <Badge>{table.recordCount} enregistrements</Badge>
                    </div>
                    <CardDescription>{table.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Taille: {table.size}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => exportTable(table.id)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Exporter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
