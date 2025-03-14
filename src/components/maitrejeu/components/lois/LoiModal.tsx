import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { LoiModalProps } from './types';
import { LoiFormTabs } from './form-sections/LoiFormTabs';
import { Loi as LoiRepublique } from '@/components/republique/lois/hooks/useLois';
import { ensureLoiCompliance } from './utils/loiAdapter';

const LOI_CATEGORIES = [
  { id: 'politique', name: 'Politique', description: 'Lois concernant la structure politique' },
  { id: 'judiciaire', name: 'Judiciaire', description: 'Lois concernant le système judiciaire' },
  { id: 'sociale', name: 'Sociale', description: 'Lois concernant les affaires sociales' },
  { id: 'militaire', name: 'Militaire', description: 'Lois concernant les affaires militaires' },
  { id: 'economique', name: 'Économique', description: 'Lois concernant l\'économie' },
  { id: 'religieuse', name: 'Religieuse', description: 'Lois concernant les affaires religieuses' },
];

export const LoiModal: React.FC<LoiModalProps> = ({
  isOpen,
  onClose,
  onSave,
  loi,
  categories = LOI_CATEGORIES,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('info');
  
  const initialState: LoiRepublique = {
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
    tags: []
  } as LoiRepublique;
  
  const [formData, setFormData] = useState<LoiRepublique>(initialState);
  const [effetInput, setEffetInput] = useState('');
  const [conditionInput, setConditionInput] = useState('');
  const [penaliteInput, setPenaliteInput] = useState('');
  
  useEffect(() => {
    if (loi) {
      // Ensure we have all required properties when editing an existing loi
      const compliantLoi = ensureLoiCompliance(loi);
      
      // Convert to LoiRepublique format
      const republiqueLoi: LoiRepublique = {
        id: compliantLoi.id,
        titre: compliantLoi.title || compliantLoi.titre || '',
        description: compliantLoi.description || '',
        auteur: compliantLoi.proposedBy || compliantLoi.proposeur || compliantLoi.auteur || '',
        dateProposition: typeof compliantLoi.dateProposition === 'string' 
          ? compliantLoi.dateProposition 
          : typeof compliantLoi.date === 'string'
            ? compliantLoi.date
            : '',
        statut: compliantLoi.status === 'active' || compliantLoi.statut === 'promulguée' 
          ? 'promulguée' 
          : compliantLoi.status === 'rejected' || compliantLoi.statut === 'rejetée'
            ? 'rejetée'
            : 'proposée',
        categorieId: compliantLoi.category || compliantLoi.categorieId || compliantLoi.catégorie || '',
        votes: {
          pour: compliantLoi.votesFor || compliantLoi.votesPositifs || (compliantLoi.votes?.pour || 0),
          contre: compliantLoi.votesAgainst || compliantLoi.votesNégatifs || (compliantLoi.votes?.contre || 0),
          abstention: compliantLoi.votesAbstention || (compliantLoi.votes?.abstention || 0)
        },
        tags: compliantLoi.tags || []
      } as LoiRepublique;
      
      // Add extended properties
      Object.assign(republiqueLoi, {
        type: compliantLoi.type,
        clauses: compliantLoi.clauses,
        commentaires: compliantLoi.commentaires,
        importance: compliantLoi.importance
      });
      
      setFormData(republiqueLoi);
    } else {
      setFormData(initialState);
    }
  }, [loi, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    if (!formData.titre?.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre de la loi est requis",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.categorieId) {
      toast({
        title: "Erreur",
        description: "La catégorie de la loi est requise",
        variant: "destructive",
      });
      return;
    }
    
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
        const updatedCommentaires = [...((prev as any).commentaires || []), effetInput.trim()];
        return { ...prev, commentaires: updatedCommentaires } as LoiRepublique;
      });
      setEffetInput('');
    }
  };
  
  const removeEffet = (index: number) => {
    setFormData(prev => {
      const updatedCommentaires = [...((prev as any).commentaires || [])];
      updatedCommentaires.splice(index, 1);
      return { ...prev, commentaires: updatedCommentaires } as LoiRepublique;
    });
  };
  
  const addCondition = () => {
    if (conditionInput.trim()) {
      setFormData(prev => {
        const updatedClauses = [...((prev as any).clauses || []), conditionInput.trim()];
        return { ...prev, clauses: updatedClauses } as LoiRepublique;
      });
      setConditionInput('');
    }
  };
  
  const removeCondition = (index: number) => {
    setFormData(prev => {
      const updatedClauses = [...((prev as any).clauses || [])];
      updatedClauses.splice(index, 1);
      return { ...prev, clauses: updatedClauses } as LoiRepublique;
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
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{loi ? 'Modifier une loi' : 'Créer une nouvelle loi'}</DialogTitle>
        </DialogHeader>
        
        <LoiFormTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          formData={formData}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          effetInput={effetInput}
          setEffetInput={setEffetInput}
          addEffet={addEffet}
          removeEffet={removeEffet}
          conditionInput={conditionInput}
          setConditionInput={setConditionInput}
          addCondition={addCondition}
          removeCondition={removeCondition}
          penaliteInput={penaliteInput}
          setPenaliteInput={setPenaliteInput}
          addPenalite={addPenalite}
          removePenalite={removePenalite}
          categories={categories}
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave}>{loi ? 'Mettre à jour' : 'Créer'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
