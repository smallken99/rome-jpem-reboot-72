
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddAllianceModalProps } from '../types';
import { Nation } from '../types';

export const AddAllianceModal: React.FC<AddAllianceModalProps> = ({ isOpen, onClose, nations }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Traitement du formulaire
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle alliance</DialogTitle>
          <DialogDescription>
            Saisissez les informations pour créer une nouvelle alliance militaire.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de l'alliance</Label>
            <Input id="name" required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select defaultValue="defensive">
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
              <Select defaultValue="active">
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
              <Input id="dateCreation" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Durée (années)</Label>
              <Input 
                id="duration" 
                type="number"
                min="1"
                defaultValue={10} 
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="members">Nations membres</Label>
            <Select>
              <SelectTrigger id="members">
                <SelectValue placeholder="Sélectionnez une nation" />
              </SelectTrigger>
              <SelectContent>
                {nations.map((nation: Nation) => (
                  <SelectItem key={nation.id} value={nation.id}>
                    {nation.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="militarySupport">Force militaire totale</Label>
            <Input 
              id="militarySupport" 
              type="number"
              min="0"
              defaultValue={5000} 
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="economicBenefits">Avantages économiques</Label>
              <Textarea 
                id="economicBenefits" 
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="commitments">Engagements</Label>
              <Textarea 
                id="commitments" 
                rows={2}
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
