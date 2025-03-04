
import React, { useState, useEffect } from 'react';
import { ClientType, Client } from './ClientCard';
import { SearchBar } from './SearchBar';
import { ClientTypeFilter } from './ClientTypeFilter';
import { ClientGrid } from './ClientGrid';
import { generateClients } from './ClientUtils';

// Clients générés
const clients = generateClients();

export const ClientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState(clients);
  const [filter, setFilter] = useState<string | null>(null);
  
  // Filtrer par recherche et type
  const applyFilters = () => {
    let results = clients.filter(client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.subType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filter) {
      results = results.filter(client => client.type === filter);
    }
    
    setFilteredClients(results);
  };
  
  // Appliquer les filtres quand la recherche ou le filtre change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, filter]);
  
  // Fonction pour définir le filtre par type
  const handleTypeFilter = (type: string | null) => {
    setFilter(type === filter ? null : type as ClientType);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        <ClientTypeFilter 
          filter={filter} 
          handleTypeFilter={handleTypeFilter} 
        />
      </div>
      
      <ClientGrid clients={filteredClients} />
    </div>
  );
};
