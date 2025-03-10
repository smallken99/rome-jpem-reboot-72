
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImportanceType } from '../../types/common';
import { Loi } from '../../types/lois';

interface LoiFormData {
  titre: string;
  proposeur: string;
  catégorie: string;
  importance: ImportanceType;
  description: string;
}

interface LoiFormProps {
  newLoi: LoiFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof LoiFormData) => void;
  handleSelectChange: (value: string, field: keyof LoiFormData) => void;
  handleAddLoi: () => void;
  onCancel: () => void;
}

export const LoiForm: React.FC<LoiFormProps> = ({
  newLoi,
  handleInputChange,
  handleSelectChange,
  handleAddLoi,
  onCancel
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Proposer une nouvelle loi</h3>
          <div className="mt-2">
            <Input
              placeholder="Titre de la loi"
              value={newLoi.titre}
              onChange={(e) => handleInputChange(e, 'titre')}
              className="mb-2"
            />
            <Input
              placeholder="Proposeur"
              value={newLoi.proposeur}
              onChange={(e) => handleInputChange(e, 'proposeur')}
              className="mb-2"
            />
            <Select value={newLoi.catégorie} onValueChange={(value) => handleSelectChange(value, 'catégorie')}>
              <SelectTrigger className="w-full mb-2">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="politique">Politique</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="économique">Économique</SelectItem>
                <SelectItem value="Agraire">Agraire</SelectItem>
                <SelectItem value="Électorale">Électorale</SelectItem>
                <SelectItem value="Administrative">Administrative</SelectItem>
                <SelectItem value="Judiciaire">Judiciaire</SelectItem>
                <SelectItem value="Militaire">Militaire</SelectItem>
                <SelectItem value="Fiscale">Fiscale</SelectItem>
                <SelectItem value="Religieuse">Religieuse</SelectItem>
              </SelectContent>
            </Select>
            <Select value={newLoi.importance} onValueChange={(value) => handleSelectChange(value as ImportanceType, 'importance')}>
              <SelectTrigger className="w-full mb-2">
                <SelectValue placeholder="Importance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="majeure">Majeure</SelectItem>
                <SelectItem value="mineure">Mineure</SelectItem>
                <SelectItem value="normale">Normale</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Description"
              value={newLoi.description}
              onChange={(e) => handleInputChange(e, 'description')}
              className="mb-2"
            />
          </div>
          <div className="items-center px-4 py-3">
            <Button variant="secondary" onClick={handleAddLoi} className="mr-2">
              Proposer
            </Button>
            <Button variant="ghost" onClick={onCancel}>
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

