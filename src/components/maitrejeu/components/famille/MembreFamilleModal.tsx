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
  membre?: MembreFamille;
  familles: FamilleInfo[];
  onSave?: (data: any) => void;
}

export const MembreFamilleModal: React.FC<MembreFamilleModalProps> = ({
  isOpen,
  onClose,
  familleId,
  membre,
  familles,
  onSave
}) => {
  const { addMembreFamille, updateMembreFamille, getMembresByFamille } = useMaitreJeu();
  
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
  
  useEffect(() => {
    if (membre) {
      setFormData({
        nom: membre.nom,
        prenom: membre.prenom,
        age: membre.age,
        genre: membre.genre,
        statut: membre.statut,
        statutMatrimonial: membre.statutMatrimonial,
        role: membre.role || '',
        description: membre.description || '',
        pere: membre.pere,
        mere: membre.mere,
        education: membre.education,
        popularite: membre.popularite,
        piete: membre.piete,
        joueur: membre.joueur,
        senateurId: membre.senateurId
      });
    }
  }, [membre]);
  
  const membresFamille = familleId ? getMembresByFamille(familleId) : [];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = () => {
    if (membre && onSave) {
      onSave(formData);
    } else if (membre) {
      updateMembreFamille(membre.id, formData);
    } else if (familleId && onSave) {
      onSave({
        ...formData,
        familleId
      });
    } else if (familleId) {
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
          <DialogTitle>{membre ? 'Modifier un membre' : 'Ajouter un membre'}</DialogTitle>
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
            {membre ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
