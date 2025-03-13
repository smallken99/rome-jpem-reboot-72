
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMaitreJeu } from './context';
import { LoiModal } from './components/lois/LoiModal';
import { LoiDetail } from './components/lois/LoiDetail';
import { LoisActivesTab } from './components/lois/tabs/LoisActivesTab';
import { LoisProposeesTab } from './components/lois/tabs/LoisProposeesTab';
import { LoisRejeteesTab } from './components/lois/tabs/LoisRejeteesTab';
import { HistoriqueLois } from './components/lois/HistoriqueLois';
import { Loi, LoiType } from './types/lois';
import { Season } from './types/common';
import { v4 as uuidv4 } from 'uuid';

export const GestionLois: React.FC = () => {
  const { lois, addLoi } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState('actives');
  const [showLoiModal, setShowLoiModal] = useState(false);
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<LoiType | ''>('');
  
  const formatSeason = (season: Season | string) => {
    switch (season) {
      case 'spring':
        return 'Printemps';
      case 'summer':
        return 'Été';
      case 'autumn':
        return 'Automne';
      case 'winter':
        return 'Hiver';
      default:
        return season;
    }
  };
  
  const filteredLois = lois.filter(loi => {
    if (searchTerm && 
        !loi.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !loi.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (filterType && loi.type !== filterType) {
      return false;
    }
    
    return true;
  });
  
  const handleViewLoi = (loi: Loi) => {
    setSelectedLoi(loi);
    setActiveTab('detail');
  };
  
  const handleCreateLoi = (loiData: any) => {
    const loiWithId: Loi = {
      ...loiData,
      id: uuidv4()
    };
    addLoi(loiWithId);
    setShowLoiModal(false);
  };
  
  const handleClose = () => {
    setSelectedLoi(null);
    setActiveTab('actives');
  };
  
  // Type-safe filter change handler
  const handleFilterTypeChange = (value: string) => {
    setFilterType(value as LoiType | '');
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des lois</h1>
        
        {!selectedLoi && (
          <Button onClick={() => setShowLoiModal(true)} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Proposer une nouvelle loi
          </Button>
        )}
        
        {selectedLoi && (
          <Button variant="outline" onClick={handleClose}>
            Retour à la liste
          </Button>
        )}
      </div>
      
      {!selectedLoi && (
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une loi..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-64">
            <Select 
              value={filterType} 
              onValueChange={handleFilterTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                <SelectItem value="politique">Politique</SelectItem>
                <SelectItem value="économique">Économique</SelectItem>
                <SelectItem value="sociale">Sociale</SelectItem>
                <SelectItem value="judiciaire">Judiciaire</SelectItem>
                <SelectItem value="militaire">Militaire</SelectItem>
                <SelectItem value="religieuse">Religieuse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {!selectedLoi ? (
          <>
            <TabsList className="mb-4">
              <TabsTrigger value="actives">Lois en vigueur</TabsTrigger>
              <TabsTrigger value="proposees">Lois proposées</TabsTrigger>
              <TabsTrigger value="rejetees">Lois rejetées</TabsTrigger>
              <TabsTrigger value="historique">Historique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="actives">
              <LoisActivesTab onViewLoi={handleViewLoi} />
            </TabsContent>
            
            <TabsContent value="proposees">
              <LoisProposeesTab onViewLoi={handleViewLoi} />
            </TabsContent>
            
            <TabsContent value="rejetees">
              <LoisRejeteesTab onViewLoi={handleViewLoi} />
            </TabsContent>
            
            <TabsContent value="historique">
              <h2 className="text-2xl font-bold mb-4">Historique des lois</h2>
              <HistoriqueLois 
                lois={filteredLois.sort((a, b) => b.date.year - a.date.year)} 
                onViewLoi={handleViewLoi}
                formatSeason={formatSeason}
              />
            </TabsContent>
          </>
        ) : (
          <TabsContent value="detail">
            <LoiDetail 
              loi={selectedLoi} 
              onEdit={() => console.log('Edit loi:', selectedLoi.id)} 
              onClose={handleClose}
            />
          </TabsContent>
        )}
      </Tabs>
      
      <LoiModal
        isOpen={showLoiModal}
        onClose={() => setShowLoiModal(false)}
        onSave={handleCreateLoi}
      />
    </div>
  );
};
