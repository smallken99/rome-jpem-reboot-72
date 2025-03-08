
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Client } from '../../types/clients';

interface BackstoryTabProps {
  formData: Partial<Client>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const BackstoryTab: React.FC<BackstoryTabProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="backstory">Histoire du client</Label>
        <Textarea
          id="backstory"
          name="backstory"
          value={formData.backstory || ''}
          onChange={handleChange}
          placeholder="Entrez l'histoire et le contexte de ce client..."
          className="min-h-[200px]"
        />
      </div>

      <div className="p-3 border rounded-md bg-muted/50">
        <h4 className="text-sm font-medium mb-2">Conseils pour une bonne histoire:</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
          <li>Incluez des détails sur l'origine du client</li>
          <li>Expliquez sa motivation à servir un sénateur</li>
          <li>Ajoutez des événements importants de sa vie</li>
          <li>Mentionnez ses ambitions personnelles</li>
          <li>Décrivez ses relations avec d'autres personnages</li>
        </ul>
      </div>
    </div>
  );
};
