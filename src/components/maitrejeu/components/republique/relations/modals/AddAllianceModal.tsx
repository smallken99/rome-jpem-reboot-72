
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface AddAllianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (type: 'nation' | 'traite' | 'alliance') => void;
}

export const AddAllianceModal: React.FC<AddAllianceModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [formData, setFormData] = useState({
    name: '',
    members: ['Rome'],
    type: '',
    dateCreation: '',
    duration: '',
    status: 'active',
    militarySupport: '',
    economicBenefits: [''],
    commitments: [''],
    description: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleArrayInputChange = (field: 'members' | 'economicBenefits' | 'commitments', index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };
  
  const addArrayItem = (field: 'members' | 'economicBenefits' | 'commitments') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
  
  const removeArrayItem = (field: 'members' | 'economicBenefits' | 'commitments', index: number) => {
    if (field === 'members' && index === 0) return; // Don't remove Rome
    
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd('alliance');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle alliance</DialogTitle>
          <DialogDescription>
            Créez une nouvelle alliance militaire entre Rome et d'autres nations.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de l'alliance</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Membres</Label>
              {formData.members.map((member, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={member}
                    onChange={(e) => handleArrayInputChange('members', index, e.target.value)}
                    disabled={index === 0} // Rome is fixed
                  />
                  {index > 0 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeArrayItem('members', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => addArrayItem('members')}
              >
                Ajouter un membre
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type d'alliance</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defensive">Défensive</SelectItem>
                    <SelectItem value="offensive">Offensive</SelectItem>
                    <SelectItem value="full">Complète</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expirée</SelectItem>
                    <SelectItem value="dissolved">Dissoute</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateCreation">Date de création</Label>
                <Input
                  id="dateCreation"
                  name="dateCreation"
                  type="date"
                  value={formData.dateCreation}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Durée (années)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="militarySupport">Support militaire (nombre d'hommes)</Label>
              <Input
                id="militarySupport"
                name="militarySupport"
                type="number"
                min="0"
                value={formData.militarySupport}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Bénéfices économiques</Label>
              {formData.economicBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={benefit}
                    onChange={(e) => handleArrayInputChange('economicBenefits', index, e.target.value)}
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeArrayItem('economicBenefits', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => addArrayItem('economicBenefits')}
              >
                Ajouter un bénéfice
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label>Engagements</Label>
              {formData.commitments.map((commitment, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={commitment}
                    onChange={(e) => handleArrayInputChange('commitments', index, e.target.value)}
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeArrayItem('commitments', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => addArrayItem('commitments')}
              >
                Ajouter un engagement
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
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
