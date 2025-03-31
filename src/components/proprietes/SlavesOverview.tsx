
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useSlaveManagement } from '@/hooks/useSlaveManagement';
import { useBuildingManagement } from '@/hooks/useBuildingManagement';
import { useEconomy } from '@/hooks/useEconomy';
import { SlavesList } from './property-management/slaves/SlavesList';
import { SlaveAssignment } from './property-management/slaves/SlaveAssignment';
import { SlavePurchaseForm } from './property-management/slaves/SlavePurchaseForm';
import { SlaveStatistics } from './property-management/slaves/SlaveStatistics';

export const SlavesOverview: React.FC = () => {
  const slaveManagement = useSlaveManagement();
  const { totalSlaves = 50, slavePrice = 1000, assignedSlaves = 0, slaves = [], assignments = [] } = slaveManagement;
  const { buildings } = useBuildingManagement();
  const { balance = 0 } = useEconomy();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Define mock functions if they don't exist in slaveManagement
  const mockPurchaseSlaves = (count: number, price: number) => {
    console.log(`Mock purchasing ${count} slaves at ${price} each`);
    return true;
  };
  
  const mockSellSlaves = (count: number) => {
    console.log(`Mock selling ${count} slaves`);
    return true;
  };
  
  const mockAssignSlavesToProperty = (buildingId: string, count: number) => {
    console.log(`Mock assigning ${count} slaves to building ${buildingId}`);
    return true;
  };
  
  const mockRemoveSlaveAssignment = (assignmentId: string) => {
    console.log(`Mock removing slave assignment ${assignmentId}`);
    return true;
  };
  
  const purchaseSlaves = slaveManagement.purchaseSlaves || mockPurchaseSlaves;
  const sellSlaves = slaveManagement.sellSlaves || mockSellSlaves;
  const assignSlavesToProperty = slaveManagement.assignSlavesToProperty || mockAssignSlavesToProperty;
  const removeSlaveAssignment = slaveManagement.removeSlaveAssignment || mockRemoveSlaveAssignment;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des esclaves</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="slaves">Esclaves</TabsTrigger>
              <TabsTrigger value="assignments">Assignations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <SlaveStatistics 
                totalSlaves={totalSlaves} 
                assignedSlaves={assignedSlaves} 
                availableSlaves={totalSlaves - assignedSlaves}
                slaveValue={slavePrice}
              />
              
              <div className="mt-8 flex justify-between">
                <Button 
                  onClick={() => setActiveTab('slaves')}
                  variant="outline"
                >
                  Gérer les esclaves
                </Button>
                <Button 
                  onClick={() => setActiveTab('assignments')}
                >
                  Gérer les assignations
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="slaves" className="mt-6 space-y-8">
              <SlavePurchaseForm 
                balance={balance}
                slavePrice={slavePrice}
                totalSlaves={totalSlaves}
                onPurchase={purchaseSlaves}
                onSell={sellSlaves}
              />
              
              <SlavesList 
                slaves={slaves}
                onDeleteSlave={(id) => console.log('Delete slave', id)}
              />
            </TabsContent>
            
            <TabsContent value="assignments" className="mt-6 space-y-6">
              <div className="grid gap-4">
                {assignments.map(assignment => (
                  <SlaveAssignment 
                    key={assignment.id}
                    assignment={assignment}
                    buildings={buildings}
                    onRevoke={removeSlaveAssignment}
                  />
                ))}
                
                {assignments.length === 0 && (
                  <p className="text-center py-8 text-muted-foreground">
                    Aucun esclave assigné pour le moment
                  </p>
                )}
              </div>
              
              <Button 
                onClick={() => console.log('New assignment')}
                disabled={totalSlaves - assignedSlaves <= 0}
              >
                Nouvelle assignation
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
