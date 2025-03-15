
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alliance } from '../types';

interface AllianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  alliance: Alliance | null;
}

export const AllianceModal: React.FC<AllianceModalProps> = ({ isOpen, onClose, alliance }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
    onClose();
  };
  
  const title = alliance ? 'Modifier l\'alliance' : 'Ajouter une alliance';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {alliance 
              ? "Modifiez les informations de cette alliance." 
              : "Saisissez les informations pour ajouter une nouvelle alliance."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" defaultValue={alliance?.name || ''} required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select defaultValue={alliance?.type || 'defensive'}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="defensive">Défensive</SelectItem>
                  <SelectItem value="offensive">Offensive</SelectItem>
                  <SelectItem value="full">Complète</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select defaultValue={alliance?.status || 'active'}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expirée</SelectItem>
                  <SelectItem value="dissolved">Dissoute</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateCreation">Date de création</Label>
              <Input id="dateCreation" defaultValue={alliance?.dateCreation || ''} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Durée (années)</Label>
              <Input 
                id="duration" 
                type="number"
                min="1"
                defaultValue={alliance?.duration || 10} 
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="members">Membres (séparés par des virgules)</Label>
            <Input 
              id="members" 
              defaultValue={
                Array.isArray(alliance?.members) 
                  ? alliance.members.join(', ') 
                  : alliance?.members || ''
              } 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              rows={3}
              defaultValue={alliance?.description || ''} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="militarySupport">Force militaire totale</Label>
            <Input 
              id="militarySupport" 
              type="number"
              min="0"
              defaultValue={alliance?.militarySupport || 5000} 
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="economicBenefits">Avantages économiques (séparés par des virgules)</Label>
              <Textarea 
                id="economicBenefits" 
                rows={2}
                defaultValue={
                  Array.isArray(alliance?.economicBenefits) 
                    ? alliance.economicBenefits.join(', ') 
                    : alliance?.economicBenefits || ''
                } 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="commitments">Engagements (séparés par des virgules)</Label>
              <Textarea 
                id="commitments" 
                rows={2}
                defaultValue={
                  Array.isArray(alliance?.commitments) 
                    ? alliance.commitments.join(', ') 
                    : alliance?.commitments || ''
                } 
              />
            </div>
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
