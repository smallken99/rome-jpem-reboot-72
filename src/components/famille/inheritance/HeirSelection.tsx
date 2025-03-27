
import React, { useState } from 'react';
import { Character } from '@/types/character';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui-custom/toast';
import { calculateHeirScore } from './inheritanceUtils';

interface HeirSelectionProps {
  character: Character;
  allCharacters: Character[];
  eligibleHeirs: Character[];
}

export const HeirSelection: React.FC<HeirSelectionProps> = ({ 
  character,
  allCharacters,
  eligibleHeirs
}) => {
  const [selectedHeirId, setSelectedHeirId] = useState<string>('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  
  const handleDesignateHeir = () => {
    if (!selectedHeirId) {
      toast.error("Veuillez sélectionner un héritier");
      return;
    }
    
    setConfirmationOpen(true);
  };
  
  const confirmDesignation = () => {
    // Ici, vous pourriez implémenter la logique pour enregistrer l'héritier désigné
    toast.success("Héritier désigné avec succès");
    setConfirmationOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Désignation d'Héritier</CardTitle>
          <CardDescription>
            Choisissez qui héritera de votre nom et de votre fortune
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            La loi romaine favorise les fils aînés, mais vous pouvez désigner explicitement votre héritier 
            dans votre testament. Cette décision est cruciale pour l'avenir de votre famille.
          </p>
          
          <RadioGroup value={selectedHeirId} onValueChange={setSelectedHeirId}>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {eligibleHeirs.length > 0 ? (
                  eligibleHeirs.map((heir, index) => (
                    <div key={heir.id} className="flex items-start space-x-2">
                      <RadioGroupItem value={heir.id} id={`heir-${heir.id}`} />
                      <div className="grid gap-1.5 w-full">
                        <Label htmlFor={`heir-${heir.id}`} className="font-medium">
                          {heir.name} ({heir.age} ans)
                        </Label>
                        <Card>
                          <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-sm font-medium">Relation:</span>
                                <p className="text-sm">{heir.relation}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium">Santé:</span>
                                <p className="text-sm">{heir.health}%</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium">Traits:</span>
                                <p className="text-sm">{heir.traits.join(', ') || 'Aucun'}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium">Éducation:</span>
                                <p className="text-sm">{heir.educationType || 'Aucune'}</p>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <span className="text-sm font-medium">Score d'héritage:</span>
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                <div 
                                  className="bg-blue-500 h-2.5 rounded-full" 
                                  style={{ width: `${calculateHeirScore(heir, character) / 2}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            {index === 0 && (
                              <p className="text-xs text-muted-foreground mt-2 italic">
                                Héritier présomptif selon la tradition romaine
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Aucun héritier éligible n'a été trouvé.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </RadioGroup>
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleDesignateHeir}
              disabled={!selectedHeirId}
            >
              Désigner comme héritier principal
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la désignation d'héritier</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir désigner cet héritier comme principal ? 
              Cette décision aura un impact sur l'avenir de votre famille.
            </DialogDescription>
          </DialogHeader>
          
          {selectedHeirId && (
            <div className="py-4">
              <h3 className="font-medium">
                {allCharacters.find(c => c.id === selectedHeirId)?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {allCharacters.find(c => c.id === selectedHeirId)?.relation}
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmationOpen(false)}>
              Annuler
            </Button>
            <Button onClick={confirmDesignation}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
