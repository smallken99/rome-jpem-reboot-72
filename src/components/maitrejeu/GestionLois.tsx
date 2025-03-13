
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoiModal } from './components/lois/LoiModal';
import { LoiDetail } from './components/lois/LoiDetail';
import { LoisList } from './components/lois/LoisList';
import { LoisSearchAndFilters } from './components/lois/LoisSearchAndFilters';
import { LoiTimeline } from './components/lois/LoiTimeline';
import { useMaitreJeu } from './context';
import { Season } from '@/utils/timeSystem';
import { Loi } from './types/lois';

export const GestionLois: React.FC = () => {
  const { lois, addLoi, voteLoi, currentYear, currentSeason } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState('actives');
  const [selectedLoiId, setSelectedLoiId] = useState<string | null>(null);
  const [showLoiModal, setShowLoiModal] = useState(false);
  const [editLoi, setEditLoi] = useState<Loi | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    importance: '',
    année: '',
    état: ''
  });
  
  const handleCreateLoi = (loi: Omit<Loi, "id">) => {
    addLoi(loi);
    setShowLoiModal(false);
  };
  
  const handleEditLoi = (id: string) => {
    const loi = lois.find(l => l.id === id);
    if (loi) {
      setEditLoi(loi);
      setShowLoiModal(true);
    }
  };
  
  const handleVoteLoi = (id: string, vote: 'pour' | 'contre' | 'abstention', count: number = 1) => {
    voteLoi(id, vote, count);
  };
  
  const filterLois = (lois: Loi[]) => {
    return lois.filter(loi => {
      // Recherche par terme
      if (searchTerm && 
          !loi.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !loi.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filtres
      if (filters.type && loi.type !== filters.type) {
        return false;
      }
      if (filters.importance && loi.importance !== filters.importance) {
        return false;
      }
      if (filters.état && loi.état !== filters.état) {
        return false;
      }
      if (filters.année) {
        const year = parseInt(filters.année);
        if (!isNaN(year) && loi.date.year !== year) {
          return false;
        }
      }
      
      return true;
    });
  };
  
  const getActiveLois = () => {
    return filterLois(lois.filter(l => l.état === 'Promulguée' || l.état === 'Appliquée'));
  };
  
  const getProposedLois = () => {
    return filterLois(lois.filter(l => l.état === 'En délibération' || l.état === 'En attente de vote'));
  };
  
  const getRejectedLois = () => {
    return filterLois(lois.filter(l => l.état === 'Rejetée' || l.état === 'Vetoed'));
  };
  
  const getHistoricalLois = () => {
    return filterLois([...lois].sort((a, b) => {
      // Trier par année décroissante
      if (a.date.year !== b.date.year) {
        return b.date.year - a.date.year;
      }
      
      // Puis par saison
      const seasonOrder: Record<Season, number> = {
        'Ver': 0,
        'Aestas': 1,
        'Autumnus': 2,
        'Hiems': 3
      };
      
      const aSeason = a.date.season as Season;
      const bSeason = b.date.season as Season;
      
      return seasonOrder[bSeason] - seasonOrder[aSeason];
    }));
  };
  
  const selectedLoi = selectedLoiId ? lois.find(l => l.id === selectedLoiId) : null;
  
  return (
    <div className="p-6 h-full">
      {selectedLoi ? (
        <div className="space-y-6">
          <Button variant="outline" onClick={() => setSelectedLoiId(null)}>
            Retour à la liste
          </Button>
          <LoiDetail 
            loi={selectedLoi} 
            onVote={handleVoteLoi}
            onEdit={() => handleEditLoi(selectedLoi.id)}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Gestion des Lois</h1>
            <Button 
              className="flex items-center gap-2"
              onClick={() => {
                setEditLoi(null);
                setShowLoiModal(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Proposer une loi
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher une loi..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <LoisSearchAndFilters 
              filters={filters} 
              setFilters={setFilters} 
            />
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 w-full rounded-none">
                  <TabsTrigger value="actives">Lois Actives</TabsTrigger>
                  <TabsTrigger value="propositions">Propositions</TabsTrigger>
                  <TabsTrigger value="rejetees">Rejetées</TabsTrigger>
                  <TabsTrigger value="historique">Historique</TabsTrigger>
                </TabsList>
                
                <TabsContent value="actives" className="p-4">
                  <LoisList 
                    lois={getActiveLois()} 
                    onSelect={setSelectedLoiId}
                    onEdit={handleEditLoi}
                  />
                </TabsContent>
                
                <TabsContent value="propositions" className="p-4">
                  <LoisList 
                    lois={getProposedLois()} 
                    onSelect={setSelectedLoiId}
                    onEdit={handleEditLoi}
                  />
                </TabsContent>
                
                <TabsContent value="rejetees" className="p-4">
                  <LoisList 
                    lois={getRejectedLois()} 
                    onSelect={setSelectedLoiId}
                    onEdit={handleEditLoi}
                  />
                </TabsContent>
                
                <TabsContent value="historique" className="p-4">
                  <LoiTimeline 
                    lois={getHistoricalLois()} 
                    onSelect={setSelectedLoiId}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
      
      <LoiModal 
        open={showLoiModal} 
        onClose={() => setShowLoiModal(false)}
        onSave={handleCreateLoi}
        editLoi={editLoi}
      />
    </div>
  );
};

export default GestionLois;
