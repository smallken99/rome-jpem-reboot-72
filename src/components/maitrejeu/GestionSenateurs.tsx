import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, Plus, UserPlus, UserMinus 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SenateurCard } from './components/SenateurCard';
import { AssignmentTable } from './components/AssignmentTable';
import { SenateurModal } from './components/SenateurModal';

export const GestionSenateurs: React.FC = () => {
  // Utilisation des propriétés renommées
  const { senateurs: senateursJouables, assignSenateur } = useMaitreJeu();
  const [senateursAssignes, setSenateursAssignes] = useState<Record<string, string>>({});
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSenateurId, setSelectedSenateurId] = useState<string | null>(null);
  const [isSenateurModalOpen, setIsSenateurModalOpen] = useState(false);
  const [isEditingProvince, setIsEditingProvince] = useState(false);
  
  // Filtrer les sénateurs en fonction du terme de recherche
  const filteredSenateurs = senateursJouables?.filter(senateur =>
    senateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    senateur.famille.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  // Gestion de l'ouverture et de la fermeture de la modale
  const handleEditSenateur = (senateurId: string) => {
    setSelectedSenateurId(senateurId);
    setIsSenateurModalOpen(true);
    setIsEditingProvince(true);
  };
  
  const handleCloseSenateurModal = () => {
    setSelectedSenateurId(null);
    setIsSenateurModalOpen(false);
    setIsEditingProvince(false);
  };
  
  // Gestion de la sauvegarde d'un sénateur
  const handleSaveSenateur = (senateur: any) => {
    // Ici, vous devrez implémenter la logique pour sauvegarder les modifications
    // ou ajouter un nouveau sénateur.
    console.log('Sénateur sauvegardé:', senateur);
    handleCloseSenateurModal();
  };
  
  // Gestion de l'assignation d'un sénateur à une province
  const handleAssignSenateur = (senateurId: string, provinceId: string) => {
    assignSenateur(provinceId, senateurId);
    setSenateursAssignes(prev => ({ ...prev, [senateurId]: provinceId }));
  };
  
  const selectedSenateur = selectedSenateurId
    ? senateursJouables?.find(s => s.id === selectedSenateurId)
    : null;
  
  // Dans le rendu, mettre à jour les propriétés des composants
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="senateurs" className="w-full">
          <TabsList>
            <TabsTrigger value="senateurs" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Sénateurs</span>
            </TabsTrigger>
            <TabsTrigger value="assignations" className="flex items-center gap-2">
              <UserMinus className="h-4 w-4" />
              <span>Assignations</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex justify-between items-center mt-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Rechercher..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[250px]" 
              />
            </div>
            <Button 
              className="flex items-center gap-2"
              onClick={() => {
                setSelectedSenateurId(null);
                setIsSenateurModalOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter</span>
            </Button>
          </div>
          
          <TabsContent value="senateurs" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Liste des sénateurs</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Mise à jour des cartes de sénateurs pour gérer isAssigned et playerName */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSenateurs.map(senateur => {
                    const isAssigned = Object.keys(senateursAssignes).includes(senateur.id);
                    const playerName = isAssigned ? senateursAssignes[senateur.id] : null;
                    
                    return (
                      <SenateurCard
                        key={senateur.id}
                        senateur={senateur}
                        isAssigned={isAssigned}
                        playerName={playerName}
                        onEdit={() => handleEditSenateur(senateur.id)}
                      />
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="assignations" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assignations des sénateurs</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Mise à jour de la table d'assignation pour inclure onAssign */}
                <AssignmentTable
                  senateurs={filteredSenateurs}
                  assignments={senateursAssignes}
                  onAssign={handleAssignSenateur}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Mise à jour de la modale de sénateur pour utiliser isOpen au lieu de open */}
      {selectedSenateurId && (
        <SenateurModal
          senateur={selectedSenateur}
          onClose={handleCloseSenateurModal}
          onSave={handleSaveSenateur}
          isOpen={isSenateurModalOpen}
        />
      )}
    </div>
  );
};
