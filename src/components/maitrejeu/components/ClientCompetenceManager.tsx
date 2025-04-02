
import React, { useState } from 'react';
import { Client } from '../types/clients';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Minus } from 'lucide-react';

interface ClientCompetenceManagerProps {
  client: Client;
  onUpdateCompetences: (clientId: string, competences: string[]) => void;
  availableCompetences: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ClientCompetenceManager: React.FC<ClientCompetenceManagerProps> = ({
  client,
  onUpdateCompetences,
  availableCompetences,
  open,
  onOpenChange
}) => {
  const [selectedCompetences, setSelectedCompetences] = useState<string[]>(
    client.competences || []
  );

  const handleToggleCompetence = (competence: string) => {
    if (selectedCompetences.includes(competence)) {
      setSelectedCompetences(selectedCompetences.filter(c => c !== competence));
    } else {
      setSelectedCompetences([...selectedCompetences, competence]);
    }
  };

  const handleSave = () => {
    onUpdateCompetences(client.id, selectedCompetences);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gérer les compétences de {client.name}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4 py-4">
            {availableCompetences.map(competence => (
              <div key={competence} className="flex items-center space-x-2">
                <Checkbox
                  id={`competence-${competence}`}
                  checked={selectedCompetences.includes(competence)}
                  onCheckedChange={() => handleToggleCompetence(competence)}
                />
                <Label htmlFor={`competence-${competence}`} className="cursor-pointer flex-1">
                  {competence}
                </Label>
                
                {selectedCompetences.includes(competence) ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleCompetence(competence)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleCompetence(competence)}
                    className="h-8 w-8 p-0"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
