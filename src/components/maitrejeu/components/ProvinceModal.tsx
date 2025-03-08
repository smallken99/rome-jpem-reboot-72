
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Province } from '../types/provinces';

interface ProvinceModalProps {
  province: Province;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProvince: Province) => void;
}

export const ProvinceModal: React.FC<ProvinceModalProps> = ({
  province,
  isOpen,
  onClose,
  onSave
}) => {
  const [editedProvince, setEditedProvince] = useState<Province>({...province});
  
  const handleChange = (field: keyof Province, value: any) => {
    setEditedProvince(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleResourceChange = (index: number, value: string) => {
    const newResources = [...editedProvince.ressources];
    newResources[index] = value;
    setEditedProvince(prev => ({
      ...prev,
      ressources: newResources
    }));
  };
  
  const handleAddResource = () => {
    setEditedProvince(prev => ({
      ...prev,
      ressources: [...prev.ressources, 'Nouvelle ressource']
    }));
  };
  
  const handleRemoveResource = (index: number) => {
    const newResources = [...editedProvince.ressources];
    newResources.splice(index, 1);
    setEditedProvince(prev => ({
      ...prev,
      ressources: newResources
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedProvince);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Province: {province.nom}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={editedProvince.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="région">Région</Label>
              <Input
                id="région"
                value={editedProvince.région}
                onChange={(e) => handleChange('région', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gouverneur">Gouverneur</Label>
              <Input
                id="gouverneur"
                value={editedProvince.gouverneur}
                onChange={(e) => handleChange('gouverneur', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={editedProvince.status}
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pacifiée">Pacifiée</SelectItem>
                  <SelectItem value="instable">Instable</SelectItem>
                  <SelectItem value="rebelle">Rebelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="population">Population</Label>
              <Input
                id="population"
                type="number"
                value={editedProvince.population}
                onChange={(e) => handleChange('population', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="richesse">Richesse (deniers)</Label>
              <Input
                id="richesse"
                type="number"
                value={editedProvince.richesse}
                onChange={(e) => handleChange('richesse', parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loyauté">Loyauté (%)</Label>
              <Input
                id="loyauté"
                type="number"
                min={0}
                max={100}
                value={editedProvince.loyauté}
                onChange={(e) => handleChange('loyauté', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="impôts">Impôts annuels</Label>
              <Input
                id="impôts"
                type="number"
                value={editedProvince.impôts}
                onChange={(e) => handleChange('impôts', parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={editedProvince.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Ressources</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddResource}>
                Ajouter une ressource
              </Button>
            </div>
            
            <div className="space-y-2 mt-2">
              {editedProvince.ressources.map((ressource, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={ressource}
                    onChange={(e) => handleResourceChange(index, e.target.value)}
                  />
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleRemoveResource(index)}
                  >
                    Supprimer
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Armée</Label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="légions">Légions</Label>
                <Input
                  id="légions"
                  type="number"
                  value={editedProvince.armée.légions}
                  onChange={(e) => handleChange('armée', {
                    ...editedProvince.armée,
                    légions: parseInt(e.target.value)
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="auxiliaires">Auxiliaires</Label>
                <Input
                  id="auxiliaires"
                  type="number"
                  value={editedProvince.armée.auxiliaires}
                  onChange={(e) => handleChange('armée', {
                    ...editedProvince.armée,
                    auxiliaires: parseInt(e.target.value)
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="navires">Navires</Label>
                <Input
                  id="navires"
                  type="number"
                  value={editedProvince.armée.navires}
                  onChange={(e) => handleChange('armée', {
                    ...editedProvince.armée,
                    navires: parseInt(e.target.value)
                  })}
                />
              </div>
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
