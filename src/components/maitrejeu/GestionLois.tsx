
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useMaitreJeu } from './context';
import { LoisSearchAndFilters } from './components/lois/LoisSearchAndFilters';
import { LoisTabsContainer } from './components/lois/LoisTabsContainer';
import { LoiModal } from './components/lois/LoiModal';
import { LoiTimeline } from './components/lois/LoiTimeline';
import { useLoisFiltering } from './hooks/useLoisFiltering';
import { useLoisUI } from './hooks/useLoisUI';
import { convertRepubliqueToMJLoi, convertMJToRepubliqueLoi } from './types/loisAdapter';

export const GestionLois = () => {
  const { lois, addLoi } = useMaitreJeu();
  
  // Custom hooks for lois management
  const {
    searchTerm,
    setSearchTerm,
    loisActives,
    loisProposees,
    loisRejetees
  } = useLoisFiltering(lois);
  
  const {
    activeTab,
    setActiveTab,
    isModalOpen,
    selectedLoi,
    handleOpenModal,
    handleCloseModal,
    formatSeason
  } = useLoisUI();
  
  const handleSaveLoi = (loiData: any) => {
    const mjLoi = convertRepubliqueToMJLoi(loiData);
    addLoi(mjLoi);
    handleCloseModal();
  };
  
  const handleFilterClick = () => {
    // Filter handling logic - would expand based on requirements
    console.log('Filter clicked');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold">Gestion des Lois</h2>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle loi
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Répertoire des Lois Romaines</CardTitle>
          <CardDescription>
            Gérez toutes les lois de la République, des propositions aux lois promulguées
          </CardDescription>
          
          <LoisSearchAndFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onFilterClick={handleFilterClick}
          />
        </CardHeader>
        
        <CardContent>
          <LoisTabsContainer 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            loisActives={loisActives}
            loisProposees={loisProposees}
            loisRejetees={loisRejetees}
            allLois={lois}
            onViewLoi={handleOpenModal}
            formatSeason={formatSeason}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Chronologie Législative</CardTitle>
          <CardDescription>
            Visualisez l'évolution des lois romaines à travers le temps
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <LoiTimeline lois={lois} />
        </CardContent>
      </Card>
      
      {/* Modal pour ajouter/éditer une loi */}
      <LoiModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveLoi}
        loi={selectedLoi ? convertMJToRepubliqueLoi(selectedLoi) : undefined}
      />
    </div>
  );
};
