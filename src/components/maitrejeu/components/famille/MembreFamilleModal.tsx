
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MembreFamille, GenreFamille, StatutFamilial, StatutMatrimonial, FamilleInfo } from '../../types/familles';

export interface MembreFamilleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFamilleId: string;
  familles: FamilleInfo[];
  onSave: (data: any) => void;
  membre?: MembreFamille;
}

export const MembreFamilleModal: React.FC<MembreFamilleModalProps> = ({
  isOpen,
  onClose,
  selectedFamilleId,
  familles,
  onSave,
  membre
}) => {
  const [formData, setFormData] = useState<MembreFamille>({
    id: '',
    nom: '',
    prenom: '',
    age: 30,
    genre: 'male',
    statut: 'Patricien',
    statutMatrimonial: 'Célibataire',
    familleId: selectedFamilleId,
    role: 'Membre',
    education: '',
    popularite: 0,
    piete: 0,
    joueur: false,
    description: ''
  });

  useEffect(() => {
    if (membre) {
      setFormData({
        ...membre,
        familleId: selectedFamilleId || membre.familleId || ''
      });
    } else {
      setFormData(prev => ({
        ...prev,
        familleId: selectedFamilleId
      }));
    }
  }, [membre, selectedFamilleId]);

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
          <DialogTitle>{membre ? 'Modifier un membre' : 'Ajouter un membre'}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={e => handleChange('prenom', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={e => handleChange('nom', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="age">Âge</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={e => handleChange('age', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select
                value={formData.genre}
                onValueChange={value => handleChange('genre', value)}
              >
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Sélectionner un genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Homme</SelectItem>
                  <SelectItem value="female">Femme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
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
            <div className="space-y-2">
              <Label htmlFor="statutMatrimonial">Statut Matrimonial</Label>
              <Select
                value={formData.statutMatrimonial}
                onValueChange={value => handleChange('statutMatrimonial', value)}
              >
                <SelectTrigger id="statutMatrimonial">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Célibataire">Célibataire</SelectItem>
                  <SelectItem value="Marié">Marié</SelectItem>
                  <SelectItem value="Veuf">Veuf/Veuve</SelectItem>
                  <SelectItem value="Divorcé">Divorcé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Rôle</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={e => handleChange('role', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="popularite">Popularité</Label>
              <Input
                id="popularite"
                type="number"
                value={formData.popularite}
                onChange={e => handleChange('popularite', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="piete">Piété</Label>
              <Input
                id="piete"
                type="number"
                value={formData.piete}
                onChange={e => handleChange('piete', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Éducation</Label>
            <Input
              id="education"
              value={formData.education}
              onChange={e => handleChange('education', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => handleChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="famille">Famille</Label>
            <Select
              value={formData.familleId}
              onValueChange={value => handleChange('familleId', value)}
            >
              <SelectTrigger id="famille">
                <SelectValue placeholder="Sélectionner une famille" />
              </SelectTrigger>
              <SelectContent>
                {familles.map(famille => (
                  <SelectItem key={famille.id} value={famille.id}>
                    {famille.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>
            {membre ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
