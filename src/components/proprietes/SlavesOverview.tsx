
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
import { Slave } from './types/slave';

export const SlavesOverview: React.FC = () => {
  const {
    slaves,
    totalSlaves,
    assignedSlaves,
    availableSlaves,
    slaveAssignments,
    slavePrice,
    purchaseSlaves,
    sellSlaves,
    removeSlaveAssignment,
    balance
  } = useSlaveManagement();
  
  const { buildings } = useBuildingManagement();
  const { balance: economyBalance = balance } = useEconomy();
  const [activeTab, setActiveTab] = useState('overview');
  
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
                assignedSlaves={assignedSlaves.length} 
                availableSlaves={availableSlaves.length}
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
                balance={economyBalance}
                slavePrice={slavePrice}
                totalSlaves={totalSlaves}
                onPurchase={purchaseSlaves}
                onSell={sellSlaves}
              />
              
              <SlavesList 
                slaves={slaves}
                onDeleteSlave={(id) => sellSlaves([id])}
              />
            </TabsContent>
            
            <TabsContent value="assignments" className="mt-6 space-y-6">
              <div className="grid gap-4">
                {slaveAssignments.length > 0 ? (
                  slaveAssignments.map(assignment => (
                    <SlaveAssignment 
                      key={assignment.id}
                      assignment={assignment}
                      buildings={buildings}
                      onRevoke={() => removeSlaveAssignment(assignment.slaveId)}
                    />
                  ))
                ) : (
                  <p className="text-center py-8 text-muted-foreground">
                    Aucun esclave assigné pour le moment
                  </p>
                )}
              </div>
              
              <Button 
                onClick={() => setActiveTab('slaves')}
                disabled={availableSlaves.length <= 0}
              >
                Assigner de nouveaux esclaves
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
