
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loi } from '@/components/republique/lois/hooks/useLois';

interface LoiPenalitesFormProps {
  formData: Loi;
  penaliteInput: string;
  setPenaliteInput: (value: string) => void;
  addPenalite: () => void;
  removePenalite: (index: number) => void;
}

export const LoiPenalitesForm: React.FC<LoiPenalitesFormProps> = ({
  formData,
  penaliteInput,
  setPenaliteInput,
  addPenalite,
  removePenalite
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-2">
          <Label htmlFor="penalite">Ajouter une pénalité</Label>
          <Input
            id="penalite"
            value={penaliteInput}
            onChange={(e) => setPenaliteInput(e.target.value)}
            placeholder="Décrivez une pénalité en cas de non-respect..."
          />
        </div>
        <Button type="button" onClick={addPenalite}>Ajouter</Button>
      </div>
      
      <div className="space-y-2">
        <Label>Pénalités en cas de non-respect</Label>
        <div className="border rounded-md p-4 space-y-2">
          {formData.tags && formData.tags.length > 0 ? (
            formData.tags.map((penalite, index) => (
              <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                <span>{penalite}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removePenalite(index)}
                  className="h-7 text-destructive"
                >
                  Supprimer
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              Aucune pénalité définie pour cette loi
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
