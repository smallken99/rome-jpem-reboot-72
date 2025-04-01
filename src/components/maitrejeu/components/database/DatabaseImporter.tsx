
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadCloud, FileUp, AlertCircle, FilePlus2, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useDatabaseManager } from './hooks/useDatabaseManager';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const DatabaseImporter: React.FC = () => {
  const { importData, tableDetails } = useDatabaseManager();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<string>('');
  const [importMethod, setImportMethod] = useState<'file' | 'paste'>('file');
  const [importPreview, setImportPreview] = useState<any>(null);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/json' && !selectedFile.name.endsWith('.json')) {
        toast.error("Format de fichier non pris en charge. Veuillez sélectionner un fichier JSON.");
        return;
      }
      
      setFile(selectedFile);
      setValidationErrors([]);
      
      // Lire le contenu du fichier
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content);
          validateImportData(parsed);
          setImportPreview(parsed);
        } catch (error) {
          setImportPreview(null);
          setValidationErrors(["Erreur d'analyse JSON : format invalide"]);
          toast.error("Format de fichier invalide");
        }
      };
      reader.readAsText(selectedFile);
    }
  };
  
  const handleJsonDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData(e.target.value);
    setValidationErrors([]);
    
    try {
      if (e.target.value.trim()) {
        const parsed = JSON.parse(e.target.value);
        validateImportData(parsed);
        setImportPreview(parsed);
      } else {
        setImportPreview(null);
      }
    } catch (error) {
      setImportPreview(null);
      setValidationErrors(["Erreur d'analyse JSON : format invalide"]);
    }
  };
  
  const validateImportData = (data: any) => {
    const errors: string[] = [];
    
    // Validation basique de structure
    if (!data || typeof data !== 'object') {
      errors.push('Les données importées doivent être un objet JSON');
      return;
    }
    
    // Validation de schéma selon la table sélectionnée
    if (selectedTable && Array.isArray(data)) {
      // Validations spécifiques selon le type de table
      switch (selectedTable) {
        case 'senateurs':
          if (!data.every(item => 'nom' in item)) {
            errors.push('Certains enregistrements de sénateurs ne contiennent pas de champ "nom"');
          }
          break;
        case 'familles':
          if (!data.every(item => 'nom' in item)) {
            errors.push('Certains enregistrements de familles ne contiennent pas de champ "nom"');
          }
          break;
        case 'provinces':
          if (!data.every(item => 'nom' in item && 'gouverneur' in item)) {
            errors.push('Certains enregistrements de provinces sont incomplets');
          }
          break;
        // Ajouter d'autres validations spécifiques au besoin
      }
    } else if (selectedTable && !Array.isArray(data)) {
      errors.push(`Les données pour la table ${selectedTable} doivent être un tableau`);
    }
    
    setValidationErrors(errors);
  };
  
  const simulateImport = async () => {
    if (!importPreview) {
      toast.error("Aucune donnée valide à importer");
      return;
    }
    
    if (validationErrors.length > 0) {
      toast.error("Veuillez corriger les erreurs de validation avant d'importer");
      return;
    }
    
    setIsImporting(true);
    setImportProgress(0);
    
    try {
      // Simulation de progression
      for (let i = 0; i <= 100; i += 10) {
        setImportProgress(i);
        await new Promise(resolve => setTimeout(resolve, 150));
      }
      
      // Appel de la fonction d'import
      const result = importData(importPreview, selectedTable || undefined);
      
      if (result) {
        toast.success("Données importées avec succès");
      } else {
        toast.info("Fonction d'import en développement");
      }
      
      // Réinitialiser le formulaire
      setFile(null);
      setJsonData('');
      setImportPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      toast.error(`Erreur lors de l'importation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setTimeout(() => {
        setIsImporting(false);
        setImportProgress(0);
      }, 500);
    }
  };
  
  const getPreviewCount = () => {
    if (!importPreview) return {};
    
    const counts: Record<string, number> = {};
    
    if (Array.isArray(importPreview)) {
      return { [selectedTable || 'items']: importPreview.length };
    }
    
    Object.keys(importPreview).forEach(key => {
      if (Array.isArray(importPreview[key])) {
        counts[key] = importPreview[key].length;
      } else if (importPreview[key] && typeof importPreview[key] === 'object') {
        counts[key] = 1;
      }
    });
    
    return counts;
  };
  
  const previewCounts = getPreviewCount();
  
  const handleReset = () => {
    setFile(null);
    setJsonData('');
    setImportPreview(null);
    setValidationErrors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
            <div className="grid w-full gap-1.5">
              <Label htmlFor="table-select">Table de destination (optionnel)</Label>
              <Select value={selectedTable} onValueChange={setSelectedTable}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les tables (import global)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les tables (import global)</SelectItem>
                  {Object.keys(tableDetails).map(key => (
                    <SelectItem key={key} value={key}>
                      {tableDetails[key].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file">Sélectionner un fichier JSON</Label>
              <Input
                id="file"
                type="file"
                accept=".json"
                ref={fileInputRef}
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
              <Label htmlFor="table-select-paste">Table de destination (optionnel)</Label>
              <Select value={selectedTable} onValueChange={setSelectedTable}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les tables (import global)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les tables (import global)</SelectItem>
                  {Object.keys(tableDetails).map(key => (
                    <SelectItem key={key} value={key}>
                      {tableDetails[key].name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
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
        
        {validationErrors.length > 0 && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreurs de validation</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        
        {importPreview && Object.keys(previewCounts).length > 0 && (
          <div className="mt-6 mb-6">
            <h3 className="text-sm font-medium mb-2">Aperçu de l'import:</h3>
            <ScrollArea className="h-[100px] rounded-md border p-4">
              <ul className="space-y-1">
                {Object.entries(previewCounts).map(([key, count]) => (
                  <li key={key} className="flex items-center">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="ml-1 font-medium">{count} éléments</span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        )}
        
        {!importPreview && (jsonData.trim() || file) && !validationErrors.length && (
          <Alert className="mt-6">
            <FilePlus2 className="h-4 w-4" />
            <AlertTitle>Aucun aperçu disponible</AlertTitle>
            <AlertDescription>
              Les données importées n'ont pas pu être analysées ou sont vides.
            </AlertDescription>
          </Alert>
        )}
        
        {isImporting && (
          <div className="mt-6 mb-6">
            <Label className="text-sm text-muted-foreground mb-2 block">
              Importation en cours... {importProgress}%
            </Label>
            <Progress value={importProgress} className="h-2" />
          </div>
        )}
        
        <div className="flex space-x-2 mt-6">
          <Button 
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Réinitialiser
          </Button>
          
          <Button 
            onClick={simulateImport} 
            className="flex-1"
            disabled={!importPreview || isImporting || validationErrors.length > 0}
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            Importer les données
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
