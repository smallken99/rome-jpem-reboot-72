
import React, { useState } from 'react';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { usePatrimoineManager } from '@/hooks/usePatrimoineManager';
import { useBuildingManagement } from '@/hooks/useBuildingManagement';
import { formatCurrency } from '@/utils/currencyUtils';
import { ArrowLeft, Search, Building, Home, MapPin, ArrowUpRight, Landmark } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BuildingPurchaseDialog } from '../property-management/modals/BuildingPurchaseDialog';
import { availableBuildings } from '../data/availableBuildings';
import { BuildingDescription } from '../data/types/buildingTypes';
import { useNavigate } from 'react-router-dom';
import { RomanCard } from '@/components/ui-custom/RomanCard';

export const PropertyMarket: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('price');
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingDescription | null>(null);
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  
  const { balance } = usePatrimoineManager();
  const { handleAddProperty } = useBuildingManagement();
  
  const handlePurchaseBuilding = async (options: any) => {
    const success = handleAddProperty(
      options.buildingId,
      options.type,
      options.location,
      options.name
    );
    
    return success;
  };
  
  // Filtrer les bâtiments disponibles
  const filteredBuildings = availableBuildings.filter(building => {
    const matchesSearch = building.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || building.type === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  // Trier les bâtiments
  const sortedBuildings = [...filteredBuildings].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.initialCost - b.initialCost;
      case 'priceDesc':
        return b.initialCost - a.initialCost;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'maintenance':
        return a.maintenanceCost - b.maintenanceCost;
      default:
        return 0;
    }
  });
  
  const getBuildingTypeIcon = (type: string) => {
    switch (type) {
      case 'urban': return <Home className="h-5 w-5" />;
      case 'rural': return <MapPin className="h-5 w-5" />;
      case 'religious': return <Landmark className="h-5 w-5" />;
      default: return <Building className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/patrimoine/proprietes')}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold font-cinzel">Marché Immobilier Romain</h1>
      </div>

      <RomanCard>
        <RomanCard.Header>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Votre trésorerie</h2>
            </div>
            <span className="text-lg font-bold">{formatCurrency(balance)}</span>
          </div>
        </RomanCard.Header>
        <RomanCard.Content className="text-sm text-muted-foreground">
          <p>Investissez judicieusement dans des propriétés pour augmenter votre prestige et vos revenus.</p>
        </RomanCard.Content>
      </RomanCard>
      
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une propriété..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Prix (croissant)</SelectItem>
              <SelectItem value="priceDesc">Prix (décroissant)</SelectItem>
              <SelectItem value="name">Nom</SelectItem>
              <SelectItem value="maintenance">Entretien</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => navigate('/patrimoine/proprietes/construction')}>
            Construire
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="urban">Urbain</TabsTrigger>
          <TabsTrigger value="rural">Rural</TabsTrigger>
          <TabsTrigger value="religious">Religieux</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedBuildings.map(building => (
              <BuildingCard 
                key={building.id} 
                building={building} 
                onSelect={() => {
                  setSelectedBuilding(building);
                  setIsPurchaseDialogOpen(true);
                }}
                canAfford={balance >= building.initialCost}
              />
            ))}
          </div>
        </TabsContent>
        
        {['urban', 'rural', 'religious'].map(tab => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedBuildings.map(building => (
                <BuildingCard 
                  key={building.id} 
                  building={building} 
                  onSelect={() => {
                    setSelectedBuilding(building);
                    setIsPurchaseDialogOpen(true);
                  }}
                  canAfford={balance >= building.initialCost}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {selectedBuilding && (
        <BuildingPurchaseDialog
          building={selectedBuilding}
          isOpen={isPurchaseDialogOpen}
          onClose={() => setIsPurchaseDialogOpen(false)}
          onPurchase={handlePurchaseBuilding}
          balance={balance}
          isLoading={false}
        />
      )}
    </div>
  );
};

interface BuildingCardProps {
  building: BuildingDescription;
  onSelect: () => void;
  canAfford: boolean;
}

const BuildingCard: React.FC<BuildingCardProps> = ({ building, onSelect, canAfford }) => {
  const getBuildingTypeIcon = (type: string) => {
    switch (type) {
      case 'urban': return <Home className="h-5 w-5" />;
      case 'rural': return <MapPin className="h-5 w-5" />;
      case 'religious': return <Landmark className="h-5 w-5" />;
      default: return <Building className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getBuildingTypeIcon(building.type)}
            <CardTitle>{building.name}</CardTitle>
          </div>
          <Badge variant="outline" className="ml-2">
            {building.type === 'urban' ? 'Urbain' : 
             building.type === 'rural' ? 'Rural' : 
             building.type === 'religious' ? 'Religieux' : 'Autre'}
          </Badge>
        </div>
        <CardDescription>{building.description.substring(0, 80)}...</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
          <div>
            <p className="text-muted-foreground">Prix d'achat</p>
            <p className={`font-medium ${!canAfford ? 'text-red-600' : ''}`}>
              {formatCurrency(building.initialCost)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Entretien</p>
            <p className="font-medium">{formatCurrency(building.maintenanceCost)}/an</p>
          </div>
        </div>
        
        {building.prestige > 0 && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
            <Landmark className="h-4 w-4" />
            <span>+{building.prestige} prestige</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full justify-center"
          variant={canAfford ? "default" : "outline"}
          onClick={onSelect}
          disabled={!canAfford}
        >
          {canAfford ? 'Acquérir' : 'Fonds insuffisants'}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Composant pour le bouton des crédits
const Coins: React.FC<{ className?: string }> = ({ className }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="8" r="6"></circle><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" /></svg>;
};
