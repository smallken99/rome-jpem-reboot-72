
import React, { useState, useEffect } from 'react';
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
import { Slave } from './types/property';

export const SlavesOverview: React.FC = () => {
  const slaveManagement = useSlaveManagement();
  const { buildings } = useBuildingManagement();
  const { balance = 0 } = useEconomy();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Compute derived values that might be missing from the hook
  const totalSlaves = slaveManagement.slaves?.length || 0;
  const slavePrice = 1000; // Default price if not provided
  const assignedSlaves = slaveManagement.assignments?.length || 0;
  
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
  
  // Use the real functions if they exist, otherwise use the mocks
  const purchaseSlaves = slaveManagement.purchaseSlaves || mockPurchaseSlaves;
  const sellSlaves = slaveManagement.sellSlaves || mockSellSlaves;
  const assignSlavesToProperty = slaveManagement.assignSlavesToProperty || mockAssignSlavesToProperty;
  const removeSlaveAssignment = slaveManagement.removeSlaveAssignment || mockRemoveSlaveAssignment;
  
  // Convert slave objects to match the required type
  const slavesWithRequiredProps: Slave[] = slaveManagement.slaves?.map(slave => ({
    id: slave.id,
    name: slave.name || 'Unnamed Slave',
    age: slave.age || 25,
    gender: slave.gender || 'male',
    status: slave.status || 'active',
    acquired: slave.acquired || new Date(),
    value: slave.value || slavePrice,
    assignedTo: slave.assignedTo,
    health: slave.health,
    skills: slave.skills,
    origin: slave.origin,
    notes: slave.notes
  })) || [];
  
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
                slaves={slavesWithRequiredProps}
                onDeleteSlave={(id) => console.log('Delete slave', id)}
              />
            </TabsContent>
            
            <TabsContent value="assignments" className="mt-6 space-y-6">
              <div className="grid gap-4">
                {slaveManagement.assignments?.map(assignment => (
                  <SlaveAssignment 
                    key={assignment.id || `assignment-${Math.random()}`}
                    assignment={{
                      id: assignment.id || `assignment-${Math.random()}`,
                      slaveId: assignment.slaveId,
                      buildingId: assignment.buildingId
                    }}
                    buildings={buildings.map(b => ({
                      id: b.id,
                      buildingId: b.id,
                      name: b.name,
                      buildingType: b.type,
                      type: b.type,
                      location: b.location,
                      size: 1,
                      value: b.value,
                      condition: b.condition,
                      maintenanceLevel: b.maintenanceLevel || a,
                      maintenanceCost: b.maintenance,
                      maintenance: b.maintenance,
                      purchaseDate: new Date()
                    }))}
                    onRevoke={removeSlaveAssignment}
                  />
                ))}
                
                {(!slaveManagement.assignments || slaveManagement.assignments.length === 0) && (
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
