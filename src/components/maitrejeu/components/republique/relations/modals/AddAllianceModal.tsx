
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

interface AddAllianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (type: 'nation' | 'traite' | 'alliance') => void;
}

export const AddAllianceModal: React.FC<AddAllianceModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle alliance</DialogTitle>
          <DialogDescription>
            Définissez les membres et les termes de la nouvelle alliance militaire.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Formulaire à implémenter */}
          <p className="text-center text-muted-foreground">
            Formulaire d'ajout d'alliance à implémenter
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={() => onAdd('alliance')}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
