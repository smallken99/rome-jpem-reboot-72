
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from '../../context';
import { Loi } from '../../types/lois';
import { useLoiForm } from './hooks/useLoiForm';
import { LoiBasicInfoSection } from './form-sections/LoiBasicInfoSection';
import { LoiStatusSection } from './form-sections/LoiStatusSection';
import { LoiVotesSection } from './form-sections/LoiVotesSection';
import { LoiEffetsSection } from './form-sections/LoiEffetsSection';

interface LoiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loi: Loi) => void;
  editLoi?: Loi | null;
}

export const LoiModal: React.FC<LoiModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editLoi
}) => {
  const { formData, handleInputChange, handleSelectChange, handleEffetChange, resetForm, handleSubmit } = 
    useLoiForm(editLoi, onSave);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editLoi ? 'Modifier une loi' : 'Créer une nouvelle loi'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <LoiBasicInfoSection 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
          
          <LoiStatusSection 
            formData={formData}
            handleSelectChange={handleSelectChange}
          />
          
          <LoiVotesSection 
            formData={formData}
            handleInputChange={handleInputChange}
          />
          
          <LoiEffetsSection 
            formData={formData}
            handleEffetChange={handleEffetChange}
          />
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button type="button" onClick={() => handleSubmit()}>
            {editLoi ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
