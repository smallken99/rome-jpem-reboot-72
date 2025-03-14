
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from './context';
import { Loi, LoiType } from './types/lois';
import { LoisList } from './components/lois/LoisList';
import { LoiForm } from './components/lois/LoiForm';
import { ElectionPlanner } from './components/elections/ElectionPlanner';
import { LoiDetail } from './components/lois/LoiDetail';
import { v4 as uuidv4 } from 'uuid';

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
  
  const handleAddLoi = () => {
    if (!newLoi.titre || !newLoi.description) return;
    
    const loiWithId: Loi = {
      id: uuidv4(),
      title: newLoi.titre,
      description: newLoi.description,
      proposedBy: newLoi.proposeur,
      category: newLoi.catégorie,
      type: newLoi.type,
      nom: newLoi.titre,
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
      commentaires: [],
      tags: [],
      effets: {},
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
  
  const handleViewLoi = (loi?: Loi) => {
    setSelectedLoi(loi || null);
  };
  
  const handleCreateLoi = () => {
    setShowAddLoi(true);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion Politique</h1>
        <Button onClick={() => setShowAddLoi(true)}>Nouvelle Loi</Button>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="lois">Lois</TabsTrigger>
          <TabsTrigger value="elections">Élections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lois">
          {selectedLoi ? (
            <LoiDetail 
              loi={selectedLoi} 
              onEdit={() => {/* function to edit loi */}} 
              onClose={() => setSelectedLoi(null)} 
            />
          ) : (
            <LoisList 
              lois={lois} 
              onViewLoi={handleViewLoi}
              onCreateLoi={handleCreateLoi}
            />
          )}
        </TabsContent>
        
        <TabsContent value="elections">
          <ElectionPlanner />
        </TabsContent>
      </Tabs>
      
      {showAddLoi && (
        <LoiForm
          loi={{
            titre: newLoi.titre,
            description: newLoi.description,
            proposeur: newLoi.proposeur,
            type: newLoi.type,
            catégorie: newLoi.catégorie,
            importance: newLoi.importance
          }}
          onChange={{
            handleInputChange: handleInputChange,
            handleSelectChange: handleSelectChange
          }}
          onSubmit={handleAddLoi}
          onCancel={() => setShowAddLoi(false)}
        />
      )}
    </div>
  );
};
