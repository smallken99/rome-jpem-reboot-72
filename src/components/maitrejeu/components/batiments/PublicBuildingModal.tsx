
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useMaitreJeu } from '../../context';

interface PublicBuildingData {
  id?: string;
  name: string;
  type: string;
  location: string;
  constructionYear: number;
  status: 'good' | 'average' | 'poor';
  description: string;
  cost: number;
  maintenanceCost: number;
  revenue: number;
  capacity: number;
  owner: string;
}

interface PublicBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PublicBuildingData) => void;
  building?: PublicBuildingData;
}

const DEFAULT_BUILDING_DATA: PublicBuildingData = {
  name: '',
  type: 'temple',
  location: 'Forum Romanum',
  constructionYear: 721,
  status: 'good',
  description: '',
  cost: 0,
  maintenanceCost: 0,
  revenue: 0,
  capacity: 0,
  owner: 'république'
};

export const PublicBuildingModal: React.FC<PublicBuildingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  building
}) => {
  const { currentYear } = useMaitreJeu();
  const [formData, setFormData] = useState<PublicBuildingData>(DEFAULT_BUILDING_DATA);
  const [activeTab, setActiveTab] = useState('basic');
  
  useEffect(() => {
    if (building) {
      setFormData(building);
    } else {
      setFormData({
        ...DEFAULT_BUILDING_DATA,
        constructionYear: currentYear
      });
    }
  }, [building, currentYear, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value)
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {building ? `Modifier ${building.name}` : 'Ajouter un bâtiment public'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Informations</TabsTrigger>
              <TabsTrigger value="financial">Finances</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du bâtiment</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                      <SelectItem value="basilique">Basilique</SelectItem>
                      <SelectItem value="aqueduc">Aqueduc</SelectItem>
                      <SelectItem value="thermes">Thermes</SelectItem>
                      <SelectItem value="forum">Forum</SelectItem>
                      <SelectItem value="theatre">Théâtre</SelectItem>
                      <SelectItem value="amphitheatre">Amphithéâtre</SelectItem>
                      <SelectItem value="marche">Marché</SelectItem>
                      <SelectItem value="senat">Sénat</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Emplacement</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleSelectChange('location', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un emplacement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Forum Romanum">Forum Romanum</SelectItem>
                      <SelectItem value="Champ de Mars">Champ de Mars</SelectItem>
                      <SelectItem value="Palatin">Palatin</SelectItem>
                      <SelectItem value="Capitole">Capitole</SelectItem>
                      <SelectItem value="Aventin">Aventin</SelectItem>
                      <SelectItem value="Quirinal">Quirinal</SelectItem>
                      <SelectItem value="Viminal">Viminal</SelectItem>
                      <SelectItem value="Esquilin">Esquilin</SelectItem>
                      <SelectItem value="Caelius">Caelius</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">État</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleSelectChange('status', value as 'good' | 'average' | 'poor')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un état" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="good">Bon</SelectItem>
                      <SelectItem value="average">Moyen</SelectItem>
                      <SelectItem value="poor">Mauvais</SelectItem>
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
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="financial" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cost">Coût de construction (as)</Label>
                  <Input
                    id="cost"
                    name="cost"
                    type="number"
                    value={formData.cost}
                    onChange={handleNumberChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maintenanceCost">Coût d'entretien par saison (as)</Label>
                  <Input
                    id="maintenanceCost"
                    name="maintenanceCost"
                    type="number"
                    value={formData.maintenanceCost}
                    onChange={handleNumberChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="revenue">Revenu par saison (as)</Label>
                  <Input
                    id="revenue"
                    name="revenue"
                    type="number"
                    value={formData.revenue}
                    onChange={handleNumberChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="owner">Propriétaire</Label>
                  <Select
                    value={formData.owner}
                    onValueChange={(value) => handleSelectChange('owner', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un propriétaire" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="république">République</SelectItem>
                      <SelectItem value="privé">Privé</SelectItem>
                      <SelectItem value="temple">Temple</SelectItem>
                      <SelectItem value="collège">Collège</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="constructionYear">Année de construction (AUC)</Label>
                  <Input
                    id="constructionYear"
                    name="constructionYear"
                    type="number"
                    value={formData.constructionYear}
                    onChange={handleNumberChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacité (personnes)</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleNumberChange}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {building ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
