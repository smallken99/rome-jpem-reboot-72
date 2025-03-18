
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Upload, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

interface DatabaseBackupManagerProps {
  onExportAll: () => any;
  onImport: (data: any, tableName?: string) => boolean;
}

export const DatabaseBackupManager: React.FC<DatabaseBackupManagerProps> = ({
  onExportAll,
  onImport
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleExportAll = () => {
    try {
      const data = onExportAll();
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      const date = new Date().toISOString().split('T')[0];
      a.download = `backup_romejpem_${date}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success('Sauvegarde complète exportée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'export complet:', error);
      toast.error(`Erreur lors de l'export: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error('Aucun fichier sélectionné');
      return;
    }

    setIsImporting(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      const success = onImport(data);
      if (success) {
        toast.success('Données importées avec succès');
        setFile(null);
      }
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      toast.error(`Erreur lors de l'import: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sauvegarde et Restauration</CardTitle>
        <CardDescription>
          Exportez et importez des sauvegardes complètes de la base de données
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription>
            L'importation remplacera toutes les données existantes. Assurez-vous de faire une sauvegarde avant d'importer.
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="backup-file" className="block mb-2">
              Fichier de sauvegarde
            </Label>
            <Input
              id="backup-file"
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="mb-2"
            />
            {file && (
              <p className="text-xs text-muted-foreground">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>
          
          <div className="flex items-end space-x-2">
            <Button 
              variant="outline" 
              onClick={handleExportAll}
            >
              <Download className="mr-2 h-4 w-4" />
              Exporter Tout
            </Button>
            
            <Button 
              variant="default" 
              onClick={handleImport}
              disabled={!file || isImporting}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isImporting ? 'Importation...' : 'Importer'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
