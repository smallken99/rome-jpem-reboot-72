
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { Client } from '../../types/clients';

interface AbilitiesTabProps {
  formData: Partial<Client>;
  newAbility: string;
  setNewAbility: (value: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
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
    <div className="space-y-4 py-2">
      <div>
        <Label htmlFor="competencePoints">Points de compétence</Label>
        <Input
          id="competencePoints"
          name="competencePoints"
          type="number"
          min={0}
          value={formData.competencePoints || 0}
          onChange={handleChange}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Les points de compétence représentent la polyvalence du client et déterminent 
          combien de compétences il peut développer.
        </p>
      </div>

      <div>
        <Label htmlFor="specialAbilities">Capacités spéciales</Label>
        <div className="flex gap-2 mb-2">
          <Input
            id="newAbility"
            placeholder="Nouvelle capacité..."
            value={newAbility}
            onChange={(e) => setNewAbility(e.target.value)}
          />
          <Button type="button" onClick={handleAddAbility} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {formData.specialAbilities?.map((ability, index) => (
            <Badge variant="secondary" key={index} className="p-1 pl-2">
              {ability}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 ml-1" 
                onClick={() => handleRemoveAbility(ability)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {formData.specialAbilities?.length === 0 && (
            <p className="text-sm text-muted-foreground">Aucune capacité spéciale</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Exemples de capacités</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Badge variant="outline" className="justify-start font-normal">Contacts militaires</Badge>
          <Badge variant="outline" className="justify-start font-normal">Réseau d'information</Badge>
          <Badge variant="outline" className="justify-start font-normal">Influence religieuse</Badge>
          <Badge variant="outline" className="justify-start font-normal">Commerce de luxe</Badge>
          <Badge variant="outline" className="justify-start font-normal">Intrigue politique</Badge>
          <Badge variant="outline" className="justify-start font-normal">Intimidation</Badge>
        </div>
      </div>
    </div>
  );
};
