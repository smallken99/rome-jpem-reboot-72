
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
import { EconomieRecord } from './types/economie';

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

  const handleEdit = (record: EconomieRecord) => {
    handleEditTransaction(record.id);
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
        economieRecords={economieRecords}
      />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Registre Économique</CardTitle>
              <CardDescription>
                Transactions économiques récentes de la République
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <FileDown className="h-4 w-4" />
              Exporter
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="transactions" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6 pt-4 pb-2 border-b">
              <TabsList className="w-full">
                <TabsTrigger value="transactions" className="flex-1">Transactions</TabsTrigger>
                <TabsTrigger value="stats" className="flex-1">Statistiques</TabsTrigger>
                <TabsTrigger value="projections" className="flex-1">Projections</TabsTrigger>
              </TabsList>
            </div>
            <div className="px-6 py-4 border-b">
              <EconomieFilters
                filter={filter}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
              />
            </div>
            
            <TabsContent value="transactions" className="mt-0">
              <div className="rounded-md border">
                <EconomieTable 
                  records={economieRecords}
                  sort={sort}
                  onSortChange={handleSortChange}
                  onEdit={handleEdit}
                  onDelete={handleDeleteTransaction}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="mt-0 p-6">
              <div className="text-center text-muted-foreground">
                Statistiques économiques en cours de développement
              </div>
            </TabsContent>
            
            <TabsContent value="projections" className="mt-0 p-6">
              <div className="text-center text-muted-foreground">
                Projections économiques en cours de développement
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {isModalOpen && (
        <EconomieModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTransaction}
          record={selectedRecord}
        />
      )}
    </div>
  );
};
