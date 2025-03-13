
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FamilleCreationData, FamilleInfo } from '../../types/familles';

export interface FamilleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FamilleCreationData) => void;
  famille?: FamilleInfo;
}

export const FamilleModal: React.FC<FamilleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  famille
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
    couleurPrimaire: '#c53030',
    couleurSecondaire: '#2b6cb0'
  });

  useEffect(() => {
    if (famille) {
      setFormData({
        nom: famille.nom,
        gens: famille.gens,
        statut: famille.statut,
        prestige: famille.prestige,
        influence: famille.influence,
        richesse: famille.richesse,
        description: famille.description,
        devise: famille.devise || '',
        couleurPrimaire: famille.couleurPrimaire || '#c53030',
        couleurSecondaire: famille.couleurSecondaire || '#2b6cb0'
      });
    } else {
      setFormData({
        nom: '',
        gens: '',
        statut: 'Patricien',
        prestige: 50,
        influence: 50,
        richesse: 10000,
        description: '',
        devise: '',
        couleurPrimaire: '#c53030',
        couleurSecondaire: '#2b6cb0'
      });
    }
  }, [famille]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{famille ? 'Modifier une famille' : 'Créer une famille'}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={e => handleChange('nom', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gens">Gens</Label>
              <Input
                id="gens"
                value={formData.gens}
                onChange={e => handleChange('gens', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <Select
              value={formData.statut}
              onValueChange={value => handleChange('statut', value)}
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

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="prestige">Prestige</Label>
              <Input
                id="prestige"
                type="number"
                value={formData.prestige}
                onChange={e => handleChange('prestige', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="influence">Influence</Label>
              <Input
                id="influence"
                type="number"
                value={formData.influence}
                onChange={e => handleChange('influence', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="richesse">Richesse</Label>
              <Input
                id="richesse"
                type="number"
                value={formData.richesse}
                onChange={e => handleChange('richesse', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="devise">Devise</Label>
            <Input
              id="devise"
              value={formData.devise}
              onChange={e => handleChange('devise', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="couleurPrimaire">Couleur primaire</Label>
              <div className="flex space-x-2">
                <Input
                  id="couleurPrimaire"
                  type="color"
                  value={formData.couleurPrimaire}
                  onChange={e => handleChange('couleurPrimaire', e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={formData.couleurPrimaire}
                  onChange={e => handleChange('couleurPrimaire', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="couleurSecondaire">Couleur secondaire</Label>
              <div className="flex space-x-2">
                <Input
                  id="couleurSecondaire"
                  type="color"
                  value={formData.couleurSecondaire}
                  onChange={e => handleChange('couleurSecondaire', e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={formData.couleurSecondaire}
                  onChange={e => handleChange('couleurSecondaire', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => handleChange('description', e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>
            {famille ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
