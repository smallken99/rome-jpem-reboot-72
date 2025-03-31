
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { Client } from '../../types/clients';

interface AbilitiesTabProps {
  formData: Partial<Client>;
  newAbility: string;
  setNewAbility: (value: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
    <div className="space-y-6 py-2">
      <div>
        <Label htmlFor="competences" className="mb-2 block">
          Points de compétence disponibles
        </Label>
        <div className="text-4xl font-bold mb-2">
          {formData.competences ? Object.keys(formData.competences).length : 0} <span className="text-base text-muted-foreground">/ 10</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Les points de compétence représentent les domaines d'expertise du client, utilisables pour influencer ses actions.
        </p>
      </div>
      
      <div>
        <Label htmlFor="specialAbilities" className="mb-2 block">
          Capacités spéciales
        </Label>
        <div className="mb-4 flex flex-wrap gap-2">
          {formData.specialAbilities && formData.specialAbilities.length > 0 ? (
            formData.specialAbilities.map((ability, index) => (
              <Badge key={index} variant="secondary" className="px-2 py-1 gap-1">
                {ability}
                <button
                  onClick={() => handleRemoveAbility(ability)}
                  className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Aucune capacité spéciale ajoutée.</p>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            value={newAbility}
            onChange={(e) => setNewAbility(e.target.value)}
            placeholder="Nouvelle capacité..."
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleAddAbility()}
          />
          <Button type="button" onClick={handleAddAbility}>
            <Plus className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </div>
      </div>
      
      <div>
        <Label htmlFor="notes" className="mb-2 block">
          Notes
        </Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes || ''}
          onChange={handleChange}
          placeholder="Notes supplémentaires sur ce client..."
          rows={5}
        />
      </div>
    </div>
  );
};
