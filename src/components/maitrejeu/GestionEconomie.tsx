
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Coins, 
  TrendingUp, 
  BarChart2, 
  FileText, 
  Settings, 
  Store, 
  Building
} from 'lucide-react';
import { useEconomieManagement } from './components/economie/useEconomieManagement';
import { EconomieStats } from './components/economie/EconomieStats';
import { EconomieTable } from './components/economie/EconomieTable';
import { EconomieFilters } from './components/economie/EconomieFilters';
import { EconomieModal } from './components/economie/EconomieModal';
import { EconomieActions } from './components/economie/EconomieActions';
import { TransactionManagement } from './components/economie/TransactionManagement';

export const GestionEconomie = () => {
  const [activeTab, setActiveTab] = useState('apercu');
  const economie = useEconomieManagement();
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion Économique</h1>
          <p className="text-muted-foreground">
            Gérez le trésor public, les taxes, les dépenses et les revenus de Rome
          </p>
        </div>
        
        <EconomieActions 
          onAddTransaction={economie.handleAddTransaction}
          onGenerateReport={economie.handleGenerateReport}
          onRefreshData={economie.handleRefreshData}
        />
      </div>
      
      <EconomieStats treasury={economie.treasury} economicFactors={economie.economicFactors} />
      
      <Card>
        <CardHeader className="px-6 pt-6 pb-3 border-b">
          <CardTitle>Gestion Économique</CardTitle>
          <CardDescription>
            Suivez et gérez les transactions, impôts et projections économiques
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b px-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="apercu" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Aperçu</span>
                </TabsTrigger>
                <TabsTrigger value="transactions" className="flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  <span className="hidden sm:inline">Transactions</span>
                </TabsTrigger>
                <TabsTrigger value="impots" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Impôts</span>
                </TabsTrigger>
                <TabsTrigger value="projections" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Projections</span>
                </TabsTrigger>
                <TabsTrigger value="batiments" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span className="hidden sm:inline">Bâtiments</span>
                </TabsTrigger>
                <TabsTrigger value="parametres" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Paramètres</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="apercu" className="p-6 pt-6">
              <TransactionManagement />
            </TabsContent>
            
            <TabsContent value="transactions" className="p-6 pt-4">
              <div className="space-y-4">
                <EconomieFilters 
                  filter={economie.filter}
                  onFilterChange={economie.handleFilterChange}
                  onResetFilters={economie.handleResetFilters}
                />
                
                <EconomieTable 
                  economieRecords={economie.economieRecords}
                  sort={economie.sort}
                  onSortChange={economie.handleSortChange}
                  onEdit={economie.handleEditTransaction}
                  onDelete={economie.handleDeleteTransaction}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="impots" className="p-6 pt-4">
              <div className="flex flex-col items-center justify-center h-40">
                <Store className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Gestion des Impôts</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Définissez les taux d'imposition, gérez les collectes et visualisez les recettes fiscales
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="projections" className="p-6 pt-4">
              <div className="flex flex-col items-center justify-center h-40">
                <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Projections Économiques</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Analysez les tendances futures des finances de la République basées sur les données actuelles
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="batiments" className="p-6 pt-4">
              <div className="flex flex-col items-center justify-center h-40">
                <Building className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Économie des Bâtiments</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Gérez les revenus et coûts associés aux bâtiments publics de la République
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="parametres" className="p-6 pt-4">
              <div className="flex flex-col items-center justify-center h-40">
                <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Paramètres Économiques</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Configurez les facteurs économiques, les taux d'inflation et autres paramètres monétaires
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <EconomieModal
        isOpen={economie.isModalOpen}
        onClose={() => economie.setIsModalOpen(false)}
        onSave={economie.handleSaveTransaction}
        record={economie.selectedRecord}
      />
    </div>
  );
};
