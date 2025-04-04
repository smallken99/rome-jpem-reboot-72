
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Search, Plus, Building2, MapPin, Landmark } from 'lucide-react';
import { OwnedBuilding } from '@/components/proprietes/types/property';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface PropertyListProps {
  buildings: OwnedBuilding[];
  onManageBuilding: (id: string) => void;
  onAddProperty?: () => void;
}

export const PropertyList: React.FC<PropertyListProps> = ({ 
  buildings, 
  onManageBuilding,
  onAddProperty 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();
  
  // Filter buildings based on search and tab
  const filteredBuildings = buildings.filter(building => {
    const matchesSearch = building.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         building.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'urban' && building.buildingType === 'urban') ||
                      (activeTab === 'rural' && building.buildingType === 'rural') ||
                      (activeTab === 'religious' && building.buildingType === 'religious') ||
                      (activeTab === 'public' && building.buildingType === 'public');
                      
    return matchesSearch && matchesTab;
  });
  
  // Sort buildings based on selected criterion
  const sortedBuildings = [...filteredBuildings].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'value':
        return (b.value || 0) - (a.value || 0);
      case 'income':
        return (b.income || 0) - (a.income || 0);
      case 'condition':
        return b.condition - a.condition;
      default:
        return 0;
    }
  });
  
  const getBuildingTypeIcon = (type?: string) => {
    switch (type) {
      case 'urban': return <Building2 className="h-5 w-5" />;
      case 'rural': return <MapPin className="h-5 w-5" />;
      case 'religious': return <Landmark className="h-5 w-5" />;
      default: return <Building className="h-5 w-5" />;
    }
  };
  
  const getConditionColor = (condition: number) => {
    if (condition >= 80) return 'bg-green-500';
    if (condition >= 50) return 'bg-yellow-500';
    if (condition >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="space-y-5">
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
              <SelectItem value="name">Nom</SelectItem>
              <SelectItem value="value">Valeur</SelectItem>
              <SelectItem value="income">Revenus</SelectItem>
              <SelectItem value="condition">État</SelectItem>
            </SelectContent>
          </Select>
          
          {onAddProperty && (
            <Button onClick={onAddProperty} className="whitespace-nowrap">
              <Plus className="mr-1 h-4 w-4" /> Acquérir
            </Button>
          )}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="urban">Urbain</TabsTrigger>
          <TabsTrigger value="rural">Rural</TabsTrigger>
          <TabsTrigger value="religious">Religieux</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {sortedBuildings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderBuildingCards(sortedBuildings, onManageBuilding)}
            </div>
          ) : (
            <EmptyState searchTerm={searchTerm} onAddProperty={onAddProperty} />
          )}
        </TabsContent>
        
        {['urban', 'rural', 'religious', 'public'].map(tab => (
          <TabsContent key={tab} value={tab} className="mt-4">
            {sortedBuildings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renderBuildingCards(sortedBuildings, onManageBuilding)}
              </div>
            ) : (
              <EmptyState searchTerm={searchTerm} type={tab} onAddProperty={onAddProperty} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
  
  function renderBuildingCards(buildings: OwnedBuilding[], onManage: (id: string) => void) {
    return buildings.map(building => (
      <Card key={building.id} className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {getBuildingTypeIcon(building.buildingType)}
              <CardTitle>{building.name}</CardTitle>
            </div>
            <Badge variant={building.maintenanceEnabled ? "outline" : "destructive"} className="ml-2">
              {building.maintenanceEnabled ? "Entretenu" : "Négligé"}
            </Badge>
          </div>
          <CardDescription className="flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-1 opacity-70" />
            {building.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
            <div>
              <p className="text-muted-foreground">Valeur</p>
              <p className="font-medium">{(building.value || 0).toLocaleString()} As</p>
            </div>
            <div>
              <p className="text-muted-foreground">Revenus</p>
              <p className="font-medium">{(building.income || 0).toLocaleString()} As/an</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">État</span>
              <span>{building.condition}%</span>
            </div>
            <Progress 
              value={building.condition} 
              className={`h-1.5 ${getConditionColor(building.condition)}`} 
            />
          </div>
        </CardContent>
        <CardFooter>
          <ActionButton 
            label="Gérer"
            icon={<Building className="h-4 w-4" />}
            variant="outline" 
            onClick={() => onManage(building.id.toString())}
            className="w-full justify-center"
          />
        </CardFooter>
      </Card>
    ));
  }
};

const EmptyState = ({ searchTerm, type, onAddProperty }: { searchTerm: string, type?: string, onAddProperty?: () => void }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6 flex flex-col items-center text-center p-6">
        <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
        
        {searchTerm ? (
          <>
            <h3 className="text-lg font-medium">Aucun résultat trouvé</h3>
            <p className="text-muted-foreground mt-2 mb-4">
              Aucune propriété ne correspond à votre recherche "{searchTerm}"
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-medium">
              {type 
                ? `Vous ne possédez pas de propriété ${type === 'urban' ? 'urbaine' : type === 'rural' ? 'rurale' : type === 'religious' ? 'religieuse' : 'publique'}`
                : "Vous ne possédez aucune propriété"}
            </h3>
            <p className="text-muted-foreground mt-2 mb-4">
              Acquérez des propriétés pour développer votre patrimoine et augmenter votre influence
            </p>
          </>
        )}
        
        {onAddProperty ? (
          <Button onClick={onAddProperty}>
            <Plus className="mr-1 h-4 w-4" /> Acquérir une propriété
          </Button>
        ) : (
          <Button onClick={() => navigate('/patrimoine/marche')}>
            <Plus className="mr-1 h-4 w-4" /> Consulter le marché
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
