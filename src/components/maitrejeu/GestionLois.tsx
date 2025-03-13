
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useMaitreJeu } from './context';
import { Loi, LoiState } from './types/lois';
import { LoisList } from './components/lois/LoisList';
import { LoiDetail } from './components/lois/LoiDetail';
import { LoiModal } from './components/lois/LoiModal';
import { v4 as uuidv4 } from 'uuid';
import { LoiTimeline } from './components/lois/LoiTimeline';
import { LoisSearchAndFilters } from './components/lois/LoisSearchAndFilters';

export const GestionLois: React.FC = () => {
  const { lois, addLoi, currentDate } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState<string>('proposées');
  const [selectedLoiId, setSelectedLoiId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState({
    type: '',
    importance: '',
    année: '',
    état: ''
  });
  
  const handleAddLoi = (loiData: Omit<Loi, "id">) => {
    // Créer une nouvelle loi avec un ID unique
    const newLoi: Loi = {
      id: uuidv4(),
      ...loiData
    };
    
    // Ajouter la loi
    addLoi(newLoi);
    setIsModalOpen(false);
  };
  
  const handleEditLoi = (id: string) => {
    setSelectedLoiId(id);
  };
  
  const voteLoi = (id: string, vote: 'pour' | 'contre' | 'abstention', count: number = 1) => {
    // Cette fonction sera implémentée dans le contexte
    console.log(`Vote ${vote} pour la loi ${id} avec ${count} voix`);
    
    // Mise à jour temporaire pour l'UI
    const updatedLois = lois.map(loi => {
      if (loi.id === id) {
        if (vote === 'pour') {
          return { ...loi, votesPositifs: loi.votesPositifs + count };
        } else if (vote === 'contre') {
          return { ...loi, votesNégatifs: loi.votesNégatifs + count };
        } else {
          return { ...loi, votesAbstention: loi.votesAbstention + count };
        }
      }
      return loi;
    });
    
    // Mettre à jour l'état local puisque le contexte n'a pas la fonction voteLoi
    // Dans une implémentation complète, cela serait géré par le contexte
  };
  
  // Filtrer et trier les lois en fonction de l'onglet actif
  const filteredLois = lois.filter(loi => {
    // Appliquer le filtre de recherche
    if (searchTerm && !loi.titre.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !loi.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Appliquer les autres filtres
    if (filters.type && loi.type !== filters.type) {
      return false;
    }
    if (filters.importance && loi.importance !== filters.importance) {
      return false;
    }
    if (filters.année && loi.date.year.toString() !== filters.année) {
      return false;
    }
    if (filters.état && loi.état !== filters.état) {
      return false;
    }
    
    // Filtrer selon l'onglet actif
    if (activeTab === 'proposées') {
      return loi.état === 'En délibération' || loi.état === 'proposée';
    } else if (activeTab === 'actives') {
      return loi.état === 'adoptée' || loi.état === 'Promulguée';
    } else if (activeTab === 'rejetées') {
      return loi.état === 'Rejetée' || loi.état === 'En délibération';
    } else if (activeTab === 'historique') {
      return true; // Afficher toutes les lois dans l'historique
    }
    
    return true;
  });
  
  // Récupérer la loi sélectionnée
  const selectedLoi = lois.find(loi => loi.id === selectedLoiId);
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Lois</h1>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Nouvelle Loi
        </Button>
      </div>
      
      {selectedLoiId && selectedLoi ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl">Détails de la Loi</CardTitle>
            <Button 
              variant="ghost" 
              onClick={() => setSelectedLoiId('')}
              className="h-8 px-2"
            >
              Retour à la liste
            </Button>
          </CardHeader>
          <CardContent>
            <LoiDetail 
              loi={selectedLoi}
              onEdit={() => handleEditLoi(selectedLoi.id)}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="p-4">
            <LoisSearchAndFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onFilterChange={(key, value) => setFilters({...filters, [key]: value})}
              onResetFilters={() => setFilters({type: '', importance: '', année: '', état: ''})}
            />
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="proposées">Lois Proposées</TabsTrigger>
              <TabsTrigger value="actives">Lois Actives</TabsTrigger>
              <TabsTrigger value="rejetées">Lois Rejetées</TabsTrigger>
              <TabsTrigger value="historique">Historique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="proposées">
              <Card>
                <CardContent className="p-6">
                  <LoisList 
                    lois={filteredLois} 
                    onCreateLoi={() => setIsModalOpen(true)}
                    onViewLoi={handleEditLoi}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="actives">
              <Card>
                <CardContent className="p-6">
                  <LoisList 
                    lois={filteredLois} 
                    onCreateLoi={() => setIsModalOpen(true)} 
                    onViewLoi={handleEditLoi}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rejetées">
              <Card>
                <CardContent className="p-6">
                  <LoisList 
                    lois={filteredLois} 
                    onCreateLoi={() => setIsModalOpen(true)} 
                    onViewLoi={handleEditLoi}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="historique">
              <Card>
                <CardContent className="p-6">
                  <LoiTimeline 
                    lois={filteredLois} 
                    onViewLoi={handleEditLoi}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
      
      {isModalOpen && (
        <LoiModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleAddLoi}
          initialDate={currentDate}
        />
      )}
    </div>
  );
};
