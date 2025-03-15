
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loi } from '@/components/republique/lois/hooks/useLois';
import { ensureLoiCompliance, convertMJToRepublique } from '../utils/loiAdapter';

// Define an extended Loi type for our form data
export type ExtendedLoi = Loi & {
  type: string;
  importance: string;
  clauses: string[];
  commentaires: string[];
};

export function useLoiModalForm(loi: any | null, onSave: (loiData: any) => void, onClose: () => void) {
  const { toast } = useToast();
  
  const initialState: ExtendedLoi = {
    id: '',
    titre: '',
    description: '',
    auteur: '',
    dateProposition: '',
    statut: 'proposée',
    categorieId: '',
    votes: {
      pour: 0,
      contre: 0,
      abstention: 0
    },
    tags: [],
    type: 'Politique',
    importance: 'normale',
    clauses: [],
    commentaires: []
  };
  
  const [formData, setFormData] = useState<ExtendedLoi>(initialState);
  const [effetInput, setEffetInput] = useState('');
  const [conditionInput, setConditionInput] = useState('');
  const [penaliteInput, setPenaliteInput] = useState('');
  
  useEffect(() => {
    if (loi) {
      // Assurer que nous avons toutes les propriétés requises lors de l'édition d'une loi existante
      const compliantLoi = ensureLoiCompliance(loi);
      
      // Convertir au format LoiRepublique étendu
      const republiqueLoi = convertMJToRepublique(compliantLoi) as ExtendedLoi;
      
      setFormData(republiqueLoi);
    } else {
      setFormData(initialState);
    }
  }, [loi]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = (): boolean => {
    if (!formData.titre?.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre de la loi est requis",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.categorieId) {
      toast({
        title: "Erreur",
        description: "La catégorie de la loi est requise",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleSave = () => {
    if (!validateForm()) return;
    
    // Generate ID if it's a new law
    const newLoi = formData.id ? formData : { ...formData, id: `loi-${Date.now()}` };
    
    onSave(newLoi);
    onClose();
    
    toast({
      title: loi ? "Loi mise à jour" : "Loi créée",
      description: `La loi "${formData.titre}" a été ${loi ? 'mise à jour' : 'créée'} avec succès.`,
    });
  };
  
  const addEffet = () => {
    if (effetInput.trim()) {
      setFormData(prev => {
        const updatedCommentaires = [...(prev.commentaires || []), effetInput.trim()];
        return { ...prev, commentaires: updatedCommentaires };
      });
      setEffetInput('');
    }
  };
  
  const removeEffet = (index: number) => {
    setFormData(prev => {
      const updatedCommentaires = [...prev.commentaires];
      updatedCommentaires.splice(index, 1);
      return { ...prev, commentaires: updatedCommentaires };
    });
  };
  
  const addCondition = () => {
    if (conditionInput.trim()) {
      setFormData(prev => {
        const updatedClauses = [...(prev.clauses || []), conditionInput.trim()];
        return { ...prev, clauses: updatedClauses };
      });
      setConditionInput('');
    }
  };
  
  const removeCondition = (index: number) => {
    setFormData(prev => {
      const updatedClauses = [...prev.clauses];
      updatedClauses.splice(index, 1);
      return { ...prev, clauses: updatedClauses };
    });
  };
  
  const addPenalite = () => {
    if (penaliteInput.trim()) {
      setFormData(prev => {
        const updatedTags = [...(prev.tags || []), penaliteInput.trim()];
        return { ...prev, tags: updatedTags };
      });
      setPenaliteInput('');
    }
  };
  
  const removePenalite = (index: number) => {
    setFormData(prev => {
      const updatedTags = [...(prev.tags || [])];
      updatedTags.splice(index, 1);
      return { ...prev, tags: updatedTags };
    });
  };

  return {
    formData,
    effetInput,
    setEffetInput,
    conditionInput,
    setConditionInput,
    penaliteInput,
    setPenaliteInput,
    handleChange,
    handleSelectChange,
    handleSave,
    addEffet,
    removeEffet,
    addCondition,
    removeCondition,
    addPenalite,
    removePenalite
  };
}
