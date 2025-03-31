
import React, { useState } from 'react';
import { useMaitreJeu } from '../../context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export const NewProvinceForm: React.FC<{
  onCancel: () => void;
}> = ({ onCancel }) => {
  const { provinces } = useMaitreJeu();
  
  const [formData, setFormData] = useState({
    name: '',
    governor: '',
    status: 'pacified',
    population: 0,
    resources: '',
    description: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    // In a real application, you would create the province here
    onCancel();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nouvelle province</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nom</label>
            <Input 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Gouverneur</label>
            <Input 
              name="governor" 
              value={formData.governor} 
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Statut</label>
            <Select 
              value={formData.status}
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pacified">Pacifiée</SelectItem>
                <SelectItem value="warzone">Zone de guerre</SelectItem>
                <SelectItem value="rebellion">Rébellion</SelectItem>
                <SelectItem value="new">Nouvelle acquisition</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Population</label>
            <Input 
              name="population" 
              type="number"
              value={formData.population.toString()} 
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Ressources (séparées par des virgules)</label>
            <Input 
              name="resources" 
              value={formData.resources} 
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              rows={4}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Annuler
            </Button>
            <Button type="submit">Créer la province</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
