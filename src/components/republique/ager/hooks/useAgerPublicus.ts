
import { useState, useEffect } from 'react';
import { LandParcel, AgerPublicusOverseer, PublicWorkforceStatistics } from '../types';
import { toast } from 'sonner';

// Sample data for mockup purposes
const mockParcels: LandParcel[] = [
  {
    id: "1",
    name: "Campus Martius",
    location: "Rome",
    size: 1200,
    type: "cultivable",
    status: "protected",
    value: 120000,
    coordinates: { x: 150, y: 120 },
    resources: { fertility: 8, water: 9, minerals: 2 },
    description: "Terres sacrées dédiées à Mars, utilisées principalement pour les cérémonies religieuses et l'entraînement militaire.",
    workforce: {
      magistrates: 2,
      overseers: 3,
      publicSlaves: 30,
      requiredWorkforce: 40,
      efficiency: 88
    },
    production: {
      type: "céréales",
      amount: 1800,
      unit: "modii",
      potentialYield: 2000,
      lastHarvest: "703 AUC"
    },
    expenses: {
      maintenance: 12000,
      salaries: 8000,
      supplies: 5000
    }
  },
  {
    id: "2", 
    name: "Ager Latinus",
    location: "Latium",
    size: 5000,
    type: "cultivable",
    status: "allocated",
    value: 450000,
    allocation: {
      familyId: "fam-12",
      familyName: "Claudii",
      since: "603 AUC",
      until: "613 AUC"
    },
    coordinates: { x: 200, y: 150 },
    resources: { fertility: 7, water: 6, minerals: 3 },
    description: "Vastes terres fertiles idéales pour la culture du blé et des oliviers.",
    workforce: {
      magistrates: 1,
      overseers: 5,
      publicSlaves: 80,
      requiredWorkforce: 100,
      efficiency: 75
    },
    production: {
      type: "blé et olives",
      amount: 4500,
      unit: "modii",
      potentialYield: 6000,
      lastHarvest: "704 AUC"
    },
    expenses: {
      maintenance: 25000,
      salaries: 15000,
      supplies: 10000
    }
  },
  {
    id: "3",
    name: "Saltus Vescinus",
    location: "Campanie",
    size: 3000,
    type: "pastoral",
    status: "allocated",
    value: 250000,
    allocation: {
      familyId: "fam-7",
      familyName: "Cornelii",
      since: "601 AUC"
    },
    coordinates: { x: 250, y: 180 },
    resources: { fertility: 6, water: 8, minerals: 1 },
    description: "Pâturages de haute qualité, parfaits pour l'élevage de moutons et de bétail.",
    workforce: {
      magistrates: 1,
      overseers: 4,
      publicSlaves: 60,
      requiredWorkforce: 70,
      efficiency: 92
    },
    production: {
      type: "laine et viande",
      amount: 2800,
      unit: "unités",
      potentialYield: 3000,
      lastHarvest: "704 AUC"
    },
    expenses: {
      maintenance: 18000,
      salaries: 12000,
      supplies: 9000
    }
  },
  {
    id: "4",
    name: "Sylva Ciminia",
    location: "Étrurie",
    size: 4000,
    type: "forest",
    status: "available",
    value: 300000,
    coordinates: { x: 180, y: 100 },
    resources: { fertility: 5, water: 7, minerals: 4 },
    description: "Forêt dense riche en bois de construction et en gibier.",
    workforce: {
      magistrates: 0,
      overseers: 1,
      publicSlaves: 20,
      requiredWorkforce: 60,
      efficiency: 35
    },
    production: {
      type: "bois",
      amount: 1200,
      unit: "charretées",
      potentialYield: 3500,
      lastHarvest: "703 AUC"
    },
    expenses: {
      maintenance: 15000,
      salaries: 2000,
      supplies: 5000
    }
  },
  {
    id: "5",
    name: "Colles Albani",
    location: "Latium",
    size: 2500,
    type: "rocky",
    status: "available",
    value: 100000,
    coordinates: { x: 190, y: 140 },
    resources: { fertility: 2, water: 4, minerals: 8 },
    description: "Terrain rocheux contenant des gisements de pierre de qualité pour la construction.",
    workforce: {
      magistrates: 0,
      overseers: 2,
      publicSlaves: 45,
      requiredWorkforce: 50,
      efficiency: 60
    },
    production: {
      type: "pierre",
      amount: 1800,
      unit: "blocs",
      potentialYield: 2200,
      lastHarvest: "704 AUC"
    },
    expenses: {
      maintenance: 10000,
      salaries: 5000,
      supplies: 8000
    }
  },
  {
    id: "6",
    name: "Lacus Trasimenus",
    location: "Ombrie",
    size: 1800,
    type: "wetland",
    status: "disputed",
    value: 150000,
    coordinates: { x: 220, y: 90 },
    resources: { fertility: 4, water: 10, minerals: 1 },
    description: "Zone humide riche en poissons et en roseaux, son attribution est contestée par plusieurs familles.",
    workforce: {
      magistrates: 1,
      overseers: 0,
      publicSlaves: 15,
      requiredWorkforce: 30,
      efficiency: 40
    },
    production: {
      type: "poisson",
      amount: 900,
      unit: "amphores",
      potentialYield: 1500,
      lastHarvest: "704 AUC"
    },
    expenses: {
      maintenance: 8000,
      salaries: 3000,
      supplies: 4000
    }
  }
];

