
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useMaitreJeu } from '../../context';
import { 
  MembreFamille,
  StatutFamilial,
  StatutMatrimonial,
  GenreFamille,
  FamilleInfo
} from '../../types/familles';

interface MembreFamilleModalProps {
  isOpen: boolean;
  onClose: () => void;
  familleId: string | null;
  familles: FamilleInfo[];
  editMembre?: MembreFamille;
}

export const MembreFamilleModal: React.FC<MembreFamilleModalProps> = ({
  isOpen,
  onClose,
  familleId,
  familles,
  editMembre
}) => {
  const { addMembreFamille, updateMembreFamille, getMembres } = useMaitreJeu();

  const [formData, setFormData] = useState<{
    nom: string;
    prenom: string;
    age: number;
    genre: GenreFamille;
    statut: StatutFamilial;
    statutMatrimonial: StatutMatrimonial;
    role: string;
    education: string;
    popularite: number;
    piete: number;
    joueur: boolean;
    description: string;
    familleId: string;
    pere?: string;
    mere?: string;
    senateurId?: string;
  }>({
    nom: '',
    prenom: '',
    age: 25,
    genre: 'male',
    statut: 'Patricien',
    statutMatrimonial: 'Célibataire',
    role: '',
    education: '',
    popularite: 50,
    piete: 50,
    joueur: false,
    description: '',
    familleId: familleId || '',
    pere: '',
    mere: '',
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (editMembre) {
        setFormData({
          ...formData,
          nom: editMembre.nom || '',
          prenom: editMembre.prenom || '',
          age: editMembre.age || 25,
          genre: editMembre.genre || 'male',
          statut: editMembre.statut || 'Patricien',
          statutMatrimonial: editMembre.statutMatrimonial || 'Célibataire',
          role: editMembre.role || '',
          education: editMembre.education || '',
          popularite: editMembre.popularite || 50,
          piete: editMembre.piete || 50,
          joueur: editMembre.joueur || false,
          description: editMembre.description || '',
          familleId: familleId || '',
          pere: editMembre.pere || '',
          mere: editMembre.mere || '',
          senateurId: editMembre.senateurId || '',
        });
      } else {
        setFormData({
          nom: '',
          prenom: '',
          age: 25,
          genre: 'male',
          statut: 'Patricien',
          statutMatrimonial: 'Célibataire',
          role: '',
          education: '',
          popularite: 50,
          piete: 50,
          joueur: false,
          description: '',
          familleId: familleId || '',
          pere: '',
          mere: '',
        });
      }
    }
  }, [isOpen, editMembre, familleId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      joueur: checked,
    });
  };

  const handleSubmit = () => {
    if (editMembre) {
      updateMembreFamille(editMembre.id, formData);
    } else {
      addMembreFamille({
        ...formData,
        familleId: formData.familleId,
      });
    }
    onClose();
  };

  // Liste des membres pour sélectionner parents
  const membres = getMembres();
  const hommes = membres.filter(m => m.genre === 'male');
  const femmes = membres.filter(m => m.genre === 'female');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editMembre ? 'Modifier un membre' : 'Ajouter un nouveau membre'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="prenom">Prénom</Label>
            <Input
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nom">Nom</Label>
            <Input
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Âge</Label>
            <Input
              id="age"
              name="age"
              type="number"
              min={0}
              max={100}
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select
              value={formData.genre}
              onValueChange={(value) => handleSelectChange('genre', value as GenreFamille)}
            >
              <SelectTrigger id="genre">
                <SelectValue placeholder="Sélectionner le genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Homme</SelectItem>
                <SelectItem value="female">Femme</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <Select
              value={formData.statut}
              onValueChange={(value) => handleSelectChange('statut', value as StatutFamilial)}
            >
              <SelectTrigger id="statut">
                <SelectValue placeholder="Sélectionner le statut" />
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
              onValueChange={(value) => handleSelectChange('statutMatrimonial', value as StatutMatrimonial)}
            >
              <SelectTrigger id="statutMatrimonial">
                <SelectValue placeholder="Sélectionner le statut matrimonial" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Célibataire">Célibataire</SelectItem>
                <SelectItem value="Marié">Marié(e)</SelectItem>
                <SelectItem value="Veuf">Veuf/Veuve</SelectItem>
                <SelectItem value="Divorcé">Divorcé(e)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Rôle dans la famille</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Éducation</Label>
            <Input
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="popularite">Popularité (0-100)</Label>
            <Input
              id="popularite"
              name="popularite"
              type="number"
              min={0}
              max={100}
              value={formData.popularite}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="piete">Piété (0-100)</Label>
            <Input
              id="piete"
              name="piete"
              type="number"
              min={0}
              max={100}
              value={formData.piete}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pere">Père</Label>
            <Select
              value={formData.pere || ''}
              onValueChange={(value) => handleSelectChange('pere', value)}
            >
              <SelectTrigger id="pere">
                <SelectValue placeholder="Sélectionner le père" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun</SelectItem>
                {hommes.map(homme => (
                  <SelectItem key={homme.id} value={homme.id}>
                    {homme.prenom} {homme.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mere">Mère</Label>
            <Select
              value={formData.mere || ''}
              onValueChange={(value) => handleSelectChange('mere', value)}
            >
              <SelectTrigger id="mere">
                <SelectValue placeholder="Sélectionner la mère" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucune</SelectItem>
                {femmes.map(femme => (
                  <SelectItem key={femme.id} value={femme.id}>
                    {femme.prenom} {femme.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="famille">Famille</Label>
            <Select
              value={formData.familleId}
              onValueChange={(value) => handleSelectChange('familleId', value)}
            >
              <SelectTrigger id="famille">
                <SelectValue placeholder="Sélectionner la famille" />
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

          <div className="space-y-2 col-span-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.joueur}
                onCheckedChange={handleSwitchChange}
                id="joueur"
              />
              <Label htmlFor="joueur">Personnage joueur</Label>
            </div>
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {editMembre ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
