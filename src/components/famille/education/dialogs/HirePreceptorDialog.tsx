
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

interface HirePreceptorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preceptorId: string;
  onHire: () => void;
}

export const HirePreceptorDialog: React.FC<HirePreceptorDialogProps> = ({
  open,
  onOpenChange,
  preceptorId,
  onHire,
}) => {
  const { preceptors } = useEducation();
  const preceptor = preceptors.find(p => p.id === preceptorId);

  if (!preceptor) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Embaucher un précepteur</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir embaucher {preceptor.name} ?
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-1">Précepteur:</p>
              <p className="text-sm">{preceptor.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Spécialité:</p>
              <p className="text-sm">{preceptor.specialty}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Coût annuel:</p>
              <p className="text-sm">{preceptor.price || preceptor.cost} as</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Qualité:</p>
              <p className="text-sm">{preceptor.quality}/5</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button onClick={onHire}>Embaucher</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
