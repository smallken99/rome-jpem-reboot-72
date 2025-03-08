
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClientCreationData, Client } from '../types/clients';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: ClientCreationData | Client) => void;
  client: Client | null;
}

export const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, onSave, client }) => {
  const isEditMode = !!client;
  
  const [formData, setFormData] = useState<ClientCreationData>({
    name: '',
    type: 'artisan_commercant',
    subType: '',
    location: 'Forum',
    loyalty: 'moyenne',
    influences: {
      political: 1,
      popular: 1,
      religious: 1
    }
  });
  
  useEffect(() => {
    // Initialiser le formulaire avec les données du client en mode édition
    if (client) {
      setFormData({
        name: client.name,
        type: client.type,
        subType: client.subType,
        location: client.location,
        loyalty: client.loyalty,
        influences: { ...client.influences },
        assignedToSenateurId: client.assignedToSenateurId
      });
    }
  }, [client]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleInfluenceChange = (type: keyof ClientCreationData['influences'], value: string) => {
    setFormData(prev => ({
      ...prev,
      influences: {
        ...prev.influences,
        [type]: parseInt(value) || 1
      }
    }));
  };
  
  const handleSubmit = () => {
    if (isEditMode && client) {
      onSave({
        ...client,
        ...formData
      });
    } else {
      onSave(formData);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Modifier le client' : 'Ajouter un nouveau client'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nom</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Nom complet"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <div className="col-span-3">
              <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="artisan_commercant">Artisan & Commerçant</SelectItem>
                  <SelectItem value="politicien">Politicien</SelectItem>
                  <SelectItem value="religieux">Religieux</SelectItem>
                  <SelectItem value="proprietaire">Propriétaire Terrien</SelectItem>
                  <SelectItem value="pegre">Pègre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subType" className="text-right">Spécialité</Label>
            <Input
              id="subType"
              name="subType"
              value={formData.subType}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Ex: Forgeron, Boulanger..."
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">Quartier</Label>
            <div className="col-span-3">
              <Select value={formData.location} onValueChange={(value) => handleSelectChange('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Quartier/Localisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Forum">Forum</SelectItem>
                  <SelectItem value="Subure">Subure</SelectItem>
                  <SelectItem value="Palatin">Palatin</SelectItem>
                  <SelectItem value="Aventin">Aventin</SelectItem>
                  <SelectItem value="Esquilin">Esquilin</SelectItem>
                  <SelectItem value="Capitole">Capitole</SelectItem>
                  <SelectItem value="Quirinal">Quirinal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="loyalty" className="text-right">Loyauté</Label>
            <div className="col-span-3">
              <Select value={formData.loyalty} onValueChange={(value) => handleSelectChange('loyalty', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Niveau de loyauté" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="faible">Faible</SelectItem>
                  <SelectItem value="moyenne">Moyenne</SelectItem>
                  <SelectItem value="forte">Forte</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Influences</Label>
            <div className="col-span-3 grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="political" className="text-xs">Politique</Label>
                <Input
                  id="political"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.influences.political}
                  onChange={(e) => handleInfluenceChange('political', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="popular" className="text-xs">Populaire</Label>
                <Input
                  id="popular"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.influences.popular}
                  onChange={(e) => handleInfluenceChange('popular', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="religious" className="text-xs">Religieuse</Label>
                <Input
                  id="religious"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.influences.religious}
                  onChange={(e) => handleInfluenceChange('religious', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>{isEditMode ? 'Mettre à jour' : 'Ajouter'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
