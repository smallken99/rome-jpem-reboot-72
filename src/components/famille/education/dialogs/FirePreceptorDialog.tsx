
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEducation } from '../context/EducationContext';

interface FirePreceptorDialogProps {
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
  const { getPreceptorById } = useEducation();
  const preceptor = getPreceptorById(preceptorId);
  
  if (!preceptor) {
    return null;
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer le renvoi</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir renvoyer {preceptor.name}? L'éducation de l'enfant assigné pourrait en souffrir.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
            <p>Attention: Renvoyer un précepteur avant la fin de l'éducation peut ralentir la progression de l'enfant.</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={onFire}>
            Confirmer le renvoi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
