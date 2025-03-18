
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Clock, RotateCw, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type Backup = {
  id: string;
  name: string;
  date: string;
  size: string;
  description: string;
};

export const DatabaseBackupManager: React.FC = () => {
  const [backups, setBackups] = useState<Backup[]>([
    {
      id: '1',
      name: 'Sauvegarde automatique',
      date: '2023-11-15 12:30',
      size: '2.3 MB',
      description: 'Sauvegarde automatique quotidienne'
    },
    {
      id: '2',
      name: 'Avant la mise à jour majeure',
      date: '2023-11-10 09:15',
      size: '2.1 MB',
      description: 'Sauvegarde avant déploiement des nouvelles fonctionnalités'
    }
  ]);
  
  const [backupName, setBackupName] = useState('');
  const [backupDescription, setBackupDescription] = useState('');
  const [activeTab, setActiveTab] = useState('list');
  
  const handleCreateBackup = () => {
    const newBackup: Backup = {
      id: Date.now().toString(),
      name: backupName || `Sauvegarde du ${new Date().toLocaleString()}`,
      date: new Date().toLocaleString(),
      size: '2.4 MB',
      description: backupDescription
    };
    
    setBackups([newBackup, ...backups]);
    setBackupName('');
    setBackupDescription('');
    setActiveTab('list');
    
    toast.success('Sauvegarde créée avec succès');
  };
  
  const handleRestoreBackup = (backupId: string) => {
    // Simuler une restauration
    setTimeout(() => {
      toast.success('Sauvegarde restaurée avec succès');
    }, 1500);
  };
  
  const handleDownloadBackup = (backupId: string) => {
    // Simuler un téléchargement
    toast.success('Téléchargement de la sauvegarde démarré');
  };
  
  const handleDeleteBackup = (backupId: string) => {
    setBackups(backups.filter(backup => backup.id !== backupId));
    toast.success('Sauvegarde supprimée');
  };
  
  const handleScheduleBackup = () => {
    toast.success('Planification de sauvegarde mise à jour');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Gestionnaire de sauvegardes</CardTitle>
        <CardDescription>
          Créez, restaurez et gérez les sauvegardes de la base de données
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">Sauvegardes</TabsTrigger>
            <TabsTrigger value="create">Nouvelle sauvegarde</TabsTrigger>
            <TabsTrigger value="schedule">Planification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Nom</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backups.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        Aucune sauvegarde trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    backups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell className="font-medium">
                          {backup.name}
                          {backup.description && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {backup.description}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{backup.date}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRestoreBackup(backup.id)}
                            >
                              <RotateCw className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadBackup(backup.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteBackup(backup.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="create" className="space-y-4">
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="backup-name">Nom de la sauvegarde</Label>
                <Input
                  id="backup-name"
                  value={backupName}
                  onChange={(e) => setBackupName(e.target.value)}
                  placeholder="Ex: Avant la mise à jour"
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="backup-description">Description (optionnelle)</Label>
                <Input
                  id="backup-description"
                  value={backupDescription}
                  onChange={(e) => setBackupDescription(e.target.value)}
                  placeholder="Détails sur cette sauvegarde"
                />
              </div>
              
              <Button onClick={handleCreateBackup} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Créer la sauvegarde
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-muted/10">
                <h3 className="font-medium mb-2">Sauvegarde automatique</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Configurez la fréquence des sauvegardes automatiques
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="backup-frequency">Fréquence</Label>
                    <select
                      id="backup-frequency"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="daily">Quotidienne</option>
                      <option value="weekly">Hebdomadaire</option>
                      <option value="monthly">Mensuelle</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="backup-time">Heure</Label>
                    <Input
                      id="backup-time"
                      type="time"
                      defaultValue="03:00"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="retention-days">Conservation (jours)</Label>
                  <Input
                    id="retention-days"
                    type="number"
                    defaultValue="30"
                    min="1"
                  />
                </div>
                
                <Button onClick={handleScheduleBackup} className="w-full mt-4">
                  <Clock className="mr-2 h-4 w-4" />
                  Mettre à jour la planification
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
