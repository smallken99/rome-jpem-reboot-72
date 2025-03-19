
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEducation } from '../context/EducationContext';
import { formatMoney } from '@/utils/formatUtils';

export interface HirePreceptorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  preceptorId: string;
  onHire: () => void;
}

export const HirePreceptorDialog: React.FC<HirePreceptorDialogProps> = ({
  isOpen,
  onOpenChange,
  preceptorId,
  onHire
}) => {
  const { preceptors } = useEducation();
  const preceptor = preceptors.find(p => p.id === preceptorId);

  if (!preceptor) {
    return null;
  }

  const handleConfirm = () => {
    onHire();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Engager {preceptor.name}</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir engager ce précepteur ?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="font-medium text-sm">Coût annuel</h4>
            <p className="text-sm">{formatMoney(preceptor.price || 0)}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm">Spécialité</h4>
            <p className="text-sm">{preceptor.specialty}</p>
          </div>

          <div>
            <h4 className="font-medium text-sm">Qualité</h4>
            <p className="text-sm">{preceptor.quality} / 5</p>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleConfirm}>
            Engager ({formatMoney(preceptor.price || 0)}/an)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
