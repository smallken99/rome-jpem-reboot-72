
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, BuildingCreationData, BuildingStatus, BuildingType, BuildingOwner } from '../../types/batiments';

interface PublicBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (buildingData: BuildingCreationData) => void;
  building?: Building;
}

const PublicBuildingModal: React.FC<PublicBuildingModalProps> = ({ isOpen, onClose, onSave, building }) => {
  const [formData, setFormData] = useState<BuildingCreationData>({
    name: '',
    type: 'other',
    location: '',
    status: 'good',
    constructionYear: new Date().getFullYear(),
    description: '',
    cost: 0,
    maintenanceCost: 0,
    value: 0,
    condition: 100,
    revenue: 0, // Initialize the required revenue field
    income: 0,
    capacity: 0,
    owner: 'république'
  });

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
        value: building.value,
        condition: building.condition,
        revenue: building.revenue,
        income: building.income || 0,
        capacity: building.capacity || 0,
        owner: building.owner as BuildingOwner || 'république'
      });
    }
  }, [building]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{building ? 'Modifier' : 'Ajouter'} un bâtiment public</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du bâtiment</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Temple de Jupiter"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type de bâtiment</Label>
              <Select 
                value={formData.type} 
                onValueChange={value => handleSelectChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temple">Temple</SelectItem>
                  <SelectItem value="forum">Forum</SelectItem>
                  <SelectItem value="baths">Thermes</SelectItem>
                  <SelectItem value="theater">Théâtre</SelectItem>
                  <SelectItem value="amphitheater">Amphithéâtre</SelectItem>
                  <SelectItem value="senate">Sénat</SelectItem>
                  <SelectItem value="basilica">Basilique</SelectItem>
                  <SelectItem value="market">Marché</SelectItem>
                  <SelectItem value="warehouse">Entrepôt</SelectItem>
                  <SelectItem value="workshop">Atelier</SelectItem>
                  <SelectItem value="port">Port</SelectItem>
                  <SelectItem value="aqueduct">Aqueduc</SelectItem>
                  <SelectItem value="road">Route</SelectItem>
                  <SelectItem value="bridge">Pont</SelectItem>
                  <SelectItem value="military">Installation militaire</SelectItem>
                  <SelectItem value="wall">Mur/Rempart</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Emplacement</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Forum Romanum"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">État</Label>
              <Select 
                value={formData.status} 
                onValueChange={value => handleSelectChange('status', value as BuildingStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un état" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Bon</SelectItem>
                  <SelectItem value="fair">Correct</SelectItem>
                  <SelectItem value="poor">Mauvais</SelectItem>
                  <SelectItem value="ruins">Ruine</SelectItem>
                  <SelectItem value="construction">En construction</SelectItem>
                  <SelectItem value="renovation">En rénovation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost">Coût de construction</Label>
              <Input
                id="cost"
                name="cost"
                type="number"
                value={formData.cost}
                onChange={handleInputChange}
                placeholder="10000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="value">Valeur actuelle</Label>
              <Input
                id="value"
                name="value"
                type="number"
                value={formData.value}
                onChange={handleInputChange}
                placeholder="10000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenu (As/an)</Label>
              <Input
                id="revenue"
                name="revenue"
                type="number"
                value={formData.revenue}
                onChange={handleInputChange}
                placeholder="5000"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maintenanceCost">Coût d'entretien</Label>
              <Input
                id="maintenanceCost"
                name="maintenanceCost"
                type="number"
                value={formData.maintenanceCost}
                onChange={handleInputChange}
                placeholder="500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacité</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="constructionYear">Année de construction</Label>
              <Input
                id="constructionYear"
                name="constructionYear"
                type="number"
                value={formData.constructionYear}
                onChange={handleInputChange}
                placeholder={String(new Date().getFullYear())}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="condition">État de conservation (%)</Label>
              <Input
                id="condition"
                name="condition"
                type="number"
                value={formData.condition}
                onChange={handleInputChange}
                min="0"
                max="100"
                placeholder="100"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="owner">Propriétaire</Label>
              <Select 
                value={formData.owner as string} 
                onValueChange={value => handleSelectChange('owner', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir le propriétaire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="république">République</SelectItem>
                  <SelectItem value="privé">Privé</SelectItem>
                  <SelectItem value="religieux">Religieux</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description détaillée du bâtiment..."
              rows={4}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>{building ? 'Mettre à jour' : 'Ajouter'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublicBuildingModal;
