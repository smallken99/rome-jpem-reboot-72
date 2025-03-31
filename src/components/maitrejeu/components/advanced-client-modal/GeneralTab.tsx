
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { CLIENT_TYPES, CLIENT_LOCATIONS, CLIENT_LOYALTIES, CLIENT_STATUSES, Client } from '../../types/clients';
import { ClientInfluenceSlider } from './ClientInfluenceSlider';

interface GeneralTabProps {
  formData: Partial<Client>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Nom du client"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type || 'standard'}
            onValueChange={(value) => handleSelectChange('type', value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              {CLIENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subType">Sous-type / Profession</Label>
          <Input
            id="subType"
            name="subType"
            value={formData.subType || ''}
            onChange={handleChange}
            placeholder="Ex: Forgeron, Marchand..."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Lieu</Label>
          <Select
            value={formData.location || 'Forum'}
            onValueChange={(value) => handleSelectChange('location', value)}
          >
            <SelectTrigger id="location">
              <SelectValue placeholder="Sélectionner un lieu" />
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Âge</Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={formData.age || 30}
            onChange={handleChange}
            min={16}
            max={90}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="activeStatus">Statut</Label>
          <Select
            value={formData.activeStatus || 'active'}
            onValueChange={(value) => handleSelectChange('activeStatus', value)}
          >
            <SelectTrigger id="activeStatus">
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              {CLIENT_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="loyalty">Loyauté</Label>
        <Select
          value={formData.loyalty || 'moyenne'}
          onValueChange={(value) => handleSelectChange('loyalty', value)}
        >
          <SelectTrigger id="loyalty">
            <SelectValue placeholder="Niveau de loyauté" />
          </SelectTrigger>
          <SelectContent>
            {CLIENT_LOYALTIES.map((level) => (
              <SelectItem key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4 mt-6">
        <Label className="text-base">Niveaux d'influence</Label>
        
        <div className="space-y-6">
          <ClientInfluenceSlider
            label="Influence Politique"
            value={(formData.influences?.political as number) || 0}
            onChange={(value) => handleInfluenceChange('political', value)}
            color="blue"
          />
          
          <ClientInfluenceSlider
            label="Influence Populaire"
            value={(formData.influences?.popular as number) || 0}
            onChange={(value) => handleInfluenceChange('popular', value)}
            color="amber"
          />
          
          <ClientInfluenceSlider
            label="Influence Religieuse"
            value={(formData.influences?.religious as number) || 0}
            onChange={(value) => handleInfluenceChange('religious', value)}
            color="purple"
          />
        </div>
      </div>
      
      <div className="space-y-2 mt-6">
        <Label className="text-base">Niveau de relation</Label>
        <ClientInfluenceSlider
          label="Relation avec le client"
          value={formData.relationshipLevel || 1}
          onChange={handleRelationshipChange}
          color="green"
          min={1}
          max={10}
        />
      </div>
    </div>
  );
};
