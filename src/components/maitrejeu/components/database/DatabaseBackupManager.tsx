
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDatabaseManager } from './hooks/useDatabaseManager';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { CalendarDays, Save, Trash2, RotateCcw, AlertTriangle, Clock, Download } from 'lucide-react';
import { toast } from 'sonner';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const DatabaseBackupManager: React.FC = () => {
  const { backups, createBackup, restoreBackup, deleteBackup, exportAllTables } = useDatabaseManager();
  const [newBackupDescription, setNewBackupDescription] = useState('');
  const [backupToDelete, setBackupToDelete] = useState<string | null>(null);
  const [backupToRestore, setBackupToRestore] = useState<string | null>(null);
  const [backupFilter, setBackupFilter] = useState('');
  
  // Filtrer les sauvegardes
  const filteredBackups = backups.filter(backup => 
    backup.description.toLowerCase().includes(backupFilter.toLowerCase()) ||
    format(parseISO(backup.date), 'dd MMMM yyyy', { locale: fr }).toLowerCase().includes(backupFilter.toLowerCase())
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Tri par date, plus récent en premier
  
  const handleCreateBackup = () => {
    const backupId = createBackup(newBackupDescription);
    if (backupId) {
      setNewBackupDescription('');
      toast.success("Sauvegarde créée avec succès");
    }
  };
  
  const confirmDeleteBackup = (id: string) => {
    setBackupToDelete(id);
  };
  
  const confirmRestoreBackup = (id: string) => {
    setBackupToRestore(id);
  };
  
  const handleDeleteBackup = () => {
    if (backupToDelete) {
      const result = deleteBackup(backupToDelete);
      if (result) {
        toast.success("Sauvegarde supprimée avec succès");
      }
      setBackupToDelete(null);
    }
  };
  
  const handleRestoreBackup = () => {
    if (backupToRestore) {
      const result = restoreBackup(backupToRestore);
      if (result) {
        toast.success("Sauvegarde restaurée avec succès");
      }
      setBackupToRestore(null);
    }
  };
  
  // Formater la date
  const formatBackupDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'dd MMMM yyyy à HH:mm', { locale: fr });
    } catch {
      return dateString;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Gestionnaire de sauvegardes</CardTitle>
        <CardDescription>
          Gérez vos sauvegardes locales de base de données
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Créer une nouvelle sauvegarde */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Nouvelle sauvegarde</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="backup-description">Description</Label>
                  <Input
                    id="backup-description"
                    value={newBackupDescription}
                    onChange={(e) => setNewBackupDescription(e.target.value)}
                    placeholder="Description de la sauvegarde"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCreateBackup} 
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Créer une sauvegarde
              </Button>
            </CardFooter>
          </Card>
          
          {/* Exporter toutes les données */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Export complet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Exportez l'intégralité des données du jeu dans un fichier JSON.
                Cette option est utile pour créer des sauvegardes externes.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                onClick={exportAllTables}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Exporter toutes les données
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <Separator />
        
        {/* Liste des sauvegardes */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Sauvegardes ({backups.length})</h3>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filtrer les sauvegardes..."
                value={backupFilter}
                onChange={(e) => setBackupFilter(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          {filteredBackups.length === 0 ? (
            <div className="text-center py-8 border rounded-md bg-muted/10">
              <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                {backups.length === 0 
                  ? "Aucune sauvegarde n'existe encore" 
                  : "Aucune sauvegarde ne correspond au filtre"}
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Tables</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBackups.map((backup) => (
                    <TableRow key={backup.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                          {formatBackupDate(backup.date)}
                        </div>
                      </TableCell>
                      <TableCell>{backup.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{backup.tables.length}</Badge>
                      </TableCell>
                      <TableCell>{backup.size}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => confirmRestoreBackup(backup.id)}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => confirmDeleteBackup(backup.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </div>
        
        {/* Boîte de dialogue de confirmation de suppression */}
        <AlertDialog open={!!backupToDelete} onOpenChange={(open) => !open && setBackupToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                Confirmer la suppression
              </AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer cette sauvegarde ? 
                Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteBackup} className="bg-destructive">
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        {/* Boîte de dialogue de confirmation de restauration */}
        <AlertDialog open={!!backupToRestore} onOpenChange={(open) => !open && setBackupToRestore(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center">
                <RotateCcw className="h-5 w-5 text-amber-500 mr-2" />
                Confirmer la restauration
              </AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir restaurer cette sauvegarde ? 
                Les données actuelles seront remplacées.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleRestoreBackup}>
                Restaurer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
