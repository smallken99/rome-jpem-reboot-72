
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CLIENT_TYPES, 
  CLIENT_LOCATIONS, 
  CLIENT_LOYALTIES, 
  CLIENT_STATUSES, 
  ClientCreationData,
  ClientInfluences
} from '../../types/clients';

interface FormFieldsProps {
  formData: ClientCreationData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleInfluenceChange: (type: 'political' | 'popular' | 'religious', value: string) => void;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  handleInfluenceChange
}) => {
  return (
    <div className="grid gap-4 py-4">
      {/* Name field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nom
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      
      {/* Type field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="type" className="text-right">
          Type
        </Label>
        <Select
          value={formData.type}
          onValueChange={(value) => handleSelectChange('type', value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Type de client" />
          </SelectTrigger>
          <SelectContent>
            {CLIENT_TYPES.map(type => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* SubType field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="subType" className="text-right">
          Sous-type
        </Label>
        <Input
          id="subType"
          name="subType"
          value={formData.subType || ''}
          onChange={handleChange}
          className="col-span-3"
          placeholder="Ex: Forgeron, Augure, etc."
        />
      </div>
      
      {/* Location field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="location" className="text-right">
          Lieu
        </Label>
        <Select
          value={formData.location || 'Forum'}
          onValueChange={(value) => handleSelectChange('location', value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Lieu de résidence" />
          </SelectTrigger>
          <SelectContent>
            {CLIENT_LOCATIONS.map(location => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Loyalty field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="loyalty" className="text-right">
          Loyauté
        </Label>
        <Select
          value={String(formData.loyalty) || 'moyenne'}
          onValueChange={(value) => handleSelectChange('loyalty', value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Niveau de loyauté" />
          </SelectTrigger>
          <SelectContent>
            {CLIENT_LOYALTIES.map(loyalty => (
              <SelectItem key={loyalty} value={loyalty}>
                {loyalty.charAt(0).toUpperCase() + loyalty.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Political influence field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Influence politique</Label>
        <Input
          type="range"
          min="0"
          max="10"
          value={formData.influences?.political || 0}
          onChange={(e) => handleInfluenceChange('political', e.target.value)}
          className="col-span-2"
        />
        <span>{formData.influences?.political || 0}</span>
      </div>
      
      {/* Popular influence field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Influence populaire</Label>
        <Input
          type="range"
          min="0"
          max="10"
          value={formData.influences?.popular || 0}
          onChange={(e) => handleInfluenceChange('popular', e.target.value)}
          className="col-span-2"
        />
        <span>{formData.influences?.popular || 0}</span>
      </div>
      
      {/* Religious influence field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Influence religieuse</Label>
        <Input
          type="range"
          min="0"
          max="10"
          value={formData.influences?.religious || 0}
          onChange={(e) => handleInfluenceChange('religious', e.target.value)}
          className="col-span-2"
        />
        <span>{formData.influences?.religious || 0}</span>
      </div>
    </div>
  );
};