// Exemple de contremaîtres
const mockOverseers: AgerPublicusOverseer[] = [
  {
    id: "ov-1",
    name: "Marcus Tullius",
    title: "Contremaître principal",
    salary: 5000,
    experience: 8,
    specialization: "agriculture",
    assignedParcelId: "1",
    loyalty: 7,
    skills: {
      management: 8,
      agriculture: 9,
      logistics: 6
    }
  },
  {
    id: "ov-2",
    name: "Gaius Petronius",
    title: "Maître forestier",
    salary: 4000,
    experience: 6,
    specialization: "forestry",
    assignedParcelId: "4",
    loyalty: 8,
    skills: {
      management: 6,
      agriculture: 4,
      logistics: 7
    }
  },
  {
    id: "ov-3",
    name: "Lucius Papinius",
    title: "Contremaître agricole",
    salary: 3500,
    experience: 5,
    specialization: "agriculture",
    assignedParcelId: "2",
    loyalty: 6,
    skills: {
      management: 5,
      agriculture: 8,
      logistics: 5
    }
  },
  {
    id: "ov-4",
    name: "Publius Valerius",
    title: "Maître-berger",
    salary: 3800,
    experience: 7,
    specialization: "livestock",
    assignedParcelId: "3",
    loyalty: 9,
    skills: {
      management: 7,
      agriculture: 6,
      logistics: 8
    }
  },
  {
    id: "ov-5",
    name: "Titus Aemilius",
    title: "Maître des carrières",
    salary: 4200,
    experience: 6,
    specialization: "mining",
    assignedParcelId: "5",
    loyalty: 5,
    skills: {
      management: 9,
      agriculture: 3,
      logistics: 8
    }
  }
];

