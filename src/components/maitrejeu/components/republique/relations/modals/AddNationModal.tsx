
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddNationModalProps } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const AddNationModal: React.FC<AddNationModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    status: 'neutral',
    population: 0,
    description: '',
    leader: '',
    leaderTitle: '',
    militaryStrength: 50,
    diplomaticInfluence: 50,
    tradeValue: 50,
    lastContact: '',
    leaders: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Convertir en objet Nation avec les propriétés requises
    const newNation = {
      id: uuidv4(),
      name: formData.name,
      region: formData.region,
      status: formData.status as "ally" | "neutral" | "hostile" | "vassal" | "tributary" | "enemy",
      relationScore: 50, // Valeur par défaut
      population: formData.population,
      description: formData.description,
      leader: formData.leader,
      leaderTitle: formData.leaderTitle,
      militaryStrength: formData.militaryStrength,
      diplomaticInfluence: formData.diplomaticInfluence,
      tradeValue: formData.tradeValue,
      lastContact: formData.lastContact,
      leaders: [formData.leader], // Convertir en tableau
    };

    onSave(newNation);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle nation</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Nom de la nation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Région</Label>
              <Input 
                id="region" 
                name="region" 
                value={formData.region} 
                onChange={handleChange} 
                placeholder="Région géographique"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ally">Allié</SelectItem>
                <SelectItem value="neutral">Neutre</SelectItem>
                <SelectItem value="hostile">Hostile</SelectItem>
                <SelectItem value="vassal">Vassal</SelectItem>
                <SelectItem value="tributary">Tributaire</SelectItem>
                <SelectItem value="enemy">Ennemi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Description de la nation"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="leader">Dirigeant</Label>
              <Input 
                id="leader" 
                name="leader" 
                value={formData.leader} 
                onChange={handleChange} 
                placeholder="Nom du dirigeant"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leaderTitle">Titre du dirigeant</Label>
              <Input 
                id="leaderTitle" 
                name="leaderTitle" 
                value={formData.leaderTitle} 
                onChange={handleChange} 
                placeholder="Titre officiel"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="population">Population</Label>
              <Input 
                id="population" 
                name="population" 
                type="number" 
                value={formData.population.toString()} 
                onChange={handleChange} 
                placeholder="Population estimée"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastContact">Dernier contact</Label>
              <Input 
                id="lastContact" 
                name="lastContact" 
                value={formData.lastContact} 
                onChange={handleChange} 
                placeholder="Date du dernier contact"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="militaryStrength">Force militaire</Label>
              <Input 
                id="militaryStrength" 
                name="militaryStrength" 
                type="number" 
                value={formData.militaryStrength.toString()} 
                onChange={handleChange} 
                min="0"
                max="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diplomaticInfluence">Influence</Label>
              <Input 
                id="diplomaticInfluence" 
                name="diplomaticInfluence" 
                type="number" 
                value={formData.diplomaticInfluence.toString()} 
                onChange={handleChange} 
                min="0"
                max="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tradeValue">Valeur commerciale</Label>
              <Input 
                id="tradeValue" 
                name="tradeValue" 
                type="number" 
                value={formData.tradeValue.toString()} 
                onChange={handleChange} 
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
