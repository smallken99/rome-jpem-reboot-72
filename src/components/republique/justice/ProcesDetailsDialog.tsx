
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, FileText, Scale, MessageSquare } from 'lucide-react';

// Types à définir plus tard dans un fichier dédié
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

interface ProcesDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proces: ProcesData | null;
  onJuger?: (proces: ProcesData) => void;
}

export const ProcesDetailsDialog: React.FC<ProcesDetailsDialogProps> = ({
  open,
  onOpenChange,
  proces,
  onJuger
}) => {
  if (!proces) return null;
  
  // Fonction pour déterminer la couleur du badge de statut
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'en cours':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'jugement rendu':
      case 'condamnation':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'en attente':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'exil':
      case 'rejeté':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  // Fonction pour déterminer la couleur du type de procès
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'civil':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'criminel':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'commercial':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'politique':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'religieux':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-xl flex items-center gap-2">
            {proces.titre}
            <Badge className={getStatusColor(proces.statut)}>{proces.statut}</Badge>
          </DialogTitle>
          <DialogDescription>
            <Badge variant="outline" className={getTypeColor(proces.type)}>{proces.type}</Badge>
            {' • '}
            {proces.date}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-md p-3 bg-muted/20">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Demandeur</span>
              </div>
              <p>{proces.demandeur}</p>
            </div>
            
            <div className="border rounded-md p-3 bg-muted/20">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-red-600" />
                <span className="font-medium">Accusé</span>
              </div>
              <p>{proces.accusé}</p>
            </div>
          </div>
          
          {proces.description && (
            <div className="border rounded-md p-3">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Description de l'affaire</span>
              </div>
              <p className="text-sm">{proces.description}</p>
            </div>
          )}
          
          {proces.verdict && (
            <>
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Verdict</span>
                </div>
                <div className="p-3 bg-muted/20 rounded-md">
                  <p>{proces.verdict}</p>
                </div>
              </div>
            </>
          )}
          
          {proces.notes && proces.notes.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Notes</span>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                {proces.notes.map((note, index) => (
                  <li key={index} className="text-sm">{note}</li>
                ))}
              </ul>
            </div>
          )}
          
          {proces.magistratResponsable && (
            <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-2">
              <span>Magistrat responsable:</span>
              <span className="font-medium">{proces.magistratResponsable}</span>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
          
          {onJuger && (proces.statut === 'En cours' || proces.statut === 'En attente') && (
            <Button onClick={() => onJuger(proces)}>
              <Scale className="h-4 w-4 mr-2" />
              Rendre un jugement
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
