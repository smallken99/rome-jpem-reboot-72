
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
import { useEducation } from '../context/EducationContext';

interface FirePreceptorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preceptorId: string;
  onFire: () => void;
}

export const FirePreceptorDialog: React.FC<FirePreceptorDialogProps> = ({
  open,
  onOpenChange,
  preceptorId,
  onFire,
}) => {
  const { preceptors } = useEducation();
  const preceptor = preceptors.find(p => p.id === preceptorId);

  if (!preceptor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Congédier un précepteur</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir congédier {preceptor.name} ?
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <p className="text-sm text-red-600">
              Le précepteur sera renvoyé et ne sera plus disponible pour l'éducation des enfants.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button variant="destructive" onClick={onFire}>Congédier</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
