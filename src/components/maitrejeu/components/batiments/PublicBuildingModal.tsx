
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building, BuildingStatus, BuildingOwner, BuildingCreationData, BuildingType } from '../../types/batiments';

interface PublicBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BuildingCreationData) => void;
  building?: Building;
}

const PublicBuildingModal: React.FC<PublicBuildingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  building
}) => {
  const [formData, setFormData] = useState<BuildingCreationData>({
    name: '',
    type: BuildingType.FORUM,
    location: '',
    owner: BuildingOwner.REPUBLIC,
    description: '',
    status: BuildingStatus.GOOD,
    constructionYear: new Date().getFullYear() - 753,
    value: 50000,
    cost: 75000,
    maintenance: 1000,
    revenue: 0
  });

  useEffect(() => {
    if (building) {
      setFormData({
        name: building.name,
        type: building.type,
        location: building.location,
        owner: building.owner || BuildingOwner.REPUBLIC,
        description: building.description || '',
        status: building.status,
        constructionYear: building.constructionYear,
        value: building.value,
        cost: building.cost,
        maintenance: building.maintenance,
        revenue: building.revenue,
        capacity: building.capacity
      });
    } else {
      // Reset form for new building
      setFormData({
        name: '',
        type: BuildingType.FORUM,
        location: '',
        owner: BuildingOwner.REPUBLIC,
        description: '',
        status: BuildingStatus.GOOD,
        constructionYear: new Date().getFullYear() - 753,
        value: 50000,
        cost: 75000,
        maintenance: 1000,
        revenue: 0
      });
    }
  }, [building, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{building ? 'Modifier le bâtiment' : 'Ajouter un nouveau bâtiment public'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Nom du bâtiment</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger id="type" className="mt-1">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={BuildingType.TEMPLE}>Temple</SelectItem>
                  <SelectItem value={BuildingType.FORUM}>Forum</SelectItem>
                  <SelectItem value={BuildingType.BATHHOUSE}>Thermes</SelectItem>
                  <SelectItem value={BuildingType.THEATRE}>Théâtre</SelectItem>
                  <SelectItem value={BuildingType.MARKET}>Marché</SelectItem>
                  <SelectItem value={BuildingType.WAREHOUSE}>Entrepôt</SelectItem>
                  <SelectItem value={BuildingType.BARRACKS}>Caserne</SelectItem>
                  <SelectItem value={BuildingType.ACADEMY}>Académie</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Emplacement</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="owner">Propriétaire</Label>
              <Select
                value={formData.owner}
                onValueChange={(value) => handleSelectChange('owner', value)}
              >
                <SelectTrigger id="owner" className="mt-1">
                  <SelectValue placeholder="Sélectionner un propriétaire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={BuildingOwner.REPUBLIC}>République</SelectItem>
                  <SelectItem value={BuildingOwner.SENATORIAL}>Sénatorial</SelectItem>
                  <SelectItem value={BuildingOwner.RELIGIOUS}>Religieux</SelectItem>
                  <SelectItem value={BuildingOwner.MILITARY}>Militaire</SelectItem>
                  <SelectItem value={BuildingOwner.PRIVATE}>Privé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="constructionYear">Année de construction</Label>
              <Input
                id="constructionYear"
                name="constructionYear"
                type="number"
                value={formData.constructionYear}
                onChange={handleNumberChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="status">État</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange('status', value as BuildingStatus)}
              >
                <SelectTrigger id="status" className="mt-1">
                  <SelectValue placeholder="Sélectionner l'état" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={BuildingStatus.EXCELLENT}>Excellent</SelectItem>
                  <SelectItem value={BuildingStatus.GOOD}>Bon</SelectItem>
                  <SelectItem value={BuildingStatus.AVERAGE}>Moyen</SelectItem>
                  <SelectItem value={BuildingStatus.FAIR}>Correct</SelectItem>
                  <SelectItem value={BuildingStatus.POOR}>Mauvais</SelectItem>
                  <SelectItem value={BuildingStatus.DAMAGED}>Endommagé</SelectItem>
                  <SelectItem value={BuildingStatus.RUINED}>En ruine</SelectItem>
                  <SelectItem value={BuildingStatus.UNDER_CONSTRUCTION}>En construction</SelectItem>
                  <SelectItem value={BuildingStatus.UNDER_RENOVATION}>En rénovation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cost">Coût de construction</Label>
              <Input
                id="cost"
                name="cost"
                type="number"
                value={formData.cost}
                onChange={handleNumberChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="maintenance">Coût d'entretien (annuel)</Label>
              <Input
                id="maintenance"
                name="maintenance"
                type="number"
                value={formData.maintenance}
                onChange={handleNumberChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="revenue">Revenu (si applicable)</Label>
              <Input
                id="revenue"
                name="revenue"
                type="number"
                value={formData.revenue}
                onChange={handleNumberChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="capacity">Capacité</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                value={formData.capacity || 0}
                onChange={handleNumberChange}
                className="mt-1"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>
            {building ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublicBuildingModal;
