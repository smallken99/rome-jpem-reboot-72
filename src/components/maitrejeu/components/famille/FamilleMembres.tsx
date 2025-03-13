
import React, { useState } from 'react';
import { useMaitreJeu } from '../../context';
import { MembreCard } from './MembreCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MembreFamille, GenreFamille, StatutMatrimonial } from '../../types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { MembreFamilleModal } from './MembreFamilleModal';

interface FamilleMembresProps {
  membres: MembreFamille[];
  familleId: string;
  onEditMembre: (membre: MembreFamille) => void;
  onDeleteMembre: (membreId: string) => void;
}

export const FamilleMembres: React.FC<FamilleMembresProps> = ({
  membres,
  familleId,
  onEditMembre,
  onDeleteMembre
}) => {
  const { deleteMembreFamille, getFamille, updateMembreFamille, familles } = useMaitreJeu();
  const [membreToDelete, setMembreToDelete] = useState<string | null>(null);
  const [membreToEdit, setMembreToEdit] = useState<MembreFamille | null>(null);
  const [filter, setFilter] = useState<{
    nom: string;
    genre: GenreFamille | '';
    statutMatrimonial: StatutMatrimonial | '';
  }>({
    nom: '',
    genre: '',
    statutMatrimonial: ''
  });
  
  const famille = getFamille(familleId);
  
  const handleFilterChange = (key: keyof typeof filter, value: any) => {
    setFilter(prev => ({ ...prev, [key]: value }));
  };
  
  const filteredMembres = membres.filter(m => {
    if (filter.nom && !(`${m.prenom} ${m.nom}`).toLowerCase().includes(filter.nom.toLowerCase())) {
      return false;
    }
    if (filter.genre && m.genre !== filter.genre) {
      return false;
    }
    if (filter.statutMatrimonial && m.statutMatrimonial !== filter.statutMatrimonial) {
      return false;
    }
    return true;
  });
  
  const handleDelete = (id: string) => {
    setMembreToDelete(id);
  };
  
  const confirmDelete = () => {
    if (membreToDelete) {
      deleteMembreFamille(membreToDelete);
      setMembreToDelete(null);
    }
  };
  
  const handleEdit = (membre: MembreFamille) => {
    setMembreToEdit(membre);
  };
  
  return (
    <div>
      <div className="mb-6 space-y-4">
        <div>
          <Label>Rechercher par nom</Label>
          <Input 
            placeholder="Rechercher un membre..."
            value={filter.nom}
            onChange={(e) => handleFilterChange('nom', e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Genre</Label>
            <Select 
              value={filter.genre} 
              onValueChange={(value) => handleFilterChange('genre', value as GenreFamille | '')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous</SelectItem>
                <SelectItem value="male">Homme</SelectItem>
                <SelectItem value="female">Femme</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Statut matrimonial</Label>
            <Select 
              value={filter.statutMatrimonial} 
              onValueChange={(value) => handleFilterChange('statutMatrimonial', value as StatutMatrimonial | '')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous</SelectItem>
                <SelectItem value="Célibataire">Célibataire</SelectItem>
                <SelectItem value="Marié">Marié(e)</SelectItem>
                <SelectItem value="Veuf">Veuf/Veuve</SelectItem>
                <SelectItem value="Divorcé">Divorcé(e)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMembres.length === 0 ? (
          <div className="col-span-2 text-center py-8">
            <p className="text-muted-foreground">Aucun membre ne correspond aux critères de recherche</p>
          </div>
        ) : (
          filteredMembres.map(membre => (
            <MembreCard 
              key={membre.id}
              membre={membre}
              isChef={famille?.chefId === membre.id}
              isMatrone={famille?.matrone === membre.id}
              onEdit={() => handleEdit(membre)}
              onDelete={() => handleDelete(membre.id)}
            />
          ))
        )}
      </div>
      
      <AlertDialog open={!!membreToDelete} onOpenChange={() => setMembreToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce membre ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera définitivement le membre de la famille.
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {membreToEdit && (
        <MembreFamilleModal
          isOpen={!!membreToEdit}
          onClose={() => setMembreToEdit(null)}
          selectedFamilleId={familleId}
          membre={membreToEdit}
          familles={familles}
          onSave={() => {}}
        />
      )}
    </div>
  );
};
