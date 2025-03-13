
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LoiForm } from './LoiForm';
import { Loi } from '../../types/lois';

export interface LoiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loiData: any) => void;
  initialData?: Loi;
}

export const LoiModal: React.FC<LoiModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const handleSave = (data: any) => {
    onSave(data);
    onClose();
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    // This is now just a placeholder as the state is managed in parent components
    console.log('Input changed', field, e.target.value);
  };

  const handleSelectChange = (value: string, field: string) => {
    // This is now just a placeholder as the state is managed in parent components
    console.log('Select changed', field, value);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Modifier la loi' : 'Proposer une nouvelle loi'}
          </DialogTitle>
        </DialogHeader>
        
        <LoiForm 
          loi={initialData || {
            titre: '',
            description: '',
            proposeur: '',
            type: 'politique',
            importance: 'normale'
          }}
          onChange={{
            handleInputChange,
            handleSelectChange
          }}
          onSubmit={handleSave}
          onCancel={onClose}
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
