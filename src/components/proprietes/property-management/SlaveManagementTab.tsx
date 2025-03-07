
import React from 'react';
import { Users } from 'lucide-react';
import { useBuildingManagement } from '../hooks/useBuildingManagement';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { SlaveStatistics } from './slaves/SlaveStatistics';
import { SlaveMarket } from './slaves/SlaveMarket';
import { SlaveAssignment } from './slaves/SlaveAssignment';
import { useSlaveManagement } from './slaves/useSlaveManagement';

export const SlaveManagementTab: React.FC = () => {
  const { ownedBuildings, assignSlaves } = useBuildingManagement();
  const { balance } = usePatrimoine();
  const { totalSlaves, slavePrice, purchaseSlaves } = useSlaveManagement();
  
  // Calculer le nombre d'esclaves assignés
  const assignedSlaves = ownedBuildings.reduce((total, prop) => total + prop.slaves, 0);
  const availableSlaves = totalSlaves - assignedSlaves;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-4">
        <div>
          <h3 className="font-cinzel text-lg text-rome-navy">Gestion des Esclaves</h3>
          <p className="text-sm text-muted-foreground">
            Attribuez des esclaves à vos propriétés pour optimiser leur fonctionnement et leur rentabilité.
          </p>
        </div>
      </div>
      
      {/* Statistiques générales */}
      <SlaveStatistics 
        totalSlaves={totalSlaves} 
        assignedSlaves={assignedSlaves} 
      />
      
      {/* Acquisition d'esclaves */}
      <SlaveMarket 
        slavePrice={slavePrice} 
        balance={balance} 
        onPurchase={purchaseSlaves} 
      />
      
      {/* Attribution aux propriétés */}
      <SlaveAssignment 
        buildings={ownedBuildings} 
        availableSlaves={availableSlaves} 
        onAssignSlaves={assignSlaves} 
      />
    </div>
  );
};
