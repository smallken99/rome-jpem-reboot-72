
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Building } from '@/components/maitrejeu/types/batiments';

interface PublicBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (building: Partial<Building>) => void;
  building?: Building;
}

export const PublicBuildingModal: React.FC<PublicBuildingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  building
}) => {
  const isEditMode = !!building;
  
  const [formData, setFormData] = useState<Partial<Building>>(
    building || {
      name: '',
      type: 'temple',
      description: '',
      location: '',
      condition: 'excellent',
      constructionYear: new Date().getFullYear() - 2000,
      maintenanceCost: 1000,
      maintenanceInterval: 12,
      revenue: 0,
      cost: 0,
      capacity: 0,
      isPublic: true,
      ownerId: null,
      slaves: 0,
      slaveCost: 0,
      tags: []
    }
  );

  const handleChange = (field: keyof Building, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Modifier un bâtiment' : 'Ajouter un nouveau bâtiment'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du bâtiment</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => handleChange('name', e.target.value)} 
                placeholder="Ex: Temple de Jupiter"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type de bâtiment</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleChange('type', value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temple">Temple</SelectItem>
                  <SelectItem value="forum">Forum</SelectItem>
                  <SelectItem value="aqueduc">Aqueduc</SelectItem>
                  <SelectItem value="thermes">Thermes</SelectItem>
                  <SelectItem value="theatre">Théâtre</SelectItem>
                  <SelectItem value="amphitheatre">Amphithéâtre</SelectItem>
                  <SelectItem value="cirque">Cirque</SelectItem>
                  <SelectItem value="marche">Marché</SelectItem>
                  <SelectItem value="port">Port</SelectItem>
                  <SelectItem value="entrepot">Entrepôt</SelectItem>
                  <SelectItem value="caserne">Caserne</SelectItem>
                  <SelectItem value="residence">Résidence</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={(e) => handleChange('description', e.target.value)} 
              placeholder="Description du bâtiment et de son usage"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Localisation</Label>
              <Input 
                id="location" 
                value={formData.location} 
                onChange={(e) => handleChange('location', e.target.value)} 
                placeholder="Ex: Forum Romanum"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condition">État</Label>
              <Select 
                value={formData.condition} 
                onValueChange={(value: any) => handleChange('condition', value)}
              >
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Sélectionner un état" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="bon">Bon</SelectItem>
                  <SelectItem value="moyen">Moyen</SelectItem>
                  <SelectItem value="mauvais">Mauvais</SelectItem>
                  <SelectItem value="critique">Critique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="constructionYear">Année de construction</Label>
              <Input 
                id="constructionYear" 
                type="number" 
                value={formData.constructionYear} 
                onChange={(e) => handleChange('constructionYear', parseInt(e.target.value))} 
                placeholder="Ex: 705"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacité</Label>
              <Input 
                id="capacity" 
                type="number" 
                value={formData.capacity} 
                onChange={(e) => handleChange('capacity', parseInt(e.target.value))} 
                placeholder="Ex: 1000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maintenanceCost">Coût d'entretien</Label>
              <Input 
                id="maintenanceCost" 
                type="number" 
                value={formData.maintenanceCost} 
                onChange={(e) => handleChange('maintenanceCost', parseInt(e.target.value))} 
                placeholder="Deniers par an"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenu</Label>
              <Input 
                id="revenue" 
                type="number" 
                value={formData.revenue} 
                onChange={(e) => handleChange('revenue', parseInt(e.target.value))} 
                placeholder="Deniers par an"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slaves">Esclaves</Label>
              <Input 
                id="slaves" 
                type="number" 
                value={formData.slaves} 
                onChange={(e) => handleChange('slaves', parseInt(e.target.value))} 
                placeholder="Nombre d'esclaves"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slaveCost">Coût des esclaves</Label>
              <Input 
                id="slaveCost" 
                type="number" 
                value={formData.slaveCost} 
                onChange={(e) => handleChange('slaveCost', parseInt(e.target.value))} 
                placeholder="Deniers par an"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave}>
            {isEditMode ? 'Mettre à jour' : 'Ajouter le bâtiment'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
