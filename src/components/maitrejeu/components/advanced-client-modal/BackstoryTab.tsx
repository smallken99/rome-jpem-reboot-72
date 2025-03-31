
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Client } from '../../types/clients';

interface BackstoryTabProps {
  formData: Partial<Client>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const BackstoryTab: React.FC<BackstoryTabProps> = ({
  formData,
  handleChange
}) => {
  // Format the last interaction date if it exists
  const formatLastInteraction = () => {
    if (!formData.lastInteraction) return '';
    
    try {
      if (typeof formData.lastInteraction === 'string') {
        return format(new Date(formData.lastInteraction), 'PPP', { locale: fr });
      }
      return 'Date invalide';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date invalide';
    }
  };
  
  return (
    <div className="space-y-6 py-2">
      <div>
        <Label htmlFor="backstory" className="mb-2 block">
          Histoire personnelle
        </Label>
        <Textarea
          id="backstory"
          name="backstory"
          value={formData.backstory || ''}
          onChange={handleChange}
          placeholder="Histoire et origines du client..."
          rows={8}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="origin" className="mb-2 block">
            Origine
          </Label>
          <Input
            id="origin"
            name="origin"
            value={formData.origin || ''}
            onChange={handleChange}
            placeholder="Lieu d'origine"
          />
        </div>
        
        <div>
          <Label htmlFor="occupation" className="mb-2 block">
            Occupation principale
          </Label>
          <Input
            id="occupation"
            name="occupation"
            value={formData.occupation || ''}
            onChange={handleChange}
            placeholder="Occupation du client"
          />
        </div>
      </div>
      
      <div>
        <Label className="mb-2 block">
          Dernière interaction
        </Label>
        <p className="text-sm p-2 border rounded bg-muted">
          {formatLastInteraction() || 'Aucune interaction enregistrée'}
        </p>
      </div>
    </div>
  );
};
