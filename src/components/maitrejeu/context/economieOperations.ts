
import { generateId } from '../types/common';
import { EconomieRecord, EconomieCreationData } from '../types/economie';

export const createEconomieOperations = (
  setEconomieRecords: React.Dispatch<React.SetStateAction<EconomieRecord[]>>
) => {
  // Ajouter un nouvel enregistrement économique
  const addEconomieRecord = (data: EconomieCreationData): string => {
    const id = generateId();
    const now = new Date();
    
    const newRecord: EconomieRecord = {
      id,
      date: {
        year: new Date().getFullYear() - 753, // AUC (Ab Urbe Condita) - année de fondation de Rome
        season: getCurrentSeason(),
      },
      ...data,
      createdAt: now,
      updatedAt: now
    };
    
    setEconomieRecords(prev => [newRecord, ...prev]);
    return id;
  };
  
  // Mettre à jour un enregistrement économique existant
  const updateEconomieRecord = (id: string, updates: Partial<EconomieCreationData>) => {
    setEconomieRecords(prev => 
      prev.map(record => 
        record.id === id 
          ? { 
              ...record, 
              ...updates, 
              updatedAt: new Date() 
            } 
          : record
      )
    );
  };
  
  // Supprimer un enregistrement économique
  const deleteEconomieRecord = (id: string) => {
    setEconomieRecords(prev => prev.filter(record => record.id !== id));
  };
  
  // Utilitaire pour obtenir la saison actuelle
  const getCurrentSeason = (): 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'SPRING';
    if (month >= 5 && month <= 7) return 'SUMMER';
    if (month >= 8 && month <= 10) return 'AUTUMN';
    return 'WINTER';
  };
  
  return {
    addEconomieRecord,
    updateEconomieRecord,
    deleteEconomieRecord
  };
};
