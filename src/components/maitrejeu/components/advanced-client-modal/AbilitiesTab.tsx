
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { Client } from '../../types/clients';

interface AbilitiesTabProps {
  formData: Partial<Client>;
  newAbility: string;
  setNewAbility: (ability: string) => void;
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
    <div className="space-y-6 py-2">
      <div className="space-y-2">
        <Label htmlFor="competencePoints">Points de compétence</Label>
        <Input
          id="competencePoints"
          name="competencePoints"
          type="number"
          min={0}
          max={20}
          value={formData.competencePoints || 0}
          onChange={handleChange}
        />
        <p className="text-sm text-muted-foreground">
          Points disponibles pour améliorer ou utiliser des capacités spéciales
        </p>
      </div>
      
      <div className="space-y-2">
        <Label>Capacités spéciales</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Nouvelle capacité..."
            value={newAbility}
            onChange={(e) => setNewAbility(e.target.value)}
          />
          <Button variant="outline" onClick={handleAddAbility}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {formData.specialAbilities?.length ? (
            formData.specialAbilities.map((ability) => (
              <Badge key={ability} variant="secondary" className="pr-1 flex items-center gap-1">
                {ability}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 p-0 hover:bg-destructive/20 rounded-full"
                  onClick={() => handleRemoveAbility(ability)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Aucune capacité spéciale définie</p>
          )}
        </div>
      </div>
      
      <div className="border rounded-md p-4 space-y-3 bg-muted/10">
        <h4 className="font-medium">Suggestions de capacités</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Badge variant="outline" className="justify-start cursor-pointer hover:bg-primary/5" onClick={() => setNewAbility("Orateur persuasif")}>Orateur persuasif</Badge>
          <Badge variant="outline" className="justify-start cursor-pointer hover:bg-primary/5" onClick={() => setNewAbility("Réseau commercial")}>Réseau commercial</Badge>
          <Badge variant="outline" className="justify-start cursor-pointer hover:bg-primary/5" onClick={() => setNewAbility("Connaissances militaires")}>Connaissances militaires</Badge>
          <Badge variant="outline" className="justify-start cursor-pointer hover:bg-primary/5" onClick={() => setNewAbility("Relations diplomatiques")}>Relations diplomatiques</Badge>
          <Badge variant="outline" className="justify-start cursor-pointer hover:bg-primary/5" onClick={() => setNewAbility("Influence religieuse")}>Influence religieuse</Badge>
          <Badge variant="outline" className="justify-start cursor-pointer hover:bg-primary/5" onClick={() => setNewAbility("Espionnage")}>Espionnage</Badge>
          <Badge variant="outline" className="justify-start cursor-pointer hover:bg-primary/5" onClick={() => setNewAbility("Connaissance du peuple")}>Connaissance du peuple</Badge>
          <Badge variant="outline" className="justify-start cursor-pointer hover:bg-primary/5" onClick={() => setNewAbility("Artisanat renommé")}>Artisanat renommé</Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lastInteraction">Dernière interaction</Label>
        <Input
          type="date"
          id="lastInteraction"
          name="lastInteraction"
          value={formData.lastInteraction ? new Date(formData.lastInteraction).toISOString().split('T')[0] : ''}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
