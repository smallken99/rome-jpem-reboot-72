
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMaitreJeu } from './context';
import { Loi, LoiType } from './types/lois';
import { LoisList } from './components/lois/LoisList';
import { LoiForm } from './components/lois/LoiForm';
import { ElectionPlanner } from './components/elections/ElectionPlanner';
import { LoiDetail } from './components/lois/LoiDetail';
import { v4 as uuidv4 } from 'uuid';

// Type for the form data
interface LoiFormData {
  titre: string;
  description: string;
  proposeur: string;
  type: LoiType;
  catégorie: string;
  importance: 'majeure' | 'normale' | 'mineure';
}

export const GestionPolitique = () => {
  const { lois, addLoi, currentYear, currentSeason } = useMaitreJeu();
  const [selectedTab, setSelectedTab] = useState('lois');
  const [showAddLoi, setShowAddLoi] = useState(false);
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);
  const [newLoi, setNewLoi] = useState<LoiFormData>({
    titre: '',
    description: '',
    proposeur: '',
    catégorie: 'Politique',
    type: 'Politique',
    importance: 'normale'
  });
  
  // Handler functions
  const handleAddLoi = () => {
    if (!newLoi.titre || !newLoi.description) return;
    
    // Add ID to the new law
    const loiWithId: Loi = {
      id: uuidv4(),
      title: newLoi.titre,
      description: newLoi.description,
      proposedBy: newLoi.proposeur,
      category: newLoi.catégorie,
      type: newLoi.type,
      nom: newLoi.titre, // Use title as default name
      date: { year: currentYear, season: currentSeason },
      dateProposition: { year: currentYear, season: currentSeason },
      status: "proposed",
      état: "En délibération",
      votesPositifs: 0,
      votesNégatifs: 0,
      votesAbstention: 0,
      votesFor: 0,
      votesAgainst: 0,
      votes: {
        pour: 0,
        contre: 0,
        abstention: 0
      },
      titre: newLoi.titre,
      proposeur: newLoi.proposeur,
      catégorie: newLoi.catégorie,
      importance: newLoi.importance,
      clauses: [],
      effets: [],
      conditions: [],
      penalites: []
    };
    
    addLoi(loiWithId);
    setNewLoi({
      titre: '',
      description: '',
      proposeur: '',
      catégorie: 'Politique',
      type: 'Politique',
      importance: 'normale'
    });
    setShowAddLoi(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof LoiFormData) => {
    setNewLoi({ ...newLoi, [field]: e.target.value });
  };
  
  const handleSelectChange = (value: string, field: keyof LoiFormData) => {
    setNewLoi({ ...newLoi, [field]: value });
  };
  
  const handleViewLoi = (id: string) => {
    const loi = lois.find(l => l.id === id);
    if (loi) {
      setSelectedLoi(loi);
    }
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
              loi={{
                titre: newLoi.titre,
                description: newLoi.description,
                proposeur: newLoi.proposeur,
                type: newLoi.type,
                importance: newLoi.importance
              }}
              onSubmit={handleAddLoi}
              onChange={{
                handleInputChange: (e, field) => handleInputChange(e, field as keyof LoiFormData),
                handleSelectChange: (value, field) => handleSelectChange(value, field as keyof LoiFormData)
              }}
              onCancel={() => setShowAddLoi(false)}
            />
          )}
          
          {selectedLoi && (
            <LoiDetail 
              loi={selectedLoi}
              onEdit={() => console.log('Edit loi:', selectedLoi.id)}
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
