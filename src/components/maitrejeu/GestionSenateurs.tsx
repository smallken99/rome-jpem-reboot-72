
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, UserCheck } from 'lucide-react';
import SenateurCard from './components/SenateurCard';
import { SenateurModal } from './components/SenateurModal';
import { AssignmentTable } from './components/AssignmentTable';
import { SenateurJouable } from './types/senateurs';

export const GestionSenateurs = () => {
  const { senateurs, updateSenateur, assignSenateurToPlayer } = useMaitreJeu();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFaction, setFilterFaction] = useState('all');
  const [selectedSenateur, setSelectedSenateur] = useState<SenateurJouable | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtrer les sénateurs en fonction de la recherche et du filtre de faction
  const filteredSenateurs = senateurs.filter(senateur => {
    const matchesSearch = senateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          senateur.famille.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFaction = filterFaction === 'all' || 
                          (senateur.appartenance && senateur.appartenance.toLowerCase() === filterFaction.toLowerCase());
    
    return matchesSearch && matchesFaction;
  });
  
  // Ouvrir le modal pour voir/éditer un sénateur
  const handleViewSenateur = (id: string) => {
    const senateur = senateurs.find(s => s.id === id);
    if (senateur) {
      setSelectedSenateur(senateur);
      setIsModalOpen(true);
    }
  };
  
  // Fermer le modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSenateur(null);
  };
  
  // Sauvegarder les modifications d'un sénateur
  const handleSaveChanges = (updatedSenateur: SenateurJouable) => {
    updateSenateur(updatedSenateur);
    setIsModalOpen(false);
    setSelectedSenateur(null);
  };
  
  // Assigner un sénateur à un joueur
  const handleAssignToPlayer = (senateurId: string, playerId: string) => {
    assignSenateurToPlayer(senateurId, playerId);
  };
  
  return (
    <div>
      {/* En-tête avec recherche et filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher un sénateur..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={filterFaction} onValueChange={setFilterFaction}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filtrer par faction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les factions</SelectItem>
            <SelectItem value="optimates">Optimates</SelectItem>
            <SelectItem value="populares">Populares</SelectItem>
            <SelectItem value="neutral">Neutres</SelectItem>
          </SelectContent>
        </Select>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Sénateur
        </Button>
      </div>
      
      {/* Onglets pour différentes vues */}
      <Tabs defaultValue="liste">
        <TabsList className="mb-4">
          <TabsTrigger value="liste">Liste des Sénateurs</TabsTrigger>
          <TabsTrigger value="assignments">
            <UserCheck className="h-4 w-4 mr-2" />
            Assignation aux Joueurs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="liste">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSenateurs.map((senateur) => (
              <SenateurCard
                key={senateur.id}
                senateur={senateur}
                onViewSenateur={handleViewSenateur}
              />
            ))}
            
            {filteredSenateurs.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                Aucun sénateur ne correspond à votre recherche.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="assignments">
          <AssignmentTable
            senateurs={senateurs}
            onAssign={handleAssignToPlayer}
          />
        </TabsContent>
      </Tabs>
      
      {/* Modal pour éditer un sénateur */}
      {selectedSenateur && (
        <SenateurModal
          senateur={selectedSenateur}
          open={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};
