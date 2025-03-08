
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClientCreationData, Client } from '../../types/clients';
import { useAdvancedClientForm } from './useAdvancedClientForm';
import { GeneralTab } from './GeneralTab';
import { AbilitiesTab } from './AbilitiesTab';
import { BackstoryTab } from './BackstoryTab';

interface AdvancedClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: ClientCreationData | Client) => void;
  client: Client | null;
}

export const AdvancedClientModal: React.FC<AdvancedClientModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  client 
}) => {
  const isEditMode = !!client;
  
  const {
    formData,
    newAbility,
    setNewAbility,
    handleChange,
    handleSelectChange,
    handleInfluenceChange,
    handleAddAbility,
    handleRemoveAbility,
    handleRelationshipChange
  } = useAdvancedClientForm(client);
  
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Modifier le client' : 'Ajouter un nouveau client'}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="abilities">Compétences</TabsTrigger>
            <TabsTrigger value="backstory">Historique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <GeneralTab 
              formData={formData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              handleInfluenceChange={handleInfluenceChange}
              handleRelationshipChange={handleRelationshipChange}
            />
          </TabsContent>
          
          <TabsContent value="abilities">
            <AbilitiesTab 
              formData={formData}
              newAbility={newAbility}
              setNewAbility={setNewAbility}
              handleChange={handleChange}
              handleAddAbility={handleAddAbility}
              handleRemoveAbility={handleRemoveAbility}
            />
          </TabsContent>
          
          <TabsContent value="backstory">
            <BackstoryTab 
              formData={formData}
              handleChange={handleChange}
            />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>{isEditMode ? 'Mettre à jour' : 'Ajouter'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
