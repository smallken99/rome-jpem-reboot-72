
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Medal, Coins, BookOpen, UserCheck } from 'lucide-react';

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
  
  // Calculer le coût annuel et total estimé (3 ans par défaut)
  const annualCost = preceptor.price || preceptor.cost || 0;
  const estimatedTotalCost = annualCost * 3;
  
  // Qualité du précepteur
  const quality = preceptor.quality || Math.floor((preceptor.expertise || preceptor.skill || 50) / 20);
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Engager {preceptor.name}</DialogTitle>
          <DialogDescription>
            Confirmez l'embauche de ce précepteur spécialisé en éducation {preceptor.specialty || preceptor.speciality}.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <span className="font-medium capitalize">{preceptor.specialty || preceptor.speciality}</span>
            </div>
            <Badge variant="outline" className="capitalize">
              {preceptor.teachingStyle || "Traditionnel"}
            </Badge>
          </div>

          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Qualité</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Medal 
                    key={i} 
                    className={`h-4 w-4 ${i < quality ? 'text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Expertise</div>
              <div className="font-medium">{preceptor.expertise || preceptor.skill || 50}/100</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Coût annuel</div>
              <div className="font-medium flex items-center">
                <Coins className="h-4 w-4 mr-1 text-amber-500" />
                {annualCost} as/an
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Coût estimé (3 ans)</div>
              <div className="font-medium">{estimatedTotalCost} as</div>
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-sm">
            <p>Vous pourrez assigner ce précepteur à un enfant après l'avoir engagé.</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={onHire} className="bg-blue-600 hover:bg-blue-700">
            <UserCheck className="h-4 w-4 mr-2" />
            Confirmer l'embauche
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
