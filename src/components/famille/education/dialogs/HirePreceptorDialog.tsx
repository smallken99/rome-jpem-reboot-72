
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { usePreceptorDetail } from '../hooks/usePreceptorDetail';

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
  const { preceptor, loading } = usePreceptorDetail(preceptorId);

  if (loading || !preceptor) {
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
            <p className="text-sm">{preceptor.price || 0} as par an</p>
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
            Engager ({preceptor.price || 0} as/an)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
