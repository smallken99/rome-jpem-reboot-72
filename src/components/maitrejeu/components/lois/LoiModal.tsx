
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LoiForm } from './LoiForm';
import { Loi } from '../../types';

export interface LoiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loiData: Omit<Loi, "id">) => void;
  initialData?: Loi;
}

export const LoiModal: React.FC<LoiModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const handleSave = (data: Omit<Loi, "id">) => {
    onSave(data);
    onClose();
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
          initialData={initialData}
          onSubmit={handleSave}
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
