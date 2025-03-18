
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Clock, Download, FileText, Trash2, Upload } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

interface Backup {
  id: string;
  name: string;
  date: string;
  size: string;
  tables: string[];
}

export const DatabaseBackupManager: React.FC = () => {
  // État pour les sauvegardes (simulé)
  const [backups, setBackups] = useState<Backup[]>([
    {
      id: '1',
      name: 'Sauvegarde complète - Fin de partie',
      date: '2023-12-15T14:30:00',
      size: '5.2 MB',
      tables: ['familles', 'senateurs', 'provinces', 'lois', 'histoire']
    },
    {
      id: '2',
      name: 'Pré-élections consulaires',
      date: '2023-11-28T09:15:00',
      size: '4.8 MB',
      tables: ['senateurs', 'votes', 'factions']
    }
  ]);
  
  const handleCreateBackup = () => {
    const newBackup: Backup = {
      id: Date.now().toString(),
      name: `Sauvegarde du ${new Date().toLocaleDateString()}`,
      date: new Date().toISOString(),
      size: '4.9 MB',
      tables: ['familles', 'senateurs', 'provinces', 'lois', 'histoire', 'clients', 'economie']
    };
    
    setBackups([newBackup, ...backups]);
    toast.success('Nouvelle sauvegarde créée avec succès');
  };
  
  const handleDeleteBackup = (id: string) => {
    setBackups(backups.filter(backup => backup.id !== id));
    toast.success('Sauvegarde supprimée avec succès');
  };
  
  const handleRestoreBackup = (id: string) => {
    // Simulation de restauration
    toast.success('Sauvegarde restaurée avec succès');
  };
  
  const handleDownloadBackup = (id: string) => {
    // Simulation de téléchargement
    toast.success('Téléchargement démarré');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestionnaire de sauvegardes</h2>
        <Button onClick={handleCreateBackup}>
          <Upload className="mr-2 h-4 w-4" />
          Créer une sauvegarde
        </Button>
      </div>
      
      <Alert variant="default">
        <AlertTitle>Points importants sur les sauvegardes</AlertTitle>
        <AlertDescription>
          Les sauvegardes vous permettent de restaurer l'état du jeu à un moment précis. 
          Elles sont essentielles avant de faire des modifications importantes.
        </AlertDescription>
      </Alert>
      
      {backups.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Aucune sauvegarde disponible</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Sauvegardes disponibles</CardTitle>
            <CardDescription>
              Gérez vos points de sauvegarde pour restaurer l'état du jeu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Taille</TableHead>
                  <TableHead>Tables</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        {backup.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDistanceToNow(new Date(backup.date), { addSuffix: true, locale: fr })}
                      </div>
                    </TableCell>
                    <TableCell>{backup.size}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {backup.tables.slice(0, 3).map((table) => (
                          <Badge key={table} variant="outline" className="text-xs">
                            {table}
                          </Badge>
                        ))}
                        {backup.tables.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{backup.tables.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleRestoreBackup(backup.id)} className="h-8 px-2">
                          Restaurer
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDownloadBackup(backup.id)} className="h-8 px-2">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteBackup(backup.id)} className="h-8 px-2">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between bg-muted/20 border-t">
            <div className="text-sm text-muted-foreground">
              Total: {backups.length} sauvegarde(s)
            </div>
            <Button variant="outline" size="sm">
              Importer une sauvegarde
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
