
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Character } from '@/types/character';
import { Preceptor } from '../types/educationTypes';
import { User, UserCheck, UserX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EducationPreceptorProps {
  child: Character;
  preceptors: Preceptor[];
  onAssignPreceptor: (preceptorId: string) => void;
}

export const EducationPreceptor: React.FC<EducationPreceptorProps> = ({
  child,
  preceptors,
  onAssignPreceptor
}) => {
  const [showPreceptorDialog, setShowPreceptorDialog] = useState(false);
  const [selectedPreceptor, setSelectedPreceptor] = useState<Preceptor | null>(null);
  
  // Recherche du précepteur actuellement assigné
  const assignedPreceptorId = child.currentEducation?.mentor || child.education?.preceptorId;
  const assignedPreceptor = assignedPreceptorId 
    ? preceptors.find(p => p.id === assignedPreceptorId) 
    : null;
  
  // Gestion de l'assignation d'un précepteur
  const handleAssignPreceptor = () => {
    if (!selectedPreceptor) return;
    
    onAssignPreceptor(selectedPreceptor.id);
    setShowPreceptorDialog(false);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Précepteur</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {assignedPreceptor ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{assignedPreceptor.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {assignedPreceptor.specialty}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Expertise:</span>
                <div className="font-medium">{assignedPreceptor.expertise}/10</div>
              </div>
              <div>
                <span className="text-muted-foreground">Expérience:</span>
                <div className="font-medium">{assignedPreceptor.experience} ans</div>
              </div>
            </div>
            
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">Spécialités:</span>
              <div className="flex flex-wrap gap-1">
                {assignedPreceptor.specialties?.map((specialty, index) => (
                  <Badge key={index} variant="secondary">{specialty}</Badge>
                ))}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setShowPreceptorDialog(true)}
            >
              <UserX className="h-4 w-4 mr-1" />
              Changer de précepteur
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="bg-muted/50 rounded-lg p-5 text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">
                Aucun précepteur assigné
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Un précepteur peut améliorer considérablement l'éducation de votre enfant
              </p>
            </div>
            
            <Button 
              className="w-full" 
              onClick={() => setShowPreceptorDialog(true)}
            >
              <UserCheck className="h-4 w-4 mr-1" />
              Assigner un précepteur
            </Button>
          </div>
        )}
        
        <Dialog open={showPreceptorDialog} onOpenChange={setShowPreceptorDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choisir un précepteur</DialogTitle>
              <DialogDescription>
                Sélectionnez un précepteur pour l'éducation de {child.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-3 max-h-96 overflow-y-auto py-2">
              {preceptors.length > 0 ? (
                preceptors.map(preceptor => (
                  <div
                    key={preceptor.id}
                    className={`p-3 border rounded-lg cursor-pointer transition ${
                      selectedPreceptor?.id === preceptor.id 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedPreceptor(preceptor)}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium">{preceptor.name}</h4>
                      <span className="text-sm">{preceptor.price || preceptor.cost} deniers/an</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {preceptor.specialty} &bull; Expertise: {preceptor.expertise}/10
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  Aucun précepteur disponible
                </p>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPreceptorDialog(false)}>
                Annuler
              </Button>
              <Button 
                onClick={handleAssignPreceptor}
                disabled={!selectedPreceptor}
              >
                Assigner
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
