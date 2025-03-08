
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Client } from '../../types/clients';
import { ClientType } from '@/components/clientele/ClientCard';

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
  const clientTypes: ClientType[] = ['artisan_commercant', 'politicien', 'religieux', 'proprietaire', 'pegre'];
  const locations = ['Rome', 'Italia', 'Gallia', 'Hispania', 'Graecia', 'Asia', 'Africa', 'Aegyptus'];
  const loyaltyLevels = ['faible', 'moyenne', 'forte'];
  
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="name">Nom du client</Label>
        <Input 
          id="name" 
          name="name" 
          value={formData.name || ''} 
          onChange={handleChange}
          placeholder="Entrez le nom du client"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type de client</Label>
          <Select 
            value={formData.type || 'artisan_commercant'} 
            onValueChange={(value) => handleSelectChange('type', value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              {clientTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subType">Sous-type / Profession</Label>
          <Input 
            id="subType" 
            name="subType" 
            value={formData.subType || ''} 
            onChange={handleChange}
            placeholder="Ex: Forgeron, Prêtre, etc."
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Localisation</Label>
          <Select 
            value={formData.location || locations[0]} 
            onValueChange={(value) => handleSelectChange('location', value)}
          >
            <SelectTrigger id="location">
              <SelectValue placeholder="Sélectionnez une région" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(location => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="loyalty">Loyauté</Label>
          <Select 
            value={formData.loyalty || loyaltyLevels[1]} 
            onValueChange={(value) => handleSelectChange('loyalty', value)}
          >
            <SelectTrigger id="loyalty">
              <SelectValue placeholder="Niveau de loyauté" />
            </SelectTrigger>
            <SelectContent>
              {loyaltyLevels.map(level => (
                <SelectItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4 pt-2">
        <Label>Niveaux d'influence</Label>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="political">Politique</Label>
              <span className="text-sm">{formData.influences?.political || 0}</span>
            </div>
            <Slider 
              id="political"
              min={0}
              max={10}
              step={1}
              value={[formData.influences?.political || 0]}
              onValueChange={(value) => handleInfluenceChange('political', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="popular">Populaire</Label>
              <span className="text-sm">{formData.influences?.popular || 0}</span>
            </div>
            <Slider 
              id="popular"
              min={0}
              max={10}
              step={1}
              value={[formData.influences?.popular || 0]}
              onValueChange={(value) => handleInfluenceChange('popular', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="religious">Religieuse</Label>
              <span className="text-sm">{formData.influences?.religious || 0}</span>
            </div>
            <Slider 
              id="religious"
              min={0}
              max={10}
              step={1}
              value={[formData.influences?.religious || 0]}
              onValueChange={(value) => handleInfluenceChange('religious', value[0])}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2 pt-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="relationshipLevel">Niveau de relation</Label>
          <span className="text-sm">{formData.relationshipLevel || 1}</span>
        </div>
        <Slider 
          id="relationshipLevel"
          min={1}
          max={5}
          step={1}
          value={[formData.relationshipLevel || 1]}
          onValueChange={(value) => handleRelationshipChange(value[0])}
        />
        <p className="text-xs text-muted-foreground pt-1">
          Définit la proximité entre le client et son sénateur de 1 (simple connaissance) à 5 (très proche).
        </p>
      </div>
    </div>
  );
};
