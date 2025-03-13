
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TresorStats } from './TresorStats';
import { TresorChart } from './TresorChart';
import { TresorTable } from './TresorTable';
import { TresorReserves } from './TresorReserves';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Plus, Coins } from 'lucide-react';
import { toast } from 'sonner';

export const TresorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('apercu');
  
  const handleExportData = () => {
    toast.success("Données financières exportées avec succès");
  };
  
  const handleRefresh = () => {
    toast.success("Données du trésor actualisées");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Trésor Public" 
          subtitle="Gestion des finances de la République romaine" 
        />
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="flex items-center gap-1 roman-btn-outline"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Actualiser</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExportData}
            className="flex items-center gap-1 roman-btn-outline"
          >
            <Download className="h-4 w-4" />
            <span>Exporter</span>
          </Button>
        </div>
      </div>
      
      <TresorStats />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-white">
          <TabsTrigger value="apercu">Aperçu</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="depenses">Dépenses Publiques</TabsTrigger>
          <TabsTrigger value="reserves">Réserves</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apercu">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Situation Financière</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Vue d'ensemble des finances de la République pour l'année en cours.
                </p>
                <TresorChart />
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="transactions">
          <RomanCard>
            <RomanCard.Header>
              <div className="flex justify-between items-center">
                <h2 className="font-cinzel text-lg">Transactions Récentes</h2>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex items-center gap-1 roman-btn-outline"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nouvelle transaction</span>
                </Button>
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <TresorTable />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="depenses">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Dépenses Publiques</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="space-y-6">
                <p className="text-muted-foreground mb-4">
                  Répartition des dépenses publiques par catégorie et par magistrature.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 bg-white">
                    <h3 className="font-medium mb-4">Dépenses par Catégorie</h3>
                    <div className="h-64 flex items-center justify-center">
                      <Coins className="h-16 w-16 text-muted" />
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 bg-white">
                    <h3 className="font-medium mb-4">Dépenses par Magistrature</h3>
                    <div className="h-64 flex items-center justify-center">
                      <Coins className="h-16 w-16 text-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="reserves">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Réserves Stratégiques</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <TresorReserves />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
