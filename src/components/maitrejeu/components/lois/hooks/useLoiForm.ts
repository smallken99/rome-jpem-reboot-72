
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { LoiType, LoiState } from '../../../types/lois';
import { Loi } from '@/components/maitrejeu/types/lois';
import { parseGameDate } from '@/utils/timeSystem';

export const useLoiForm = (initialLoi?: Loi, onSubmit?: (loi: Loi) => void) => {
  const { toast } = useToast();
  
  const getDefaultLoi = (): Loi => ({
    id: '',
    title: '',
    description: '',
    proposedBy: '',
    date: { year: new Date().getFullYear(), season: 'SPRING' },
    status: 'proposed' as LoiState,
    category: 'Politique',
    votesFor: 0,
    votesAgainst: 0,
    effets: [],
    conditions: [],
    penalites: []
  });
  
  const [loi, setLoi] = useState<Loi>(initialLoi || getDefaultLoi());
  
  const updateField = (field: keyof Loi, value: any) => {
    setLoi(prev => ({ ...prev, [field]: value }));
  };
  
  const updateEffets = (effets: string[]) => {
    setLoi(prev => ({ ...prev, effets }));
  };
  
  const updateConditions = (conditions: string[]) => {
    setLoi(prev => ({ ...prev, conditions }));
  };
  
  const updatePenalites = (penalites: string[]) => {
    setLoi(prev => ({ ...prev, penalites }));
  };
  
  const handleSubmit = () => {
    // Basic validation
    if (!loi.title && !loi.titre) {
      toast({
        title: "Erreur",
        description: "Le titre de la loi est requis",
        variant: "destructive",
      });
      return;
    }
    
    if (!loi.category && !loi.categorieId) {
      toast({
        title: "Erreur",
        description: "La catégorie de la loi est requise",
        variant: "destructive",
      });
      return;
    }
    
    if (onSubmit) {
      // Map to correct types to ensure compatibility
      const loiToSubmit: Loi = {
        ...loi,
        type: (loi.type || 'Politique') as LoiType,
        status: (loi.status || 'proposed') as LoiState,
        date: parseGameDate(loi.date || { year: new Date().getFullYear(), season: 'SPRING' }),
        importance: (loi.importance || 'normale') as 'mineure' | 'normale' | 'majeure',
        // Ensure arrays are properly typed
        effets: Array.isArray(loi.effets) ? loi.effets : [],
        conditions: Array.isArray(loi.conditions) ? loi.conditions : [],
        penalites: Array.isArray(loi.penalites) ? loi.penalites : []
      };
      
      onSubmit(loiToSubmit);
      
      toast({
        title: initialLoi ? "Loi mise à jour" : "Loi créée",
        description: `La loi "${loi.title || loi.titre}" a été ${initialLoi ? 'mise à jour' : 'créée'} avec succès.`,
      });
    }
  };
  
  return {
    loi,
    setLoi,
    updateField,
    updateEffets,
    updateConditions,
    updatePenalites,
    handleSubmit
  };
};
