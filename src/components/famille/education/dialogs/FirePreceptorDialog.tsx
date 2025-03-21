
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
import { AlertTriangle, Coins, User, Sparkles, BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
  const specialtyLabel = preceptor.specialty || preceptor.speciality || "Générale";
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-scale-in">
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-slate-50 rounded-md p-3 flex flex-col items-center justify-center text-center">
              <User className="h-10 w-10 text-slate-600 mb-2" />
              <div className="font-medium">{preceptor.name}</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                <span>Qualité: {preceptor.skill || "Moyenne"}</span>
              </div>
            </div>
            
            <div className="flex-1 bg-slate-50 rounded-md p-3 flex flex-col items-center justify-center text-center">
              <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
              <div className="font-medium capitalize">{specialtyLabel}</div>
              <div className="text-xs text-muted-foreground mt-1">Spécialité d'enseignement</div>
            </div>
          </div>

          <Separator />
          
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
            <p>Attention: Renvoyer un précepteur avant la fin de l'éducation ralentira la progression de l'enfant.</p>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-md">
            <div className="font-medium mb-1 flex items-center text-slate-700">
              <Coins className="h-4 w-4 mr-2 text-amber-500" />
              Coût de résiliation
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Indemnité (25% du salaire annuel)</span>
              <span className="font-semibold">{terminationCost} as</span>
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
          <Button 
            variant="destructive" 
            onClick={onFire}
            className="hover-scale transition-all"
          >
            Confirmer le renvoi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
