
import React, { useState, useEffect } from 'react';
import { useMaitreJeu } from '../../context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { MembreFamille, StatutFamilial, StatutMatrimonial, GenreFamille, FamilleInfo } from '../../types';

interface MembreFamilleModalProps {
  isOpen: boolean;
  onClose: () => void;
  familleId: string | null;
  editMembre?: MembreFamille | null;
  familles?: FamilleInfo[];
}

export const MembreFamilleModal: React.FC<MembreFamilleModalProps> = ({
  isOpen,
  onClose,
  familleId,
  editMembre,
  familles = []
}) => {
  const { addMembreFamille, updateMembreFamille, getFamille, getMembres } = useMaitreJeu();
  const [formData, setFormData] = useState<{
    nom: string;
    prenom: string;
    age: number;
    genre: GenreFamille;
    statut: StatutFamilial;
    statutMatrimonial: StatutMatrimonial;
    familleId: string;
    role?: string;
    education?: string;
    popularite?: number;
    piete?: number;
    joueur?: boolean;
    description?: string;
    pere?: string;
    mere?: string;
  }>({
    nom: '',
    prenom: '',
    age: 25,
    genre: 'male',
    statut: 'Patricien',
    statutMatrimonial: 'Célibataire',
    familleId: familleId || '',
    role: '',
    education: '',
    popularite: 0,
    piete: 0,
    joueur: false,
    description: '',
    pere: '',
    mere: ''
  });
  
  // Liste des membres pour sélectionner les parents
  const membres = getMembres();
  const familleMembers = formData.familleId ? membres.filter(m => getFamille(formData.familleId)?.membres.includes(m.id)) : [];
  const pereOptions = familleMembers.filter(m => m.genre === 'male' && (!editMembre || m.id !== editMembre.id));
  const mereOptions = familleMembers.filter(m => m.genre === 'female' && (!editMembre || m.id !== editMembre.id));
  
  // Quand on ouvre la modale en mode édition
  useEffect(() => {
    if (editMembre) {
      const famille = getFamille(familleId || '');
      setFormData({
        nom: editMembre.nom,
        prenom: editMembre.prenom,
        age: editMembre.age,
        genre: editMembre.genre,
        statut: editMembre.statut,
        statutMatrimonial: editMembre.statutMatrimonial,
        familleId: familleId || '',
        role: editMembre.role || '',
        education: editMembre.education || '',
        popularite: editMembre.popularite || 0,
        piete: editMembre.piete || 0,
        joueur: editMembre.joueur || false,
        description: editMembre.description || '',
        pere: editMembre.pere,
        mere: editMembre.mere
      });
    } else {
      // En mode création, on récupère le statut de la famille
      if (familleId) {
        const famille = getFamille(familleId);
        if (famille) {
          setFormData(prev => ({
            ...prev,
            familleId,
            statut: famille.statut,
            nom: famille.nom
          }));
        }
      } else {
        // Reset du formulaire
        setFormData({
          nom: '',
          prenom: '',
          age: 25,
          genre: 'male',
          statut: 'Patricien',
          statutMatrimonial: 'Célibataire',
          familleId: '',
          role: '',
          education: '',
          popularite: 0,
          piete: 0,
          joueur: false,
          description: '',
          pere: '',
          mere: ''
        });
      }
    }
  }, [isOpen, editMembre, familleId]);
  
  const handleInputChange = (key: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };
  
  const handleSubmit = () => {
    if (editMembre) {
      updateMembreFamille(editMembre.id, {
        ...formData,
        pere: formData.pere || undefined,
        mere: formData.mere || undefined
      });
    } else {
      addMembreFamille({
        ...formData,
        pere: formData.pere || undefined,
        mere: formData.mere || undefined
      });
    }
    onClose();
  };
  
  const formValid = formData.prenom.trim() !== '' && formData.familleId !== '';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editMembre ? 'Modifier un membre' : 'Ajouter un membre de famille'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="prenom">Prénom</Label>
            <Input
              id="prenom"
              value={formData.prenom}
              onChange={(e) => handleInputChange('prenom', e.target.value)}
              placeholder="Prénom"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nom">Nom de famille</Label>
            <Input
              id="nom"
              value={formData.nom}
              onChange={(e) => handleInputChange('nom', e.target.value)}
              readOnly={!!familleId}
              placeholder="Nom de famille"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Âge</Label>
            <Input
              id="age"
              type="number"
              min={0}
              max={100}
              value={formData.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select
              value={formData.genre}
              onValueChange={(value) => handleInputChange('genre', value as GenreFamille)}
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
          
          <div className="space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <Select
              value={formData.statut}
              onValueChange={(value) => handleInputChange('statut', value as StatutFamilial)}
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
            <Label htmlFor="statutMatrimonial">Statut matrimonial</Label>
            <Select
              value={formData.statutMatrimonial}
              onValueChange={(value) => handleInputChange('statutMatrimonial', value as StatutMatrimonial)}
            >
              <SelectTrigger id="statutMatrimonial">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Célibataire">Célibataire</SelectItem>
                <SelectItem value="Marié">Marié(e)</SelectItem>
                <SelectItem value="Veuf">Veuf/Veuve</SelectItem>
                <SelectItem value="Divorcé">Divorcé(e)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {!familleId && (
            <div className="space-y-2">
              <Label htmlFor="famille">Famille</Label>
              <Select
                value={formData.familleId}
                onValueChange={(value) => handleInputChange('familleId', value)}
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
          )}
          
          <div className="space-y-2">
            <Label htmlFor="role">Rôle</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              placeholder="Rôle dans la famille"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pere">Père</Label>
            <Select
              value={formData.pere || ""}
              onValueChange={(value) => handleInputChange('pere', value || undefined)}
            >
              <SelectTrigger id="pere">
                <SelectValue placeholder="Sélectionner le père" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun</SelectItem>
                {pereOptions.map(pere => (
                  <SelectItem key={pere.id} value={pere.id}>
                    {pere.prenom} {pere.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mere">Mère</Label>
            <Select
              value={formData.mere || ""}
              onValueChange={(value) => handleInputChange('mere', value || undefined)}
            >
              <SelectTrigger id="mere">
                <SelectValue placeholder="Sélectionner la mère" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucune</SelectItem>
                {mereOptions.map(mere => (
                  <SelectItem key={mere.id} value={mere.id}>
                    {mere.prenom} {mere.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="education">Éducation</Label>
            <Input
              id="education"
              value={formData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
              placeholder="Éducation reçue"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="popularite">Popularité (0-100)</Label>
            <Input
              id="popularite"
              type="number"
              min={0}
              max={100}
              value={formData.popularite}
              onChange={(e) => handleInputChange('popularite', parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="piete">Piété (0-100)</Label>
            <Input
              id="piete"
              type="number"
              min={0}
              max={100}
              value={formData.piete}
              onChange={(e) => handleInputChange('piete', parseInt(e.target.value))}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="joueur"
              checked={formData.joueur}
              onCheckedChange={(checked) => handleInputChange('joueur', checked)}
            />
            <Label htmlFor="joueur">Personnage joueur</Label>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Biographie du personnage"
            rows={3}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit} disabled={!formValid}>
            {editMembre ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
