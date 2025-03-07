
import { useState } from 'react';
import { toast } from 'sonner';
import { ruralProperties } from '@/components/proprietes/data/buildings';
import { BuildingDescription } from '@/components/proprietes/data/types/buildingTypes';
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';

// Interface pour les terres de l'Ager Publicus (basée sur le modèle des bâtiments ruraux)
interface AgerLand {
  id: string;
  name: string;
  location: string;
  description: string;
  size: string;
  type: string;
  value: number;
  status: 'available' | 'allocated' | 'reserved';
  allocatedTo?: string;
  revenue?: number;
  buildingTypeId: string; // Correspond à l'ID du type de propriété rurale
}

export function useAgerPublicus() {
  const [selectedLandId, setSelectedLandId] = useState<string | null>(null);
  const [allocationDialogOpen, setAllocationDialogOpen] = useState(false);
  const balance = 1000000; // Solde du trésor public simulé
  
  // Mockup de terres disponibles
  const [availableLands, setAvailableLands] = useState<AgerLand[]>([
    {
      id: '1',
      name: 'Plaines de Campanie',
      location: 'Campanie',
      description: 'Terres fertiles idéales pour la culture céréalière',
      size: '5,000 jugera',
      type: 'Terres arables',
      value: 500000,
      status: 'available',
      buildingTypeId: 'domaine_cereales'
    },
    {
      id: '2',
      name: 'Collines du Latium',
      location: 'Latium',
      description: 'Terres vallonnées adaptées à la viticulture',
      size: '3,200 jugera',
      type: 'Vignobles',
      value: 450000,
      status: 'available',
      buildingTypeId: 'domaine_vignoble'
    },
    {
      id: '3',
      name: 'Pâturages de Lucanie',
      location: 'Lucanie',
      description: 'Vastes pâturages idéaux pour l\'élevage',
      size: '4,500 jugera',
      type: 'Pâturages',
      value: 350000,
      status: 'available',
      buildingTypeId: 'paturage_bovins'
    },
    {
      id: '4',
      name: 'Oliveraies d\'Étrurie',
      location: 'Étrurie',
      description: 'Terres adaptées à la culture d\'oliviers',
      size: '2,800 jugera',
      type: 'Oliveraies',
      value: 420000,
      status: 'available',
      buildingTypeId: 'domaine_oliviers'
    }
  ]);
  
  // Mockup de terres déjà attribuées
  const [ownedLands, setOwnedLands] = useState<AgerLand[]>([
    {
      id: '5',
      name: 'Terres de Vénétie',
      location: 'Vénétie',
      description: 'Terres fertiles au nord de l\'Italie',
      size: '3,800 jugera',
      type: 'Terres arables',
      value: 480000,
      status: 'allocated',
      allocatedTo: 'Lucius Calpurnius',
      revenue: 35000,
      buildingTypeId: 'domaine_cereales'
    },
    {
      id: '6',
      name: 'Vignobles de Sicile',
      location: 'Sicile',
      description: 'Terres viticoles sur l\'île de Sicile',
      size: '2,500 jugera',
      type: 'Vignobles',
      value: 380000,
      status: 'allocated',
      allocatedTo: 'Marcus Fabius',
      revenue: 42000,
      buildingTypeId: 'domaine_vignoble'
    }
  ]);
  
  // Obtenir les détails de la terre sélectionnée (convertir en format de propriété rurale)
  const getLandDetails = (landId: string): BuildingDescription | null => {
    const land = [...availableLands, ...ownedLands].find(land => land.id === landId);
    if (!land) return null;
    
    // Utiliser les détails du type de bâtiment rural correspondant
    return ruralProperties[land.buildingTypeId] || null;
  };
  
  const landDetails = selectedLandId ? getLandDetails(selectedLandId) : null;
  
  // Gérer l'attribution d'une terre
  const handleAllocation = (
    building: BuildingDescription,
    buildingId: string,
    buildingType: 'urban' | 'rural' | 'religious' | 'public',
    location: string,
    customName?: string
  ) => {
    // Trouver la terre à attribuer
    const landToAllocate = availableLands.find(land => land.id === selectedLandId);
    if (!landToAllocate) {
      toast.error("Terre introuvable");
      return false;
    }
    
    // Simuler le processus d'attribution
    setTimeout(() => {
      // Retirer de la liste des terres disponibles
      setAvailableLands(prev => prev.filter(land => land.id !== selectedLandId));
      
      // Ajouter à la liste des terres attribuées
      const newAllocatedLand = {
        ...landToAllocate,
        status: 'allocated' as const,
        allocatedTo: customName || 'Citoyen romain',
        revenue: Math.floor(landToAllocate.value * 0.08) // Revenu estimé à 8% de la valeur
      };
      
      setOwnedLands(prev => [...prev, newAllocatedLand]);
      
      toast.success(`Terre "${landToAllocate.name}" attribuée avec succès à ${customName || 'un citoyen romain'}`);
      setAllocationDialogOpen(false);
    }, 1000);
    
    return true;
  };

  return {
    selectedLandId,
    setSelectedLandId,
    allocationDialogOpen,
    setAllocationDialogOpen,
    landDetails,
    ownedLands,
    availableLands,
    balance,
    handleAllocation
  };
}
