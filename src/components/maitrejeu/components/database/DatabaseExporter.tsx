
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useMaitreJeu } from '../../context';
import { Download, FileDown } from 'lucide-react';
import { toast } from 'sonner';

export const DatabaseExporter: React.FC = () => {
  const { familles, senateurs, provinces, lois } = useMaitreJeu();
  const [selectedItems, setSelectedItems] = useState({
    familles: true,
    senateurs: true,
    provinces: true,
    lois: true,
    evenements: false,
    economie: false,
    batiments: false,
  });

  const handleExport = () => {
    // Préparer les données à exporter
    const dataToExport: Record<string, any> = {};
    
    if (selectedItems.familles) dataToExport.familles = familles;
    if (selectedItems.senateurs) dataToExport.senateurs = senateurs;
    if (selectedItems.provinces) dataToExport.provinces = provinces;
    if (selectedItems.lois) dataToExport.lois = lois;
    
    // Convertir en JSON
    const jsonData = JSON.stringify(dataToExport, null, 2);
    
    // Créer un blob et un lien de téléchargement
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `romejpem_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Export réalisé avec succès");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Exporter les données</CardTitle>
        <CardDescription>
          Sélectionnez les données que vous souhaitez exporter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="familles" 
                checked={selectedItems.familles}
                onCheckedChange={(checked) => 
                  setSelectedItems(prev => ({ ...prev, familles: checked === true }))
                }
              />
              <Label htmlFor="familles">Familles ({familles.length})</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="senateurs" 
                checked={selectedItems.senateurs}
                onCheckedChange={(checked) => 
                  setSelectedItems(prev => ({ ...prev, senateurs: checked === true }))
                }
              />
              <Label htmlFor="senateurs">Sénateurs ({senateurs.length})</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="provinces" 
                checked={selectedItems.provinces}
                onCheckedChange={(checked) => 
                  setSelectedItems(prev => ({ ...prev, provinces: checked === true }))
                }
              />
              <Label htmlFor="provinces">Provinces ({provinces.length})</Label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="lois" 
                checked={selectedItems.lois}
                onCheckedChange={(checked) => 
                  setSelectedItems(prev => ({ ...prev, lois: checked === true }))
                }
              />
              <Label htmlFor="lois">Lois ({lois.length})</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="evenements" 
                checked={selectedItems.evenements}
                onCheckedChange={(checked) => 
                  setSelectedItems(prev => ({ ...prev, evenements: checked === true }))
                }
              />
              <Label htmlFor="evenements">Événements</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="economie" 
                checked={selectedItems.economie}
                onCheckedChange={(checked) => 
                  setSelectedItems(prev => ({ ...prev, economie: checked === true }))
                }
              />
              <Label htmlFor="economie">Économie</Label>
            </div>
          </div>
        </div>
        
        <Button onClick={handleExport} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Exporter les données
        </Button>
      </CardContent>
    </Card>
  );
};
