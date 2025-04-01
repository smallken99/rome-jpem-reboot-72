
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JsonView } from './JsonView';
import { useDatabaseManager } from './hooks/useDatabaseManager';
import { saveAs } from 'file-saver';
import { 
  DownloadCloud, 
  Check, 
  ClipboardCopy, 
  FileJson,
  Database,
  User,
  Building,
  Map,
  Gavel,
  CalendarDays,
  BarChart4,
  Users,
  Scroll,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';
import { CheckedState } from '@radix-ui/react-checkbox';

// Create a custom checkbox component that supports the indeterminate state
const IndeterminateCheckbox = ({
  id,
  checked,
  indeterminate,
  onCheckedChange
}: {
  id: string;
  checked: boolean;
  indeterminate: boolean;
  onCheckedChange: (checked: CheckedState) => void;
}) => {
  const checkboxRef = React.useRef<HTMLButtonElement>(null);

  // Apply indeterminate prop via useEffect
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.dataset.state = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked';
      checkboxRef.current.ariaChecked = indeterminate ? 'mixed' : checked ? 'true' : 'false';
    }
  }, [checked, indeterminate]);

  return (
    <Checkbox 
      ref={checkboxRef} 
      id={id} 
      checked={checked} 
      onCheckedChange={onCheckedChange} 
    />
  );
};

export const DatabaseExporter = () => {
  const { entities, getEntityData, stats } = useDatabaseManager();
  const [selectedEntities, setSelectedEntities] = useState<Record<string, boolean>>({});
  const [allSelected, setAllSelected] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [exportData, setExportData] = useState<any | null>(null);
  const [exportFormat, setExportFormat] = useState('json');
  const [activeTab, setActiveTab] = useState('selection');

  // Initialize selected entities
  useEffect(() => {
    const initialSelection: Record<string, boolean> = {};
    entities.forEach(entity => {
      initialSelection[entity.id] = false;
    });
    setSelectedEntities(initialSelection);
  }, [entities]);

  // Update all selected status
  useEffect(() => {
    const selected = Object.values(selectedEntities).filter(Boolean).length;
    const total = entities.length;
    
    setAllSelected(selected === total && total > 0);
    setIndeterminate(selected > 0 && selected < total);
  }, [selectedEntities, entities]);

  const handleSelectAll = (checked: boolean) => {
    const newSelection = { ...selectedEntities };
    entities.forEach(entity => {
      newSelection[entity.id] = checked;
    });
    setSelectedEntities(newSelection);
  };

  const handleSelectEntity = (entityId: string, checked: boolean) => {
    setSelectedEntities(prev => ({
      ...prev,
      [entityId]: checked
    }));
  };

  const generateExport = () => {
    const selectedEntityIds = Object.entries(selectedEntities)
      .filter(([_, selected]) => selected)
      .map(([id]) => id);
    
    if (selectedEntityIds.length === 0) {
      toast.error("Veuillez sélectionner au moins une entité à exporter");
      return;
    }
    
    const exportObj: Record<string, any> = {};
    let totalRecords = 0;
    
    selectedEntityIds.forEach(entityId => {
      const data = getEntityData(entityId);
      if (data && Array.isArray(data)) {
        exportObj[entityId] = data;
        totalRecords += data.length;
      }
    });
    
    setExportData(exportObj);
    setActiveTab('preview');
    
    toast.success(`Export généré avec succès`, {
      description: `${selectedEntityIds.length} tables, ${totalRecords} enregistrements`
    });
  };

  const handleDownload = () => {
    if (!exportData) return;
    
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const filename = `romejpem-export-${timestamp}.json`;
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    saveAs(blob, filename);
    
    toast.success(`Export téléchargé`, {
      description: `Fichier: ${filename}`
    });
  };

  const handleCopyToClipboard = () => {
    if (!exportData) return;
    
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    toast.success("Exportation copiée dans le presse-papier");
  };

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'senateurs': return <User className="h-4 w-4" />;
      case 'batiments': return <Building className="h-4 w-4" />;
      case 'provinces': return <Map className="h-4 w-4" />;
      case 'lois': return <Gavel className="h-4 w-4" />;
      case 'evenements': return <CalendarDays className="h-4 w-4" />;
      case 'economie': return <BarChart4 className="h-4 w-4" />;
      case 'clients': return <Users className="h-4 w-4" />;
      case 'histoire': return <Scroll className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Exportation des Données</CardTitle>
          <CardDescription>
            Sélectionnez les entités que vous souhaitez exporter et choisissez un format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="selection">Sélection</TabsTrigger>
              <TabsTrigger value="preview" disabled={!exportData}>Aperçu</TabsTrigger>
            </TabsList>
            
            <TabsContent value="selection">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 p-2 bg-muted/40 rounded-md">
                  <IndeterminateCheckbox
                    id="select-all"
                    checked={allSelected}
                    indeterminate={indeterminate}
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  />
                  <Label htmlFor="select-all" className="font-medium">
                    Sélectionner toutes les entités
                  </Label>
                </div>
                
                <div className="grid md:grid-cols-2 gap-2">
                  {entities.map(entity => (
                    <div 
                      key={entity.id}
                      className="flex items-center p-2 rounded-md border hover:bg-muted/20"
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox 
                          id={`entity-${entity.id}`} 
                          checked={selectedEntities[entity.id] || false}
                          onCheckedChange={(checked) => handleSelectEntity(entity.id, !!checked)}
                        />
                        <div className="flex items-center space-x-2">
                          {getEntityIcon(entity.id)}
                          <Label htmlFor={`entity-${entity.id}`}>{entity.name}</Label>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {entity.count} enregistrements
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center pt-2">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Format d'exportation</h4>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant={exportFormat === 'json' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setExportFormat('json')}
                      >
                        <FileJson className="h-4 w-4 mr-1" />
                        JSON
                      </Button>
                    </div>
                  </div>
                  
                  <Button onClick={generateExport}>
                    Générer l'exportation
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              {exportData && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Aperçu des données à exporter</h3>
                    <div className="space-x-2">
                      <Button variant="outline" onClick={handleCopyToClipboard}>
                        <ClipboardCopy className="h-4 w-4 mr-1" />
                        Copier
                      </Button>
                      <Button onClick={handleDownload}>
                        <DownloadCloud className="h-4 w-4 mr-1" />
                        Télécharger
                      </Button>
                    </div>
                  </div>
                  
                  <JsonView data={exportData} />
                  
                  <div className="bg-muted/30 p-3 rounded-md border flex items-start space-x-2">
                    <div className="text-blue-500 shrink-0 mt-0.5">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Informations de sécurité</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ces données sont exportées sans chiffrement. Ne partagez pas ce fichier publiquement
                        s'il contient des informations sensibles sur votre partie.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
