
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

interface HirePreceptorDialogProps {
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
  const { getPreceptorById } = useEducation();
  const preceptor = getPreceptorById(preceptorId);
  
  if (!preceptor) {
    return null;
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer l'embauche</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir embaucher {preceptor.name} comme précepteur?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Spécialité:</span>
              <p className="font-medium">{preceptor.specialty || preceptor.speciality}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Qualité:</span>
              <p className="font-medium">{preceptor.quality}/100</p>
            </div>
            <div>
              <span className="text-muted-foreground">Expérience:</span>
              <p className="font-medium">{preceptor.experience} ans</p>
            </div>
            <div>
              <span className="text-muted-foreground">Coût annuel:</span>
              <p className="font-medium">{preceptor.price || preceptor.cost} as</p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={onHire}>
            Confirmer l'embauche
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
