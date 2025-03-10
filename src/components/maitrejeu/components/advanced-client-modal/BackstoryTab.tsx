
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Client } from '../../types/clients';

interface BackstoryTabProps {
  formData: Partial<Client>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const BackstoryTab: React.FC<BackstoryTabProps> = ({
  formData,
  handleChange
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4 py-2">
      <div>
        <Label htmlFor="backstory">Historique du client</Label>
        <Textarea
          id="backstory"
          name="backstory"
          value={formData.backstory || ''}
          onChange={handleChange}
          className="min-h-[150px]"
          placeholder="Décrivez l'histoire et le contexte de ce client..."
        />
      </div>

      <div>
        <Label htmlFor="lastInteraction">Dernière interaction</Label>
        <Input
          id="lastInteraction"
          type="date"
          name="lastInteraction"
          value={formData.lastInteraction ? new Date(formData.lastInteraction).toISOString().split('T')[0] : ''}
          onChange={handleChange}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Dernière interaction: {formatDate(formData.lastInteraction)}
        </p>
      </div>

      <div className="border rounded-md p-4 bg-muted/20">
        <h3 className="text-sm font-medium mb-2">Conseils pour un bon historique</h3>
        <ul className="text-sm space-y-1 list-disc pl-4">
          <li>Mentionnez l'origine du client et comment il a été recruté</li>
          <li>Incluez ses motivations et ses intérêts personnels</li>
          <li>Décrivez ses relations avec d'autres personnages importants</li>
          <li>Notez les services rendus ou les faveurs dues</li>
          <li>Précisez ses aspirations et ce qu'il attend de la relation</li>
        </ul>
      </div>
    </div>
  );
};
