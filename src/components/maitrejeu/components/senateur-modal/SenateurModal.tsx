
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SenateurJouable } from '../../types/senateurs';
import { FormField } from './FormField';
import { FactionSelector } from './FactionSelector';
import { useSenateurForm } from './useSenateurForm';

export interface SenateurModalProps {
  senateur: SenateurJouable | null;
  isOpen: boolean;
  open?: boolean;
  onClose: () => void;
  onSave: (updatedSenateur: SenateurJouable) => void;
  isCreateMode?: boolean;
}

export const SenateurModal: React.FC<SenateurModalProps> = ({ 
  senateur, 
  isOpen, 
  open, 
  onClose, 
  onSave,
  isCreateMode = false
}) => {
  const dialogOpen = isOpen || open || false;
  const { formData, handleChange, handleSelectChange } = useSenateurForm(senateur);
  
  const handleSubmit = () => {
    onSave(formData);
  };
  
  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isCreateMode ? "Créer un sénateur" : "Modifier le sénateur"}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <FormField 
            label="Nom"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
          />
          
          <FormField 
            label="Prénom"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
          />
          
          <FormField 
            label="Gens"
            id="gens"
            name="gens"
            value={formData.gens}
            onChange={handleChange}
          />
          
          <FormField 
            label="Famille"
            id="famille"
            name="famille"
            value={formData.famille || ''}
            onChange={handleChange}
          />
          
          <FormField 
            label="Âge"
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
          />
          
          <FactionSelector
            value={formData.appartenance || 'Neutral'}
            onValueChange={(value) => handleSelectChange('appartenance', value)}
          />
          
          <FormField 
            label="Fonction"
            id="fonction"
            name="fonction"
            value={formData.fonction || ''}
            onChange={handleChange}
          />
          
          <FormField 
            label="Popularité"
            id="popularite"
            name="popularite"
            type="number"
            min="0"
            max="100"
            value={formData.popularite || 0}
            onChange={handleChange}
          />
          
          <FormField 
            label="Influence"
            id="influence"
            name="influence"
            type="number"
            min="0"
            max="100"
            value={formData.influence}
            onChange={handleChange}
          />
          
          <FormField 
            label="Richesse"
            id="richesse"
            name="richesse"
            type="number"
            value={formData.richesse}
            onChange={handleChange}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Sauvegarder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
