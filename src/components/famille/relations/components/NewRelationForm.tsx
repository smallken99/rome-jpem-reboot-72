
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRelations } from '../context/RelationsContext';
import { toast } from 'sonner';
import { RelationType } from '../types/relationTypes';

interface NewRelationFormProps {
  onSuccess?: () => void;
}

export const NewRelationForm: React.FC<NewRelationFormProps> = ({ onSuccess }) => {
  const { addRelation } = useRelations();
  const [formData, setFormData] = useState({
    targetName: '',
    targetRole: '',
    type: 'neutral' as RelationType,
    description: '',
    strength: 50,
    tags: []
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      addRelation({
        targetName: formData.targetName,
        targetRole: formData.targetRole,
        type: formData.type as RelationType,
        description: formData.description,
        strength: formData.strength,
        tags: formData.tags
      });
      
      toast.success('Relation ajoutée avec succès');
      
      // Reset form
      setFormData({
        targetName: '',
        targetRole: '',
        type: 'neutral',
        description: '',
        strength: 50,
        tags: []
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de la relation');
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nouvelle relation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetName">Nom</Label>
              <Input
                id="targetName"
                value={formData.targetName}
                onChange={e => handleChange('targetName', e.target.value)}
                placeholder="Nom de la personne"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetRole">Rôle / Position</Label>
              <Input
                id="targetRole"
                value={formData.targetRole}
                onChange={e => handleChange('targetRole', e.target.value)}
                placeholder="Sénateur, Marchand, etc."
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Type de relation</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={value => handleChange('type', value as RelationType)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="positive" id="positive" />
                <Label htmlFor="positive">Positive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral">Neutre</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="negative" id="negative" />
                <Label htmlFor="negative">Négative</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Détails sur la relation"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="strength">Force de la relation: {formData.strength}</Label>
            <Input
              id="strength"
              type="range"
              min="0"
              max="100"
              value={formData.strength}
              onChange={e => handleChange('strength', parseInt(e.target.value))}
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">Ajouter</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
