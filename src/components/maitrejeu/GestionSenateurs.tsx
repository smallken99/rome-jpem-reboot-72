
import { useState } from 'react';
import { useMaitreJeu } from './context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, PlusCircle } from 'lucide-react';
import SenateurCard from './components/SenateurCard';
import { SenateurModal } from './components/SenateurModal';
import { AssignmentTable } from './components/AssignmentTable';
import { SenateurJouable } from './types/senateurs';

export const GestionSenateurs = () => {
  const { senateurs, updateSenateur, assignSenateurToPlayer } = useMaitreJeu();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('liste');
  const [showSenateurModal, setShowSenateurModal] = useState(false);
  const [selectedSenateur, setSelectedSenateur] = useState<SenateurJouable | null>(null);
  
  // Dummy assignments object for the AssignmentTable
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  
  // Filtre pour les sénateurs
  const filteredSenateurs = senateurs.filter(senateur => 
    senateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    senateur.famille.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (senateur.faction && senateur.faction.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Gestion de la sélection d'un sénateur
  const handleViewSenateur = (senateurId: string) => {
    const senateur = senateurs.find(s => s.id === senateurId);
    if (senateur) {
      setSelectedSenateur(senateur);
      setShowSenateurModal(true);
    }
  };
  
  // Gestion de la mise à jour d'un sénateur
  const handleSaveSenateur = (updatedSenateur: SenateurJouable) => {
    updateSenateur(updatedSenateur.id, updatedSenateur);
    setShowSenateurModal(false);
  };
  
  // Gestion de l'assignation d'un sénateur à un joueur
  const handleAssignToPlayer = (senateurId: string, playerId: string) => {
    assignSenateurToPlayer(senateurId, playerId);
    setAssignments(prev => ({
      ...prev,
      [senateurId]: playerId
    }));
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Gestion des Sénateurs</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un sénateur..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => {/* Ajouter la logique pour créer un nouveau sénateur */}}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nouveau sénateur
          </Button>
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="liste">Liste des sénateurs</TabsTrigger>
          <TabsTrigger value="assignations">Assignations aux joueurs</TabsTrigger>
          <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="liste">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSenateurs.map(senateur => (
              <SenateurCard 
                key={senateur.id} 
                senateur={senateur} 
                onViewSenateur={handleViewSenateur} 
              />
            ))}
            {filteredSenateurs.length === 0 && (
              <div className="col-span-3 text-center py-8 text-muted-foreground">
                Aucun sénateur trouvé.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="assignations">
          <AssignmentTable 
            senateurs={senateurs}
            assignments={assignments}
            onAssign={handleAssignToPlayer}
          />
        </TabsContent>
        
        <TabsContent value="statistiques">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques des Sénateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="text-blue-800 text-sm font-medium">Total des Sénateurs</div>
                  <div className="text-2xl font-bold mt-1">{senateurs.length}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-md">
                  <div className="text-green-800 text-sm font-medium">Sénateurs Assignés</div>
                  <div className="text-2xl font-bold mt-1">
                    {senateurs.filter(s => s.playerId).length}
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-md">
                  <div className="text-amber-800 text-sm font-medium">Sénateurs Libres</div>
                  <div className="text-2xl font-bold mt-1">
                    {senateurs.filter(s => !s.playerId).length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {selectedSenateur && (
        <SenateurModal
          senateur={selectedSenateur}
          open={showSenateurModal}
          onClose={() => setShowSenateurModal(false)}
          onSave={handleSaveSenateur}
        />
      )}
    </div>
  );
};
