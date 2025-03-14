
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loi } from '@/components/maitrejeu/types/lois';

interface LoiBasicInfoFormProps {
  formData: Loi;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  categories: any[];
}

export const LoiBasicInfoForm: React.FC<LoiBasicInfoFormProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  categories
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titre de la loi</Label>
        <Input
          id="title"
          name="titre"
          value={formData.titre || formData.title || ''}
          onChange={handleChange}
          placeholder="Lex Julia de..."
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Décrivez le contenu et le but de cette loi..."
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select
            value={formData.categorieId || formData.catégorie || formData.category || ''}
            onValueChange={(value) => handleSelectChange('categorieId', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="proposedBy">Proposée par</Label>
          <Input
            id="proposedBy"
            name="auteur"
            value={formData.auteur || formData.proposeur || formData.proposedBy || ''}
            onChange={handleChange}
            placeholder="Nom du sénateur"
          />
        </div>
      </div>
      
      {formData.id && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select
              value={formData.statut || formData.état || ''}
              onValueChange={(value) => handleSelectChange('statut', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="proposée">Proposée</SelectItem>
                <SelectItem value="promulguée">Active</SelectItem>
                <SelectItem value="rejetée">Rejetée</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="importance">Importance</Label>
            <Select
              value={formData.importance || 'normale'}
              onValueChange={(value) => handleSelectChange('importance', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Niveau d'importance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mineure">Mineure</SelectItem>
                <SelectItem value="normale">Normale</SelectItem>
                <SelectItem value="majeure">Majeure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};
