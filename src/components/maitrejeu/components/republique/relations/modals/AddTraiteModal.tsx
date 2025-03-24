
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddTraiteModalProps } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const AddTraiteModal: React.FC<AddTraiteModalProps> = ({
  isOpen,
  onClose,
  nations,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'commercial',
    status: 'draft',
    dateCreation: '',
    dateExpiration: '',
    nationId: '',
    description: '',
    terms: '',
    benefits: '',
    obligations: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Convertir en objet Traite avec les propriétés requises
    const newTraite = {
      id: uuidv4(),
      name: formData.name,
      type: formData.type as "commercial" | "peace" | "military" | "territorial",
      parties: [formData.nationId], // Ajouter Rome et la nation sélectionnée
      status: formData.status as "active" | "draft" | "expired" | "revoked",
      description: formData.description,
      dateSignature: formData.dateCreation,
      dateExpiration: formData.dateExpiration,
      clauses: formData.terms.split('\n').filter(Boolean),
      benefits: formData.benefits.split('\n').filter(Boolean),
      obligations: formData.obligations.split('\n').filter(Boolean)
    };

    onSave(newTraite);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Nouveau traité</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Titre du traité</Label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Foedus Romanus..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type de traité</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type de traité" />
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
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Statut du traité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="expired">Expiré</SelectItem>
                  <SelectItem value="revoked">Révoqué</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nationId">Nation concernée</Label>
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
              <Label htmlFor="dateCreation">Date de signature</Label>
              <Input 
                id="dateCreation" 
                name="dateCreation" 
                value={formData.dateCreation} 
                onChange={handleChange} 
                placeholder="705 AUC"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateExpiration">Date d'expiration</Label>
              <Input 
                id="dateExpiration" 
                name="dateExpiration" 
                value={formData.dateExpiration} 
                onChange={handleChange} 
                placeholder="710 AUC"
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
              placeholder="Description du traité..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="terms">Clauses</Label>
            <Textarea 
              id="terms" 
              name="terms" 
              value={formData.terms} 
              onChange={handleChange} 
              placeholder="Chaque clause sur une ligne..."
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="benefits">Avantages</Label>
              <Textarea 
                id="benefits" 
                name="benefits" 
                value={formData.benefits} 
                onChange={handleChange} 
                placeholder="Avantages pour Rome..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="obligations">Obligations</Label>
              <Textarea 
                id="obligations" 
                name="obligations" 
                value={formData.obligations} 
                onChange={handleChange} 
                placeholder="Obligations de Rome..."
                rows={3}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Créer le traité</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
