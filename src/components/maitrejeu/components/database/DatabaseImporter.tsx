
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadCloud, FileUp, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useMaitreJeu } from '../../context';

export const DatabaseImporter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<string>('');
  const [importMethod, setImportMethod] = useState<'file' | 'paste'>('file');
  const [importPreview, setImportPreview] = useState<any>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Lire le contenu du fichier
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content);
          setImportPreview(parsed);
        } catch (error) {
          toast.error("Format de fichier invalide");
          setImportPreview(null);
        }
      };
      reader.readAsText(selectedFile);
    }
  };
  
  const handleJsonDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData(e.target.value);
    
    try {
      if (e.target.value.trim()) {
        const parsed = JSON.parse(e.target.value);
        setImportPreview(parsed);
      } else {
        setImportPreview(null);
      }
    } catch (error) {
      setImportPreview(null);
    }
  };
  
  const handleImport = () => {
    if (!importPreview) {
      toast.error("Aucune donnée valide à importer");
      return;
    }
    
    try {
      // Ici vous pourriez implémenter la logique pour importer les données
      // dans votre état d'application ou votre base de données
      
      // Exemple de traitement des données (simulé)
      setTimeout(() => {
        toast.success("Données importées avec succès");
        setFile(null);
        setJsonData('');
        setImportPreview(null);
      }, 1000);
    } catch (error) {
      toast.error("Erreur lors de l'importation");
    }
  };
  
  const getPreviewCount = () => {
    if (!importPreview) return {};
    
    const counts: Record<string, number> = {};
    
    Object.keys(importPreview).forEach(key => {
      if (Array.isArray(importPreview[key])) {
        counts[key] = importPreview[key].length;
      }
    });
    
    return counts;
  };
  
  const previewCounts = getPreviewCount();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Importer des données</CardTitle>
        <CardDescription>
          Importez des données depuis un fichier JSON ou collez-les directement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={importMethod} 
          onValueChange={(value) => setImportMethod(value as 'file' | 'paste')}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">Fichier</TabsTrigger>
            <TabsTrigger value="paste">Texte JSON</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file">Sélectionner un fichier JSON</Label>
              <Input
                id="file"
                type="file"
                accept=".json"
                onChange={handleFileChange}
              />
            </div>
            
            {file && (
              <div className="text-sm text-muted-foreground">
                Fichier sélectionné: {file.name} ({Math.round(file.size / 1024)} ko)
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="paste" className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="json-data">Coller le contenu JSON</Label>
              <textarea
                id="json-data"
                value={jsonData}
                onChange={handleJsonDataChange}
                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder='{"familles": [], "senateurs": []}'
              />
            </div>
          </TabsContent>
        </Tabs>
        
        {importPreview && Object.keys(previewCounts).length > 0 && (
          <div className="mt-6 mb-6">
            <h3 className="text-sm font-medium mb-2">Aperçu de l'import:</h3>
            <ul className="space-y-1 text-sm">
              {Object.entries(previewCounts).map(([key, count]) => (
                <li key={key} className="flex items-center">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className="ml-1 font-medium">{count} éléments</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {!importPreview && (jsonData.trim() || file) && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Format invalide</AlertTitle>
            <AlertDescription>
              Le format des données n'est pas un JSON valide.
            </AlertDescription>
          </Alert>
        )}
        
        <Button 
          onClick={handleImport} 
          className="w-full mt-6"
          disabled={!importPreview}
        >
          <UploadCloud className="mr-2 h-4 w-4" />
          Importer les données
        </Button>
      </CardContent>
    </Card>
  );
};
