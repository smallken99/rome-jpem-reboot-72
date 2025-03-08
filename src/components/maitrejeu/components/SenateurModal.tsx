
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SenateurJouable } from '../types/senateurs';

export interface SenateurModalProps {
  senateur: SenateurJouable;
  isOpen: boolean; // Keep isOpen for compatibility with existing code
  open?: boolean;   // Add open as an alternative
  onClose: () => void;
  onSave: (updatedSenateur: SenateurJouable) => void;
}

export const SenateurModal: React.FC<SenateurModalProps> = ({ 
  senateur, 
  isOpen, 
  open, 
  onClose, 
  onSave 
}) => {
  // Use either isOpen or open prop
  const dialogOpen = isOpen || open || false;
  
  const [formData, setFormData] = useState<SenateurJouable>({...senateur});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'popularite' || name === 'influence' || name === 'richesse' 
        ? Number(value) 
        : value
    }));
  };
  
  const handleSelectChange = (field: keyof SenateurJouable, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = () => {
    onSave(formData);
  };
  
  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le sénateur</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom" className="text-right">Nom</Label>
            <Input
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="famille" className="text-right">Famille</Label>
            <Input
              id="famille"
              name="famille"
              value={formData.famille}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">Âge</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="appartenance" className="text-right">Faction</Label>
            <Select 
              value={formData.appartenance} 
              onValueChange={(value) => handleSelectChange('appartenance', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Faction politique" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Optimates">Optimates</SelectItem>
                <SelectItem value="Populares">Populares</SelectItem>
                <SelectItem value="Neutral">Neutre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fonction" className="text-right">Fonction</Label>
            <Input
              id="fonction"
              name="fonction"
              value={formData.fonction}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="popularite" className="text-right">Popularité</Label>
            <Input
              id="popularite"
              name="popularite"
              type="number"
              min="0"
              max="100"
              value={formData.popularite}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="influence" className="text-right">Influence</Label>
            <Input
              id="influence"
              name="influence"
              type="number"
              min="0"
              max="100"
              value={formData.influence}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="richesse" className="text-right">Richesse</Label>
            <Input
              id="richesse"
              name="richesse"
              type="number"
              value={formData.richesse}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Sauvegarder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
