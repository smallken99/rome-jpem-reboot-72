
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { Loi, LoiType, LoiState } from '../../../types/lois';
import { Clause } from '../../../types/lois';
import { parseGameDate } from '@/utils/dateConverters';

export const useLoiForm = (initialLoi?: Loi) => {
  const { toast } = useToast();
  const { addLoi } = useMaitreJeu();
  
  const defaultLoi: Loi = {
    id: '',
    title: '',
    description: '',
    proposedBy: '',
    date: { year: new Date().getFullYear(), season: 'SPRING' },
    status: 'proposed',
    category: '',
    votesFor: 0,
    votesAgainst: 0,
    effets: [],
    conditions: [],
    penalites: []
  };
  
  const [formData, setFormData] = useState<Loi>(initialLoi || defaultLoi);
  const [selectedType, setSelectedType] = useState<LoiType>('Politique');
  const [clauseInput, setClauseInput] = useState<string>('');
  const [clauseType, setClauseType] = useState<'effet' | 'condition' | 'penalite'>('effet');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  useEffect(() => {
    if (initialLoi) {
      setFormData(initialLoi);
      
      if (initialLoi.type && typeof initialLoi.type === 'string') {
        setSelectedType(initialLoi.type as LoiType);
      }
    }
  }, [initialLoi]);
  
  const handleTypeChange = (type: string) => {
    setSelectedType(type as LoiType);
    setFormData(prev => ({ ...prev, type: type as LoiType }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };
  
  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // Map between different naming conventions
  const mapToInternalModel = (loi: Loi): Loi => {
    return {
      id: loi.id,
      title: loi.title || loi.titre || '',
      description: loi.description,
      proposedBy: loi.proposedBy || loi.proposeur || '',
      date: parseGameDate(loi.date),
      status: (loi.status || mapStatusToInternal(loi.état)) as LoiState,
      category: loi.category || loi.catégorie || '',
      votesFor: loi.votesFor || loi.votesPositifs || 0,
      votesAgainst: loi.votesAgainst || loi.votesNégatifs || 0,
      votesAbstention: loi.votesAbstention || 0,
      notes: loi.notes || '',
      type: (loi.type as LoiType) || 'Politique',
      clauses: loi.clauses || [],
      effets: loi.effets || [],
      conditions: loi.conditions || [],
      penalites: loi.penalites || [],
      titre: loi.title || loi.titre || '',
      proposeur: loi.proposedBy || loi.proposeur || '',
      catégorie: loi.category || loi.catégorie || '',
      état: loi.status || loi.état || 'proposed',
      importance: loi.importance || 'normale',
      votesPositifs: loi.votesFor || loi.votesPositifs || 0,
      votesNégatifs: loi.votesAgainst || loi.votesNégatifs || 0,
      commentaires: loi.notes ? [loi.notes] : []
    };
  };
  
  const mapStatusToInternal = (status?: string): 'proposed' | 'active' | 'rejected' | 'expired' => {
    if (!status) return 'proposed';
    
    switch (status) {
      case 'Promulguée':
      case 'adoptée':
        return 'active';
      case 'rejetée':
        return 'rejected';
      case 'proposée':
      case 'En délibération':
      default:
        return 'proposed';
    }
  };
  
  const handleClauseAdd = () => {
    if (!clauseInput.trim()) return;
    
    const newClause: Clause = {
      id: `clause-${Date.now()}`,
      type: clauseType,
      content: clauseInput.trim()
    };
    
    setFormData(prev => {
      if (clauseType === 'effet') {
        return { 
          ...prev, 
          effets: [...(prev.effets || []), clauseInput.trim()]
        };
      } else if (clauseType === 'condition') {
        return { 
          ...prev, 
          conditions: [...(prev.conditions || []), clauseInput.trim()]
        };
      } else {
        return { 
          ...prev, 
          penalites: [...(prev.penalites || []), clauseInput.trim()]
        };
      }
    });
    
    setClauseInput('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Ensure all fields are valid
      if (!formData.title.trim()) {
        toast({
          title: 'Erreur',
          description: 'Le titre est requis',
          variant: 'destructive',
        });
        return;
      }
      
      if (!formData.category) {
        toast({
          title: 'Erreur',
          description: 'La catégorie est requise',
          variant: 'destructive',
        });
        return;
      }
      
      // Map to internal model
      const loiToSubmit = mapToInternalModel(formData);
      
      // Add an ID if it's a new loi
      const finalLoi = loiToSubmit.id 
        ? loiToSubmit 
        : { ...loiToSubmit, id: `loi-${Date.now()}` };
      
      addLoi(finalLoi);
      
      toast({
        title: initialLoi ? 'Loi mise à jour' : 'Loi créée',
        description: `La loi "${finalLoi.title}" a été ${initialLoi ? 'mise à jour' : 'créée'} avec succès.`,
      });
      
      setFormData(defaultLoi);
      
    } catch (error) {
      console.error("Error submitting loi:", error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la sauvegarde de la loi',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    formData,
    selectedType,
    clauseInput,
    clauseType,
    isSubmitting,
    setFormData,
    handleTypeChange,
    handleInputChange,
    handleSelectChange,
    setClauseInput,
    setClauseType,
    handleClauseAdd,
    handleSubmit
  };
};
