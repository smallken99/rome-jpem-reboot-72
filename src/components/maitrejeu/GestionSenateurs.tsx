
import React, { useState } from 'react';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, Search, Filter, SlidersHorizontal
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SenateurCard } from './components/SenateurCard';
import { SenateurModal } from './components/SenateurModal';
import { AssignmentTable } from './components/AssignmentTable';

export const GestionSenateurs: React.FC = () => {
  const { senateurs, factions, addSenateur, updateSenateur, deleteSenateur, assignSenateur } = useMaitreJeu();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('nom');
  const [activeTab, setActiveTab] = useState('senateurs');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSenateurId, setSelectedSenateurId] = useState<string>('');
  
  const senateurAssignments = senateurs.reduce((acc, senateur) => {
    if (senateur.joueurId) {
      acc[senateur.id] = senateur.joueurId;
    }
    return acc;
  }, {} as Record<string, string>);
  
  const handleAddSenateur = () => {
    setSelectedSenateurId('');
    setModalOpen(true);
  };
  
  const handleEditSenateur = (senateurId: string) => {
    setSelectedSenateurId(senateurId);
    setModalOpen(true);
  };
  
  const handleSaveSenateur = (senateur: any) => {
    if (!selectedSenateurId) {
      addSenateur(senateur);
    } else {
      updateSenateur(selectedSenateurId, senateur);
    }
    setModalOpen(false);
  };
  
  const handleAssignSenateur = (senateurId: string, playerId: string) => {
    assignSenateur(senateurId, playerId);
  };
  
  const filteredSenateurs = senateurs.filter(senateur => {
    const matchesSearch = senateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) 
      || senateur.famille.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (filter === 'all') return matchesSearch;
    if (filter === 'assigned') return matchesSearch && !!senateur.joueurId;
    if (filter === 'unassigned') return matchesSearch && !senateur.joueurId;
    if (filter === 'magistrature') return matchesSearch && !!senateur.magistrature;
    if (filter === 'faction' && senateur.faction) {
      return matchesSearch && senateur.faction.toLowerCase() === filter.toLowerCase();
    }
    
    return matchesSearch;
  });
  
  const sortedSenateurs = [...filteredSenateurs].sort((a, b) => {
    if (sortBy === 'nom') return a.nom.localeCompare(b.nom);
    if (sortBy === 'famille') return a.famille.localeCompare(b.famille);
    if (sortBy === 'age' && a.âge && b.âge) return b.âge - a.âge;
    return 0;
  });
  
  const selectedSenateur = selectedSenateurId 
    ? senateurs.find(s => s.id === selectedSenateurId) 
    : undefined;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Sénateurs</h2>
        <Button 
          className="flex items-center gap-2"
          onClick={handleAddSenateur}
        >
          <UserPlus className="h-4 w-4" />
          <span>Nouveau Sénateur</span>
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="senateurs">Sénateurs</TabsTrigger>
          <TabsTrigger value="assignments">Assignation aux joueurs</TabsTrigger>
        </TabsList>
        
        <div className="my-4 flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Rechercher..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8" 
            />
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filtrer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les sénateurs</SelectItem>
              <SelectItem value="assigned">Assignés</SelectItem>
              <SelectItem value="unassigned">Non-assignés</SelectItem>
              <SelectItem value="magistrature">Avec magistrature</SelectItem>
              {factions?.map(faction => (
                <SelectItem key={faction.id} value={faction.nom.toLowerCase()}>
                  {faction.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nom">Par nom</SelectItem>
              <SelectItem value="famille">Par famille</SelectItem>
              <SelectItem value="age">Par âge</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <TabsContent value="senateurs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedSenateurs.map(senateur => (
              <SenateurCard 
                key={senateur.id}
                senateur={senateur}
                playerName={senateur.joueurId || ""}
                isAssigned={!!senateur.joueurId}
                onEdit={() => handleEditSenateur(senateur.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Assignation des Sénateurs aux Joueurs</CardTitle>
            </CardHeader>
            <CardContent>
              <AssignmentTable 
                senateurs={senateurs}
                assignments={senateurAssignments}
                onAssign={handleAssignSenateur}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {selectedSenateur && (
        <SenateurModal
          senateur={selectedSenateur}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveSenateur}
        />
      )}
    </div>
  );
};
