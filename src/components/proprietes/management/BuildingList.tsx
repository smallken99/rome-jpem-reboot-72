
import React, { useState } from 'react';
import { OwnedBuilding } from '../types/buildingTypes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  Home, 
  Church, 
  Store, 
  Factory, 
  Warehouse, 
  Building, 
  Search, 
  MapPin,
  Coins,
  Users,
  CircleDollarSign,
  Filter,
  SlidersHorizontal
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

// Mapper pour les icônes selon le type de bâtiment
const buildingIcons: Record<string, React.ReactNode> = {
  urban: <Building2 className="h-5 w-5" />,
  rural: <Home className="h-5 w-5" />,
  religious: <Church className="h-5 w-5" />,
  commercial: <Store className="h-5 w-5" />,
  industrial: <Factory className="h-5 w-5" />,
  warehouse: <Warehouse className="h-5 w-5" />,
  other: <Building className="h-5 w-5" />
};

const getConditionColor = (condition: number) => {
  if (condition >= 80) return "bg-green-500";
  if (condition >= 60) return "bg-green-400";
  if (condition >= 40) return "bg-yellow-400";
  if (condition >= 20) return "bg-orange-400";
  return "bg-red-500";
};

interface BuildingListProps {
  buildings: OwnedBuilding[];
  onSelectBuilding: (buildingId: string) => void;
  onCollectIncome?: (buildingId: string) => void;
  onMaintenanceToggle?: (buildingId: string, enabled: boolean) => void;
  calculateMonthlyIncome?: (building: OwnedBuilding) => number;
  calculateMonthlyExpenses?: (building: OwnedBuilding) => number;
}

export const BuildingList: React.FC<BuildingListProps> = ({
  buildings,
  onSelectBuilding,
  onCollectIncome,
  onMaintenanceToggle,
  calculateMonthlyIncome = () => 0,
  calculateMonthlyExpenses = () => 0
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('name');
  const [showFilters, setShowFilters] = useState(false);
  
  // Extraire les types et localisations uniques
  const buildingTypes = ['all', ...new Set(buildings.map(b => b.buildingType))];
  const locations = ['all', ...new Set(buildings.map(b => b.location))];
  
  // Filtrer les bâtiments
  const filteredBuildings = buildings.filter(building => {
    // Filtre texte
    if (searchTerm && !building.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filtre type
    if (typeFilter !== 'all' && building.buildingType !== typeFilter) {
      return false;
    }
    
    // Filtre localisation
    if (locationFilter !== 'all' && building.location !== locationFilter) {
      return false;
    }
    
    return true;
  });
  
  // Trier les bâtiments
  const sortedBuildings = [...filteredBuildings].sort((a, b) => {
    switch (sortOrder) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'income':
        return calculateMonthlyIncome(b) - calculateMonthlyIncome(a);
      case 'profit':
        return (calculateMonthlyIncome(b) - calculateMonthlyExpenses(b)) -
               (calculateMonthlyIncome(a) - calculateMonthlyExpenses(a));
      case 'condition':
        return b.condition - a.condition;
      default:
        return 0;
    }
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Mes Propriétés</h2>
          <Badge className="ml-2">{buildings.length}</Badge>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div className="flex flex-col md:flex-row gap-4 bg-muted/30 p-4 rounded-md">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Type de bâtiment</label>
            <Select 
              value={typeFilter} 
              onValueChange={setTypeFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                {buildingTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type === 'all' ? 'Tous les types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Localisation</label>
            <Select 
              value={locationFilter} 
              onValueChange={setLocationFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Toutes les localisations" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location === 'all' ? 'Toutes les localisations' : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Tri</label>
            <Select 
              value={sortOrder} 
              onValueChange={setSortOrder}
            >
              <SelectTrigger>
                <SelectValue placeholder="Trier par..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="income">Revenu</SelectItem>
                <SelectItem value="profit">Profit</SelectItem>
                <SelectItem value="condition">État</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      {sortedBuildings.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <div className="text-muted-foreground mb-2">Aucune propriété trouvée</div>
            {searchTerm || typeFilter !== 'all' || locationFilter !== 'all' ? (
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                  setLocationFilter('all');
                }}
              >
                Effacer les filtres
              </Button>
            ) : null}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedBuildings.map(building => {
            const monthlyIncome = calculateMonthlyIncome(building);
            const monthlyExpenses = calculateMonthlyExpenses(building);
            const netProfit = monthlyIncome - monthlyExpenses;
            
            return (
              <Card key={building.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <div className="mt-1 text-muted-foreground">
                        {buildingIcons[building.buildingType] || <Building className="h-5 w-5" />}
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">{building.name}</CardTitle>
                        <CardDescription className="flex items-center text-xs mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {building.location}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="capitalize text-xs"
                    >
                      {building.buildingType}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-3 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">État</span>
                      <span>{building.condition}%</span>
                    </div>
                    <Progress 
                      value={building.condition} 
                      className={`h-1.5 ${getConditionColor(building.condition)}`} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex flex-col items-center justify-center p-1 bg-muted rounded">
                      <Coins className="h-3 w-3 mb-1 text-muted-foreground" />
                      <span className="font-medium">{formatCurrency(monthlyIncome)}</span>
                      <span className="text-muted-foreground text-[10px]">Revenu</span>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center p-1 bg-muted rounded">
                      <Users className="h-3 w-3 mb-1 text-muted-foreground" />
                      <span className="font-medium">{building.workers}/{building.maxWorkers}</span>
                      <span className="text-muted-foreground text-[10px]">Personnel</span>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center p-1 bg-muted rounded">
                      <CircleDollarSign className="h-3 w-3 mb-1 text-muted-foreground" />
                      <span className={`font-medium ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {netProfit >= 0 ? '+' : ''}{formatCurrency(netProfit)}
                      </span>
                      <span className="text-muted-foreground text-[10px]">Profit</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between pt-0 pb-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onSelectBuilding(building.id)}
                  >
                    Détails
                  </Button>
                  
                  <div className="flex gap-2">
                    {onMaintenanceToggle && (
                      <Button
                        size="sm"
                        variant={building.maintenanceEnabled ? "default" : "outline"}
                        className="h-8 px-2"
                        onClick={() => onMaintenanceToggle(building.id, !building.maintenanceEnabled)}
                      >
                        {building.maintenanceEnabled ? "Auto" : "Manuel"}
                      </Button>
                    )}
                    
                    {onCollectIncome && building.income > 0 && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8"
                        onClick={() => onCollectIncome(building.id)}
                      >
                        Collecter
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
