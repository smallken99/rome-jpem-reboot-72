
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { CLIENT_TYPES, CLIENT_LOCATIONS, CLIENT_LOYALTIES, CLIENT_STATUSES, Client } from '../../types/clients';

interface GeneralTabProps {
  formData: Partial<Client>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
  handleInfluenceChange: (type: 'political' | 'popular' | 'religious', value: number) => void;
  handleRelationshipChange: (level: number) => void;
}

export const GeneralTab: React.FC<GeneralTabProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  handleInfluenceChange,
  handleRelationshipChange
}) => {
  return (
    <div className="space-y-4 py-2">
      <div>
        <Label htmlFor="name">Nom</Label>
        <Input
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type || 'standard'}
            onValueChange={(value) => handleSelectChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type de client" />
            </SelectTrigger>
            <SelectContent>
              {CLIENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="subType">Sous-type</Label>
          <Input
            id="subType"
            name="subType"
            value={formData.subType || ''}
            onChange={handleChange}
            placeholder="Ex: Forgeron, Augure, etc."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Emplacement</Label>
          <Select
            value={formData.location || 'Forum'}
            onValueChange={(value) => handleSelectChange('location', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Lieu de résidence" />
            </SelectTrigger>
            <SelectContent>
              {CLIENT_LOCATIONS.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="loyalty">Loyauté</Label>
          <Select
            value={String(formData.loyalty) || 'moyenne'}
            onValueChange={(value) => handleSelectChange('loyalty', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Niveau de loyauté" />
            </SelectTrigger>
            <SelectContent>
              {CLIENT_LOYALTIES.map((loyalty) => (
                <SelectItem key={loyalty} value={loyalty}>
                  {loyalty.charAt(0).toUpperCase() + loyalty.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="status">Statut</Label>
        <Select
          value={formData.activeStatus || 'active'}
          onValueChange={(value) => handleSelectChange('activeStatus', value as 'active' | 'inactive' | 'probation')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            {CLIENT_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status === 'active' ? 'Actif' : status === 'inactive' ? 'Inactif' : 'Probation'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Influences</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <Label htmlFor="politicalInfluence">Politique: {formData.influences?.political || 0}</Label>
            </div>
            <Slider
              id="politicalInfluence"
              value={[formData.influences?.political || 0]}
              min={0}
              max={10}
              step={1}
              onValueChange={(value) => handleInfluenceChange('political', value[0])}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <Label htmlFor="popularInfluence">Populaire: {formData.influences?.popular || 0}</Label>
            </div>
            <Slider
              id="popularInfluence"
              value={[formData.influences?.popular || 0]}
              min={0}
              max={10}
              step={1}
              onValueChange={(value) => handleInfluenceChange('popular', value[0])}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <Label htmlFor="religiousInfluence">Religieuse: {formData.influences?.religious || 0}</Label>
            </div>
            <Slider
              id="religiousInfluence"
              value={[formData.influences?.religious || 0]}
              min={0}
              max={10}
              step={1}
              onValueChange={(value) => handleInfluenceChange('religious', value[0])}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <Label htmlFor="relationshipLevel">Niveau de relation: {formData.relationshipLevel || 1}</Label>
        </div>
        <Slider
          id="relationshipLevel"
          value={[formData.relationshipLevel || 1]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => handleRelationshipChange(value[0])}
        />
      </div>
    </div>
  );
};
