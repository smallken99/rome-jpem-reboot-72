
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Building, BuildingType, BuildingStatus, BuildingOwner, BuildingCreationData } from '../../types/batiments';

interface PublicBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (buildingData: BuildingCreationData) => void;
  building?: Building;
}

const PublicBuildingModal: React.FC<PublicBuildingModalProps> = ({ isOpen, onClose, onSave, building }) => {
  const initialBuildingData: BuildingCreationData = {
    name: '',
    type: 'other' as BuildingType,
    location: '',
    status: 'good' as BuildingStatus,
    constructionYear: new Date().getFullYear(),
    description: '',
    cost: 0,
    maintenanceCost: 0,
    maintenance: 0,
    value: 0,
    condition: 100,
    revenue: 0,
    income: 0,
    capacity: 0,
    owner: 'république'
  };

  const [formData, setFormData] = useState<BuildingCreationData>(initialBuildingData);

  useEffect(() => {
    if (building) {
      setFormData({
        name: building.name,
        type: building.type,
        location: building.location,
        status: building.status,
        constructionYear: building.constructionYear,
        description: building.description,
        cost: building.cost,
        maintenanceCost: building.maintenanceCost,
        maintenance: building.maintenance,
        value: building.value,
        condition: building.condition,
        revenue: building.revenue,
        income: building.income || 0,
        capacity: building.capacity,
        owner: building.owner
      });
    } else {
      setFormData(initialBuildingData);
    }
  }, [building, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'constructionYear' || name === 'cost' || name === 'maintenanceCost' || 
              name === 'value' || name === 'condition' || name === 'revenue' || 
              name === 'capacity' || name === 'income' || name === 'maintenance'
        ? Number(value)
        : value
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{building ? 'Modifier' : 'Ajouter'} un bâtiment public</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                name="type" 
                value={formData.type} 
                onValueChange={(value) => handleSelectChange(value, 'type')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temple">Temple</SelectItem>
                  <SelectItem value="forum">Forum</SelectItem>
                  <SelectItem value="bath">Thermes</SelectItem>
                  <SelectItem value="theater">Théâtre</SelectItem>
                  <SelectItem value="warehouse">Entrepôt</SelectItem>
                  <SelectItem value="market">Marché</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Emplacement</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">État</Label>
              <Select 
                name="status" 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange(value, 'status')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un état" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Bon</SelectItem>
                  <SelectItem value="average">Moyen</SelectItem>
                  <SelectItem value="poor">Mauvais</SelectItem>
                  <SelectItem value="under_construction">En construction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="constructionYear">Année de construction</Label>
              <Input id="constructionYear" name="constructionYear" type="number" value={formData.constructionYear} onChange={handleChange} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cost">Coût de construction</Label>
              <Input id="cost" name="cost" type="number" value={formData.cost} onChange={handleChange} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maintenanceCost">Coût d'entretien</Label>
              <Input id="maintenanceCost" name="maintenanceCost" type="number" value={formData.maintenanceCost} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenu généré</Label>
              <Input id="revenue" name="revenue" type="number" value={formData.revenue} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condition">État (%)</Label>
              <Input id="condition" name="condition" type="number" min="0" max="100" value={formData.condition} onChange={handleChange} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacité</Label>
              <Input id="capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="owner">Propriétaire</Label>
              <Input id="owner" name="owner" value={formData.owner} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              rows={4}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
            <Button type="submit">{building ? 'Mettre à jour' : 'Ajouter'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PublicBuildingModal;
