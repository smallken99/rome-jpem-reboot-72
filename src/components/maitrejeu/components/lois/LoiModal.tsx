
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoiModalProps } from './types';
import { LoiFormTabs } from './form-sections/LoiFormTabs';
import { useLoiModalForm } from './hooks/useLoiModalForm';

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
  const [activeTab, setActiveTab] = useState('info');
  
  const {
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
  } = useLoiModalForm(loi, onSave, onClose);
  
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
