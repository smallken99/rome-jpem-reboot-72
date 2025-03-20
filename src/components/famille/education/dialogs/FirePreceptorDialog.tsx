
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
import { AlertTriangle } from 'lucide-react';

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
  
  // Calculer le coût de résiliation (25% du salaire annuel)
  const terminationCost = Math.round((preceptor.cost || preceptor.price || 0) * 0.25);
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Confirmer le renvoi
          </DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir renvoyer {preceptor.name}? L'éducation de l'enfant assigné pourrait en souffrir.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
            <p>Attention: Renvoyer un précepteur avant la fin de l'éducation ralentira la progression de l'enfant.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Coût de résiliation:</p>
              <p className="font-semibold">{terminationCost} as</p>
            </div>
            <div>
              <p className="text-muted-foreground">Spécialité:</p>
              <p className="font-semibold capitalize">{preceptor.specialty || preceptor.speciality}</p>
            </div>
          </div>

          {preceptor.childId && (
            <div className="bg-red-50 p-3 border border-red-200 rounded-md text-red-800 text-sm">
              <p className="font-semibold">Ce précepteur est actuellement assigné à un enfant!</p>
              <p>Le renvoyer interrompra son éducation.</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
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
