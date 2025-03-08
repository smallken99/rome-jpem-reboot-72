
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Province } from '../types';

export interface ProvinceModalProps {
  province: Province;
  open: boolean;
  onClose: () => void;
  onSave: (updatedProvince: Province) => void;
}

export const ProvinceModal: React.FC<ProvinceModalProps> = ({ province, open, onClose, onSave }) => {
  const [editedProvince, setEditedProvince] = useState<Province>({
    ...province
  });

  const handleSave = () => {
    onSave(editedProvince);
    onClose();
  };

  const handleChange = (field: keyof Province, value: any) => {
    setEditedProvince(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier la province: {province.nom}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input
              id="name"
              value={editedProvince.nom}
              onChange={(e) => handleChange('nom', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ruler" className="text-right">
              Gouverneur
            </Label>
            <Input
              id="ruler"
              value={editedProvince.gouverneur}
              onChange={(e) => handleChange('gouverneur', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="region" className="text-right">
              Région
            </Label>
            <Input
              id="region"
              value={editedProvince.région}
              onChange={(e) => handleChange('région', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="richesse" className="text-right">
              Richesse
            </Label>
            <Input
              id="richesse"
              type="number"
              value={editedProvince.richesse || 0}
              onChange={(e) => handleChange('richesse', parseInt(e.target.value))}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="loyaute" className="text-right">
              Loyauté
            </Label>
            <Input
              id="loyaute"
              type="number"
              value={editedProvince.loyaute || 0}
              onChange={(e) => handleChange('loyaute', parseInt(e.target.value))}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Statut
            </Label>
            <Select 
              value={editedProvince.status} 
              onValueChange={(value) => handleChange('status', value as "pacifiée" | "instable" | "rebelle" | "conquise" | "en révolte")}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pacifiée">Pacifiée</SelectItem>
                <SelectItem value="instable">Instable</SelectItem>
                <SelectItem value="rebelle">Rebelle</SelectItem>
                <SelectItem value="conquise">Conquise</SelectItem>
                <SelectItem value="en révolte">En Révolte</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="population" className="text-right">
              Population
            </Label>
            <Input
              id="population"
              type="number"
              value={editedProvince.population}
              onChange={(e) => handleChange('population', parseInt(e.target.value))}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={editedProvince.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="col-span-3"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
          <Button type="button" onClick={handleSave}>Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
