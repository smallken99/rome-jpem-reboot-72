
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ClientCreationData, Client } from '../../types/clients';
import { useClientForm } from './useClientForm';
import { FormFields } from './FormFields';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: ClientCreationData | Client) => void;
  client: Client | null;
}

export const ClientModal: React.FC<ClientModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  client 
}) => {
  const { 
    isEditMode, 
    formData, 
    handleChange, 
    handleSelectChange, 
    handleInfluenceChange 
  } = useClientForm(client);
  
  const handleSubmit = () => {
    if (isEditMode && client) {
      onSave({
        ...client,
        ...formData
      });
    } else {
      onSave(formData);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Modifier le client' : 'Ajouter un nouveau client'}</DialogTitle>
        </DialogHeader>
        
        <FormFields
          formData={formData}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          handleInfluenceChange={handleInfluenceChange}
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>{isEditMode ? 'Mettre à jour' : 'Ajouter'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
