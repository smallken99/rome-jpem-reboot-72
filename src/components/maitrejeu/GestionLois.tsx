
import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loi } from './types/lois';
import { useMaitreJeu } from './context';
import { Season, PlayerSeason, formatSeasonDisplay } from './types/common';
import { LoiDetail } from './components/lois/LoiDetail';
import { LoiModal } from './components/lois/LoiModal';
import { LoisSearchAndFilters } from './components/lois/LoisSearchAndFilters';
import { LoisActivesTab } from './components/lois/tabs/LoisActivesTab';
import { LoisProposeesTab } from './components/lois/tabs/LoisProposeesTab';
import { LoisRejeteesTab } from './components/lois/tabs/LoisRejeteesTab';
import { HistoriqueLoiTab } from './components/lois/tabs/HistoriqueLoiTab';

export const GestionLois: React.FC = () => {
  const { lois, addLoi } = useMaitreJeu();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('actives');
  const [showLoiModal, setShowLoiModal] = useState(false);
  const [loiToEdit, setLoiToEdit] = useState<Loi | null>(null);
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);

  // Filter laws based on search term
  const filteredLois = lois.filter(loi => 
    loi.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loi.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loi.proposeur.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loi.catégorie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter laws based on the active tab
  const getFilteredLoisByTab = () => {
    switch(activeTab) {
      case 'actives':
        return filteredLois.filter(loi => loi.état === "Promulguée");
      case 'proposees':
        return filteredLois.filter(loi => loi.état === "En délibération");
      case 'rejetees': 
        return filteredLois.filter(loi => loi.état === "Rejetée");
      case 'historique':
        return filteredLois; // Show all laws in the history tab
      default:
        return filteredLois;
    }
  };

  const handleAddLoi = (loi: Loi) => {
    addLoi(loi);
    setShowLoiModal(false);
    setLoiToEdit(null);
  };

  const handleEditLoi = (loi: Loi) => {
    setLoiToEdit(loi);
    setShowLoiModal(true);
  };

  const handleViewLoi = (loi: Loi) => {
    setSelectedLoi(loi);
  };

  const handleCloseLoi = () => {
    setSelectedLoi(null);
  };

  // Function to format the season in French
  const formatSeason = (season: Season | PlayerSeason | string): string => {
    return formatSeasonDisplay(season);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestion des Lois</h2>
          <p className="text-muted-foreground">
            Gérez les lois de la République, leur promulgation et leurs effets
          </p>
        </div>
        <Button onClick={() => setShowLoiModal(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvelle Loi
        </Button>
      </div>

      <LoisSearchAndFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <TabsContent value="actives">
        <LoisActivesTab 
          lois={getFilteredLoisByTab()}
          onViewLoi={handleViewLoi}
          onEditLoi={handleEditLoi}
          formatSeason={formatSeason}
        />
      </TabsContent>
      
      <TabsContent value="proposees">
        <LoisProposeesTab 
          lois={getFilteredLoisByTab()}
          onViewLoi={handleViewLoi}
          onEditLoi={handleEditLoi}
          formatSeason={formatSeason}
        />
      </TabsContent>
      
      <TabsContent value="rejetees">
        <LoisRejeteesTab 
          lois={getFilteredLoisByTab()}
          onViewLoi={handleViewLoi}
          onEditLoi={handleEditLoi}
          formatSeason={formatSeason}
        />
      </TabsContent>
      
      <TabsContent value="historique">
        <HistoriqueLoiTab 
          lois={getFilteredLoisByTab()}
          onViewLoi={handleViewLoi}
          formatSeason={formatSeason}
        />
      </TabsContent>
      
      {showLoiModal && (
        <LoiModal 
          isOpen={showLoiModal}
          onClose={() => {
            setShowLoiModal(false);
            setLoiToEdit(null);
          }}
          onSave={handleAddLoi}
          editLoi={loiToEdit}
        />
      )}
      
      {selectedLoi && (
        <LoiDetail 
          loi={selectedLoi}
          onClose={handleCloseLoi}
        />
      )}
    </div>
  );
};
