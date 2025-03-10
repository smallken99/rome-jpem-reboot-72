
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loi } from '../../../types/lois';

interface LoiBasicInfoSectionProps {
  formData: Omit<Loi, 'id'>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const LoiBasicInfoSection: React.FC<LoiBasicInfoSectionProps> = ({
  formData,
  handleInputChange
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="titre">Titre</Label>
        <Input
          id="titre"
          name="titre"
          value={formData.titre}
          onChange={handleInputChange}
          placeholder="Ex: Lex Agraria de Tiberius Gracchus"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description détaillée de la loi et de ses effets"
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="proposeur">Proposeur</Label>
        <Input
          id="proposeur"
          name="proposeur"
          value={formData.proposeur}
          onChange={handleInputChange}
          placeholder="Nom du sénateur proposant la loi"
        />
      </div>
    </>
  );
};
