
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { SenateurCard } from './components/SenateurCard';
import { SenateurModal } from './components/senateur-modal';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { SenateurJouable } from './types/senateurs';
import { Plus, Search } from 'lucide-react';

export const GestionSenateurs: React.FC = () => {
  const { senateurs, setSenateurs } = useMaitreJeu();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSenateur, setSelectedSenateur] = useState<SenateurJouable | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [senateurToDelete, setSenateurToDelete] = useState<SenateurJouable | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Filtrer les sénateurs en fonction de la recherche
  const filteredSenateurs = senateurs.filter(
    (senateur) => 
      senateur.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      senateur.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      senateur.gens.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateSenateur = () => {
    setIsCreateMode(true);
    setSelectedSenateur(null);
    setIsModalOpen(true);
  };

  const handleEditSenateur = (senateur: SenateurJouable) => {
    setIsCreateMode(false);
    setSelectedSenateur(senateur);
    setIsModalOpen(true);
  };

  const handleDeleteSenateur = (senateur: SenateurJouable) => {
    setSenateurToDelete(senateur);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteSenateur = () => {
    if (senateurToDelete) {
      setSenateurs(senateurs.filter(s => s.id !== senateurToDelete.id));
      setIsDeleteDialogOpen(false);
      setSenateurToDelete(null);
    }
  };

  const handleSaveSenateurModal = (senateur: SenateurJouable) => {
    if (isCreateMode) {
      // Créer un nouveau senateur avec des valeurs par défaut pour les champs requis
      const newSenateur: SenateurJouable = {
        ...senateur,
        id: Date.now().toString(),
        famille: senateur.famille || 'Inconnue',
        actif: senateur.actif !== undefined ? senateur.actif : true,
        faction: senateur.faction || 'Inconnue',
        clientele: senateur.clientele || 0,
        allies: senateur.allies || [],
        ennemis: senateur.ennemis || [],
        gender: senateur.gender || 'male'
      };
      
      setSenateurs([...senateurs, newSenateur]);
    } else {
      // Mettre à jour un sénateur existant
      setSenateurs(
        senateurs.map(s => s.id === senateur.id ? {
          ...senateur,
          // Assurez-vous que les champs requis sont présents
          famille: senateur.famille || 'Inconnue',
          actif: senateur.actif !== undefined ? senateur.actif : true,
          faction: senateur.faction || 'Inconnue',
          clientele: senateur.clientele || 0,
          allies: senateur.allies || [],
          ennemis: senateur.ennemis || [],
          gender: senateur.gender || 'male'
        } : s)
      );
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un sénateur..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleCreateSenateur} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Sénateur
        </Button>
      </div>

      {filteredSenateurs.length === 0 ? (
        <div className="text-center py-8 bg-white/50 rounded-lg border border-dashed">
          <p className="text-muted-foreground">Aucun sénateur trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSenateurs.map((senateur) => (
            <SenateurCard
              key={senateur.id}
              senateur={senateur}
              onEdit={() => handleEditSenateur(senateur)}
              onDelete={() => handleDeleteSenateur(senateur)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <SenateurModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveSenateurModal}
          senateur={selectedSenateur}
          isCreateMode={isCreateMode}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer {senateurToDelete?.prenom} {senateurToDelete?.nom} ?
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteSenateur} className="bg-destructive text-destructive-foreground">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
