
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
  SelectValue,
} from '@/components/ui/select';
import { 
  MembreFamille, 
  FamilleInfo, 
  StatutFamilial, 
  StatutMatrimonial, 
  GenreFamille 
} from '../../types';

export interface MembreFamilleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: MembreFamille;
  familles: FamilleInfo[];
  selectedFamilleId?: string;
  onSave: (data: any) => void;
}

export const MembreFamilleModal: React.FC<MembreFamilleModalProps> = ({
  isOpen,
  onClose,
  initialData,
  familles,
  selectedFamilleId,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    id: '',
    nom: '',
    prenom: '',
    age: 30,
    genre: 'male' as GenreFamille,
    statut: 'Patricien' as StatutFamilial,
    statutMatrimonial: 'Célibataire' as StatutMatrimonial,
    familleId: selectedFamilleId || '',
    role: '',
    education: '',
    popularite: 50,
    piete: 50,
    joueur: false,
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        familleId: initialData.familleId || selectedFamilleId || '',
      });
    } else if (selectedFamilleId) {
      setFormData((prev) => ({
        ...prev,
        familleId: selectedFamilleId,
        // Si une famille est sélectionnée, récupérer son statut pour le membre
        statut: familles.find((f) => f.id === selectedFamilleId)?.statut || 'Patricien',
      }));
    }
  }, [initialData, selectedFamilleId, familles]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Modifier un membre' : 'Ajouter un membre'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                value={formData.prenom}
                onChange={(e) => handleChange('prenom', e.target.value)}
                placeholder="Ex: Marcus"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
                placeholder="Ex: Aurelius"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="age">Âge</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', parseInt(e.target.value))}
                min="0"
                max="100"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="genre">Genre</Label>
              <Select
                value={formData.genre}
                onValueChange={(value) => handleChange('genre', value as GenreFamille)}
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

          <div className="grid grid-cols-2 gap-4">
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
            <div className="flex flex-col gap-2">
              <Label htmlFor="statutMatrimonial">Statut matrimonial</Label>
              <Select
                value={formData.statutMatrimonial}
                onValueChange={(value) => handleChange('statutMatrimonial', value as StatutMatrimonial)}
              >
                <SelectTrigger id="statutMatrimonial">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Célibataire">Célibataire</SelectItem>
                  <SelectItem value="Marié">Marié</SelectItem>
                  <SelectItem value="Veuf">Veuf</SelectItem>
                  <SelectItem value="Divorcé">Divorcé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="familleId">Famille</Label>
            <Select
              value={formData.familleId}
              onValueChange={(value) => handleChange('familleId', value)}
              disabled={!!selectedFamilleId}
            >
              <SelectTrigger id="familleId">
                <SelectValue placeholder="Sélectionner une famille" />
              </SelectTrigger>
              <SelectContent>
                {familles.map((famille) => (
                  <SelectItem key={famille.id} value={famille.id}>
                    {famille.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Rôle</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              placeholder="Ex: Pater Familias, Fils aîné..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="education">Éducation</Label>
            <Input
              id="education"
              value={formData.education}
              onChange={(e) => handleChange('education', e.target.value)}
              placeholder="Ex: Rhétorique, Droit..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="popularite">Popularité ({formData.popularite})</Label>
              <Input
                id="popularite"
                type="range"
                min="0"
                max="100"
                value={formData.popularite}
                onChange={(e) => handleChange('popularite', parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="piete">Piété ({formData.piete})</Label>
              <Input
                id="piete"
                type="range"
                min="0"
                max="100"
                value={formData.piete}
                onChange={(e) => handleChange('piete', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Input
              id="joueur"
              type="checkbox"
              checked={formData.joueur}
              onChange={(e) => handleChange('joueur', e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="joueur">Personnage joueur</Label>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Description du membre..."
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
