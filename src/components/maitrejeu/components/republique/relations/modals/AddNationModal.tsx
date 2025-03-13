
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AddNationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (type: 'nation' | 'traite' | 'alliance') => void;
}

export const AddNationModal: React.FC<AddNationModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle nation</DialogTitle>
          <DialogDescription>
            Ajoutez les détails de la nouvelle nation et définissez ses relations avec Rome.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Formulaire à implémenter */}
          <p className="text-center text-muted-foreground">
            Formulaire d'ajout de nation à implémenter
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={() => onAdd('nation')}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
