import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { SenateurCard } from './components/SenateurCard';
import { SenateurModal } from './components/SenateurModal';
import { AssignmentTable } from './components/AssignmentTable';
import { toast } from 'sonner';
import { 
  Search, 
  UserPlus, 
  Filter, 
  Users, 
  UserCheck, 
  Shield, 
  Sword, 
  BookOpen, 
  Scale 
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { SenateurJouable, Faction } from './types/maitreJeuTypes';

export const GestionSenateurs = () => {
  const { 
    senateurs, 
    updateSenateur, 
    assignSenateurToPlayer,
    // Optionally use these if available
    addSenateur = () => {},
    deleteSenateur = () => {},
    assignSenateur = assignSenateurToPlayer,
    factions = []
  } = useMaitreJeu();

  const [searchTerm, setSearchTerm] = useState('');
  const [factionFilter, setFactionFilter] = useState<string>('all');
  const [magistratureFilter, setMagistratureFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSenateur, setSelectedSenateur] = useState<SenateurJouable | null>(null);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  
  // Simuler des joueurs pour l'assignation
  const players = [
    { id: 'player1', name: 'Marcus Aurelius' },
    { id: 'player2', name: 'Julius Caesar' },
    { id: 'player3', name: 'Cicero' },
    { id: 'player4', name: 'Brutus' },
    { id: 'player5', name: 'Crassus' },
  ];
  
  // Initialiser les assignations à partir des sénateurs
  useEffect(() => {
    const initialAssignments: Record<string, string> = {};
    senateurs.forEach(senateur => {
      if (senateur.joueurId) {
        initialAssignments[senateur.id] = senateur.joueurId;
      }
    });
    setAssignments(initialAssignments);
  }, [senateurs]);
  
  // Filtrer les sénateurs en fonction des critères
  const filteredSenateurs = senateurs.filter(senateur => {
    const matchesSearch = 
      senateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      senateur.famille.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFaction = 
      factionFilter === 'all' || 
      senateur.faction.toLowerCase() === factionFilter.toLowerCase();
    
    const matchesMagistrature = 
      magistratureFilter === 'all' || 
      (magistratureFilter === 'none' && !senateur.magistrature) ||
      (senateur.magistrature && senateur.magistrature.toLowerCase() === magistratureFilter.toLowerCase());
    
    return matchesSearch && matchesFaction && matchesMagistrature;
  });
  
  // Gérer l'édition d'un sénateur
  const handleEditSenateur = (senateur: SenateurJouable) => {
    setSelectedSenateur(senateur);
    setIsModalOpen(true);
  };
  
  // Sauvegarder les modifications d'un sénateur
  const handleSaveSenateur = (updatedSenateur: SenateurJouable) => {
    updateSenateur(updatedSenateur.id, updatedSenateur);
    setIsModalOpen(false);
    toast.success(`Sénateur mis à jour: ${updatedSenateur.nom}`);
  };
  
  // Assigner un sénateur à un joueur
  const handleAssignSenateur = (senateurId: string, playerId: string) => {
    assignSenateurToPlayer(senateurId, playerId);
    setAssignments(prev => ({
      ...prev,
      [senateurId]: playerId
    }));
    
    const senateur = senateurs.find(s => s.id === senateurId);
    const player = players.find(p => p.id === playerId);
    
    if (senateur && player) {
      toast.success(`${senateur.nom} assigné à ${player.name}`);
    }
  };
  
  // Obtenir le nom du joueur à partir de son ID
  const getPlayerName = (playerId: string | null): string | null => {
    if (!playerId) return null;
    const player = players.find(p => p.id === playerId);
    return player ? player.name : null;
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Gestion des Sénateurs" 
          subtitle="Administrez les sénateurs de la République Romaine" 
        />
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsAssignmentModalOpen(true)}>
            <UserCheck className="h-4 w-4 mr-2" />
            Assigner aux joueurs
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Nouveau Sénateur
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un sénateur..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={factionFilter} onValueChange={setFactionFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <span>Faction</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les factions</SelectItem>
              <SelectItem value="Populares">Populares</SelectItem>
              <SelectItem value="Optimates">Optimates</SelectItem>
              <SelectItem value="Moderates">Modérés</SelectItem>
              <SelectItem value="Indépendant">Indépendants</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={magistratureFilter} onValueChange={setMagistratureFilter}>
            <SelectTrigger className="w-[180px]">
              <Shield className="h-4 w-4 mr-2" />
              <span>Magistrature</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="CONSUL">Consuls</SelectItem>
              <SelectItem value="PRETEUR">Préteurs</SelectItem>
              <SelectItem value="EDILE">Édiles</SelectItem>
              <SelectItem value="QUESTEUR">Questeurs</SelectItem>
              <SelectItem value="CENSEUR">Censeurs</SelectItem>
              <SelectItem value="TRIBUN">Tribuns</SelectItem>
              <SelectItem value="none">Sans magistrature</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="cards" className="mt-6">
        <TabsList>
          <TabsTrigger value="cards">
            <Users className="h-4 w-4 mr-2" />
            Cartes
          </TabsTrigger>
          <TabsTrigger value="stats">
            <Scale className="h-4 w-4 mr-2" />
            Statistiques
          </TabsTrigger>
          <TabsTrigger value="history">
            <BookOpen className="h-4 w-4 mr-2" />
            Historique
          </TabsTrigger>
          <TabsTrigger value="military">
            <Sword className="h-4 w-4 mr-2" />
            Commandements
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cards">
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {filteredSenateurs.map((senateur) => {
              const playerName = getPlayerName(senateur.joueurId);
              return (
                <SenateurCard
                  key={senateur.id}
                  senateur={senateur}
                  isAssigned={!!senateur.joueurId}
                  playerName={playerName || ""}
                  onEdit={() => handleEditSenateur(senateur)}
                />
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="stats">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Statistiques du Sénat</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground">
                Analyse statistique des sénateurs et de leurs affiliations.
              </p>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Sénateurs</h3>
                  <p className="text-2xl font-bold">{senateurs.length}</p>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Populares</h3>
                  <p className="text-2xl font-bold">{senateurs.filter(s => s.faction === 'Populares').length}</p>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Optimates</h3>
                  <p className="text-2xl font-bold">{senateurs.filter(s => s.faction === 'Optimates').length}</p>
                </div>
                
                <div className="bg-muted rounded-lg p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Modérés</h3>
                  <p className="text-2xl font-bold">{senateurs.filter(s => s.faction === 'Moderates').length}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Répartition des magistratures</h3>
                {/* Placeholder pour un graphique ou une visualisation */}
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Graphique de répartition des magistratures</p>
                </div>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="history">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Historique des Sénateurs</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                Chronologie des événements importants liés aux sénateurs.
              </p>
              
              <div className="space-y-4">
                {/* Placeholder pour une timeline */}
                <div className="border-l-2 border-muted pl-4 py-2">
                  <h3 className="font-medium">705 AUC - Élection consulaire</h3>
                  <p className="text-sm text-muted-foreground">Marcus Tullius Cicero élu consul</p>
                </div>
                
                <div className="border-l-2 border-muted pl-4 py-2">
                  <h3 className="font-medium">704 AUC - Scandale politique</h3>
                  <p className="text-sm text-muted-foreground">Lucius Sergius Catilina accusé de corruption</p>
                </div>
                
                <div className="border-l-2 border-muted pl-4 py-2">
                  <h3 className="font-medium">703 AUC - Réforme agraire</h3>
                  <p className="text-sm text-muted-foreground">Proposition de loi par les tribuns de la plèbe</p>
                </div>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="military">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Commandements Militaires</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                Sénateurs actuellement en charge de commandements militaires.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Sénateur</th>
                      <th className="text-left py-2">Province</th>
                      <th className="text-left py-2">Légions</th>
                      <th className="text-left py-2">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {senateurs
                      .filter(s => s.province !== null)
                      .map((senateur, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2">{senateur.nom}</td>
                          <td className="py-2">{senateur.province}</td>
                          <td className="py-2">2</td>
                          <td className="py-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              En campagne
                            </span>
                          </td>
                        </tr>
                      ))}
                    
                    {senateurs.filter(s => s.province !== null).length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-muted-foreground">
                          Aucun sénateur n'est actuellement en charge d'un commandement militaire
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>

      {selectedSenateur && (
        <SenateurModal
          senateur={selectedSenateur}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveSenateur}
        />
      )}
      
      <RomanCard.Dialog
        open={isAssignmentModalOpen}
        onOpenChange={setIsAssignmentModalOpen}
        title="Assigner des Sénateurs aux Joueurs"
      >
        <AssignmentTable 
          senateurs={senateurs}
          assignments={assignments}
          onAssign={handleAssignSenateur}
        />
        
        <div className="flex justify-end mt-4">
          <Button onClick={() => setIsAssignmentModalOpen(false)}>
            Fermer
          </Button>
        </div>
      </RomanCard.Dialog>
    </div>
  );
};
