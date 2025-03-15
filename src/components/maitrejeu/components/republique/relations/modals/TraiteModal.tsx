
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Traite } from '../types';

interface TraiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  traite: Traite | null;
}

export const TraiteModal: React.FC<TraiteModalProps> = ({ isOpen, onClose, traite }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
    onClose();
  };
  
  const title = traite ? 'Modifier le traité' : 'Ajouter un traité';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {traite 
              ? "Modifiez les informations de ce traité." 
              : "Saisissez les informations pour ajouter un nouveau traité."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input id="title" defaultValue={traite?.title || ''} required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select defaultValue={traite?.type || 'peace'}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="peace">Paix</SelectItem>
                  <SelectItem value="trade">Commerce</SelectItem>
                  <SelectItem value="military">Militaire</SelectItem>
                  <SelectItem value="tribute">Tribut</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select defaultValue={traite?.status || 'active'}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="expired">Expiré</SelectItem>
                  <SelectItem value="violated">Violé</SelectItem>
                  <SelectItem value="canceled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateSignature">Date de signature</Label>
              <Input id="dateSignature" defaultValue={traite?.dateSignature || ''} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateExpiration">Date d'expiration (optionnel)</Label>
              <Input id="dateExpiration" defaultValue={traite?.dateExpiration || ''} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="parties">Parties (séparées par des virgules)</Label>
            <Input 
              id="parties" 
              defaultValue={traite?.parties?.join(', ') || ''} 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              rows={3}
              defaultValue={traite?.description || ''} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clauses">Clauses (séparées par des points-virgules)</Label>
            <Textarea 
              id="clauses" 
              rows={3}
              defaultValue={traite?.clauses?.join('; ') || ''} 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="benefits">Avantages (séparés par des virgules)</Label>
              <Textarea 
                id="benefits" 
                rows={2}
                defaultValue={traite?.benefits?.join(', ') || ''} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="obligations">Obligations (séparées par des virgules)</Label>
              <Textarea 
                id="obligations" 
                rows={2}
                defaultValue={traite?.obligations?.join(', ') || ''} 
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
