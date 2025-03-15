
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExtendedLoi } from '../hooks/useLoiModalForm';

interface LoiEffetsFormProps {
  formData: ExtendedLoi;
  effetInput: string;
  setEffetInput: (value: string) => void;
  addEffet: () => void;
  removeEffet: (index: number) => void;
}

export const LoiEffetsForm: React.FC<LoiEffetsFormProps> = ({
  formData,
  effetInput,
  setEffetInput,
  addEffet,
  removeEffet
}) => {
  const commentaires = formData.commentaires || [];

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-2">
          <Label htmlFor="effet">Ajouter un effet</Label>
          <Input
            id="effet"
            value={effetInput}
            onChange={(e) => setEffetInput(e.target.value)}
            placeholder="Décrivez un effet de cette loi..."
          />
        </div>
        <Button type="button" onClick={addEffet}>Ajouter</Button>
      </div>
      
      <div className="space-y-2">
        <Label>Effets de la loi</Label>
        <div className="border rounded-md p-4 space-y-2">
          {commentaires.length > 0 ? (
            commentaires.map((effet: string, index: number) => (
              <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                <span>{effet}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEffet(index)}
                  className="h-7 text-destructive"
                >
                  Supprimer
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              Aucun effet défini pour cette loi
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
