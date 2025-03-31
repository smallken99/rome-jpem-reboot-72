
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Client } from '../../types/clients';

interface BackstoryTabProps {
  formData: Partial<Client>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const BackstoryTab: React.FC<BackstoryTabProps> = ({
  formData,
  handleChange
}) => {
  // Format the date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div>
        <Label htmlFor="backstory" className="text-base">Histoire personnelle</Label>
        <p className="text-sm text-muted-foreground mb-4">
          Détaillez le passé et la personnalité de ce client
        </p>
        <Textarea
          id="backstory"
          name="backstory"
          placeholder="Histoire et antécédents du client..."
          value={formData.backstory || ''}
          onChange={handleChange}
          className="min-h-[200px]"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="income">Revenu annuel (as)</Label>
          <Input
            id="income"
            name="income"
            type="number"
            value={formData.income || 0}
            onChange={handleChange}
            min={0}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Occupation</Label>
          <Input
            id="occupation"
            name="occupation"
            value={formData.location || ''}
            onChange={handleChange}
            placeholder="Marchand, Artisan, etc."
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-base">Notes supplémentaires</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Informations additionnelles..."
          value={formData.backstory || ''}
          onChange={handleChange}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};
