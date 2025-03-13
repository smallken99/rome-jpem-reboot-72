
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash } from 'lucide-react';
import { EvenementAction } from '../../types/evenements';

interface EvenementOptionsProps {
  options: EvenementAction[];
  optionText: string;
  consequence: string;
  onOptionTextChange: (value: string) => void;
  onConsequenceChange: (value: string) => void;
  onAddOption: () => void;
  onRemoveOption: (id: string) => void;
}

export const EvenementOptions: React.FC<EvenementOptionsProps> = ({
  options,
  optionText,
  consequence,
  onOptionTextChange,
  onConsequenceChange,
  onAddOption,
  onRemoveOption
}) => {
  return (
    <div className="space-y-4 border-t pt-4">
      <Label>Options de résolution</Label>
      
      {options.map((option) => (
        <div key={option.id} className="flex items-start justify-between p-2 border rounded-md bg-slate-50">
          <div>
            <p className="font-medium">{option.texte}</p>
            <p className="text-sm text-muted-foreground mt-1">{option.consequence}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveOption(option.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <div className="space-y-2">
        <div>
          <Label htmlFor="option-text">Texte de l'option</Label>
          <Input 
            id="option-text" 
            value={optionText}
            onChange={(e) => onOptionTextChange(e.target.value)}
            placeholder="Ex: Accepter le traité"
          />
        </div>
        <div>
          <Label htmlFor="consequence">Conséquence</Label>
          <Input 
            id="consequence" 
            value={consequence}
            onChange={(e) => onConsequenceChange(e.target.value)}
            placeholder="Ex: +10 en diplomatie, -5 en richesse"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onAddOption}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter cette option
        </Button>
      </div>
    </div>
  );
};
