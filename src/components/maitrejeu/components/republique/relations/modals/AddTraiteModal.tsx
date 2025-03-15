
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddTraiteModalProps } from '../types';
import { Nation } from '../types';

export const AddTraiteModal: React.FC<AddTraiteModalProps> = ({ isOpen, onClose, nations }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Traitement du formulaire
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau traité</DialogTitle>
          <DialogDescription>
            Saisissez les informations pour créer un nouveau traité diplomatique.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du traité</Label>
            <Input id="name" required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select defaultValue="commercial">
                <SelectTrigger id="type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="peace">Paix</SelectItem>
                  <SelectItem value="military">Militaire</SelectItem>
                  <SelectItem value="territorial">Territorial</SelectItem>
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
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="expired">Expiré</SelectItem>
                  <SelectItem value="revoked">Révoqué</SelectItem>
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
              <Label htmlFor="dateExpiration">Date d'expiration</Label>
              <Input id="dateExpiration" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="parties">Nations impliquées</Label>
            <Select>
              <SelectTrigger id="parties">
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
            <Label htmlFor="terms">Termes (séparés par des virgules)</Label>
            <Textarea 
              id="terms" 
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="benefits">Avantages (séparés par des virgules)</Label>
              <Textarea 
                id="benefits" 
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="obligations">Obligations (séparées par des virgules)</Label>
              <Textarea 
                id="obligations" 
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
