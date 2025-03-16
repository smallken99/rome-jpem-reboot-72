
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { MembreFamille } from '@/components/maitrejeu/types/familles';
import { toast } from 'sonner';

export const useInheritance = (familleId?: string) => {
  const { membres, getFamilleOfMembre, updateMembreFamille, updateFamille } = useMaitreJeu();
  const { properties } = usePatrimoine();
  const [selectedHeirId, setSelectedHeirId] = useState<string | null>(null);
  const [potentialHeirs, setPotentialHeirs] = useState<MembreFamille[]>([]);
  
  // Récupérer tous les membres masculins de la famille
  useEffect(() => {
    if (!familleId) return;
    
    const eligibleMembers = membres.filter(membre => 
      membre.familleId === familleId && 
      membre.genre === 'male' && 
      membre.age >= 16
    );
    
    setPotentialHeirs(eligibleMembers);
    
    // Définir l'héritier actuel s'il existe
    const famille = eligibleMembers.length > 0 ? getFamilleOfMembre(eligibleMembers[0].id) : undefined;
    if (famille?.chefId) {
      setSelectedHeirId(famille.chefId);
    } else if (eligibleMembers.length > 0) {
      // Sélectionner par défaut le plus âgé
      const oldestMember = eligibleMembers.reduce((prev, current) => 
        prev.age > current.age ? prev : current
      );
      setSelectedHeirId(oldestMember.id);
    }
  }, [familleId, membres, getFamilleOfMembre]);
  
  const selectHeir = (heirId: string) => {
    const heir = membres.find(m => m.id === heirId);
    if (!heir) return;
    
    const famille = getFamilleOfMembre(heir.id);
    if (!famille) return;
    
    // Mettre à jour le rôle de l'héritier
    updateMembreFamille(heirId, { role: 'Héritier' });
    
    // Marquer cet héritier comme futur chef de famille
    // Note: On ne change pas le chef actuel, seulement l'héritier désigné
    updateFamille(famille.id, { chefId: heirId });
    
    setSelectedHeirId(heirId);
    toast.success(`${heir.prenom} ${heir.nom} a été désigné comme héritier principal de la famille`);
  };
  
  return {
    selectedHeirId,
    potentialHeirs,
    selectHeir,
    properties
  };
};
