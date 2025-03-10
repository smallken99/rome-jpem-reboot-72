
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Loi } from './types';
import { useMaitreJeu } from './context';
import { Season } from './types/common';
import { MagistratureType } from './types/magistratures';
import { v4 as uuidv4 } from 'uuid';
import { LoisList } from './components/lois/LoisList';
import { LoiForm } from './components/lois/LoiForm';
import { ElectionPlanner } from './components/elections/ElectionPlanner';
import { LoiDetail } from './components/lois/LoiDetail';

export const GestionPolitique = () => {
  const { lois, addLoi, currentYear, currentSeason } = useMaitreJeu();
  const [selectedTab, setSelectedTab] = useState('lois');
  const [showAddLoi, setShowAddLoi] = useState(false);
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);
  const [newLoi, setNewLoi] = useState<Omit<Loi, 'id' | 'date' | 'état' | 'votesPositifs' | 'votesNégatifs' | 'votesAbstention' | 'effets'>>({
    titre: '',
    description: '',
    proposeur: '',
    catégorie: 'politique',
    importance: 'normale'
  });
  
  const handleAddLoi = () => {
    if (!newLoi.titre || !newLoi.description) return;
    
    // Ajouter ID à la nouvelle loi
    const loiWithId = {
      ...newLoi,
      id: uuidv4(), // Utiliser UUID pour générer un ID unique
      date: { year: currentYear, season: currentSeason },
      état: "En délibération" as const,
      votesPositifs: 0,
      votesNégatifs: 0,
      votesAbstention: 0,
      effets: {}
    };
    
    addLoi(loiWithId);
    setNewLoi({
      titre: '',
      description: '',
      proposeur: '',
      catégorie: 'politique',
      importance: 'normale'
    });
    setShowAddLoi(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof newLoi) => {
    setNewLoi({ ...newLoi, [field]: e.target.value });
  };
  
  const handleSelectChange = (value: string, field: keyof typeof newLoi) => {
    setNewLoi({ ...newLoi, [field]: value });
  };
  
  const handleViewLoi = (loi: Loi) => {
    setSelectedLoi(loi);
  };
  
  const handleCloseLoi = () => {
    setSelectedLoi(null);
  };
  
  return (
    <div className="p-4">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="lois">Gestion des Lois</TabsTrigger>
          <TabsTrigger value="élections">Planification des Élections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lois">
          <LoisList 
            lois={lois} 
            onCreateLoi={() => setShowAddLoi(true)} 
            onViewLoi={handleViewLoi} 
          />
          
          {showAddLoi && (
            <LoiForm 
              newLoi={newLoi}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleAddLoi={handleAddLoi}
              onCancel={() => setShowAddLoi(false)}
            />
          )}
          
          {selectedLoi && (
            <LoiDetail 
              loi={selectedLoi}
              onClose={handleCloseLoi}
            />
          )}
        </TabsContent>
        
        <TabsContent value="élections">
          <ElectionPlanner />
        </TabsContent>
      </Tabs>
    </div>
  );
};
