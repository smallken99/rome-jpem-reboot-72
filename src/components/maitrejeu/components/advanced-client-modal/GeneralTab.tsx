
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Client } from '../../types/clients';
import { ClientInfluence, ClientType } from '@/components/clientele/ClientCard';

interface GeneralTabProps {
  formData: Partial<Client>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
  handleInfluenceChange: (type: keyof ClientInfluence, value: number) => void;
  handleRelationshipChange: (level: number) => void;
}

export const GeneralTab: React.FC<GeneralTabProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  handleInfluenceChange,
  handleRelationshipChange
}) => {
  const clientTypes = [
    { value: 'artisan_commercant', label: 'Artisan / Commerçant' },
    { value: 'politicien', label: 'Politicien' },
    { value: 'religieux', label: 'Religieux' },
    { value: 'proprietaire', label: 'Propriétaire terrien' },
    { value: 'pegre', label: 'Pègre / Criminel' }
  ];

  const loyaltyOptions = [
    { value: 'faible', label: 'Faible' },
    { value: 'moyenne', label: 'Moyenne' },
    { value: 'forte', label: 'Forte' },
    { value: 'exceptionnelle', label: 'Exceptionnelle' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
    { value: 'probation', label: 'En probation' }
  ];

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="name">Nom du client</Label>
        <Input
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          placeholder="Nom complet du client"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type de client</Label>
          <select
            id="type"
            name="type"
            value={formData.type || 'artisan_commercant'}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-input bg-background"
          >
            {clientTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subType">Spécialisation</Label>
          <Input
            id="subType"
            name="subType"
            value={formData.subType || ''}
            onChange={handleChange}
            placeholder="Ex: Forgeron, Prêtre de Jupiter..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Localisation</Label>
          <Input
            id="location"
            name="location"
            value={formData.location || ''}
            onChange={handleChange}
            placeholder="Quartier, ville, région..."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="loyalty">Loyauté</Label>
          <select
            id="loyalty"
            name="loyalty"
            value={formData.loyalty || 'moyenne'}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-input bg-background"
          >
            {loyaltyOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="activeStatus">Statut</Label>
        <select
          id="activeStatus"
          name="activeStatus"
          value={formData.activeStatus || 'active'}
          onChange={handleChange}
          className="w-full p-2 rounded-md border border-input bg-background"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-medium">Sphères d'influence</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="political-influence">Influence Politique</Label>
              <span className="text-sm font-medium">{formData.influences?.political || 0}</span>
            </div>
            <Slider 
              id="political-influence"
              min={0} 
              max={10} 
              step={1}
              value={[formData.influences?.political || 0]}
              onValueChange={(value) => handleInfluenceChange('political', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="popular-influence">Influence Populaire</Label>
              <span className="text-sm font-medium">{formData.influences?.popular || 0}</span>
            </div>
            <Slider 
              id="popular-influence"
              min={0} 
              max={10} 
              step={1}
              value={[formData.influences?.popular || 0]}
              onValueChange={(value) => handleInfluenceChange('popular', value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="religious-influence">Influence Religieuse</Label>
              <span className="text-sm font-medium">{formData.influences?.religious || 0}</span>
            </div>
            <Slider 
              id="religious-influence"
              min={0} 
              max={10} 
              step={1}
              value={[formData.influences?.religious || 0]}
              onValueChange={(value) => handleInfluenceChange('religious', value[0])}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex justify-between items-center">
          <Label htmlFor="relationship-level">Niveau de relation</Label>
          <span className="text-sm font-medium">{formData.relationshipLevel || 1}</span>
        </div>
        <Slider 
          id="relationship-level"
          min={1} 
          max={5} 
          step={1}
          value={[formData.relationshipLevel || 1]}
          onValueChange={(value) => handleRelationshipChange(value[0])}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Connaissances</span>
          <span>Ami proche</span>
          <span>Allié</span>
          <span>Confident</span>
          <span>Dévoué</span>
        </div>
      </div>
    </div>
  );
};
