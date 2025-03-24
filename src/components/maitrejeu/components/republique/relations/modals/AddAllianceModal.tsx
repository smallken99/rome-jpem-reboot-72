
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddAllianceModalProps } from '../types';
import { formatGameDate } from '@/utils/timeSystem';
import { v4 as uuidv4 } from 'uuid';

export const AddAllianceModal: React.FC<AddAllianceModalProps> = ({
  isOpen,
  onClose,
  nations,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'military',
    status: 'pending',
    dateCreation: '',
    duration: 5,
    nationId: '',
    description: '',
    militarySupport: 5000,
    economicBenefits: '',
    commitments: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Calculer la date de fin basée sur la durée
    const dateCreationParts = formData.dateCreation.split(' ');
    const year = parseInt(dateCreationParts[0], 10);
    const dateEnds = `${year + formData.duration} AUC`;

    // Convertir en objet Alliance avec les propriétés requises
    const newAlliance = {
      id: uuidv4(),
      name: formData.name,
      type: formData.type as "military" | "economic" | "cultural" | "political" | "defensive" | "trade",
      parties: [formData.nationId], // Ajouter Rome et la nation sélectionnée
      status: formData.status as "active" | "pending" | "expired" | "broken" | "inactive",
      description: formData.description,
      dateCreated: formData.dateCreation,
      dateEnds: dateEnds,
      terms: [`Soutien militaire: ${formData.militarySupport} hommes`],
      benefits: formData.economicBenefits.split('\n').filter(Boolean),
      requirements: formData.commitments.split('\n').filter(Boolean),
      nations: [formData.nationId]
    };

    onSave(newAlliance);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvelle alliance</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de l'alliance</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Alliance..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type d'alliance</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type d'alliance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="military">Militaire</SelectItem>
                  <SelectItem value="economic">Économique</SelectItem>
                  <SelectItem value="cultural">Culturelle</SelectItem>
                  <SelectItem value="political">Politique</SelectItem>
                  <SelectItem value="defensive">Défensive</SelectItem>
                  <SelectItem value="trade">Commerciale</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Statut de l'alliance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="expired">Expirée</SelectItem>
                  <SelectItem value="broken">Rompue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nationId">Nation alliée</Label>
            <Select 
              value={formData.nationId} 
              onValueChange={(value) => handleSelectChange('nationId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une nation" />
              </SelectTrigger>
              <SelectContent>
                {nations.map(nation => (
                  <SelectItem key={nation.id} value={nation.id}>
                    {nation.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateCreation">Date de création</Label>
              <Input 
                id="dateCreation" 
                name="dateCreation" 
                value={formData.dateCreation} 
                onChange={handleChange} 
                placeholder="705 AUC"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Durée (années)</Label>
              <Input 
                id="duration" 
                name="duration" 
                type="number" 
                value={formData.duration.toString()} 
                onChange={handleChange} 
                min="1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Description de l'alliance..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="militarySupport">Soutien militaire (hommes)</Label>
            <Input 
              id="militarySupport" 
              name="militarySupport" 
              type="number" 
              value={formData.militarySupport.toString()} 
              onChange={handleChange} 
              min="0"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="economicBenefits">Avantages économiques</Label>
              <Textarea 
                id="economicBenefits" 
                name="economicBenefits" 
                value={formData.economicBenefits} 
                onChange={handleChange} 
                placeholder="Avantages économiques..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commitments">Engagements</Label>
              <Textarea 
                id="commitments" 
                name="commitments" 
                value={formData.commitments} 
                onChange={handleChange} 
                placeholder="Engagements de Rome..."
                rows={3}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Créer l'alliance</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
