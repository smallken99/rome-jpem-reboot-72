
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { usePreceptorDetail } from '../hooks/usePreceptorDetail';

export interface FirePreceptorDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  preceptorId: string;
  onFire: () => void;
}

export const FirePreceptorDialog: React.FC<FirePreceptorDialogProps> = ({
  isOpen,
  onOpenChange,
  preceptorId,
  onFire
}) => {
  const { preceptor, loading } = usePreceptorDetail(preceptorId);

  if (loading || !preceptor) {
    return null;
  }

  const handleConfirm = () => {
    onFire();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Renvoyer {preceptor.name}</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir renvoyer ce précepteur ?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          <p className="text-sm text-amber-600">
            Cette action est irréversible. L'éducation de l'enfant sera interrompue.
          </p>
          <p className="text-sm">
            Vous pourrez engager un nouveau précepteur ultérieurement.
          </p>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Renvoyer le précepteur
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
