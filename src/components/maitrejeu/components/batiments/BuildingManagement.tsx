
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUp, Download, RefreshCw } from 'lucide-react';
import { useMaitreJeu } from '../../context';
import { toast } from 'sonner';

export const BuildingManagement: React.FC = () => {
  const { currentYear, currentSeason } = useMaitreJeu();
  const [isLoading, setIsLoading] = useState(false);

  const handleDegradeBuildings = () => {
    setIsLoading(true);
    
    // Simuler la dégradation des bâtiments
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Dégradation naturelle des bâtiments appliquée');
    }, 1000);
  };

  const handleExportData = () => {
    toast.success('Export des données de bâtiments en cours...');
    // Logique d'export ici
  };

  const handleImportData = () => {
    toast.success('Import des données de bâtiments en cours...');
    // Logique d'import ici
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Administration des Bâtiments</CardTitle>
        <CardDescription>
          Outils de gestion de masse et maintenance périodique
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleDegradeBuildings}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4" />
            {isLoading ? 'En cours...' : 'Appliquer dégradation naturelle'}
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleExportData}
          >
            <Download className="h-4 w-4" />
            Exporter données
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleImportData}
          >
            <FileUp className="h-4 w-4" />
            Importer données
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground border-t pt-4">
          <p>Période actuelle: An {currentYear}, {currentSeason}</p>
          <p className="mt-2">
            La dégradation naturelle des bâtiments est calculée automatiquement en fonction de 
            leur âge, de leur type et de leur niveau d'entretien. Vous pouvez forcer ce calcul 
            manuellement si nécessaire.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
