
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  EconomieStats, 
  EconomieTable, 
  EconomieFilters, 
  EconomieModal, 
  EconomieActions,
  useEconomieManagement
} from '@/components/maitrejeu/components/economie';
import { useMaitreJeu } from '@/components/maitrejeu/context';

export const GestionEconomie: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('transactions');
  const [showAlert, setShowAlert] = React.useState(true);
  
  const {
    economieRecords,
    filter,
    sort,
    isModalOpen,
    selectedRecord,
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
  
  const { treasury } = useMaitreJeu();
  
  return (
    <div className="space-y-6">
      {showAlert && treasury.balance < 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Trésor en déficit</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>Le trésor public est actuellement en déficit. Des mesures doivent être prises pour rétablir l'équilibre financier.</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAlert(false)}
            >
              Fermer
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <EconomieStats />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="transactions" className="flex-1">Transactions</TabsTrigger>
          <TabsTrigger value="treasury" className="flex-1">Trésor Public</TabsTrigger>
          <TabsTrigger value="projections" className="flex-1">Projections</TabsTrigger>
          <TabsTrigger value="reports" className="flex-1">Rapports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <EconomieActions
                onAddTransaction={handleAddTransaction}
                onGenerateReport={handleGenerateReport}
                onCalculateProjections={handleCalculateProjections}
                onRefreshData={handleRefreshData}
              />
              
              <EconomieFilters
                filter={filter}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
              />
              
              <div className="mt-6">
                <EconomieTable
                  records={economieRecords}
                  onEdit={handleEditTransaction}
                  onDelete={handleDeleteTransaction}
                  sort={sort}
                  onSortChange={handleSortChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="treasury" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Trésor Public</h3>
              <p className="text-muted-foreground mb-6">
                Gérez les finances du trésor public, surveillez les dépenses et ajustez les politiques fiscales.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <p>Cette fonctionnalité sera disponible prochainement.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projections" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Projections Économiques</h3>
              <p className="text-muted-foreground mb-6">
                Analysez les tendances économiques futures et préparez-vous aux changements à venir.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <p>Cette fonctionnalité sera disponible prochainement.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Rapports Économiques</h3>
              <p className="text-muted-foreground mb-6">
                Consultez et générez des rapports détaillés sur l'état de l'économie.
              </p>
              
              <div className="bg-muted p-4 rounded-md">
                <p>Cette fonctionnalité sera disponible prochainement.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {isModalOpen && (
        <EconomieModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTransaction}
          editRecord={selectedRecord}
        />
      )}
    </div>
  );
};
