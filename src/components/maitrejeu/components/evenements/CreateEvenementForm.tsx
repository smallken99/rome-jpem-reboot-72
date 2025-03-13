
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EvenementFormProps } from '../../types/evenements';
import { useEvenementForm } from './useEvenementForm';
import { EvenementBasicInfo } from './EvenementBasicInfo';
import { EvenementOptions } from './EvenementOptions';

export const CreateEvenementForm: React.FC<EvenementFormProps> = ({ isOpen, onClose }) => {
  const { 
    evenement, 
    optionText, 
    consequence, 
    updateEvenementField,
    setOptionText,
    setConsequence,
    handleAddOption,
    handleRemoveOption,
    handleSubmit
  } = useEvenementForm(onClose);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Créer un nouvel événement</DialogTitle>
          <DialogDescription>
            Définissez les détails de l'événement et ses options de résolution.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <EvenementBasicInfo 
            titre={evenement.titre}
            description={evenement.description}
            type={evenement.type}
            importance={evenement.importance}
            onTitreChange={(value) => updateEvenementField('titre', value)}
            onDescriptionChange={(value) => updateEvenementField('description', value)}
            onTypeChange={(value) => updateEvenementField('type', value)}
            onImportanceChange={(value) => updateEvenementField('importance', value)}
          />
          
          <EvenementOptions 
            options={evenement.options}
            optionText={optionText}
            consequence={consequence}
            onOptionTextChange={setOptionText}
            onConsequenceChange={setConsequence}
            onAddOption={handleAddOption}
            onRemoveOption={handleRemoveOption}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Créer l'événement</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
