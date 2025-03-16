
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Evenement, EvenementAction, EvenementType } from '../types/evenements';
import { toast } from 'sonner';

export interface EvenementsListProps {
  evenements: Evenement[];
  onResolve: (id: string, optionId: string) => void;
  filteredType?: EvenementType | 'ALL';
}

const getTypeColor = (type: EvenementType) => {
  const colors = {
    'POLITIQUE': 'bg-blue-100 text-blue-700',
    'ECONOMIQUE': 'bg-green-100 text-green-700',
    'GUERRE': 'bg-red-100 text-red-700',
    'RELIGION': 'bg-purple-100 text-purple-700',
    'DIPLOMATIQUE': 'bg-amber-100 text-amber-700',
    'SOCIAL': 'bg-pink-100 text-pink-700',
    'CRISE': 'bg-rose-100 text-rose-700'
  };
  
  return colors[type] || 'bg-gray-100 text-gray-700';
};

const getImportanceColor = (importance: string) => {
  const colors = {
    'majeure': 'bg-red-100 text-red-700',
    'mineure': 'bg-blue-100 text-blue-700',
    'normale': 'bg-gray-100 text-gray-700'
  };
  
  return colors[importance] || 'bg-gray-100 text-gray-700';
};

export const EvenementsList: React.FC<EvenementsListProps> = ({ 
  evenements, 
  onResolve,
  filteredType = 'ALL'
}) => {
  const [confirmingEvent, setConfirmingEvent] = useState<{eventId: string, optionId: string} | null>(null);
  
  const handleResolveClick = (eventId: string, optionId: string) => {
    setConfirmingEvent({ eventId, optionId });
  };
  
  const confirmResolve = () => {
    if (confirmingEvent) {
      onResolve(confirmingEvent.eventId, confirmingEvent.optionId);
      toast.success("Événement résolu avec succès!");
      setConfirmingEvent(null);
    }
  };
  
  // Filtrer les événements par type si nécessaire
  const displayedEvents = filteredType === 'ALL' 
    ? evenements 
    : evenements.filter(e => e.type === filteredType);
  
  return (
    <div className="space-y-4">
      {displayedEvents.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">Aucun événement en cours</p>
          </CardContent>
        </Card>
      ) : (
        displayedEvents.map(evenement => (
          <Card key={evenement.id} className={evenement.resolved ? 'opacity-60' : ''}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{evenement.titre}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className={getTypeColor(evenement.type)}>
                    {evenement.type}
                  </Badge>
                  <Badge variant="outline" className={getImportanceColor(evenement.importance)}>
                    {evenement.importance}
                  </Badge>
                </div>
              </div>
              <CardDescription>
                {evenement.date.season} {evenement.date.year}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{evenement.description}</p>
              
              {!evenement.resolved && (
                <div className="space-y-3 mt-4">
                  <h4 className="font-medium">Options:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {evenement.options.map(option => (
                      <div key={option.id} className="border p-3 rounded-md">
                        <p className="font-medium">{option.texte}</p>
                        <div className="flex justify-end mt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleResolveClick(evenement.id, option.id)}
                          >
                            Choisir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {evenement.resolved && evenement.selectedOption && (
                <div className="mt-4 p-3 border rounded-md bg-muted/30">
                  <h4 className="font-medium mb-1">Résolution:</h4>
                  <p>
                    {evenement.options.find(o => o.id === evenement.selectedOption)?.texte}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
      
      <AlertDialog 
        open={!!confirmingEvent} 
        onOpenChange={(open) => !open && setConfirmingEvent(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la résolution</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir choisir cette option ? Cette action aura des conséquences importantes sur le jeu et ne pourra pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmResolve}>Confirmer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
