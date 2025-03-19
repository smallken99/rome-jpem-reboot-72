
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Preceptor } from '../types/educationTypes';

interface FirePreceptorDialogProps {
  preceptor: Preceptor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const FirePreceptorDialog: React.FC<FirePreceptorDialogProps> = ({
  preceptor,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!preceptor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Licencier {preceptor.name}</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir licencier ce précepteur ?
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 text-sm">
          <p className="text-muted-foreground">
            Ce précepteur ne sera plus à votre service et vous ne paierez plus son salaire.
            {preceptor.childId && " Cela interrompra également l'éducation de l'enfant auquel il est assigné."}
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button variant="destructive" onClick={onConfirm}>Licencier</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
