
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMaitreJeu } from './context';
import { Loi } from './types';
import { LoisList } from './components/lois/LoisList';
import { LoiForm } from './components/lois/LoiForm';
import { ElectionPlanner } from './components/elections/ElectionPlanner';
import { LoiDetail } from './components/lois/LoiDetail';

// Type spécifique pour le formulaire de loi qui est un sous-ensemble de Loi
interface LoiFormData {
  titre: string;
  description: string;
  proposeur: string;
  catégorie: string;
  importance: 'majeure' | 'normale' | 'mineure';
}

export const GestionPolitique = () => {
  const { lois } = useMaitreJeu();
  const [selectedTab, setSelectedTab] = useState('lois');
  const [showAddLoi, setShowAddLoi] = useState(false);
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);
  const [newLoi, setNewLoi] = useState<LoiFormData>({
    titre: '',
    description: '',
    proposeur: '',
    catégorie: 'politique',
    importance: 'normale'
  });
  
  // Handler functions
  const handleAddLoi = () => {
    if (!newLoi.titre || !newLoi.description) return;
    
    const { addLoi, currentYear, currentSeason } = useMaitreJeu();
    
    // Ajouter ID à la nouvelle loi
    const loiWithId: Loi = {
      ...newLoi,
      id: crypto.randomUUID(),
      nom: newLoi.titre, // Utiliser le titre comme nom par défaut
      type: 'civile', // Valeur par défaut
      date: { year: currentYear, season: currentSeason },
      dateProposition: { year: currentYear, season: currentSeason },
      état: "En délibération" as const,
      votesPositifs: 0,
      votesNégatifs: 0,
      votesAbstention: 0,
      clauses: [],
      impacts: [],
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof LoiFormData) => {
    setNewLoi({ ...newLoi, [field]: e.target.value });
  };
  
  const handleSelectChange = (value: string, field: keyof LoiFormData) => {
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
