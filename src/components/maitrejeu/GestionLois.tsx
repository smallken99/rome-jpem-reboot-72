
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Filter, X } from 'lucide-react';
import { useMaitreJeu } from './context';
import { Loi } from './types';
import { GameDate } from './types/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { LoisList } from './components/lois/LoisList';
import { LoiDetail } from './components/lois/LoiDetail';
import { LoiForm } from './components/lois/LoiForm';
import { LoiModal } from './components/lois/LoiModal';
import { LoisSearchAndFilters } from './components/lois/LoisSearchAndFilters';
import { LoiTimeline } from './components/lois/LoiTimeline';

export const GestionLois: React.FC = () => {
  const { lois, addLoi, currentDate } = useMaitreJeu();
  const [activeTab, setActiveTab] = useState('toutes');
  const [selectedLoiId, setSelectedLoiId] = useState<string | null>(null);
  const [showLoiModal, setShowLoiModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleResetFilters = () => {
    setFilters({});
    setSearchTerm('');
  };
  
  const filteredLois = lois.filter(loi => {
    // Appliquer la recherche textuelle
    if (searchTerm && !loi.titre.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Appliquer les filtres
    for (const key in filters) {
      if (filters[key] && loi[key as keyof Loi] !== filters[key]) {
        return false;
      }
    }
    
    // Filtrer selon l'onglet actif
    if (activeTab === 'proposées' && loi.état !== 'proposée') {
      return false;
    }
    if (activeTab === 'votées' && loi.état !== 'adoptée' && loi.état !== 'rejetée') {
      return false;
    }
    if (activeTab === 'promulguées' && loi.état !== 'Promulguée') {
      return false;
    }
    
    return true;
  });
  
  const selectedLoi = selectedLoiId ? lois.find(l => l.id === selectedLoiId) : null;
  
  const handleViewLoi = (id: string) => {
    setSelectedLoiId(id);
  };
  
  const handleEditLoi = () => {
    // Ouvrir le modal d'édition
    setShowLoiModal(true);
  };
  
  const handleCreateLoi = (loiData: Omit<Loi, "id">) => {
    addLoi(loiData as Loi);
    setShowLoiModal(false);
  };
  
  const handleBackToList = () => {
    setSelectedLoiId(null);
  };
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Lois</h1>
      
      {selectedLoi ? (
        <div className="mb-4">
          <Button variant="outline" onClick={handleBackToList}>
            Retour à la liste
          </Button>
        </div>
      ) : (
        <div className="flex justify-between mb-4">
          <Button onClick={() => setShowLoiModal(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Proposer une nouvelle loi
          </Button>
        </div>
      )}
      
      {!selectedLoi ? (
        <>
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold">Recherche et filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Rechercher une loi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleResetFilters}
                  >
                    <X className="h-4 w-4" />
                    Réinitialiser
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, value]) => (
                  value && (
                    <Badge 
                      key={key} 
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {key}: {value}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0"
                        onClick={() => handleFilterChange(key, null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6 w-full md:w-auto">
              <TabsTrigger value="toutes">Toutes</TabsTrigger>
              <TabsTrigger value="proposées">Proposées</TabsTrigger>
              <TabsTrigger value="votées">Votées</TabsTrigger>
              <TabsTrigger value="promulguées">Promulguées</TabsTrigger>
            </TabsList>
            
            <TabsContent value="toutes">
              <LoisList 
                lois={filteredLois} 
                onViewLoi={handleViewLoi}
              />
            </TabsContent>
            
            <TabsContent value="proposées">
              <LoisList 
                lois={filteredLois.filter(l => l.état === 'proposée')} 
                onViewLoi={handleViewLoi}
              />
            </TabsContent>
            
            <TabsContent value="votées">
              <LoisList 
                lois={filteredLois.filter(l => l.état === 'adoptée' || l.état === 'rejetée')} 
                onViewLoi={handleViewLoi}
              />
            </TabsContent>
            
            <TabsContent value="promulguées">
              <LoisList 
                lois={filteredLois.filter(l => l.état === 'Promulguée')} 
                onViewLoi={handleViewLoi}
              />
            </TabsContent>
          </Tabs>
          
          <LoiTimeline 
            lois={lois}
            onSelectLoi={handleViewLoi}
          />
        </>
      ) : (
        <Card>
          <CardContent className="p-6">
            <LoiDetail 
              loi={selectedLoi} 
              onEdit={handleEditLoi}
            />
          </CardContent>
        </Card>
      )}
      
      {showLoiModal && (
        <LoiModal
          isOpen={true}
          onClose={() => setShowLoiModal(false)}
          onSave={handleCreateLoi}
        />
      )}
    </div>
  );
};
