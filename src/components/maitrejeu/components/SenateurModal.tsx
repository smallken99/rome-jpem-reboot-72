// Mise à jour des imports pour le modal de sénateur
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { SenateurJouable, SenateurModalProps } from '../types/senateurs';
import { MagistratureType } from '../types/magistratures';

export const SenateurModal: React.FC<SenateurModalProps> = ({ 
  senateur, 
  open, 
  onClose = () => {}, 
  onSave 
}) => {
  const [editedSenateur, setEditedSenateur] = useState<SenateurJouable>(senateur);
  
  useEffect(() => {
    setEditedSenateur(senateur);
  }, [senateur]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedSenateur(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedSenateur(prev => ({ ...prev, [name]: parseInt(value) }));
  };
  
  const handleSelectChange = (field: keyof SenateurJouable, value: string) => {
    setEditedSenateur(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSliderChange = (field: keyof SenateurJouable, value: number[]) => {
    setEditedSenateur(prev => ({ ...prev, [field]: value[0] }));
  };
  
  const handleSave = () => {
    onSave(editedSenateur);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Détails du Sénateur</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nom">Nom</Label>
              <Input 
                id="nom" 
                name="nom" 
                value={editedSenateur.nom} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div>
              <Label htmlFor="famille">Famille</Label>
              <Input 
                id="famille" 
                name="famille" 
                value={editedSenateur.famille} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="âge">Âge</Label>
              <Input 
                id="âge" 
                name="âge" 
                type="number" 
                value={editedSenateur.âge} 
                onChange={handleNumberChange} 
              />
            </div>
            
            <div>
              <Label htmlFor="popularité">Popularité</Label>
              <Input 
                id="popularité" 
                name="popularité" 
                type="number" 
                value={editedSenateur.popularité} 
                onChange={handleNumberChange} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="richesse">Richesse</Label>
              <Input 
                id="richesse" 
                name="richesse" 
                type="number" 
                value={editedSenateur.richesse} 
                onChange={handleNumberChange} 
              />
            </div>
            
            <div>
              <Label htmlFor="influence">Influence</Label>
              <Input 
                id="influence" 
                name="influence" 
                type="number" 
                value={editedSenateur.influence} 
                onChange={handleNumberChange} 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="fonctionActuelle">Fonction Actuelle</Label>
            <Input 
              id="fonctionActuelle" 
              name="fonctionActuelle" 
              value={editedSenateur.fonctionActuelle || ''} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div>
            <Label htmlFor="appartenance">Appartenance</Label>
            <Input 
              id="appartenance" 
              name="appartenance" 
              value={editedSenateur.appartenance || ''} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div>
            <Label htmlFor="statut">Statut</Label>
            <Select 
              value={editedSenateur.statut || ''} 
              onValueChange={(value) => handleSelectChange('statut', value)}
            >
              <SelectTrigger id="statut">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="retraité">Retraité</SelectItem>
                <SelectItem value="exilé">Exilé</SelectItem>
                <SelectItem value="décédé">Décédé</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="magistrature">Magistrature</Label>
            <Select 
              value={editedSenateur.magistrature || ''} 
              onValueChange={(value) => handleSelectChange('magistrature', value as MagistratureType)}
            >
              <SelectTrigger id="magistrature">
                <SelectValue placeholder="Sélectionner une magistrature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CONSUL">Consul</SelectItem>
                <SelectItem value="PRETEUR">Préteur</SelectItem>
                <SelectItem value="PRÉTEUR">Préteur (Ancien)</SelectItem>
                <SelectItem value="EDILE">Édile</SelectItem>
                <SelectItem value="QUESTEUR">Questeur</SelectItem>
                <SelectItem value="CENSEUR">Censeur</SelectItem>
                <SelectItem value="TRIBUN">Tribun</SelectItem>
                <SelectItem value="PONTIFEX_MAXIMUS">Pontifex Maximus</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave}>Sauvegarder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
