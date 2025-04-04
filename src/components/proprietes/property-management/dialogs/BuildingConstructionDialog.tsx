
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/currencyUtils';
import { AlertTriangle, Building, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface BuildingConstructionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: ConstructionData) => Promise<boolean>;
  constructionType: any;
  balance: number;
  locations: string[];
  constructionCost: number;
  constructionTime: number;
  isLoading?: boolean;
}

interface ConstructionData {
  name: string;
  location: string;
  size: number;
  notes?: string;
}

export const BuildingConstructionDialog: React.FC<BuildingConstructionDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  constructionType,
  balance,
  locations,
  constructionCost,
  constructionTime,
  isLoading = false
}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState(100);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canAfford = balance >= constructionCost;
  
  const handleConfirm = async () => {
    if (isSubmitting || !canAfford || !name || !location) return;
    
    setIsSubmitting(true);
    const success = await onConfirm({
      name,
      location,
      size,
      notes
    });
    
    setIsSubmitting(false);
    
    if (success) {
      resetForm();
      onClose();
    }
  };
  
  const resetForm = () => {
    setName('');
    setLocation('');
    setSize(100);
    setNotes('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            <span>Démarrer la construction</span>
          </DialogTitle>
          <DialogDescription>
            Complétez les informations pour lancer le projet de construction
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="propertyName">Nom de la propriété</Label>
            <Input
              id="propertyName"
              placeholder="Ex: Villa Julia"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Emplacement</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Choisir un emplacement" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(loc => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <Label>Coût de construction</Label>
              <span className={`font-semibold ${!canAfford ? 'text-red-600' : ''}`}>
                {formatCurrency(constructionCost)}
              </span>
            </div>
            
            {!canAfford && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Fonds insuffisants pour cette construction
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Label>Durée estimée</Label>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>{constructionTime} saisons</span>
              <span>Achèvement prévu: Automne 652</span>
            </div>
            <Progress value={0} className="h-1" />
          </div>
        </div>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isSubmitting || !canAfford || !name || !location || isLoading}
          >
            {isSubmitting || isLoading ? "Traitement..." : "Confirmer la construction"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
