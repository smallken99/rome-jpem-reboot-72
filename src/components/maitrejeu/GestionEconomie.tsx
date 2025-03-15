
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEconomieManagement } from './hooks/useEconomieManagement';
import { EconomieActions } from './components/economie/EconomieActions';
import { EconomieStats } from './components/economie/EconomieStats';
import { EconomieTable } from './components/economie/EconomieTable';
import { EconomieFilters } from './components/economie/EconomieFilters';
import { EconomieModal } from './components/economie/EconomieModal';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GestionEconomie = () => {
  const navigate = useNavigate();
  const {
    economieRecords,
    filter,
    sort,
    isModalOpen,
    selectedRecord,
    treasury,
    economicFactors,
    handleFilterChange,
    handleResetFilters,
    handleSortChange,
    handleAddTransaction,
    handleEditTransaction,
    handleDeleteTransaction,
    handleSaveTransaction,
    handleGenerateReport,
    handleCalculateProjections,
    handleRefreshData,
    setIsModalOpen
  } = useEconomieManagement();

  const [activeTab, setActiveTab] = React.useState('transactions');

  const handleNavigateToBatiments = () => {
    navigate('/maitre-jeu/batiments');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestion de l'Économie</h1>
          <p className="text-muted-foreground">
            Gérez le trésor public, les revenus et les dépenses de la République
          </p>
        </div>
        
        <EconomieActions 
          onAddTransaction={handleAddTransaction}
          onGenerateReport={handleGenerateReport}
          onRefreshData={handleRefreshData}
          onManageBuildings={handleNavigateToBatiments}
          onManageTaxes={() => navigate('/maitre-jeu/taxes')}
          onManageSlaves={() => navigate('/maitre-jeu/esclaves')}
          onCalculateProjections={handleCalculateProjections}
        />
      </div>

      <EconomieStats 
        treasury={treasury} 
        economicFactors={economicFactors} 
      />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Registre Économique</CardTitle>
              <CardDescription>
                Transactions, impôts et finances de la République
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Exporter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="impots">Impôts</TabsTrigger>
              <TabsTrigger value="commerce">Commerce</TabsTrigger>
            </TabsList>
            
            <div className="my-4">
              <EconomieFilters 
                filter={filter}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
              />
            </div>
            
            <TabsContent value="transactions">
              <EconomieTable 
                records={economieRecords}
                sort={sort}
                onSortChange={handleSortChange}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            </TabsContent>
            
            <TabsContent value="impots">
              <div className="p-8 text-center text-muted-foreground">
                <p>Module de gestion des impôts en développement</p>
              </div>
            </TabsContent>
            
            <TabsContent value="commerce">
              <div className="p-8 text-center text-muted-foreground">
                <p>Module de gestion du commerce en développement</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <EconomieModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
        record={selectedRecord}
      />
    </div>
  );
};
