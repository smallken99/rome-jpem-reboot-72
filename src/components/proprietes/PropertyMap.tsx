import React, { useState } from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { useBuildingInventory } from './hooks/building/useBuildingInventory';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Map, Search, Building, Navigation, Home, Wheat } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const PropertyMap: React.FC = () => {
  const { ownedBuildings } = useBuildingInventory();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  const regions = [...new Set(ownedBuildings.map(b => {
    const regionPart = b.location.split(' - ')[0];
    return regionPart;
  }))];
  
  const filteredBuildings = ownedBuildings.filter(building => {
    const matchesSearch = searchTerm === '' || 
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === null || 
      building.location.startsWith(selectedRegion);
    
    return matchesSearch && matchesRegion;
  });
  
  const getBuildingIcon = (buildingType: string) => {
    switch (buildingType) {
      case 'urban':
        return <Home className="h-5 w-5 text-blue-600" />;
      case 'rural':
        return <Wheat className="h-5 w-5 text-green-600" />;
      case 'religious':
        return <Building className="h-5 w-5 text-purple-600" />;
      default:
        return <Building className="h-5 w-5 text-gray-600" />;
    }
  };
  
  const handleViewDetails = (propertyId: number | string) => {
    navigate(`/patrimoine/proprietes/${propertyId}`);
  };
  
  return (
    <div className="space-y-6">
      <RomanCard>
        <RomanCard.Header>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
            <h2 className="font-cinzel text-lg">Carte des propriétés</h2>
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une propriété..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <h3 className="font-medium mb-3">Régions</h3>
              <div className="space-y-2">
                <Button
                  variant={selectedRegion === null ? "default" : "outline"}
                  className={selectedRegion === null ? "roman-btn w-full justify-start" : "w-full justify-start"}
                  onClick={() => setSelectedRegion(null)}
                >
                  <Map className="mr-2 h-4 w-4" />
                  Toutes les régions
                </Button>
                
                {regions.map(region => (
                  <Button
                    key={region}
                    variant={selectedRegion === region ? "default" : "outline"}
                    className={selectedRegion === region ? "roman-btn w-full justify-start" : "w-full justify-start"}
                    onClick={() => setSelectedRegion(region)}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    {region}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="md:w-3/4">
              <div className="border border-rome-gold/20 rounded-md h-[400px] bg-[#e8e0d0] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Map className="h-16 w-16 mx-auto text-rome-gold/40" />
                  <p className="mt-4">Carte interactive en cours de développement</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Propriétés ({filteredBuildings.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBuildings.map(building => (
                    <div 
                      key={building.id}
                      className="border border-rome-gold/30 rounded-md p-4 hover:bg-rome-gold/5 transition-colors"
                      onClick={() => handleViewDetails(building.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getBuildingIcon(building.buildingType)}
                        <div className="flex-1">
                          <h4 className="font-medium">{building.name}</h4>
                          <p className="text-sm text-muted-foreground">{building.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