export const useAgerPublicus = () => {
  const [landParcels, setLandParcels] = useState<LandParcel[]>([]);
  const [overseers, setOverseers] = useState<AgerPublicusOverseer[]>([]);
  const [publicSlavePool, setPublicSlavePool] = useState<number>(250); // Réserve d'esclaves publics non assignés
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [workforceStats, setWorkforceStats] = useState<PublicWorkforceStatistics | null>(null);

  // Calculer les statistiques de la main d'œuvre
  const calculateWorkforceStatistics = (parcels: LandParcel[], overseers: AgerPublicusOverseer[]): PublicWorkforceStatistics => {
    const totalMagistrates = parcels.reduce((sum, parcel) => sum + (parcel.workforce?.magistrates || 0), 0);
    const totalOverseers = parcels.reduce((sum, parcel) => sum + (parcel.workforce?.overseers || 0), 0);
    const totalPublicSlaves = parcels.reduce((sum, parcel) => sum + (parcel.workforce?.publicSlaves || 0), 0);
    
    const unmanagedParcels = parcels.filter(
      parcel => !parcel.workforce || 
      (parcel.workforce.magistrates === 0 && parcel.workforce.overseers === 0)
    ).length;
    
    const parcelsWithEfficiency = parcels.filter(p => p.workforce?.efficiency !== undefined);
    const efficiencyRating = parcelsWithEfficiency.length ? 
      Math.round(parcelsWithEfficiency.reduce((sum, p) => sum + (p.workforce?.efficiency || 0), 0) / parcelsWithEfficiency.length) : 0;
    
    const magistrateSalaries = parcels.reduce((sum, p) => sum + ((p.workforce?.magistrates || 0) * 6000), 0);
    const overseerSalaries = overseers.reduce((sum, o) => sum + o.salary, 0);
    const slaveMaintenance = totalPublicSlaves * 500; // 500 as par esclave par an
    const supplies = parcels.reduce((sum, p) => sum + (p.expenses?.supplies || 0), 0);
    
    // Productivité par région
    const regions = [...new Set(parcels.map(p => p.location))];
    const productivityByRegion: Record<string, number> = {};
    
    regions.forEach(region => {
      const parcelsInRegion = parcels.filter(p => p.location === region);
      const production = parcelsInRegion.reduce((sum, p) => sum + (p.production?.amount || 0), 0);
      productivityByRegion[region] = production;
    });
    
    return {
      totalMagistrates,
      totalOverseers,
      totalPublicSlaves,
      unmanagedParcels,
      efficiencyRating,
      expensesByType: {
        magistrateSalaries,
        overseerSalaries,
        slaveMaintenance,
        supplies
      },
      productivityByRegion
    };
  };

  useEffect(() => {
    const fetchLandParcels = async () => {
      try {
        // Simulate API call
        setIsLoading(true);
        
        // In a real app, this would be an API call
        // const response = await fetch('/api/ager-publicus');
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          setLandParcels(mockParcels);
          setOverseers(mockOverseers);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error fetching land parcels:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch land parcels'));
        setIsLoading(false);
      }
    };

    fetchLandParcels();
  }, []);
  
  // Met à jour les statistiques quand les données changent
  useEffect(() => {
    if (landParcels.length > 0) {
      const stats = calculateWorkforceStatistics(landParcels, overseers);
      setWorkforceStats(stats);
    }
  }, [landParcels, overseers]);

  // Ajouter un fonctionnaire ou contremaître à une parcelle
  const addOfficialToParcel = (parcelId: string, officialType: 'magistrate' | 'overseer', amount: number = 1) => {
    setLandParcels(prev => prev.map(parcel => {
      if (parcel.id !== parcelId) return parcel;
      
      const currentWorkforce = parcel.workforce || {
        magistrates: 0,
        overseers: 0,
        publicSlaves: 0,
        requiredWorkforce: 50,
        efficiency: 0
      };
      
      const updatedWorkforce = {
        ...currentWorkforce,
        [officialType === 'magistrate' ? 'magistrates' : 'overseers']: 
          (currentWorkforce[officialType === 'magistrate' ? 'magistrates' : 'overseers'] || 0) + amount
      };
      
      // Recalculer l'efficacité basée sur la nouvelle main d'œuvre
      const totalWorkforce = (updatedWorkforce.magistrates || 0) * 5 + 
                             (updatedWorkforce.overseers || 0) * 10 +
                             (updatedWorkforce.publicSlaves || 0);
                             
      const requiredWorkforce = updatedWorkforce.requiredWorkforce || 50;
      const newEfficiency = Math.min(100, Math.round((totalWorkforce / requiredWorkforce) * 100));
      
      toast.success(`${amount} ${officialType === 'magistrate' ? 'magistrat' : 'contremaître'}${amount > 1 ? 's' : ''} ajouté${amount > 1 ? 's' : ''} à ${parcel.name}`);
      
      return {
        ...parcel,
        workforce: {
          ...updatedWorkforce,
          efficiency: newEfficiency
        }
      };
    }));
  };
  
  // Ajouter des esclaves publics à une parcelle
  const addSlavesToParcel = (parcelId: string, slaveCount: number) => {
    if (slaveCount > publicSlavePool) {
      toast.error(`Impossible d'ajouter ${slaveCount} esclaves : seulement ${publicSlavePool} disponibles`);
      return false;
    }
    
    setLandParcels(prev => prev.map(parcel => {
      if (parcel.id !== parcelId) return parcel;
      
      const currentWorkforce = parcel.workforce || {
        magistrates: 0,
        overseers: 0,
        publicSlaves: 0,
        requiredWorkforce: 50,
        efficiency: 0
      };
      
      const updatedPublicSlaves = (currentWorkforce.publicSlaves || 0) + slaveCount;
      
      // Recalculer l'efficacité
      const totalWorkforce = (currentWorkforce.magistrates || 0) * 5 + 
                             (currentWorkforce.overseers || 0) * 10 +
                             updatedPublicSlaves;
                             
      const requiredWorkforce = currentWorkforce.requiredWorkforce || 50;
      const newEfficiency = Math.min(100, Math.round((totalWorkforce / requiredWorkforce) * 100));
      
      return {
        ...parcel,
        workforce: {
          ...currentWorkforce,
          publicSlaves: updatedPublicSlaves,
          efficiency: newEfficiency
        }
      };
    }));
    
    // Mettre à jour le pool d'esclaves
    setPublicSlavePool(prev => prev - slaveCount);
    toast.success(`${slaveCount} esclave${slaveCount > 1 ? 's' : ''} public${slaveCount > 1 ? 's' : ''} attribué${slaveCount > 1 ? 's' : ''}`);
    
    return true;
  };
  
  // Assigner un contremaître à une parcelle
  const assignOverseerToParcel = (overseerId: string, parcelId: string) => {
    // Vérifier si le contremaître est déjà assigné ailleurs
    const overseer = overseers.find(o => o.id === overseerId);
    if (!overseer) {
      toast.error("Contremaître introuvable");
      return false;
    }
    
    if (overseer.assignedParcelId) {
      // Mettre à jour l'ancienne parcelle pour retirer un contremaître
      setLandParcels(prev => prev.map(parcel => {
        if (parcel.id !== overseer.assignedParcelId) return parcel;
        
        const currentOverseers = parcel.workforce?.overseers || 0;
        
        return {
          ...parcel,
          workforce: {
            ...parcel.workforce!,
            overseers: Math.max(0, currentOverseers - 1)
          }
        };
      }));
    }
    
    // Mettre à jour l'assignation du contremaître
    setOverseers(prev => prev.map(o => 
      o.id === overseerId ? { ...o, assignedParcelId: parcelId } : o
    ));
    
    // Mettre à jour la parcelle pour ajouter un contremaître
    addOfficialToParcel(parcelId, 'overseer', 1);
    
    toast.success(`${overseer.name} assigné à ${landParcels.find(p => p.id === parcelId)?.name || 'la parcelle'}`);
    return true;
  };
  
  // Acheter des esclaves supplémentaires
  const purchasePublicSlaves = (amount: number, costPerSlave: number = 800) => {
    // Dans une application réelle, vérifier le budget disponible
    const totalCost = amount * costPerSlave;
    
    // Simuler l'achat
    setPublicSlavePool(prev => prev + amount);
    
    toast.success(`${amount} esclave${amount > 1 ? 's' : ''} public${amount > 1 ? 's' : ''} acheté${amount > 1 ? 's' : ''} pour ${totalCost.toLocaleString()} as`);
    return true;
  };
  
  // Obtenir les données d'une parcelle spécifique
  const getParcelDetails = (parcelId: string) => {
    return landParcels.find(parcel => parcel.id === parcelId) || null;
  };
  
  // Obtenir les contremaîtres disponibles pour une parcelle
  const getAvailableOverseersForParcel = (parcelId: string) => {
    return overseers.filter(o => !o.assignedParcelId || o.assignedParcelId === parcelId);
  };

  return { 
    landParcels, 
    overseers,
    publicSlavePool,
    workforceStats,
    isLoading, 
    error,
    addOfficialToParcel,
    addSlavesToParcel,
    assignOverseerToParcel,
    purchasePublicSlaves,
    getParcelDetails,
    getAvailableOverseersForParcel
  };
};
