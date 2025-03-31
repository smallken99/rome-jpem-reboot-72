
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { Client } from '../../types/clients';

interface AbilitiesTabProps {
  formData: Partial<Client>;
  newAbility: string;
  setNewAbility: (value: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleAddAbility: () => void;
  handleRemoveAbility: () => void;
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
    <div className="space-y-6 py-4">
      <div>
        <Label className="text-base">Capacité Spéciale</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Ajoutez une capacité spéciale unique à ce client
        </p>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Nouvelle capacité..."
            value={newAbility}
            onChange={(e) => setNewAbility(e.target.value)}
            className="flex-1"
          />
          <Button type="button" onClick={handleAddAbility} disabled={!newAbility.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>
        
        {formData.specialAbility && (
          <div className="bg-muted/30 rounded-md p-3 mb-2 flex justify-between items-center">
            <span>{formData.specialAbility}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRemoveAbility}
              className="h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <div>
        <Label htmlFor="notes" className="text-base">Notes de compétence</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Détails additionnels sur les compétences et capacités de ce client
        </p>
        <Textarea
          id="backstory"
          name="backstory"
          placeholder="Ajoutez des notes sur les compétences et capacités particulières de ce client..."
          value={formData.backstory || ''}
          onChange={handleChange}
          className="min-h-[120px]"
        />
      </div>
    </div>
  );
};
