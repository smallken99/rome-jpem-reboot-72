
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ClientCreationData } from '../../types/clients';

interface BackstoryTabProps {
  formData: ClientCreationData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const BackstoryTab: React.FC<BackstoryTabProps> = ({
  formData,
  handleChange
}) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="backstory" className="text-right pt-2">Histoire personnelle</Label>
        <Textarea
          id="backstory"
          name="backstory"
          value={formData.backstory || ''}
          onChange={handleChange}
          className="col-span-3"
          rows={8}
          placeholder="Écrivez l'histoire du client ici..."
        />
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="lastInteraction" className="text-right">Dernière interaction</Label>
        <Input
          id="lastInteraction"
          name="lastInteraction"
          type="date"
          value={formData.lastInteraction ? new Date(formData.lastInteraction).toISOString().split('T')[0] : ''}
          onChange={handleChange}
          className="col-span-3"
        />
      </div>
    </div>
  );
};
