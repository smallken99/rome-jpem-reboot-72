
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjetLoi } from '../types';

interface LoiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loiData: any) => void;
  loi: ProjetLoi | null;
}

export const LoiModal: React.FC<LoiModalProps> = ({ isOpen, onClose, onSave, loi }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      titre: formData.get('titre') as string,
      auteur: formData.get('auteur') as string,
      date: formData.get('date') as string,
      statut: formData.get('statut') as string,
      description: formData.get('description') as string,
      contenu: formData.get('contenu') as string,
    };
    
    onSave(data);
  };
  
  const title = loi ? 'Modifier la proposition de loi' : 'Nouvelle proposition de loi';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {loi 
              ? "Modifiez les informations de cette proposition de loi." 
              : "Saisissez les informations pour créer une nouvelle proposition de loi."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titre">Titre</Label>
            <Input id="titre" name="titre" defaultValue={loi?.titre || ''} required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="auteur">Auteur</Label>
              <Input id="auteur" name="auteur" defaultValue={loi?.auteur || ''} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" defaultValue={loi?.date || new Date().toLocaleDateString('fr-FR')} required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <Select name="statut" defaultValue={loi?.statut || 'Brouillon'}>
              <SelectTrigger id="statut">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Brouillon">Brouillon</SelectItem>
                <SelectItem value="En révision">En révision</SelectItem>
                <SelectItem value="Prêt pour vote">Prêt pour vote</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description"
              rows={3}
              defaultValue={loi?.description || ''} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contenu">Contenu détaillé</Label>
            <Textarea 
              id="contenu"
              name="contenu" 
              rows={6}
              defaultValue={loi?.contenu || ''} 
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
