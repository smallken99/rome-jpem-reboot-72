
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loi, LoiFormData, LoiType, LoiStatut } from '../../types/lois';
import { useMaitreJeu } from '../../context';

export interface LoiFormProps {
  onSubmit: (data: LoiFormData) => void;
  onCancel: () => void;
  initialData?: Loi;
}

export const LoiForm: React.FC<LoiFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const { currentYear, currentSeason } = useMaitreJeu();
  
  const [formData, setFormData] = useState<LoiFormData>({
    titre: '',
    description: '',
    type: 'politique',
    catégorie: '',
    proposeur: '',
    état: 'proposée',
    importance: 'normale',
    effets: {},
    votesPositifs: 0,
    votesNégatifs: 0,
    votesAbstention: 0,
    commentaires: ''
  });

  // Effet pour initialiser le formulaire avec les données existantes si disponibles
  useEffect(() => {
    if (initialData) {
      setFormData({
        titre: initialData.titre,
        nom: initialData.nom,
        description: initialData.description,
        type: initialData.type,
        catégorie: initialData.catégorie || '',
        proposeur: initialData.proposeur,
        état: initialData.état,
        importance: initialData.importance || 'normale',
        effets: initialData.effets,
        clauses: initialData.clauses,
        impacts: initialData.impacts,
        votesPositifs: initialData.votesPositifs,
        votesNégatifs: initialData.votesNégatifs,
        votesAbstention: initialData.votesAbstention,
        commentaires: initialData.commentaires
      });
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Modifier la loi' : 'Proposer une nouvelle loi'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="titre">Titre</Label>
              <Input
                id="titre"
                name="titre"
                value={formData.titre}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nom">Nom (optionnel)</Label>
              <Input
                id="nom"
                name="nom"
                value={formData.nom || ''}
                onChange={handleInputChange}
                placeholder="Ex: Lex Titia"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange('type', value as LoiType)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="politique">Politique</SelectItem>
                  <SelectItem value="économique">Économique</SelectItem>
                  <SelectItem value="sociale">Sociale</SelectItem>
                  <SelectItem value="judiciaire">Judiciaire</SelectItem>
                  <SelectItem value="militaire">Militaire</SelectItem>
                  <SelectItem value="religieuse">Religieuse</SelectItem>
                  <SelectItem value="civile">Civile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="catégorie">Catégorie (optionnel)</Label>
              <Input
                id="catégorie"
                name="catégorie"
                value={formData.catégorie}
                onChange={handleInputChange}
                placeholder="Ex: Agraire, Justice..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="importance">Importance</Label>
              <Select
                value={formData.importance}
                onValueChange={(value) => handleSelectChange('importance', value)}
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="proposeur">Proposeur</Label>
              <Input
                id="proposeur"
                name="proposeur"
                value={formData.proposeur}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="état">Statut</Label>
              <Select
                value={formData.état}
                onValueChange={(value) => handleSelectChange('état', value as LoiStatut)}
              >
                <SelectTrigger id="état">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proposée">Proposée</SelectItem>
                  <SelectItem value="en_débat">En débat</SelectItem>
                  <SelectItem value="votée">Votée</SelectItem>
                  <SelectItem value="adoptée">Adoptée</SelectItem>
                  <SelectItem value="rejetée">Rejetée</SelectItem>
                  <SelectItem value="Promulguée">Promulguée</SelectItem>
                  <SelectItem value="En délibération">En délibération</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="votesPositifs">Votes Pour</Label>
              <Input
                id="votesPositifs"
                name="votesPositifs"
                type="number"
                min="0"
                value={formData.votesPositifs}
                onChange={handleNumberChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="votesNégatifs">Votes Contre</Label>
              <Input
                id="votesNégatifs"
                name="votesNégatifs"
                type="number"
                min="0"
                value={formData.votesNégatifs}
                onChange={handleNumberChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="votesAbstention">Abstentions</Label>
              <Input
                id="votesAbstention"
                name="votesAbstention"
                type="number"
                min="0"
                value={formData.votesAbstention}
                onChange={handleNumberChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="commentaires">Commentaires</Label>
            <Textarea
              id="commentaires"
              name="commentaires"
              value={formData.commentaires || ''}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit">
              {initialData ? 'Mettre à jour' : 'Proposer'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
