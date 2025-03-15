
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
import { ensureLoiCompliance, convertMJToRepublique } from './utils/loiAdapter';

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
  
  // Définir un type étendu pour notre formData pour inclure les propriétés MJ
  type ExtendedLoi = LoiRepublique & {
    type: string;
    importance: string;
    clauses: string[];
    commentaires: string[];
  };
  
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
    // Propriétés étendues requises par les composants MaitreJeu
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
      const republiqueLoi: ExtendedLoi = convertMJToRepublique(compliantLoi) as ExtendedLoi;
      
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
