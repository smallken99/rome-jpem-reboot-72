
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Scale, User, AlertTriangle } from 'lucide-react';

// À déplacer dans un fichier de types dédié
interface ProcesData {
  id: string;
  titre: string;
  demandeur: string;
  accusé: string;
  type: string;
  statut: string;
  date: string;
  description?: string;
  verdict?: string;
  magistratResponsable?: string;
  notes?: string[];
  preuves?: string[];
}

interface JugementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proces: ProcesData | null;
  onJugementRendu: (proces: ProcesData, verdict: string, decision: string) => void;
}

export const JugementDialog: React.FC<JugementDialogProps> = ({
  open,
  onOpenChange,
  proces,
  onJugementRendu
}) => {
  const [decision, setDecision] = useState<'condamnation' | 'acquittement' | 'ajournement'>('condamnation');
  const [verdict, setVerdict] = useState('');
  
  if (!proces) return null;
  
  const handleSubmit = () => {
    if (!verdict.trim()) {
      toast.error("Veuillez détailler votre verdict");
      return;
    }
    
    onJugementRendu(proces, verdict, decision);
    toast.success("Jugement rendu avec succès");
    
    // Reset form
    setDecision('condamnation');
    setVerdict('');
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-xl">Rendre un jugement</DialogTitle>
          <DialogDescription>
            Affaire: {proces.titre}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted/20 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Demandeur</span>
              </div>
              <p className="text-sm">{proces.demandeur}</p>
            </div>
            
            <div className="p-3 bg-muted/20 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-red-600" />
                <span className="font-medium">Accusé</span>
              </div>
              <p className="text-sm">{proces.accusé}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Label>Décision du tribunal</Label>
            <RadioGroup value={decision} onValueChange={(value) => setDecision(value as any)}>
              <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted">
                <RadioGroupItem value="condamnation" id="condamnation" />
                <Label htmlFor="condamnation" className="flex-1 cursor-pointer">
                  <div className="font-medium">Condamnation</div>
                  <div className="text-sm text-muted-foreground">L'accusé est reconnu coupable</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted">
                <RadioGroupItem value="acquittement" id="acquittement" />
                <Label htmlFor="acquittement" className="flex-1 cursor-pointer">
                  <div className="font-medium">Acquittement</div>
                  <div className="text-sm text-muted-foreground">L'accusé est reconnu innocent</div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted">
                <RadioGroupItem value="ajournement" id="ajournement" />
                <Label htmlFor="ajournement" className="flex-1 cursor-pointer">
                  <div className="font-medium">Ajournement</div>
                  <div className="text-sm text-muted-foreground">Le procès est reporté</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="verdict">Détails du verdict</Label>
            <Textarea
              id="verdict"
              placeholder="Entrez les détails de votre décision, les sanctions éventuelles..."
              rows={5}
              value={verdict}
              onChange={(e) => setVerdict(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <p className="text-sm text-amber-800">
              Attention : une fois le jugement rendu, il ne pourra plus être modifié.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>
            <Scale className="h-4 w-4 mr-2" />
            Rendre le jugement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
