
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useMaitreJeu } from '../../context';
import { MembreFamille, FamilleInfo, GenreFamille, StatutFamilial, StatutMatrimonial } from '../../types';

export interface MembreFamilleModalProps {
  isOpen: boolean;
  onClose: () => void;
  familleId: string | null;
  editMembre?: MembreFamille;
  familles: FamilleInfo[];
}

export const MembreFamilleModal: React.FC<MembreFamilleModalProps> = ({
  isOpen,
  onClose,
  familleId,
  editMembre,
  familles
}) => {
  const { addMembreFamille, updateMembreFamille, getMembresByFamille } = useMaitreJeu();
  
  // Initialisation du formulaire avec des valeurs par défaut ou les valeurs du membre à éditer
  const [formData, setFormData] = useState<{
    nom: string;
    prenom: string;
    age: number;
    genre: GenreFamille;
    statut: StatutFamilial;
    statutMatrimonial: StatutMatrimonial;
    role: string;
    description: string;
    pere?: string;
    mere?: string;
    education?: string;
    popularite?: number;
    piete?: number;
    joueur?: boolean;
    senateurId?: string;
  }>({
    nom: '',
    prenom: '',
    age: 25,
    genre: 'male',
    statut: 'Patricien',
    statutMatrimonial: 'Célibataire',
    role: '',
    description: '',
  });
  
  // Mise à jour du formulaire si on édite un membre existant
  useEffect(() => {
    if (editMembre) {
      // Correction: S'assurer que toutes les propriétés requises sont définies
      setFormData({
        nom: editMembre.nom,
        prenom: editMembre.prenom,
        age: editMembre.age,
        genre: editMembre.genre,
        statut: editMembre.statut,
        statutMatrimonial: editMembre.statutMatrimonial,
        role: editMembre.role || '',  // Valeur par défaut si undefined
        description: editMembre.description || '',  // Valeur par défaut si undefined
        pere: editMembre.pere,
        mere: editMembre.mere,
        education: editMembre.education,
        popularite: editMembre.popularite,
        piete: editMembre.piete, 
        joueur: editMembre.joueur,
        senateurId: editMembre.senateurId
      });
    }
  }, [editMembre]);
  
  // Les membres de famille disponibles pour les relations parentales
  const membresFamille = familleId ? getMembresByFamille(familleId) : [];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = () => {
    if (editMembre) {
      // Mise à jour d'un membre existant
      updateMembreFamille(editMembre.id, formData);
    } else if (familleId) {
      // Création d'un nouveau membre
      addMembreFamille({
        ...formData,
        familleId
      });
    }
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{editMembre ? 'Modifier un membre' : 'Ajouter un membre'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom" className="text-right">Nom</Label>
            <Input id="nom" name="nom" value={formData.nom} onChange={handleInputChange} className="col-span-3" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="prenom" className="text-right">Prénom</Label>
            <Input id="prenom" name="prenom" value={formData.prenom} onChange={handleInputChange} className="col-span-3" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">Âge</Label>
            <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} className="col-span-3" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre" className="text-right">Genre</Label>
            <Select value={formData.genre} onValueChange={(value) => handleSelectChange('genre', value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Homme</SelectItem>
                <SelectItem value="female">Femme</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="statut" className="text-right">Statut</Label>
            <Select value={formData.statut} onValueChange={(value) => handleSelectChange('statut', value as StatutFamilial)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Patricien">Patricien</SelectItem>
                <SelectItem value="Plébéien">Plébéien</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="statutMatrimonial" className="text-right">Statut Matrimonial</Label>
            <Select value={formData.statutMatrimonial} onValueChange={(value) => handleSelectChange('statutMatrimonial', value)}>
              <SelectTrigger className="col-span-3">
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
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">Rôle</Label>
            <Input id="role" name="role" value={formData.role} onChange={handleInputChange} className="col-span-3" />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="col-span-3" />
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {editMembre ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
