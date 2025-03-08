
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search, UserPlus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMaitreJeu } from './context';
import { SenateurCard } from './components/SenateurCard';
import { SenateurModal } from './components/SenateurModal';
import { SenateurJouable } from './types/senateurs';

export const GestionSenateurs = () => {
  const { senateurs, updateSenateur, assignSenateurToPlayer } = useMaitreJeu();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedSenateur, setSelectedSenateur] = useState<SenateurJouable | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = (senateur: SenateurJouable) => {
    setSelectedSenateur(senateur);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSenateur(null);
  };
  
  const handleSaveSenateur = (updatedSenateur: SenateurJouable) => {
    updateSenateur(updatedSenateur);
    handleCloseModal();
  };
  
  // Filter senators based on search and filter
  const filteredSenateurs = senateurs.filter(senateur => {
    const matchesSearch = 
      senateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
      senateur.famille.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'optimates') return matchesSearch && senateur.appartenance === 'Optimates';
    if (filterType === 'populares') return matchesSearch && senateur.appartenance === 'Populares';
    if (filterType === 'neutral') return matchesSearch && senateur.appartenance === 'Neutral';
    if (filterType === 'assigned') return matchesSearch && senateur.playerId !== null;
    if (filterType === 'unassigned') return matchesSearch && senateur.playerId === null;
    
    return matchesSearch;
  });
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Sénateurs</CardTitle>
          <CardDescription>
            Créez, modifiez et assignez des sénateurs aux joueurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un sénateur..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les sénateurs</SelectItem>
                <SelectItem value="optimates">Optimates</SelectItem>
                <SelectItem value="populares">Populares</SelectItem>
                <SelectItem value="neutral">Neutres</SelectItem>
                <SelectItem value="assigned">Assignés</SelectItem>
                <SelectItem value="unassigned">Non assignés</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Nouveau Sénateur
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSenateurs.map((senateur) => (
              <SenateurCard 
                key={senateur.id} 
                senateur={senateur} 
                onEdit={() => handleOpenModal(senateur)}
              />
            ))}
            
            {filteredSenateurs.length === 0 && (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                Aucun sénateur ne correspond à votre recherche.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {selectedSenateur && (
        <SenateurModal 
          senateur={selectedSenateur} 
          isOpen={isModalOpen}
          onClose={handleCloseModal} 
          onSave={handleSaveSenateur}
        />
      )}
    </div>
  );
};
