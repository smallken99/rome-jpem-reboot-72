
import React from 'react';
import { HistoireTimeline } from './components/HistoireTimeline';
import { HistoireSearchBar } from './components/histoire/HistoireSearchBar';
import { HistoireEntryForm } from './components/histoire/HistoireEntryForm';
import { useHistoireEntries } from './components/histoire/useHistoireEntries';

export const GestionHistoire: React.FC = () => {
  const { 
    filteredEntries, 
    searchTerm, 
    setSearchTerm, 
    addHistoireEntry, 
    gameState 
  } = useHistoireEntries();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Chroniques de la République</h2>
        <HistoireSearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <HistoireTimeline entries={filteredEntries} />
        </div>
        
        <div className="space-y-4">
          <HistoireEntryForm
            year={gameState.year}
            season={gameState.season}
            onSubmit={addHistoireEntry}
          />
        </div>
      </div>
    </div>
  );
};
