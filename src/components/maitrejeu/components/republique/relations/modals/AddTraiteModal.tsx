
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

interface AddTraiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (type: 'nation' | 'traite' | 'alliance') => void;
}

export const AddTraiteModal: React.FC<AddTraiteModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [formData, setFormData] = useState({
    title: '',
    parties: ['Rome'],
    type: '',
    dateSignature: '',
    dateExpiration: '',
    status: 'active',
    clauses: [''],
    description: '',
    benefits: [''],
    obligations: ['']
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleArrayInputChange = (field: 'parties' | 'clauses' | 'benefits' | 'obligations', index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };
  
  const addArrayItem = (field: 'parties' | 'clauses' | 'benefits' | 'obligations') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
  
  const removeArrayItem = (field: 'parties' | 'clauses' | 'benefits' | 'obligations', index: number) => {
    if (field === 'parties' && index === 0) return; // Don't remove Rome
    
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return { ...prev, [field]: newArray };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd('traite');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau traité</DialogTitle>
          <DialogDescription>
            Créez un nouveau traité diplomatique entre Rome et d'autres nations.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du traité</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Parties</Label>
              {formData.parties.map((party, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={party}
                    onChange={(e) => handleArrayInputChange('parties', index, e.target.value)}
                    disabled={index === 0} // Rome is fixed
                  />
                  {index > 0 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeArrayItem('parties', index)}
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
                onClick={() => addArrayItem('parties')}
              >
                Ajouter une partie
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type de traité</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="peace">Paix</SelectItem>
                    <SelectItem value="trade">Commerce</SelectItem>
                    <SelectItem value="military">Militaire</SelectItem>
                    <SelectItem value="tribute">Tribut</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
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
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="expired">Expiré</SelectItem>
                    <SelectItem value="violated">Violé</SelectItem>
                    <SelectItem value="canceled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateSignature">Date de signature</Label>
                <Input
                  id="dateSignature"
                  name="dateSignature"
                  type="date"
                  value={formData.dateSignature}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateExpiration">Date d'expiration (optionnelle)</Label>
                <Input
                  id="dateExpiration"
                  name="dateExpiration"
                  type="date"
                  value={formData.dateExpiration}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Clauses du traité</Label>
              {formData.clauses.map((clause, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={clause}
                    onChange={(e) => handleArrayInputChange('clauses', index, e.target.value)}
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeArrayItem('clauses', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => addArrayItem('clauses')}
              >
                Ajouter une clause
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
            
            <div className="space-y-2">
              <Label>Bénéfices pour Rome</Label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={benefit}
                    onChange={(e) => handleArrayInputChange('benefits', index, e.target.value)}
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeArrayItem('benefits', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => addArrayItem('benefits')}
              >
                Ajouter un bénéfice
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label>Obligations de Rome</Label>
              {formData.obligations.map((obligation, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={obligation}
                    onChange={(e) => handleArrayInputChange('obligations', index, e.target.value)}
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeArrayItem('obligations', index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => addArrayItem('obligations')}
              >
                Ajouter une obligation
              </Button>
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
