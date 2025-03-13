
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

interface AddTraiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (type: 'nation' | 'traite' | 'alliance') => void;
}

export const AddTraiteModal: React.FC<AddTraiteModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau traité</DialogTitle>
          <DialogDescription>
            Spécifiez les détails du traité et les nations impliquées.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Formulaire à implémenter */}
          <p className="text-center text-muted-foreground">
            Formulaire d'ajout de traité à implémenter
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={() => onAdd('traite')}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
