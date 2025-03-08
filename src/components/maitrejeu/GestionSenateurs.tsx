
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Users, 
  UserPlus, 
  Award 
} from 'lucide-react';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { SenateurCard } from './components/SenateurCard';
import { SenateurModal } from './components/SenateurModal';
import { SenateurJouable } from './types/maitreJeuTypes';
import { AssignmentTable } from './components/AssignmentTable';

export const GestionSenateurs: React.FC = () => {
  const { senateursJouables, senateursAssignes } = useMaitreJeu();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSenateur, setSelectedSenateur] = useState<string | null>(null);
  const [modeAssignation, setModeAssignation] = useState(false);
  
  // Filtrer les sénateurs
  const filteredSenateurs = senateursJouables.filter(senateur => 
    senateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    senateur.famille.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sénateurs déjà assignés
  const assignedSenateurs = senateursJouables.filter(senateur => 
    Object.keys(senateursAssignes).includes(senateur.id)
  );
  
  // Sénateurs disponibles (non assignés)
  const availableSenateurs = senateursJouables.filter(senateur => 
    !Object.keys(senateursAssignes).includes(senateur.id)
  );
  
  const handleOpenModal = (senateurId?: string) => {
    setSelectedSenateur(senateurId || null);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSenateur(null);
  };
  
  const toggleAssignmentMode = () => {
    setModeAssignation(!modeAssignation);
  };
  
  const renderSenateurGrid = (senateurs: SenateurJouable[]) => {
    if (senateurs.length === 0) {
      return (
        <div className="col-span-full text-center py-12 text-muted-foreground italic">
          {searchTerm ? 'Aucun sénateur trouvé pour cette recherche' : 'Aucun sénateur dans cette catégorie'}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {senateurs.map(senateur => (
          <SenateurCard 
            key={senateur.id} 
            senateur={senateur} 
            isAssigned={Object.keys(senateursAssignes).includes(senateur.id)}
            playerName={Object.keys(senateursAssignes).includes(senateur.id) 
              ? senateursAssignes[senateur.id] : undefined}
            onEdit={() => handleOpenModal(senateur.id)}
          />
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Rechercher un sénateur..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-[250px]" 
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={modeAssignation ? "default" : "outline"}
            onClick={toggleAssignmentMode}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Mode assignation</span>
          </Button>
          <Button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Créer un sénateur</span>
          </Button>
        </div>
      </div>
      
      {modeAssignation ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assignation des sénateurs aux joueurs</CardTitle>
          </CardHeader>
          <CardContent>
            <AssignmentTable 
              senateurs={filteredSenateurs}
              assignments={senateursAssignes}
            />
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="tous" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="tous" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Tous</span>
            </TabsTrigger>
            <TabsTrigger value="assignes" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Assignés</span>
            </TabsTrigger>
            <TabsTrigger value="disponibles" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Disponibles</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tous">
            {renderSenateurGrid(filteredSenateurs)}
          </TabsContent>
          
          <TabsContent value="assignes">
            {renderSenateurGrid(assignedSenateurs.filter(s => 
              s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
              s.famille.toLowerCase().includes(searchTerm.toLowerCase())
            ))}
          </TabsContent>
          
          <TabsContent value="disponibles">
            {renderSenateurGrid(availableSenateurs.filter(s => 
              s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
              s.famille.toLowerCase().includes(searchTerm.toLowerCase())
            ))}
          </TabsContent>
        </Tabs>
      )}
      
      <SenateurModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        senateurId={selectedSenateur}
      />
    </div>
  );
};
