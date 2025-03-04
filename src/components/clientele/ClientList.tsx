
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ClientCard } from './ClientCard';
import { 
  Search, 
  UserPlus, 
  Filter, 
  SortAsc
} from 'lucide-react';

// Sample data - in a real app, this would come from an API or database
const clients = [
  {
    id: 1,
    name: 'Marcus Licinius',
    profession: 'Marchand',
    location: 'Forum Romanum',
    loyalty: 'Haute',
    influence: 4,
    lastInteraction: '5 jours',
    requests: 2
  },
  {
    id: 2,
    name: 'Gaius Pompeius',
    profession: 'Artisan',
    location: 'Subura',
    loyalty: 'Moyenne',
    influence: 3,
    lastInteraction: '12 jours',
    requests: 0
  },
  {
    id: 3,
    name: 'Livia Metella',
    profession: 'Viticultrice',
    location: 'Colline Palatine',
    loyalty: 'Très Haute',
    influence: 5,
    lastInteraction: '2 jours',
    requests: 1
  },
  {
    id: 4,
    name: 'Quintus Servilius',
    profession: 'Armateur',
    location: 'Port d\'Ostie',
    loyalty: 'Basse',
    influence: 2,
    lastInteraction: '30 jours',
    requests: 0
  },
  {
    id: 5,
    name: 'Aurelia Cotta',
    profession: 'Propriétaire Terrienne',
    location: 'Campanie',
    loyalty: 'Haute',
    influence: 4,
    lastInteraction: '8 jours',
    requests: 3
  }
];

export const ClientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-auto">
          <Input
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-80 bg-white border-rome-gold/30"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="text-sm gap-2 roman-btn-outline">
            <Filter className="h-4 w-4" />
            Filtrer
          </Button>
          <Button variant="outline" className="text-sm gap-2 roman-btn-outline">
            <SortAsc className="h-4 w-4" />
            Trier
          </Button>
          <Button className="ml-2 text-sm gap-2 roman-btn">
            <UserPlus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
      
      {filteredClients.length === 0 && (
        <div className="text-center py-10 bg-white/80 rounded-md border border-rome-gold/30">
          <p className="text-muted-foreground">Aucun client ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};
