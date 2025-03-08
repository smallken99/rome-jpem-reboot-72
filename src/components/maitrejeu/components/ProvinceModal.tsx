
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Province } from '../types/provinces';

export interface ProvinceModalProps {
  province: Province;
  open: boolean;
  onClose: () => void;
  onSave: (updatedProvince: Province) => void;
}

export const ProvinceModal: React.FC<ProvinceModalProps> = ({ province, open, onClose, onSave }) => {
  const [editedProvince, setEditedProvince] = useState<Province>(province);
  
  const handleChange = (field: keyof Province, value: any) => {
    setEditedProvince(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedProvince);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Détails de la province: {province.nom}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
              <Label htmlFor="gouverneur">Gouverneur</Label>
              <Input
                id="gouverneur"
                value={editedProvince.gouverneur}
                onChange={(e) => handleChange('gouverneur', e.target.value)}
              />
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
              <Label htmlFor="richesse">Richesse (en as)</Label>
              <Input
                id="richesse"
                type="number"
                value={editedProvince.richesse || 0}
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
                value={editedProvince.loyauté || 0}
                onChange={(e) => handleChange('loyauté', parseInt(e.target.value))}
                min={0}
                max={100}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={editedProvince.status} 
                onValueChange={(value) => handleChange('status', value as any)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pacifiée">Pacifiée</SelectItem>
                  <SelectItem value="instable">Instable</SelectItem>
                  <SelectItem value="rebelle">Rebelle</SelectItem>
                  <SelectItem value="conquise">Conquise</SelectItem>
                  <SelectItem value="en révolte">En révolte</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editedProvince.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
