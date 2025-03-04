
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ClientCard, ClientType, Client } from './ClientCard';
import { 
  Search, 
  Filter, 
  SortAsc
} from 'lucide-react';

// Génération des clients masculins uniquement
const generateClients = () => {
  const clientTypes: ClientType[] = ['artisan', 'politicien', 'religieux', 'proprietaire', 'pegre'];
  const loyaltyLevels = ['Très Haute', 'Haute', 'Moyenne', 'Basse', 'Très Basse'];
  const locations = ['Forum Romanum', 'Subura', 'Port d\'Ostie', 'Colline Palatine', 'Campanie', 'Via Appia', 'Marché de Trajan'];
  
  const subTypes = {
    artisan: ['Forgeron', 'Potier', 'Tisserand', 'Bijoutier', 'Boulanger', 'Tanneur', 'Sculpteur', 'Charpentier'],
    politicien: ['Sénateur', 'Tribun', 'Édile', 'Questeur', 'Censeur', 'Préteur', 'Magistrat'],
    religieux: ['Pontife', 'Augure', 'Flamine', 'Haruspice', 'Prêtre de Jupiter', 'Prêtre de Mars'],
    proprietaire: ['Propriétaire Terrien', 'Viticulteur', 'Oliviculteur', 'Éleveur', 'Armateur'],
    pegre: ['Usurier', 'Contrebandier', 'Gladiateur', 'Mercenaire', 'Espion', 'Receleur']
  };
  
  // Générer entre 12 et 18 clients aléatoirement
  const numClients = 12 + Math.floor(Math.random() * 7);
  const generatedClients: Client[] = [];
  
  for (let i = 0; i < numClients; i++) {
    const clientType = clientTypes[Math.floor(Math.random() * clientTypes.length)];
    const clientSubTypes = subTypes[clientType];
    const subType = clientSubTypes[Math.floor(Math.random() * clientSubTypes.length)];
    
    // Générer des influences variables selon le type
    let politicalInfluence = 1 + Math.floor(Math.random() * 5); // Base entre 1-5
    let popularInfluence = 1 + Math.floor(Math.random() * 5);  // Base entre 1-5
    let religiousInfluence = 1 + Math.floor(Math.random() * 5); // Base entre 1-5
    
    // Ajuster les influences selon le type de client
    switch (clientType) {
      case 'politicien':
        politicalInfluence += 3 + Math.floor(Math.random() * 3); // +3-5 pour atteindre potentiellement 10
        break;
      case 'religieux':
        religiousInfluence += 3 + Math.floor(Math.random() * 3);
        break;
      case 'artisan':
      case 'pegre':
        popularInfluence += 3 + Math.floor(Math.random() * 3);
        break;
      case 'proprietaire':
        // Équilibré ou aléatoirement élevé dans une influence
        const randomBoost = Math.floor(Math.random() * 3);
        if (randomBoost === 0) politicalInfluence += 3;
        else if (randomBoost === 1) popularInfluence += 3;
        else religiousInfluence += 3;
        break;
    }
    
    // S'assurer que les valeurs ne dépassent pas 10
    politicalInfluence = Math.min(politicalInfluence, 10);
    popularInfluence = Math.min(popularInfluence, 10);
    religiousInfluence = Math.min(religiousInfluence, 10);
    
    generatedClients.push({
      id: i + 1,
      name: generateRomanName(),
      type: clientType,
      subType: subType,
      location: locations[Math.floor(Math.random() * locations.length)],
      loyalty: loyaltyLevels[Math.floor(Math.random() * loyaltyLevels.length)],
      influences: {
        political: politicalInfluence,
        popular: popularInfluence,
        religious: religiousInfluence
      }
    });
  }
  
  return generatedClients;
};

// Génération d'un nom romain masculin uniquement
const generateRomanName = () => {
  const praenomina = ['Marcus', 'Lucius', 'Gaius', 'Publius', 'Quintus', 'Titus', 'Servius', 'Gnaeus', 'Decimus', 'Aulus'];
  const nomina = ['Aurelius', 'Julius', 'Claudius', 'Flavius', 'Cornelius', 'Licinius', 'Valerius', 'Domitius', 'Aemilius', 'Pompeius'];
  const cognomina = ['Maximus', 'Felix', 'Severus', 'Rufus', 'Niger', 'Paulus', 'Crispus', 'Priscus', 'Cotta', 'Gallus'];
  
  const praenomen = praenomina[Math.floor(Math.random() * praenomina.length)];
  const nomen = nomina[Math.floor(Math.random() * nomina.length)];
  const cognomen = cognomina[Math.floor(Math.random() * cognomina.length)];
  
  return `${praenomen} ${nomen} ${cognomen}`;
};

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
  React.useEffect(() => {
    applyFilters();
  }, [searchTerm, filter]);
  
  // Fonction pour définir le filtre par type
  const handleTypeFilter = (type: string | null) => {
    setFilter(type === filter ? null : type as ClientType);
  };
  
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
        
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <Button 
            variant={filter === null ? "default" : "outline"} 
            size="sm"
            className="text-xs gap-1 roman-btn"
            onClick={() => handleTypeFilter(null)}
          >
            Tous
          </Button>
          <Button 
            variant={filter === "artisan" ? "default" : "outline"} 
            size="sm"
            className="text-xs gap-1 roman-btn-outline"
            onClick={() => handleTypeFilter("artisan")}
          >
            Artisans
          </Button>
          <Button 
            variant={filter === "politicien" ? "default" : "outline"} 
            size="sm"
            className="text-xs gap-1 roman-btn-outline"
            onClick={() => handleTypeFilter("politicien")}
          >
            Politiciens
          </Button>
          <Button 
            variant={filter === "religieux" ? "default" : "outline"} 
            size="sm"
            className="text-xs gap-1 roman-btn-outline"
            onClick={() => handleTypeFilter("religieux")}
          >
            Religieux
          </Button>
          <Button 
            variant={filter === "proprietaire" ? "default" : "outline"} 
            size="sm"
            className="text-xs gap-1 roman-btn-outline"
            onClick={() => handleTypeFilter("proprietaire")}
          >
            Propriétaires
          </Button>
          <Button 
            variant={filter === "pegre" ? "default" : "outline"} 
            size="sm"
            className="text-xs gap-1 roman-btn-outline"
            onClick={() => handleTypeFilter("pegre")}
          >
            Pègre
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

