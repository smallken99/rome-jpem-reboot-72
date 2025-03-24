
import React, { useState } from 'react';
import { useSlaveManagement } from './property-management/slaves/useSlaveManagement';
import { SlaveStatistics } from './property-management/slaves/SlaveStatistics';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, Minus, DollarSign, UserCheck, BarChart3, ShoppingCart, Store
} from 'lucide-react';
import { SlaveMarket } from './property-management/slaves/SlaveMarket';
import { SlaveAssignments } from './property-management/slaves/SlaveAssignments';
import { toast } from 'sonner';

export const SlavesOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const [sellAmount, setSellAmount] = useState(1);
  
  const {
    totalSlaves,
    slavePrice,
    assignedSlaves,
    slaveAssignments,
    purchaseSlaves,
    sellSlaves,
    assignSlavesToProperty,
    removeSlaveAssignment,
    balance
  } = useSlaveManagement();
  
  const handlePurchase = () => {
    if (purchaseAmount <= 0) {
      toast.error("Veuillez entrer une quantité valide");
      return;
    }
    
    purchaseSlaves(purchaseAmount);
  };
  
  const handleSell = () => {
    if (sellAmount <= 0) {
      toast.error("Veuillez entrer une quantité valide");
      return;
    }
    
    if (sellAmount > (totalSlaves - assignedSlaves)) {
      toast.error(`Vous ne pouvez vendre que ${totalSlaves - assignedSlaves} esclaves non assignés`);
      return;
    }
    
    sellSlaves(sellAmount);
  };
  
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-cinzel">Gestion des Esclaves</h2>
      
      <SlaveStatistics
        totalSlaves={totalSlaves}
        assignedSlaves={assignedSlaves}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Vue d'ensemble</span>
          </TabsTrigger>
          <TabsTrigger value="market" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Marché aux esclaves</span>
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span>Affectations</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Coûts et Valeur</CardTitle>
                <CardDescription>
                  Estimation de la valeur de main-d'œuvre
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Valeur marchande totale:</span>
                    <span className="font-semibold">{(totalSlaves * slavePrice).toLocaleString()} As</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Coût par esclave:</span>
                    <span className="font-semibold">{slavePrice.toLocaleString()} As</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Coût d'entretien mensuel:</span>
                    <span className="font-semibold">{(totalSlaves * 50).toLocaleString()} As</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
                <CardDescription>
                  Acheter ou vendre des esclaves
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <label className="block text-sm mb-1">Acheter des esclaves</label>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setPurchaseAmount(Math.max(1, purchaseAmount - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input 
                          type="number" 
                          value={purchaseAmount} 
                          onChange={(e) => setPurchaseAmount(parseInt(e.target.value))}
                          className="w-16 mx-2 text-center"
                          min={1}
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setPurchaseAmount(purchaseAmount + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={handlePurchase}
                      className="flex items-center gap-1"
                      disabled={purchaseAmount * slavePrice > balance}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Acheter</span>
                    </Button>
                  </div>
                  
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <label className="block text-sm mb-1">Vendre des esclaves</label>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSellAmount(Math.max(1, sellAmount - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input 
                          type="number" 
                          value={sellAmount} 
                          onChange={(e) => setSellAmount(parseInt(e.target.value))}
                          className="w-16 mx-2 text-center"
                          min={1}
                          max={totalSlaves - assignedSlaves}
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSellAmount(Math.min(totalSlaves - assignedSlaves, sellAmount + 1))}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={handleSell}
                      className="flex items-center gap-1"
                      variant="secondary"
                      disabled={totalSlaves - assignedSlaves === 0}
                    >
                      <Store className="h-4 w-4" />
                      <span>Vendre</span>
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-md border border-amber-200 mt-2">
                    <p className="text-sm text-amber-700 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-amber-600" />
                      Prix actuel: <span className="font-semibold ml-1">{slavePrice} As par esclave</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="market">
          <SlaveMarket 
            slavePrice={slavePrice}
            balance={balance}
            availableSlaves={totalSlaves - assignedSlaves}
            onPurchase={purchaseSlaves}
            onSell={sellSlaves}
          />
        </TabsContent>
        
        <TabsContent value="assignments">
          <SlaveAssignments 
            slaveAssignments={slaveAssignments}
            availableSlaves={totalSlaves - assignedSlaves}
            onAssignSlaves={assignSlavesToProperty}
            onRemoveAssignment={removeSlaveAssignment}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
