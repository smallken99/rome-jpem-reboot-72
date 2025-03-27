
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { getPreceptorsForType } from '../data/preceptors';
import { Preceptor } from '../types/educationTypes';
import { PreceptorCard } from './PreceptorCard';
import { toast } from '@/components/ui-custom/toast';

interface PreceptorsListProps {
  childId: string;
  educationType: string;
}

export const PreceptorsList: React.FC<PreceptorsListProps> = ({
  childId,
  educationType
}) => {
  const [selectedPreceptor, setSelectedPreceptor] = useState<Preceptor | null>(null);
  const [showHireDialog, setShowHireDialog] = useState(false);
  const [hiredPreceptors, setHiredPreceptors] = useState<Preceptor[]>([]);
  
  // Obtenir les précepteurs disponibles selon le type d'éducation
  const availablePreceptors = getPreceptorsForType(educationType);
  
  const handleHirePreceptor = () => {
    if (!selectedPreceptor) return;
    
    // Simuler l'embauche
    setHiredPreceptors(prev => [...prev, selectedPreceptor]);
    setShowHireDialog(false);
    
    toast.success(`${selectedPreceptor.name} a été embauché comme précepteur`);
  };
  
  return (
    <div className="space-y-6">
      {educationType === 'none' ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Sélectionnez d'abord un type d'éducation pour voir les précepteurs disponibles
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="available">
          <TabsList className="mb-4">
            <TabsTrigger value="available">Précepteurs Disponibles</TabsTrigger>
            <TabsTrigger value="hired">Précepteurs Embauchés</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availablePreceptors.length > 0 ? (
                availablePreceptors.map(preceptor => (
                  <PreceptorCard 
                    key={preceptor.id}
                    preceptor={preceptor}
                    onSelect={() => {
                      setSelectedPreceptor(preceptor);
                      setShowHireDialog(true);
                    }}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center p-8">
                  <p className="text-muted-foreground">
                    Aucun précepteur disponible pour ce type d'éducation
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="hired">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hiredPreceptors.length > 0 ? (
                hiredPreceptors.map(preceptor => (
                  <PreceptorCard 
                    key={preceptor.id}
                    preceptor={preceptor}
                    hired={true}
                    onSelect={() => {}}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center p-8">
                  <p className="text-muted-foreground">
                    Vous n'avez pas encore embauché de précepteur
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
      
      <Dialog open={showHireDialog} onOpenChange={setShowHireDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Embaucher un Précepteur</DialogTitle>
            <DialogDescription>
              Confirmez-vous l'embauche de ce précepteur pour l'éducation de votre enfant ?
            </DialogDescription>
          </DialogHeader>
          
          {selectedPreceptor && (
            <div className="py-4">
              <h3 className="font-medium">{selectedPreceptor.name}</h3>
              <p className="text-sm text-muted-foreground">
                Spécialité: {selectedPreceptor.specialty}
              </p>
              <p className="text-sm mt-2">
                Coût: {selectedPreceptor.price} deniers par an
              </p>
              <p className="text-sm mt-2">
                Expérience: {selectedPreceptor.experience} années d'enseignement
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHireDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleHirePreceptor}>
              Confirmer l'embauche
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
