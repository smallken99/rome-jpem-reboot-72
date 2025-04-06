
import { useState } from 'react';
import { toast } from 'sonner';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingInventory } from './useBuildingInventory';
import { adaptOwnedBuilding } from '@/utils/typeAdapters';
import { v4 as uuidv4 } from 'uuid';

export interface ConstructionOptions {
  senatorId: string;
  senatorName: string;
  buildingType: string;
  buildingName: string;
  location: string;
  cost: number;
  constructionTime: number; // en saisons
  size?: number;
  maintenanceCost?: number;
  benefits?: string[];
  description?: string;
}

export interface ConstructionProgress {
  id: string;
  buildingId: string;
  senatorId: string;
  senatorName: string;
  buildingName: string;
  buildingType: string;
  location: string;
  progress: number;
  startDate: Date;
  expectedCompletionDate: Date;
  cost: number;
  fundsInvested: number;
  remainingFunds: number;
  status: 'planned' | 'in_progress' | 'paused' | 'completed' | 'abandoned';
}

export function useSenatorConstruction() {
  const [constructions, setConstructions] = useState<ConstructionProgress[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { balance, addTransaction } = usePatrimoine();
  const { addBuilding } = useBuildingInventory();
  
  // Démarrer un projet de construction
  const startConstruction = async (options: ConstructionOptions): Promise<string | false> => {
    setIsLoading(true);
    
    try {
      // Vérifier si les fonds sont suffisants
      if (options.cost > balance) {
        toast.error("Fonds insuffisants pour démarrer cette construction");
        return false;
      }
      
      // Calculer la date estimée d'achèvement
      const startDate = new Date();
      const expectedCompletionDate = new Date();
      expectedCompletionDate.setMonth(expectedCompletionDate.getMonth() + Math.ceil(options.constructionTime * 3));
      
      // Créer l'objet de progression de construction
      const constructionId = uuidv4();
      const buildingId = uuidv4();
      
      const newConstruction: ConstructionProgress = {
        id: constructionId,
        buildingId,
        senatorId: options.senatorId,
        senatorName: options.senatorName,
        buildingName: options.buildingName,
        buildingType: options.buildingType,
        location: options.location,
        progress: 0,
        startDate,
        expectedCompletionDate,
        cost: options.cost,
        fundsInvested: options.cost, // On débourse tout au début
        remainingFunds: 0,
        status: 'in_progress'
      };
      
      setConstructions(prev => [...prev, newConstruction]);
      
      // Enregistrer la transaction
      addTransaction({
        amount: -options.cost,
        description: `Construction de ${options.buildingName} à ${options.location}`,
        category: "Construction",
        type: "expense",
        date: new Date()
      });
      
      toast.success(`Construction de ${options.buildingName} démarrée avec succès!`);
      return constructionId;
    } catch (error) {
      console.error("Erreur lors du démarrage de la construction:", error);
      toast.error("Une erreur est survenue lors du démarrage de la construction");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Faire progresser une construction
  const advanceConstruction = (constructionId: string, progressIncrement: number): boolean => {
    try {
      let constructionCompleted = false;
      
      setConstructions(prev => {
        return prev.map(construction => {
          if (construction.id !== constructionId) return construction;
          
          const newProgress = Math.min(100, construction.progress + progressIncrement);
          constructionCompleted = newProgress >= 100;
          
          return {
            ...construction,
            progress: newProgress,
            status: constructionCompleted ? 'completed' : construction.status
          };
        });
      });
      
      // Si la construction est terminée, créer le bâtiment
      if (constructionCompleted) {
        const construction = constructions.find(c => c.id === constructionId);
        if (construction) {
          completeConstruction(construction);
        }
      }
      
      return true;
    } catch (error) {
      console.error("Erreur lors de l'avancement de la construction:", error);
      return false;
    }
  };
  
  // Compléter une construction et créer le bâtiment
  const completeConstruction = (construction: ConstructionProgress): void => {
    try {
      // Créer un nouveau bâtiment
      const newBuilding = {
        id: construction.buildingId,
        buildingId: construction.buildingId,
        buildingType: construction.buildingType,
        type: construction.buildingType,
        name: construction.buildingName,
        location: construction.location,
        maintenanceEnabled: true,
        maintenanceCost: 0.05 * construction.cost, // 5% du coût comme maintenance
        maintenance: 0.05 * construction.cost,
        slaves: 0,
        condition: 100, // Nouveau bâtiment en parfait état
        purchaseDate: new Date(),
        value: construction.cost * 1.2, // Valeur augmentée de 20%
        income: construction.cost * 0.03, // 3% du coût comme revenu
        workers: 0,
        securityLevel: 1,
        maintenanceLevel: 1,
        size: 100,
        maxWorkers: 5,
        description: `Construit par ${construction.senatorName}`,
        ownerId: construction.senatorId,
        ownerName: construction.senatorName
      };
      
      // Ajouter le bâtiment à l'inventaire
      const adaptedBuilding = adaptOwnedBuilding(newBuilding);
      addBuilding(adaptedBuilding);
      
      toast.success(`Construction de ${construction.buildingName} achevée!`);
      
      // Retirer la construction de la liste
      setConstructions(prev => prev.filter(c => c.id !== construction.id));
    } catch (error) {
      console.error("Erreur lors de la finalisation de la construction:", error);
      toast.error("Une erreur est survenue lors de la finalisation de la construction");
    }
  };
  
  // Abandonner une construction
  const abandonConstruction = (constructionId: string): boolean => {
    try {
      const construction = constructions.find(c => c.id === constructionId);
      if (!construction) return false;
      
      // Calculer le remboursement (25% des fonds restants)
      const refundAmount = construction.remainingFunds * 0.25;
      
      if (refundAmount > 0) {
        // Enregistrer la transaction de remboursement
        addTransaction({
          amount: refundAmount,
          description: `Remboursement partiel pour l'abandon de la construction de ${construction.buildingName}`,
          category: "Construction",
          type: "income",
          date: new Date()
        });
      }
      
      // Retirer la construction de la liste
      setConstructions(prev => prev.filter(c => c.id !== constructionId));
      
      toast.info(`Construction de ${construction.buildingName} abandonnée.`);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'abandon de la construction:", error);
      return false;
    }
  };
  
  return {
    constructions,
    isLoading,
    startConstruction,
    advanceConstruction,
    abandonConstruction,
    getConstruction: (id: string) => constructions.find(c => c.id === id),
    getConstructionsBySenateurId: (senatorId: string) => constructions.filter(c => c.senatorId === senatorId)
  };
}
