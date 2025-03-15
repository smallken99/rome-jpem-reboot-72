
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Nation } from '../types';

interface NationModalProps {
  isOpen: boolean;
  onClose: () => void;
  nation: Nation | null;
}

export const NationModal: React.FC<NationModalProps> = ({ isOpen, onClose, nation }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
    onClose();
  };
  
  const title = nation ? 'Modifier la nation' : 'Ajouter une nation';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {nation 
              ? "Modifiez les informations de cette nation." 
              : "Saisissez les informations pour ajouter une nouvelle nation."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" defaultValue={nation?.name || ''} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Région</Label>
              <Input id="region" defaultValue={nation?.region || ''} required />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select defaultValue={nation?.status || 'neutral'}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ally">Allié</SelectItem>
                  <SelectItem value="enemy">Ennemi</SelectItem>
                  <SelectItem value="neutral">Neutre</SelectItem>
                  <SelectItem value="tributary">Tributaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="population">Population</Label>
              <Input 
                id="population" 
                type="number" 
                defaultValue={nation?.population || 100000} 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              rows={3}
              defaultValue={nation?.description || ''} 
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="militaryStrength">Force militaire (1-10)</Label>
              <Input 
                id="militaryStrength" 
                type="number" 
                min="1" 
                max="10"
                defaultValue={nation?.militaryStrength || 5} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diplomaticInfluence">Influence (1-10)</Label>
              <Input 
                id="diplomaticInfluence" 
                type="number" 
                min="1" 
                max="10"
                defaultValue={nation?.diplomaticInfluence || 5} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tradeValue">Commerce (1-10)</Label>
              <Input 
                id="tradeValue" 
                type="number" 
                min="1" 
                max="10"
                defaultValue={nation?.tradeValue || 5} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastContact">Dernier contact</Label>
            <Input id="lastContact" defaultValue={nation?.lastContact || ''} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="leaders">Dirigeants (séparés par des virgules)</Label>
            <Input 
              id="leaders" 
              defaultValue={Array.isArray(nation?.leaders) ? nation?.leaders.join(', ') : ''} 
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
