
import React, { useState } from 'react';
import { OwnedUrbanPropertyList } from './OwnedUrbanPropertyList';
import { OwnedUrbanPropertyDetail } from './OwnedUrbanPropertyDetail';
import { useOwnedBuildings } from '@/components/proprietes/hooks/building/useOwnedBuildings';
import { useSlaveAssignment } from '@/components/proprietes/hooks/building/useSlaveAssignment';
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';
import { UrbanBuildingFilter } from '../UrbanBuildingFilter';

export const OwnedUrbanPropertiesSection: React.FC = () => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [filterText, setFilterText] = useState('');
  const [locationFilter, setLocationFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
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
  
  // Filtrer les bâtiments urbains
  const urbanBuildings = ownedBuildings.filter(building => 
    building.buildingType === "urban"
  );
  
  // Appliquer les filtres
  const filteredBuildings = urbanBuildings.filter(building => {
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
    
    return true;
  });
  
  const selectedBuilding = selectedBuildingId 
    ? urbanBuildings.find(b => b.id.toString() === selectedBuildingId) 
    : null;
  
  const handleBuildingSelect = (buildingId: string) => {
    setSelectedBuildingId(buildingId);
  };
  
  const handleBackToList = () => {
    setSelectedBuildingId(null);
  };
  
  const handleToggleMaintenance = (buildingId: string, enabled: boolean) => {
    toggleMaintenanceStatus(buildingId, enabled);
  };
  
  return (
    <div className="space-y-6">
      {selectedBuildingId ? (
        <OwnedUrbanPropertyDetail
          building={selectedBuilding as OwnedBuilding}
          onBack={handleBackToList}
          onMaintenance={() => {
            performMaintenance(selectedBuildingId);
          }}
          onMaintenanceToggle={(enabled) => handleToggleMaintenance(selectedBuildingId, enabled)}
          onAssignSlaves={(count) => assignSlavesToBuilding(selectedBuildingId, count)}
          onCollectIncome={() => {
            collectIncome(selectedBuildingId);
          }}
          onSell={() => sellBuilding(selectedBuildingId)}
          onRename={(newName) => renameBuilding(selectedBuildingId, newName)}
          estimatedValue={getEstimatedValue(selectedBuildingId)}
          efficiency={getEfficiency(selectedBuildingId)}
        />
      ) : (
        <>
          <UrbanBuildingFilter
            onFilterChange={setFilterText}
            onLocationFilter={setLocationFilter}
            onStatusFilter={setStatusFilter}
            filterValue={filterText}
            locationFilter={locationFilter}
            statusFilter={statusFilter}
          />
          <OwnedUrbanPropertyList
            buildings={filteredBuildings}
            onSelectBuilding={handleBuildingSelect}
          />
        </>
      )}
    </div>
  );
};
