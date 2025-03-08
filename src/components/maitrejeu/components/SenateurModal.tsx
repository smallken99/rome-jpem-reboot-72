
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { SenateurJouable } from '../types/senateurs';

interface SenateurModalProps {
  senateur: SenateurJouable;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSenateur: SenateurJouable) => void;
}

export const SenateurModal: React.FC<SenateurModalProps> = ({
  senateur,
  isOpen,
  onClose,
  onSave
}) => {
  const [editedSenateur, setEditedSenateur] = useState<SenateurJouable>({...senateur});
  
  const handleChange = (field: keyof SenateurJouable, value: any) => {
    setEditedSenateur(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedSenateur);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Éditer le Sénateur: {senateur.nom}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={editedSenateur.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="famille">Famille</Label>
              <Input
                id="famille"
                value={editedSenateur.famille}
                onChange={(e) => handleChange('famille', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Âge</Label>
              <Input
                id="age"
                type="number"
                value={editedSenateur.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appartenance">Appartenance politique</Label>
              <Select
                value={editedSenateur.appartenance}
                onValueChange={(value) => handleChange('appartenance', value)}
              >
                <SelectTrigger id="appartenance">
                  <SelectValue placeholder="Appartenance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Optimates">Optimates</SelectItem>
                  <SelectItem value="Populares">Populares</SelectItem>
                  <SelectItem value="Neutral">Neutre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fonction">Fonction</Label>
              <Input
                id="fonction"
                value={editedSenateur.fonction}
                onChange={(e) => handleChange('fonction', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="magistrature">Magistrature</Label>
              <Select
                value={editedSenateur.magistrature}
                onValueChange={(value) => handleChange('magistrature', value)}
              >
                <SelectTrigger id="magistrature">
                  <SelectValue placeholder="Magistrature" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CONSUL">Consul</SelectItem>
                  <SelectItem value="PRETEUR">Préteur</SelectItem>
                  <SelectItem value="EDILE">Édile</SelectItem>
                  <SelectItem value="QUESTEUR">Questeur</SelectItem>
                  <SelectItem value="CENSEUR">Censeur</SelectItem>
                  <SelectItem value="NONE">Aucune</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="richesse">Richesse: {editedSenateur.richesse.toLocaleString()} deniers</Label>
            <Slider
              id="richesse"
              min={0}
              max={10000000}
              step={100000}
              value={[editedSenateur.richesse]}
              onValueChange={(value) => handleChange('richesse', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="popularite">Popularité: {editedSenateur.popularite}%</Label>
            <Slider
              id="popularite"
              min={0}
              max={100}
              value={[editedSenateur.popularite]}
              onValueChange={(value) => handleChange('popularite', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="influence">Influence: {editedSenateur.influence}%</Label>
            <Slider
              id="influence"
              min={0}
              max={100}
              value={[editedSenateur.influence]}
              onValueChange={(value) => handleChange('influence', value[0])}
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
