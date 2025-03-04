
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { ClientType, Client } from './ClientCard';
import { SearchBar } from './SearchBar';
import { ClientTypeFilter } from './ClientTypeFilter';
import { ClientGrid } from './ClientGrid';
import { generateClients } from './ClientUtils';

// Clients générés
const clients = generateClients();

export const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState(clients);
  const [filter, setFilter] = useState<string | null>(null);
  
  // Naviguer vers la page de création de client
  const handleAddClient = () => {
    navigate('/clientele/nouveau');
  };
  
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
        <div className="flex gap-4 items-center w-full sm:w-auto">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          
          <Button 
            onClick={handleAddClient}
            className="roman-btn gap-1 whitespace-nowrap"
          >
            <UserPlus className="h-4 w-4" />
            Nouveau Client
          </Button>
        </div>
        
        <ClientTypeFilter 
          filter={filter} 
          handleTypeFilter={handleTypeFilter} 
        />
      </div>
      
      <ClientGrid clients={filteredClients} />
    </div>
  );
};
