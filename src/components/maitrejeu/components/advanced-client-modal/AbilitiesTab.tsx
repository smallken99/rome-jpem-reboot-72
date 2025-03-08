
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { ClientCreationData } from '../../types/clients';

interface AbilitiesTabProps {
  formData: ClientCreationData;
  newAbility: string;
  setNewAbility: (value: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddAbility: () => void;
  handleRemoveAbility: (ability: string) => void;
}

export const AbilitiesTab: React.FC<AbilitiesTabProps> = ({
  formData,
  newAbility,
  setNewAbility,
  handleChange,
  handleAddAbility,
  handleRemoveAbility
}) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="competencePoints" className="text-right">Points de compétence</Label>
        <Input
          id="competencePoints"
          name="competencePoints"
          type="number"
          min="0"
          value={formData.competencePoints || 0}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
      
      <div className="grid grid-cols-4 items-start gap-4">
        <Label className="text-right pt-2">Capacités spéciales</Label>
        <div className="col-span-3 space-y-4">
          <div className="flex gap-2">
            <Input
              value={newAbility}
              onChange={(e) => setNewAbility(e.target.value)}
              placeholder="Nouvelle capacité..."
              className="flex-1"
            />
            <Button variant="outline" onClick={handleAddAbility}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.specialAbilities?.map((ability) => (
              <Badge key={ability} variant="secondary" className="flex items-center gap-1">
                {ability}
                <button 
                  type="button" 
                  onClick={() => handleRemoveAbility(ability)}
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {!formData.specialAbilities?.length && (
              <p className="text-sm text-muted-foreground">Aucune capacité spéciale ajoutée</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
