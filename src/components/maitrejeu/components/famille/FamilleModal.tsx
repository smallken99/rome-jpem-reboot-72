
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FamilleInfo, StatutFamilial, FamilleCreationData } from '../../types';
import { useMaitreJeu } from '../../context';

interface FamilleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (famille: FamilleCreationData) => void;
  editFamille?: FamilleInfo;
}

export const FamilleModal: React.FC<FamilleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editFamille
}) => {
  const { updateFamille } = useMaitreJeu();
  
  const [formData, setFormData] = useState<FamilleCreationData>({
    nom: '',
    gens: '',
    statut: 'Patricien',
    prestige: 50,
    influence: 50,
    richesse: 10000,
    description: '',
    devise: '',
    couleurPrimaire: '#3b82f6',
    couleurSecondaire: '#d1d5db'
  });
  
  // Initialiser le formulaire avec les données de la famille à éditer
  useEffect(() => {
    if (editFamille) {
      setFormData({
        nom: editFamille.nom,
        gens: editFamille.gens,
        statut: editFamille.statut,
        prestige: editFamille.prestige,
        influence: editFamille.influence,
        richesse: editFamille.richesse,
        description: editFamille.description || '',
        devise: editFamille.devise || '',
        couleurPrimaire: editFamille.couleurPrimaire || '#3b82f6',
        couleurSecondaire: editFamille.couleurSecondaire || '#d1d5db'
      });
    } else {
      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        gens: '',
        statut: 'Patricien',
        prestige: 50,
        influence: 50,
        richesse: 10000,
        description: '',
        devise: '',
        couleurPrimaire: '#3b82f6',
        couleurSecondaire: '#d1d5db'
      });
    }
  }, [editFamille, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'prestige' || name === 'influence' || name === 'richesse' 
        ? parseInt(value, 10) 
        : value
    }));
  };
  
  const handleSubmit = () => {
    if (editFamille) {
      updateFamille(editFamille.id, formData);
      onClose();
    } else {
      onSave(formData);
    }
  };
  
  const isFormValid = () => {
    return formData.nom && formData.gens;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editFamille ? 'Modifier une famille' : 'Créer une nouvelle famille'}</DialogTitle>
          <DialogDescription>
            {editFamille 
              ? 'Modifier les informations de la famille'
              : 'Remplissez les informations pour créer une nouvelle famille'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="nom">Nom de famille</Label>
              <Input
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Ex: Julii"
              />
            </div>
            <div>
              <Label htmlFor="gens">Gens</Label>
              <Input
                id="gens"
                name="gens"
                value={formData.gens}
                onChange={handleChange}
                placeholder="Ex: Julia"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="statut">Statut</Label>
            <Select
              value={formData.statut}
              onValueChange={(value) => setFormData(prev => ({ ...prev, statut: value as StatutFamilial }))}
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
          
          <div>
            <Label htmlFor="prestige">Prestige ({formData.prestige}/100)</Label>
            <Input
              id="prestige"
              name="prestige"
              type="range"
              min="0"
              max="100"
              value={formData.prestige}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="influence">Influence ({formData.influence}/100)</Label>
            <Input
              id="influence"
              name="influence"
              type="range"
              min="0"
              max="100"
              value={formData.influence}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="richesse">Richesse ({formData.richesse} as)</Label>
            <Input
              id="richesse"
              name="richesse"
              type="number"
              min="0"
              value={formData.richesse}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="devise">Devise</Label>
            <Input
              id="devise"
              name="devise"
              value={formData.devise}
              onChange={handleChange}
              placeholder="Ex: Through history, glory"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="couleurPrimaire">Couleur primaire</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="couleurPrimaire"
                  name="couleurPrimaire"
                  type="color"
                  value={formData.couleurPrimaire}
                  onChange={handleChange}
                  className="w-12 h-8 p-0"
                />
                <Input 
                  value={formData.couleurPrimaire}
                  onChange={handleChange}
                  name="couleurPrimaire"
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="couleurSecondaire">Couleur secondaire</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="couleurSecondaire"
                  name="couleurSecondaire"
                  type="color"
                  value={formData.couleurSecondaire}
                  onChange={handleChange}
                  className="w-12 h-8 p-0"
                />
                <Input 
                  value={formData.couleurSecondaire}
                  onChange={handleChange}
                  name="couleurSecondaire"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description de la famille..."
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit} disabled={!isFormValid()}>
            {editFamille ? 'Sauvegarder' : 'Créer la famille'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
