
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, BuildingCreationData, BuildingType, BuildingStatus, BuildingOwner, PublicBuildingModalProps } from '../../types/batiments';

const PublicBuildingModal: React.FC<PublicBuildingModalProps> = ({ isOpen, onClose, onSave, building }) => {
  const [formData, setFormData] = useState<BuildingCreationData>({
    name: '',
    type: 'temple' as BuildingType,
    location: '',
    status: 'good' as BuildingStatus,
    constructionYear: new Date().getFullYear() - 10,
    description: '',
    cost: 0,
    maintenanceCost: 0,
    value: 0,
    condition: 100,
    revenue: 0,
    capacity: 0,
    owner: 'république' as BuildingOwner
  });

  useEffect(() => {
    if (building) {
      setFormData({
        name: building.name,
        type: building.type,
        location: building.location,
        status: building.status,
        constructionYear: building.constructionYear || new Date().getFullYear() - 10,
        description: building.description,
        cost: building.cost || 0,
        maintenanceCost: building.maintenanceCost,
        value: building.value,
        condition: building.condition,
        revenue: building.revenue || 0,
        capacity: building.capacity || 0,
        owner: (building.owner as BuildingOwner) || 'république'
      });
    } else {
      // Reset form when no building is provided
      setFormData({
        name: '',
        type: 'temple' as BuildingType,
        location: '',
        status: 'good' as BuildingStatus,
        constructionYear: new Date().getFullYear() - 10,
        description: '',
        cost: 0,
        maintenanceCost: 0,
        value: 0,
        condition: 100,
        revenue: 0,
        capacity: 0,
        owner: 'république' as BuildingOwner
      });
    }
  }, [building]);

  const handleChange = (key: keyof BuildingCreationData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{building ? 'Modifier le bâtiment' : 'Ajouter un nouveau bâtiment'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Nom du bâtiment"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={value => handleChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de bâtiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temple">Temple</SelectItem>
                  <SelectItem value="forum">Forum</SelectItem>
                  <SelectItem value="basilica">Basilique</SelectItem>
                  <SelectItem value="senate">Sénat</SelectItem>
                  <SelectItem value="theater">Théâtre</SelectItem>
                  <SelectItem value="amphitheater">Amphithéâtre</SelectItem>
                  <SelectItem value="baths">Thermes</SelectItem>
                  <SelectItem value="market">Marché</SelectItem>
                  <SelectItem value="warehouse">Entrepôt</SelectItem>
                  <SelectItem value="port">Port</SelectItem>
                  <SelectItem value="aqueduct">Aqueduc</SelectItem>
                  <SelectItem value="road">Route</SelectItem>
                  <SelectItem value="bridge">Pont</SelectItem>
                  <SelectItem value="military">Édifice militaire</SelectItem>
                  <SelectItem value="wall">Muraille</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Localisation</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={e => handleChange('location', e.target.value)}
                placeholder="Localisation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">État</Label>
              <Select value={formData.status} onValueChange={value => handleChange('status', value as BuildingStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="État du bâtiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Bon</SelectItem>
                  <SelectItem value="fair">Correct</SelectItem>
                  <SelectItem value="poor">Mauvais</SelectItem>
                  <SelectItem value="ruins">En ruines</SelectItem>
                  <SelectItem value="construction">En construction</SelectItem>
                  <SelectItem value="renovation">En rénovation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Valeur (As)</Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={e => handleChange('value', parseInt(e.target.value) || 0)}
                placeholder="Valeur"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenanceCost">Coût d'entretien (As/an)</Label>
              <Input
                id="maintenanceCost"
                type="number"
                value={formData.maintenanceCost}
                onChange={e => handleChange('maintenanceCost', parseInt(e.target.value) || 0)}
                placeholder="Coût d'entretien"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="constructionYear">Année de construction</Label>
              <Input
                id="constructionYear"
                type="number"
                value={formData.constructionYear}
                onChange={e => handleChange('constructionYear', parseInt(e.target.value) || 0)}
                placeholder="Année de construction"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition">État (0-100)</Label>
              <Input
                id="condition"
                type="number"
                min="0"
                max="100"
                value={formData.condition}
                onChange={e => handleChange('condition', parseInt(e.target.value) || 0)}
                placeholder="État"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenu (As/an)</Label>
              <Input
                id="revenue"
                type="number"
                value={formData.revenue}
                onChange={e => handleChange('revenue', parseInt(e.target.value) || 0)}
                placeholder="Revenu annuel"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacité</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={e => handleChange('capacity', parseInt(e.target.value) || 0)}
                placeholder="Capacité"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="owner">Propriétaire</Label>
            <Select 
              value={formData.owner as string} 
              onValueChange={value => handleChange('owner', value as BuildingOwner)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Propriétaire" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="république">République</SelectItem>
                <SelectItem value="privé">Privé</SelectItem>
                <SelectItem value="religieux">Institution religieuse</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Description du bâtiment"
              rows={3}
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
