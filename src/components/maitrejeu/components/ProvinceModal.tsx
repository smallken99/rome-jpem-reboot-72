
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Province } from '../types/maitreJeuTypes';

export interface ProvinceModalProps {
  province: Province;
  open: boolean;
  onClose?: () => void;
  onSave: (province: Province) => void;
}

export const ProvinceModal: React.FC<ProvinceModalProps> = ({
  province,
  open,
  onClose = () => {},
  onSave
}) => {
  const [editedProvince, setEditedProvince] = useState<Province>(province);
  
  useEffect(() => {
    setEditedProvince(province);
  }, [province]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProvince(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProvince(prev => ({ ...prev, [name]: parseInt(value) }));
  };
  
  const handleStatusChange = (value: string) => {
    setEditedProvince(prev => ({ 
      ...prev, 
      status: value as Province['status'],
      statut: value // Pour compatibilité
    }));
  };
  
  const handleSelectChange = (field: keyof Province, value: string) => {
    setEditedProvince(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSliderChange = (field: keyof Province, value: number[]) => {
    setEditedProvince(prev => ({ ...prev, [field]: value[0] }));
  };
  
  const handleSave = () => {
    onSave(editedProvince);
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-cinzel">Province: {editedProvince.nom}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nom">Nom</Label>
              <Input 
                id="nom" 
                name="nom" 
                value={editedProvince.nom} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div>
              <Label htmlFor="région">Région</Label>
              <Input 
                id="région" 
                name="région" 
                value={editedProvince.région || editedProvince.region || ''} 
                onChange={(e) => {
                  setEditedProvince(prev => ({ 
                    ...prev, 
                    région: e.target.value,
                    region: e.target.value // Pour compatibilité
                  }));
                }} 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="status">Statut</Label>
            <Select 
              value={editedProvince.status || editedProvince.statut || ''} 
              onValueChange={handleStatusChange}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pacifiée">Pacifiée</SelectItem>
                <SelectItem value="instable">Instable</SelectItem>
                <SelectItem value="rebelle">Rebelle</SelectItem>
                <SelectItem value="conquise">Conquise récemment</SelectItem>
                <SelectItem value="en révolte">En révolte</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={editedProvince.description} 
              onChange={handleInputChange} 
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="population">Population</Label>
              <Input 
                id="population" 
                name="population" 
                type="number" 
                value={editedProvince.population} 
                onChange={handleNumberChange} 
              />
            </div>
            
            <div>
              <Label htmlFor="revenuAnnuel">Revenu annuel (As)</Label>
              <Input 
                id="revenuAnnuel" 
                name="revenuAnnuel" 
                type="number" 
                value={editedProvince.revenuAnnuel} 
                onChange={handleNumberChange} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="impôts">Impôts</Label>
              <Input 
                id="impôts" 
                name="impôts" 
                type="number" 
                value={editedProvince.impôts} 
                onChange={handleNumberChange} 
              />
            </div>
            
            <div>
              <Label htmlFor="richesse">Richesse</Label>
              <Input 
                id="richesse" 
                name="richesse" 
                type="number" 
                value={editedProvince.richesse} 
                onChange={handleNumberChange} 
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between">
              <Label htmlFor="loyauté">Loyauté</Label>
              <span>{editedProvince.loyauté}</span>
            </div>
            <Slider
              id="loyauté"
              defaultValue={[editedProvince.loyauté]}
              max={100}
              step={1}
              onValueChange={(value) => handleSliderChange('loyauté' as keyof Province, value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="légions">Légions</Label>
              <Input 
                id="légions" 
                name="légions" 
                type="number" 
                value={editedProvince.légions} 
                onChange={handleNumberChange} 
              />
            </div>
            
            <div>
              <Label htmlFor="garnison">Garnison</Label>
              <Input 
                id="garnison" 
                name="garnison" 
                type="number" 
                value={editedProvince.garnison} 
                onChange={handleNumberChange} 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="gouverneur">Gouverneur</Label>
            <Input 
              id="gouverneur" 
              name="gouverneur" 
              value={editedProvince.gouverneur || ''} 
              onChange={handleInputChange} 
              placeholder="Aucun gouverneur assigné"
            />
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
