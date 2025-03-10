
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loi } from '../../../types/lois';

interface LoiEffetsSectionProps {
  formData: Omit<Loi, 'id'>;
  handleEffetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoiEffetsSection: React.FC<LoiEffetsSectionProps> = ({
  formData,
  handleEffetChange
}) => {
  return (
    <div className="space-y-2">
      <Label>Effets de la loi</Label>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stabilité">Stabilité</Label>
          <Input
            id="stabilité"
            name="stabilité"
            type="number"
            value={formData.effets.stabilité || 0}
            onChange={handleEffetChange}
            placeholder="-10 à +10"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="popularité">Popularité</Label>
          <Input
            id="popularité"
            name="popularité"
            type="number"
            value={formData.effets.popularité || 0}
            onChange={handleEffetChange}
            placeholder="-10 à +10"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="corruption">Corruption</Label>
          <Input
            id="corruption"
            name="corruption"
            type="number"
            value={formData.effets.corruption || 0}
            onChange={handleEffetChange}
            placeholder="-10 à +10"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="efficacité">Efficacité</Label>
          <Input
            id="efficacité"
            name="efficacité"
            type="number"
            value={formData.effets.efficacité || 0}
            onChange={handleEffetChange}
            placeholder="-10 à +10"
          />
        </div>
      </div>
    </div>
  );
};
