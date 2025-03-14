
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoiType } from '../../types/lois';

export interface LoiFormProps {
  loi: {
    titre: string;
    description: string;
    proposeur: string;
    type?: LoiType;
    catégorie?: string;
    importance?: 'mineure' | 'normale' | 'majeure';
  };
  onChange: {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => void;
    handleSelectChange: (value: string, field: string) => void;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const LoiForm: React.FC<LoiFormProps> = ({
  loi,
  onChange,
  onSubmit,
  onCancel
}) => {
  const { handleInputChange, handleSelectChange } = onChange;
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(loi);
  };
  
  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Proposer une nouvelle loi</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="titre" className="block text-sm font-medium mb-1">Titre</label>
            <Input
              id="titre"
              value={loi.titre}
              onChange={(e) => handleInputChange(e, 'titre')}
              placeholder="Titre de la loi"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              id="description"
              value={loi.description}
              onChange={(e) => handleInputChange(e, 'description')}
              placeholder="Description et objectifs de la loi"
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="proposeur" className="block text-sm font-medium mb-1">Proposeur</label>
              <Input
                id="proposeur"
                value={loi.proposeur}
                onChange={(e) => handleInputChange(e, 'proposeur')}
                placeholder="Nom du proposeur"
                required
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
              <Select 
                value={loi.type || 'politique'} 
                onValueChange={(value) => handleSelectChange(value, 'type')}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Politique">Politique</SelectItem>
                  <SelectItem value="Economique">Économique</SelectItem>
                  <SelectItem value="Sociale">Sociale</SelectItem>
                  <SelectItem value="Judiciaire">Judiciaire</SelectItem>
                  <SelectItem value="Militaire">Militaire</SelectItem>
                  <SelectItem value="Religieuse">Religieuse</SelectItem>
                  <SelectItem value="Civile">Civile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="importance" className="block text-sm font-medium mb-1">Importance</label>
              <Select 
                value={loi.importance || 'normale'} 
                onValueChange={(value) => handleSelectChange(value, 'importance')}
              >
                <SelectTrigger id="importance">
                  <SelectValue placeholder="Sélectionner l'importance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mineure">Mineure</SelectItem>
                  <SelectItem value="normale">Normale</SelectItem>
                  <SelectItem value="majeure">Majeure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit">
              Proposer la loi
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
