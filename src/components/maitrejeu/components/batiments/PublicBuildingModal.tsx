import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMaitreJeu } from '../../context';
import { PublicBuildingData } from '../../types/batiments';

export const PublicBuildingModal: React.FC<PublicBuildingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  building
}) => {
  const [formData, setFormData] = useState<PublicBuildingData>({
    name: '',
    type: 'temple',
    location: '',
    status: 'under_construction',
    constructionYear: new Date().getFullYear() - 753, // Conversion en année AUC
    description: '',
    cost: 0,
    maintenanceCost: 0,
    revenue: 0,
    capacity: 0,
    owner: 'république'
  });

  useEffect(() => {
    if (building) {
      setFormData({
        name: building.name || '',
        type: building.type || 'temple',
        location: building.location || '',
        status: building.status || 'under_construction',
        constructionYear: building.constructionYear || (new Date().getFullYear() - 753),
        description: building.description || '',
        cost: building.cost || 0,
        maintenanceCost: building.maintenanceCost || 0,
        revenue: building.revenue || 0,
        capacity: building.capacity || 0,
        owner: building.owner || 'république'
      });
    }
  }, [building]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'constructionYear' || name === 'cost' || name === 'maintenanceCost' || name === 'revenue' || name === 'capacity' 
        ? Number(value) 
        : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {building ? 'Modifier le bâtiment' : 'Nouveau bâtiment'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temple">Temple</SelectItem>
                  <SelectItem value="basilica">Basilique</SelectItem>
                  <SelectItem value="forum">Forum</SelectItem>
                  <SelectItem value="market">Marché</SelectItem>
                  <SelectItem value="aqueduct">Aqueduc</SelectItem>
                  <SelectItem value="theater">Théâtre</SelectItem>
                  <SelectItem value="amphitheater">Amphithéâtre</SelectItem>
                  <SelectItem value="circus">Cirque</SelectItem>
                  <SelectItem value="bath">Bain</SelectItem>
                  <SelectItem value="bridge">Pont</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="road">Route</SelectItem>
                  <SelectItem value="port">Port</SelectItem>
                  <SelectItem value="warehouse">Entrepôt</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Emplacement</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="constructionYear">Année de construction</Label>
              <Input
                id="constructionYear"
                type="number"
                value={formData.constructionYear}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under_construction">En construction</SelectItem>
                  <SelectItem value="completed">Complété</SelectItem>
                  <SelectItem value="damaged">Endommagé</SelectItem>
                  <SelectItem value="abandoned">Abandonné</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange(e)}
              rows={2}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost">Coût</Label>
              <Input
                id="cost"
                type="number"
                value={formData.cost}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maintenanceCost">Coût de maintenance</Label>
              <Input
                id="maintenanceCost"
                type="number"
                value={formData.maintenanceCost}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenu</Label>
              <Input
                id="revenue"
                type="number"
                value={formData.revenue}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacité</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox 
              id="approved" 
              checked={formData.approved} 
              onCheckedChange={(checked) => handleChange('approved', !!checked)}
            />
            <Label htmlFor="approved">Approuvé</Label>
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
