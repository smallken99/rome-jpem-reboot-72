
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loi } from '@/components/republique/lois/hooks/useLois';

interface LoiConditionsFormProps {
  formData: Loi;
  conditionInput: string;
  setConditionInput: (value: string) => void;
  addCondition: () => void;
  removeCondition: (index: number) => void;
}

export const LoiConditionsForm: React.FC<LoiConditionsFormProps> = ({
  formData,
  conditionInput,
  setConditionInput,
  addCondition,
  removeCondition
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-2">
          <Label htmlFor="condition">Ajouter une condition</Label>
          <Input
            id="condition"
            value={conditionInput}
            onChange={(e) => setConditionInput(e.target.value)}
            placeholder="Décrivez une condition d'application..."
          />
        </div>
        <Button type="button" onClick={addCondition}>Ajouter</Button>
      </div>
      
      <div className="space-y-2">
        <Label>Conditions d'application</Label>
        <div className="border rounded-md p-4 space-y-2">
          {formData.clauses && formData.clauses.length > 0 ? (
            formData.clauses.map((condition, index) => (
              <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                <span>{condition}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCondition(index)}
                  className="h-7 text-destructive"
                >
                  Supprimer
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              Aucune condition définie pour cette loi
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
