
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { MembreFamille, FamilleInfo, StatutFamilial, StatutMatrimonial, GenreFamille, MembreFamilleCreationData } from '../../../../types';

interface MembreCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMembre: (data: MembreFamilleCreationData) => void;
  onUpdateMembre: (data: MembreFamilleCreationData) => void;
  membre: MembreFamille | null;
  familleId: string | null;
  familles: FamilleInfo[];
}

export const MembreCreationDialog: React.FC<MembreCreationDialogProps> = ({
  isOpen,
  onClose,
  onCreateMembre,
  onUpdateMembre,
  membre,
  familleId,
  familles
}) => {
  const [formData, setFormData] = useState<MembreFamilleCreationData>({
    nom: '',
    prenom: '',
    age: 25,
    genre: 'male' as GenreFamille,
    statut: 'Patricien' as StatutFamilial,
    statutMatrimonial: 'Célibataire' as StatutMatrimonial,
    familleId: familleId || '',
    role: 'Membre',
    education: '',
    popularite: 50,
    piete: 50,
    joueur: false,
    description: ''
  });

  useEffect(() => {
    if (membre) {
      setFormData({
        nom: membre.nom,
        prenom: membre.prenom,
        age: membre.age,
        genre: membre.genre,
        statut: membre.statut,
        statutMatrimonial: membre.statutMatrimonial,
        familleId: familleId || membre.familleId || '',
        role: membre.role,
        pere: membre.pere,
        mere: membre.mere,
        senateurId: membre.senateurId,
        education: membre.education,
        popularite: membre.popularite,
        piete: membre.piete,
        joueur: membre.joueur,
        description: membre.description,
        portrait: membre.portrait
      });
    } else {
      // Reset to default values with the provided familleId
      setFormData({
        nom: '',
        prenom: '',
        age: 25,
        genre: 'male' as GenreFamille,
        statut: 'Patricien' as StatutFamilial,
        statutMatrimonial: 'Célibataire' as StatutMatrimonial,
        familleId: familleId || '',
        role: 'Membre',
        education: '',
        popularite: 50,
        piete: 50,
        joueur: false,
        description: ''
      });
    }
  }, [membre, familleId, isOpen]);

  const handleChange = (field: keyof MembreFamilleCreationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (membre) {
      onUpdateMembre(formData);
    } else {
      onCreateMembre(formData);
    }
  };

  // If familleId is available, get the famille statut to auto-fill
  useEffect(() => {
    if (familleId) {
      const selectedFamille = familles.find(f => f.id === familleId);
      if (selectedFamille) {
        setFormData(prev => ({
          ...prev,
          statut: selectedFamille.statut,
          nom: prev.nom || selectedFamille.nom
        }));
      }
    }
  }, [familleId, familles]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {membre ? `Modifier le membre ${membre.prenom} ${membre.nom}` : 'Ajouter un nouveau membre'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom</Label>
              <Input 
                id="prenom" 
                value={formData.prenom} 
                onChange={(e) => handleChange('prenom', e.target.value)} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nom">Nom de famille</Label>
              <Input 
                id="nom" 
                value={formData.nom} 
                onChange={(e) => handleChange('nom', e.target.value)} 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Âge</Label>
              <Input 
                id="age" 
                type="number" 
                value={formData.age} 
                onChange={(e) => handleChange('age', Number(e.target.value))} 
                required 
                min={0}
                max={120}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Genre</Label>
              <RadioGroup 
                value={formData.genre} 
                onValueChange={(value) => handleChange('genre', value as GenreFamille)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="genre-male" />
                  <Label htmlFor="genre-male">Masculin</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="genre-female" />
                  <Label htmlFor="genre-female">Féminin</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
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
            
            <div className="space-y-2">
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
          
          <div className="space-y-2">
            <Label htmlFor="familleId">Famille</Label>
            <Select 
              value={formData.familleId || ''} 
              onValueChange={(value) => handleChange('familleId', value)}
              disabled={!!familleId}
            >
              <SelectTrigger id="familleId">
                <SelectValue placeholder="Sélectionner une famille" />
              </SelectTrigger>
              <SelectContent>
                {familles.map(famille => (
                  <SelectItem key={famille.id} value={famille.id}>
                    {famille.nom} (Gens {famille.gens})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Rôle dans la famille</Label>
            <Input 
              id="role" 
              value={formData.role} 
              onChange={(e) => handleChange('role', e.target.value)} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="education">Éducation</Label>
            <Input 
              id="education" 
              value={formData.education} 
              onChange={(e) => handleChange('education', e.target.value)} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Popularité ({formData.popularite})</Label>
            <Slider 
              value={[formData.popularite]} 
              min={0} 
              max={100} 
              step={1} 
              onValueChange={(values) => handleChange('popularite', values[0])} 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Piété ({formData.piete})</Label>
            <Slider 
              value={[formData.piete]} 
              min={0} 
              max={100} 
              step={1} 
              onValueChange={(values) => handleChange('piete', values[0])} 
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="joueur" 
              checked={formData.joueur} 
              onCheckedChange={(checked) => handleChange('joueur', checked)} 
            />
            <Label htmlFor="joueur">Personnage joueur</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={(e) => handleChange('description', e.target.value)} 
              rows={3} 
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
            <Button type="submit">{membre ? 'Mettre à jour' : 'Ajouter'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
