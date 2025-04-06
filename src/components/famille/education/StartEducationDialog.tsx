
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Preceptor } from './types/educationTypes';
import { educationTypes } from './data';

interface StartEducationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  childId: string;
  preceptors: Preceptor[];
  onStartEducation: (childId: string, educationType: string, mentorId: string | null) => void;
}

export const StartEducationDialog: React.FC<StartEducationDialogProps> = ({
  isOpen,
  onClose,
  childId,
  preceptors,
  onStartEducation
}) => {
  const [selectedEducation, setSelectedEducation] = useState<string>('');
  const [selectedPreceptor, setSelectedPreceptor] = useState<string>('');
  
  const handleSubmit = () => {
    if (!selectedEducation) return;
    
    onStartEducation(
      childId,
      selectedEducation,
      selectedPreceptor || null
    );
    
    onClose();
  };
  
  const availablePreceptors = preceptors.filter(p => 
    !p.assigned || !p.childId
  );
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Commencer l'éducation</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="education-type">Type d'éducation</Label>
            <Select
              value={selectedEducation}
              onValueChange={setSelectedEducation}
            >
              <SelectTrigger id="education-type">
                <SelectValue placeholder="Choisir un type d'éducation" />
              </SelectTrigger>
              <SelectContent>
                {educationTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="preceptor">Précepteur (optionnel)</Label>
            <Select
              value={selectedPreceptor}
              onValueChange={setSelectedPreceptor}
            >
              <SelectTrigger id="preceptor">
                <SelectValue placeholder="Choisir un précepteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun précepteur</SelectItem>
                {availablePreceptors.map(preceptor => (
                  <SelectItem key={preceptor.id} value={preceptor.id}>
                    {preceptor.name} - Qualité: {preceptor.quality}/100
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit} disabled={!selectedEducation}>
            Commencer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
