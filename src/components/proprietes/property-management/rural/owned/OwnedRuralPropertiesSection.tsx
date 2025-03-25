
import React, { useState } from 'react';
import { OwnedRuralPropertyList } from './OwnedRuralPropertyList';
import { OwnedRuralPropertyDetail } from './OwnedRuralPropertyDetail';
import { useOwnedBuildings } from '@/components/proprietes/hooks/building/useOwnedBuildings';
import { useSlaveAssignment } from '@/components/proprietes/hooks/building/useSlaveAssignment';
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';
import { RuralBuildingFilter } from '../RuralBuildingFilter';

export const OwnedRuralPropertiesSection: React.FC = () => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [filterText, setFilterText] = useState('');
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sizeFilter, setSizeFilter] = useState<string | null>(null);
  
  const { 
    ownedBuildings, 
    performMaintenance, 
    sellBuilding, 
    renameBuilding,
    toggleMaintenanceStatus,
    getEstimatedValue,
    collectIncome
  } = useOwnedBuildings();
  
  const { 
    assignSlavesToBuilding,
    getEfficiency
  } = useSlaveAssignment();
  
  // Filtrer les bâtiments ruraux
  const ruralBuildings = ownedBuildings.filter(building => 
    building.buildingType === "rural"
  );
  
  // Appliquer les filtres
  const filteredBuildings = ruralBuildings.filter(building => {
    // Filtre de texte
    if (filterText && !building.name.toLowerCase().includes(filterText.toLowerCase())) {
      return false;
    }
    
    // Filtre de localisation
    if (locationFilter && building.location !== locationFilter) {
      return false;
    }
    
    // Filtre de statut
    if (statusFilter) {
      if (statusFilter === 'maintained' && !building.maintenanceEnabled) {
        return false;
      } else if (statusFilter === 'not-maintained' && building.maintenanceEnabled) {
        return false;
      }
    }
    
    // Filtre de taille
    if (sizeFilter && building.size !== sizeFilter) {
      return false;
    }
    
    return true;
  });
  
  const selectedBuilding = selectedBuildingId 
    ? ruralBuildings.find(b => b.id.toString() === selectedBuildingId) 
    : null;
  
  const handleBuildingSelect = (buildingId: string) => {
    setSelectedBuildingId(buildingId);
  };
  
  const handleBackToList = () => {
    setSelectedBuildingId(null);
  };
  
  const handleMaintenanceToggle = (buildingId: string | number, enabled: boolean) => {
    toggleMaintenanceStatus(buildingId.toString(), enabled);
  };
  
  const handlePerformMaintenance = (buildingId: string | number) => {
    performMaintenance(buildingId.toString());
    return true;
  };
  
  const handleAssignSlaves = (buildingId: string | number, slaveCount: number) => {
    assignSlavesToBuilding(buildingId.toString(), slaveCount);
  };
  
  const handleCollectIncome = (buildingId: string | number) => {
    collectIncome(buildingId.toString());
    return true;
  };
  
  return (
    <div className="space-y-6">
      {selectedBuildingId ? (
        <OwnedRuralPropertyDetail
          building={selectedBuilding as OwnedBuilding}
          onBack={handleBackToList}
          onMaintenance={() => handlePerformMaintenance(selectedBuildingId)}
          onMaintenanceToggle={(enabled) => handleMaintenanceToggle(selectedBuildingId, enabled)}
          onAssignSlaves={(count) => handleAssignSlaves(selectedBuildingId, count)}
          onCollectIncome={() => handleCollectIncome(selectedBuildingId)}
          onSell={() => sellBuilding(selectedBuildingId)}
          onRename={(newName) => renameBuilding(selectedBuildingId, newName)}
          estimatedValue={getEstimatedValue(selectedBuildingId)}
          efficiency={getEfficiency(selectedBuildingId)}
        />
      ) : (
        <>
          <RuralBuildingFilter
            onFilterChange={setFilterText}
            onLocationFilter={setLocationFilter}
            onStatusFilter={setStatusFilter}
            onSizeFilter={setSizeFilter}
            filterValue={filterText}
            locationFilter={locationFilter}
            statusFilter={statusFilter}
            sizeFilter={sizeFilter}
          />
          <OwnedRuralPropertyList
            buildings={filteredBuildings}
            onSelectBuilding={handleBuildingSelect}
          />
        </>
      )}
    </div>
  );
};
