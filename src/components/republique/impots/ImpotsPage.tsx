
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImpotsStats } from './ImpotsStats';
import { ImpotsTable } from './ImpotsTable';
import { ImpotsForecast } from './ImpotsForecast';
import { ExemptionsTable } from './ExemptionsTable';
import { Button } from '@/components/ui/button';
import { ButtonProps } from '@/components/ui/button';
import { Import, Database, BarChart, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ImpotsPage: React.FC = () => {
  const [isRapportDialogOpen, setIsRapportDialogOpen] = useState(false);
  
  const handleGenerateReport = () => {
    toast.success("Rapport généré avec succès");
    setIsRapportDialogOpen(false);
  };
  
  const handleExportData = () => {
    toast.success("Données fiscales exportées avec succès");
  };
  
  const handleRecalculate = () => {
    toast.info("Recalcul des impôts en cours...");
    setTimeout(() => {
      toast.success("Recalcul terminé");
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Gestion des Impôts" 
          subtitle="Administration fiscale de la République romaine" 
        />
        
        <div className="flex gap-2">
          <ActionButton 
            icon={<FileText className="h-4 w-4" />} 
            label="Rapport" 
            variant="outline"
            onClick={() => setIsRapportDialogOpen(true)}
          />
          <ActionButton 
            icon={<BarChart className="h-4 w-4" />} 
            label="Recalculer" 
            variant="outline"
            onClick={handleRecalculate}
          />
          <ActionButton 
            icon={<Download className="h-4 w-4" />} 
            label="Exporter" 
            variant="outline"
            onClick={handleExportData}
          />
        </div>
      </div>
      
      <ImpotsStats />
      
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-white">
          <TabsTrigger value="current">Impôts Actuels</TabsTrigger>
          <TabsTrigger value="forecast">Prévisions</TabsTrigger>
          <TabsTrigger value="exemptions">Exemptions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Tributs et Taxes</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <ImpotsTable />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="forecast">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Prévisions Fiscales</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <ImpotsForecast />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="exemptions">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Exemptions Fiscales</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                En tant que questeur, vous pouvez accorder des exemptions d'impôts à certains citoyens ou communautés en récompense de services rendus à Rome.
              </p>
              <ExemptionsTable />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isRapportDialogOpen} onOpenChange={setIsRapportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Générer un rapport fiscal</DialogTitle>
            <DialogDescription>
              Créez un rapport détaillé sur la collecte des impôts pour le présenter au Sénat.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">
                Période
              </Label>
              <Input
                id="period"
                defaultValue="45 av. J.-C."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input
                id="type"
                defaultValue="Rapport complet"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRapportDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleGenerateReport}>Générer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  variant?: ButtonProps['variant'];
  onClick: () => void;
}> = ({ icon, label, variant = 'default', onClick }) => {
  return (
    <Button
      variant={variant}
      size="sm"
      className="flex items-center gap-1 roman-btn-outline"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};
