
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

interface HirePreceptorDialogProps {
  preceptor: Preceptor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const HirePreceptorDialog: React.FC<HirePreceptorDialogProps> = ({
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
          <DialogTitle>Embaucher {preceptor.name}</DialogTitle>
          <DialogDescription>
            Voulez-vous embaucher ce précepteur pour votre famille ?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-6">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Spécialité:</span>
              <p className="font-medium">{preceptor.specialty}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Coût annuel:</span>
              <p className="font-medium">{preceptor.cost || preceptor.price} as</p>
            </div>
            <div>
              <span className="text-muted-foreground">Expertise:</span>
              <p className="font-medium">{preceptor.expertise || preceptor.skill}/100</p>
            </div>
            <div>
              <span className="text-muted-foreground">Réputation:</span>
              <p className="font-medium">{preceptor.reputation}/100</p>
            </div>
          </div>

          {preceptor.description && (
            <div className="border-t pt-2">
              <span className="text-muted-foreground">Biographie:</span>
              <p className="text-sm mt-1">{preceptor.description}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={onConfirm}>Embaucher pour {preceptor.cost || preceptor.price} as</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
