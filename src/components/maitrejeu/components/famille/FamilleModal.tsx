
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { FamilleInfo, FamilleCreationData, StatutFamilial } from '../../types';

export interface FamilleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: FamilleInfo;
  onSave: (data: FamilleCreationData) => void;
}

export const FamilleModal: React.FC<FamilleModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave
}) => {
  const [formData, setFormData] = useState<FamilleCreationData>({
    nom: '',
    gens: '',
    statut: 'Patricien',
    prestige: 50,
    influence: 50,
    richesse: 10000,
    description: '',
    devise: '',
    couleurPrimaire: '#3B82F6',
    couleurSecondaire: '#64748B'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nom: initialData.nom || '',
        gens: initialData.gens || '',
        statut: initialData.statut || 'Patricien',
        prestige: initialData.prestige || 50,
        influence: initialData.influence || 50,
        richesse: initialData.richesse || 10000,
        description: initialData.description || '',
        devise: initialData.devise || '',
        couleurPrimaire: initialData.couleurPrimaire || '#3B82F6',
        couleurSecondaire: initialData.couleurSecondaire || '#64748B'
      });
    }
  }, [initialData]);

  const handleChange = (field: keyof FamilleCreationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Modifier une famille' : 'Créer une nouvelle famille'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nom">Nom de la famille</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
                placeholder="Ex: Julii"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="gens">Gens</Label>
              <Input
                id="gens"
                value={formData.gens}
                onChange={(e) => handleChange('gens', e.target.value)}
                placeholder="Ex: Julia"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="statut">Statut</Label>
            <Select
              value={formData.statut}
              onValueChange={(value) => handleChange('statut', value as StatutFamilial)}
            >
              <SelectTrigger id="statut">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Patricien">Patricien</SelectItem>
                <SelectItem value="Plébéien">Plébéien</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="prestige">Prestige ({formData.prestige})</Label>
              <Input
                id="prestige"
                type="range"
                min="0"
                max="100"
                value={formData.prestige}
                onChange={(e) => handleChange('prestige', parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="influence">Influence ({formData.influence})</Label>
              <Input
                id="influence"
                type="range"
                min="0"
                max="100"
                value={formData.influence}
                onChange={(e) => handleChange('influence', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="richesse">Richesse (As)</Label>
            <Input
              id="richesse"
              type="number"
              value={formData.richesse}
              onChange={(e) => handleChange('richesse', parseInt(e.target.value))}
              min="0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="devise">Devise</Label>
            <Input
              id="devise"
              value={formData.devise}
              onChange={(e) => handleChange('devise', e.target.value)}
              placeholder="Ex: Fortune favors the bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="couleurPrimaire">Couleur primaire</Label>
              <div className="flex gap-2">
                <Input
                  id="couleurPrimaire"
                  type="color"
                  value={formData.couleurPrimaire}
                  onChange={(e) => handleChange('couleurPrimaire', e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={formData.couleurPrimaire}
                  onChange={(e) => handleChange('couleurPrimaire', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="couleurSecondaire">Couleur secondaire</Label>
              <div className="flex gap-2">
                <Input
                  id="couleurSecondaire"
                  type="color"
                  value={formData.couleurSecondaire}
                  onChange={(e) => handleChange('couleurSecondaire', e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={formData.couleurSecondaire}
                  onChange={(e) => handleChange('couleurSecondaire', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Description de la famille..."
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
