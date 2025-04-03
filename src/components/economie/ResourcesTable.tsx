
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Filter,
  SlidersHorizontal
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export interface Resource {
  id: string;
  name: string;
  quantity: string;
  value: string;
  numericValue: number;
  location: string;
  trend: 'up' | 'down' | 'neutral';
  category: 'precious' | 'food' | 'material' | 'luxury';
}

export const ResourcesTable: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'value' | 'trend'>('value');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();
  
  const resources: Resource[] = [
    { 
      id: '1',
      name: 'Or', 
      quantity: '12 livres', 
      value: '30,000 As',
      numericValue: 30000,
      location: 'Coffre personnel',
      trend: 'up',
      category: 'precious'
    },
    { 
      id: '2',
      name: 'Argent', 
      quantity: '45 livres', 
      value: '22,500 As',
      numericValue: 22500,
      location: 'Coffre personnel',
      trend: 'up',
      category: 'precious'
    },
    { 
      id: '3',
      name: 'Blé', 
      quantity: '1,200 modii', 
      value: '24,000 As',
      numericValue: 24000,
      location: 'Greniers de Campanie',
      trend: 'up',
      category: 'food'
    },
    { 
      id: '4',
      name: 'Vin', 
      quantity: '80 amphores', 
      value: '16,000 As',
      numericValue: 16000,
      location: 'Cave de la Villa Aurelia',
      trend: 'neutral',
      category: 'food'
    },
    { 
      id: '5',
      name: 'Huile d\'olive', 
      quantity: '50 amphores', 
      value: '12,500 As',
      numericValue: 12500,
      location: 'Entrepôt d\'Ostie',
      trend: 'up',
      category: 'food'
    },
    { 
      id: '6',
      name: 'Tissu de luxe', 
      quantity: '20 rouleaux', 
      value: '10,000 As',
      numericValue: 10000,
      location: 'Villa Aurelia',
      trend: 'down',
      category: 'luxury'
    },
    { 
      id: '7',
      name: 'Marbre', 
      quantity: '15 blocs', 
      value: '30,000 As',
      numericValue: 30000,
      location: 'Carrière de Carrare',
      trend: 'neutral',
      category: 'material'
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-600" />;
    }
  };
  
  const handleSell = (resource: Resource) => {
    toast({
      title: "Transaction initiée",
      description: `Vente de ${resource.name} en cours de préparation.`,
    });
  };
  
  const handleExchange = (resource: Resource) => {
    toast({
      title: "Échange proposé",
      description: `Proposition d'échange pour ${resource.name} envoyée.`,
    });
  };
  
  const getUniqueLocations = () => {
    const locations = new Set<string>();
    resources.forEach(resource => locations.add(resource.location));
    return Array.from(locations);
  };
  
  // Filtrer les ressources
  const filteredResources = resources.filter(resource => {
    // Filtre texte
    if (filter && !resource.name.toLowerCase().includes(filter.toLowerCase())) {
      return false;
    }
    
    // Filtre catégorie
    if (categoryFilter !== 'all' && resource.category !== categoryFilter) {
      return false;
    }
    
    // Filtre emplacement
    if (locationFilter !== 'all' && resource.location !== locationFilter) {
      return false;
    }
    
    return true;
  });
  
  // Trier les ressources
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'value') {
      return sortDirection === 'asc' 
        ? a.numericValue - b.numericValue 
        : b.numericValue - a.numericValue;
    } else if (sortBy === 'trend') {
      const trendOrder = { up: 2, neutral: 1, down: 0 };
      const aValue = trendOrder[a.trend];
      const bValue = trendOrder[b.trend];
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });
  
  // Calculer le total
  const totalValue = sortedResources.reduce((sum, resource) => sum + resource.numericValue, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-cinzel">Inventaire des Ressources</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex-1 flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une ressource..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
              <SelectTrigger className="w-[130px]">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <span>Trier par</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="value">Valeur</SelectItem>
                <SelectItem value="trend">Tendance</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline" 
              size="icon"
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="flex-shrink-0"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="h-4 w-4 mr-2" />
                <span>Catégorie</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="precious">Métaux précieux</SelectItem>
                <SelectItem value="food">Nourriture</SelectItem>
                <SelectItem value="material">Matériaux</SelectItem>
                <SelectItem value="luxury">Luxe</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <span>Emplacement</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                {getUniqueLocations().map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-rome-gold/10 text-left">
                <th className="p-4 font-cinzel font-semibold">Ressource</th>
                <th className="p-4 font-cinzel font-semibold">Quantité</th>
                <th className="p-4 font-cinzel font-semibold">Valeur</th>
                <th className="p-4 font-cinzel font-semibold">Emplacement</th>
                <th className="p-4 font-cinzel font-semibold">Tendance</th>
                <th className="p-4 font-cinzel font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedResources.map((resource, index) => (
                <tr 
                  key={index} 
                  className={index % 2 === 0 ? 'bg-white' : 'bg-rome-marble/30'}
                >
                  <td className="p-4 font-cinzel">{resource.name}</td>
                  <td className="p-4">{resource.quantity}</td>
                  <td className="p-4 font-semibold">{resource.value}</td>
                  <td className="p-4 text-sm text-muted-foreground">{resource.location}</td>
                  <td className="p-4">
                    {getTrendIcon(resource.trend)}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs font-medium flex items-center gap-1 h-8 px-2 roman-btn-outline"
                        onClick={() => handleSell(resource)}
                      >
                        <ShoppingCart className="h-3 w-3" />
                        Vendre
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs font-medium flex items-center gap-1 h-8 px-2 roman-btn-outline"
                        onClick={() => handleExchange(resource)}
                      >
                        <ArrowUpDown className="h-3 w-3" />
                        Échanger
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-rome-gold/20 font-semibold">
                <td colSpan={2} className="p-4 text-right font-cinzel">Valeur totale:</td>
                <td className="p-4 font-bold">{totalValue.toLocaleString()} As</td>
                <td colSpan={3}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
