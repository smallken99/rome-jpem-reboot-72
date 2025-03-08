// Mettre à jour les imports depuis les nouveaux fichiers de types
import { useContext, useState } from 'react';
import { MaitreJeuContext } from './context/MaitreJeuContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { SenateurModal } from './components/SenateurModal';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { AssignmentTable } from './components/AssignmentTable';
import { SenateurJouable } from './types/senateurs';

export const GestionSenateurs = () => {
  const { senateurs, updateSenateur, assignSenateurToPlayer } = useContext(MaitreJeuContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('liste');
  const [showSenatorModal, setShowSenatorModal] = useState(false);
  const [showNewSenatorModal, setShowNewSenatorModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [selectedSenateur, setSelectedSenateur] = useState<SenateurJouable | null>(null);
  const [newSenator, setNewSenator] = useState({
    nom: '',
    famille: '',
    âge: 30,
    joueurId: null,
    stats: {
      éloquence: 5,
      administration: 5,
      militaire: 5,
      intrigue: 5,
      charisme: 5
    },
    popularité: 50,
    richesse: 50,
    influence: 50,
    magistrature: null,
    faction: 'Indépendant',
    province: null
  });

  // Filtrer les sénateurs en fonction du terme de recherche
  const filteredSenateurs = senateurs.filter(senateur => 
    senateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    senateur.famille.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (senateur.faction && senateur.faction.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Gérer l'édition d'un sénateur
  const handleEditSenateur = (senateur: SenateurJouable) => {
    setSelectedSenateur(senateur);
    setShowSenatorModal(true);
  };

  // Gérer la sauvegarde d'un sénateur modifié
  const handleSaveSenateur = (updatedSenateur: SenateurJouable) => {
    updateSenateur(updatedSenateur.id, updatedSenateur);
    setShowSenatorModal(false);
  };

  // Gérer la création d'un nouveau sénateur
  const handleCreateSenator = () => {
    // Vérifier que les champs obligatoires sont remplis
    if (!newSenator.nom || !newSenator.famille) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Créer un nouveau sénateur avec un ID unique
    const newSenateurWithId = {
      ...newSenator,
      id: `senateur-${Date.now()}`,
    };

    // Ajouter le sénateur à la liste
    updateSenateur(newSenateurWithId.id, newSenateurWithId);
    
    // Réinitialiser le formulaire et fermer le modal
    setNewSenator({
      nom: '',
      famille: '',
      âge: 30,
      joueurId: null,
      stats: {
        éloquence: 5,
        administration: 5,
        militaire: 5,
        intrigue: 5,
        charisme: 5
      },
      popularité: 50,
      richesse: 50,
      influence: 50,
      magistrature: null,
      faction: 'Indépendant',
      province: null
    });
    setShowNewSenatorModal(false);
  };

  // Gérer la suppression d'un sénateur
  const handleDeleteSenator = () => {
    if (selectedSenateur) {
      // Supprimer le sénateur de la liste
      const updatedSenateurs = senateurs.filter(s => s.id !== selectedSenateur.id);
      // Mettre à jour le contexte
      // Note: Il faudrait ajouter une fonction deleteSenateur au contexte
      
      // Fermer le modal de confirmation
      setShowConfirmDeleteModal(false);
    }
  };

  // Gérer l'assignation d'un sénateur à un joueur
  const handleAssignSenator = (senateurId: string, playerId: string) => {
    assignSenateurToPlayer(senateurId, playerId);
  };

  // Remplacer les dialogues RomanCard.Dialog par des Dialog standard
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Gestion des Sénateurs</h2>
        <div className="flex items-center space-x-2">
          <Input
            type="search"
            placeholder="Rechercher un sénateur..."
            className="w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setShowNewSenatorModal(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nouveau Sénateur
          </Button>
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="liste">Liste des sénateurs</TabsTrigger>
          <TabsTrigger value="assignation">Assignation aux joueurs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="liste">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSenateurs.map(senateur => (
              <RomanCard key={senateur.id} className="h-full">
                <RomanCard.Header>
                  <RomanCard.Title>{senateur.nom}</RomanCard.Title>
                  <RomanCard.Description>{senateur.famille}</RomanCard.Description>
                </RomanCard.Header>
                <RomanCard.Content>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Âge:</span>
                      <span>{senateur.âge || senateur.age} ans</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Faction:</span>
                      <span>{senateur.faction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Magistrature:</span>
                      <span>{senateur.magistrature || "Aucune"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Popularité:</span>
                      <span>{senateur.popularité}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Richesse:</span>
                      <span>{senateur.richesse}</span>
                    </div>
                  </div>
                </RomanCard.Content>
                <RomanCard.Footer>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleEditSenateur(senateur)}
                  >
                    Modifier
                  </Button>
                </RomanCard.Footer>
              </RomanCard>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="assignation">
          <AssignmentTable 
            senateurs={senateurs}
            assignments={{}}
            onAssign={handleAssignSenator}
          />
        </TabsContent>
      </Tabs>
      
      {/* Mise à jour du modal pour sénateur */}
      <SenateurModal
        senateur={selectedSenateur}
        open={showSenatorModal}
        onClose={() => setShowSenatorModal(false)}
        onSave={handleSaveSenateur}
      />
      
      {/* Remplacer RomanCard.Dialog par Dialog standard */}
      <Dialog open={showNewSenatorModal} onOpenChange={setShowNewSenatorModal}>
        <DialogHeader>
          <DialogTitle>Créer un nouveau sénateur</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer un nouveau sénateur
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nom">Nom</Label>
                <Input 
                  id="nom" 
                  value={newSenator.nom} 
                  onChange={(e) => setNewSenator({...newSenator, nom: e.target.value})} 
                />
              </div>
              <div>
                <Label htmlFor="famille">Famille</Label>
                <Input 
                  id="famille" 
                  value={newSenator.famille} 
                  onChange={(e) => setNewSenator({...newSenator, famille: e.target.value})} 
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="age">Âge</Label>
              <Input 
                id="age" 
                type="number" 
                value={newSenator.âge} 
                onChange={(e) => setNewSenator({...newSenator, âge: parseInt(e.target.value)})} 
              />
            </div>
            
            <div>
              <Label htmlFor="faction">Faction</Label>
              <Select 
                value={newSenator.faction} 
                onValueChange={(value) => setNewSenator({...newSenator, faction: value})}
              >
                <SelectTrigger id="faction">
                  <SelectValue placeholder="Sélectionner une faction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Populares">Populares</SelectItem>
                  <SelectItem value="Optimates">Optimates</SelectItem>
                  <SelectItem value="Indépendant">Indépendant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="popularite">Popularité</Label>
                <Input 
                  id="popularite" 
                  type="number" 
                  value={newSenator.popularité} 
                  onChange={(e) => setNewSenator({...newSenator, popularité: parseInt(e.target.value)})} 
                />
              </div>
              <div>
                <Label htmlFor="richesse">Richesse</Label>
                <Input 
                  id="richesse" 
                  type="number" 
                  value={newSenator.richesse} 
                  onChange={(e) => setNewSenator({...newSenator, richesse: parseInt(e.target.value)})} 
                />
              </div>
              <div>
                <Label htmlFor="influence">Influence</Label>
                <Input 
                  id="influence" 
                  type="number" 
                  value={newSenator.influence} 
                  onChange={(e) => setNewSenator({...newSenator, influence: parseInt(e.target.value)})} 
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewSenatorModal(false)}>Annuler</Button>
          <Button onClick={handleCreateSenator}>Créer</Button>
        </DialogFooter>
      </Dialog>
      
      {/* Remplacer le second RomanCard.Dialog par Dialog standard */}
      <Dialog open={showConfirmDeleteModal} onOpenChange={setShowConfirmDeleteModal}>
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir supprimer ce sénateur ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          {selectedSenateur && (
            <div className="py-4">
              <p>Vous êtes sur le point de supprimer le sénateur:</p>
              <p className="font-bold mt-2">{selectedSenateur.nom} de la famille {selectedSenateur.famille}</p>
            </div>
          )}
        </DialogContent>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowConfirmDeleteModal(false)}>Annuler</Button>
          <Button variant="destructive" onClick={handleDeleteSenator}>Supprimer</Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};
