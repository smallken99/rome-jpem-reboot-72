
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useDatabaseManager } from './hooks/useDatabaseManager';
import { Download, FileDown, Save, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

export const DatabaseExporter: React.FC = () => {
  const { tableDetails, exportTable, exportAllTables, createBackup } = useDatabaseManager();
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(() => {
    // Initialiser avec toutes les tables sélectionnées
    const initialState: Record<string, boolean> = {};
    Object.keys(tableDetails).forEach(key => {
      initialState[key] = true;
    });
    return initialState;
  });
  const [exportFormat, setExportFormat] = useState<'json' | 'sql'>('json');
  const [exportMode, setExportMode] = useState<'tables' | 'backup'>('tables');
  const [backupDescription, setBackupDescription] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  
  // Tables groupées par catégorie
  const categories = [
    {
      title: "Données du jeu",
      tables: ['senateurs', 'familles', 'membres', 'alliances', 'provinces']
    },
    {
      title: "Politique",
      tables: ['lois', 'evenements', 'histoire', 'clients']
    },
    {
      title: "Économie",
      tables: ['economie', 'tresor', 'batiments', 'republique', 'population']
    }
  ];
  
  // Fonction pour sélectionner/désélectionner toutes les tables
  const toggleSelectAll = (selected: boolean) => {
    const newSelectedItems = { ...selectedItems };
    Object.keys(tableDetails).forEach(key => {
      newSelectedItems[key] = selected;
    });
    setSelectedItems(newSelectedItems);
  };
  
  // Fonction pour sélectionner/désélectionner une catégorie
  const toggleCategory = (category: string[], selected: boolean) => {
    const newSelectedItems = { ...selectedItems };
    category.forEach(key => {
      if (tableDetails[key]) {
        newSelectedItems[key] = selected;
      }
    });
    setSelectedItems(newSelectedItems);
  };
  
  // Vérifier si au moins une table est sélectionnée
  const isAnyTableSelected = Object.values(selectedItems).some(v => v);
  
  // Vérifier si toutes les tables sont sélectionnées
  const areAllTablesSelected = Object.values(selectedItems).every(v => v);
  
  // Vérifier si une catégorie est entièrement sélectionnée
  const isCategorySelected = (category: string[]) => {
    return category.every(key => selectedItems[key]);
  };
  
  // Vérifier si une catégorie est partiellement sélectionnée
  const isCategoryIndeterminate = (category: string[]) => {
    const selected = category.filter(key => selectedItems[key]);
    return selected.length > 0 && selected.length < category.length;
  };
  
  // Simuler un export avec progression
  const handleExport = async () => {
    if (!isAnyTableSelected && exportMode === 'tables') {
      toast.error("Veuillez sélectionner au moins une table");
      return;
    }
    
    setIsExporting(true);
    setExportProgress(0);
    
    try {
      if (exportMode === 'backup') {
        // Simuler la progression
        for (let i = 0; i <= 100; i += 10) {
          setExportProgress(i);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        createBackup(backupDescription);
      } else {
        // Export de tables individuelles
        const selectedTables = Object.entries(selectedItems)
          .filter(([_, selected]) => selected)
          .map(([key]) => key);
          
        if (selectedTables.length === Object.keys(tableDetails).length) {
          // Simuler la progression
          for (let i = 0; i <= 100; i += 10) {
            setExportProgress(i);
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          
          exportAllTables();
        } else {
          const totalTables = selectedTables.length;
          
          for (let i = 0; i < totalTables; i++) {
            const tableKey = selectedTables[i];
            setExportProgress(Math.floor((i / totalTables) * 100));
            await new Promise(resolve => setTimeout(resolve, 200));
            
            exportTable(tableKey);
          }
          
          setExportProgress(100);
        }
      }
      
      toast.success(exportMode === 'backup' ? "Sauvegarde créée avec succès" : "Export réalisé avec succès");
      
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'export");
      console.error(error);
    } finally {
      // Réinitialiser après un court délai pour montrer la progression complète
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 500);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Exporter les données</CardTitle>
        <CardDescription>
          Exportez ou sauvegardez vos données de jeu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={exportMode} onValueChange={(value) => setExportMode(value as 'tables' | 'backup')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="tables">Exporter des tables</TabsTrigger>
            <TabsTrigger value="backup">Créer une sauvegarde</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tables">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="select-all" 
                    checked={areAllTablesSelected}
                    onCheckedChange={(checked) => 
                      toggleSelectAll(!!checked)
                    }
                  />
                  <Label htmlFor="select-all" className="font-medium">Tout sélectionner</Label>
                </div>
                
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExportFormat('json')}
                    className={exportFormat === 'json' ? 'bg-primary/10' : ''}
                  >
                    Format JSON
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExportFormat('sql')}
                    className={exportFormat === 'sql' ? 'bg-primary/10' : ''}
                    disabled
                  >
                    Format SQL
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                {categories.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${index}`} 
                        checked={isCategorySelected(category.tables)}
                        indeterminate={isCategoryIndeterminate(category.tables)}
                        onCheckedChange={(checked) => 
                          toggleCategory(category.tables, !!checked)
                        }
                      />
                      <Label htmlFor={`category-${index}`} className="font-semibold">{category.title}</Label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-6">
                      {category.tables.map((tableKey) => tableDetails[tableKey] && (
                        <div key={tableKey} className="flex items-center space-x-2">
                          <Checkbox 
                            id={tableKey} 
                            checked={selectedItems[tableKey]}
                            onCheckedChange={(checked) => 
                              setSelectedItems({
                                ...selectedItems,
                                [tableKey]: !!checked
                              })
                            }
                          />
                          <Label htmlFor={tableKey}>
                            {tableDetails[tableKey].name}
                            <span className="ml-2 text-xs text-muted-foreground">
                              ({tableDetails[tableKey].recordCount} enregistrements)
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                    
                    {index < categories.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="backup">
            <div className="space-y-4 mb-6">
              <p className="text-muted-foreground">
                Créez une sauvegarde complète de toutes les données du jeu. 
                Les sauvegardes sont stockées localement et peuvent être restaurées ultérieurement.
              </p>
              
              <div className="grid gap-2">
                <Label htmlFor="backup-description">Description de la sauvegarde</Label>
                <textarea
                  id="backup-description"
                  className="min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  placeholder="Décrivez cette sauvegarde (optionnel)"
                  value={backupDescription}
                  onChange={(e) => setBackupDescription(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {isExporting && (
          <div className="mb-6">
            <Label className="text-sm text-muted-foreground mb-2 block">
              Export en cours... {exportProgress}%
            </Label>
            <Progress value={exportProgress} className="h-2" />
          </div>
        )}
        
        <Button 
          onClick={handleExport} 
          className="w-full"
          disabled={isExporting || (exportMode === 'tables' && !isAnyTableSelected)}
        >
          {exportMode === 'backup' ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Créer une sauvegarde
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Exporter les données sélectionnées
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
