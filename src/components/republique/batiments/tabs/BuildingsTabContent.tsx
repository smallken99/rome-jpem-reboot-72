
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PublicBuilding } from '../hooks/useBatimentsPublics';
import { Eye, Wrench, AlertTriangle, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BuildingsTabContentProps {
  buildings: PublicBuilding[];
  onViewDetails: (building: PublicBuilding) => void;
  onMaintain: (buildingId: string) => void;
}

export const BuildingsTabContent: React.FC<BuildingsTabContentProps> = ({
  buildings,
  onViewDetails,
  onMaintain
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredBuildings = buildings.filter(building => {
    const matchesSearch = building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          building.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || building.buildingTypeId.includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Rechercher un bâtiment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="administrative">Administratif</SelectItem>
              <SelectItem value="religious">Religieux</SelectItem>
              <SelectItem value="entertainment">Divertissement</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="military">Militaire</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBuildings.map(building => (
          <Card key={building.id} className="border-rome-gold/30 hover:border-rome-gold/60 transition-colors">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-cinzel font-semibold">{building.name}</h3>
                <span className="text-xs bg-rome-gold/10 px-2 py-1 rounded-full">
                  {building.location}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">État:</span>
                  <div className="flex items-center">
                    {building.condition < 30 ? (
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                    ) : building.condition < 70 ? (
                      <Wrench className="h-4 w-4 text-yellow-500 mr-1" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      building.condition < 30 ? "text-red-500" : 
                      building.condition < 70 ? "text-yellow-500" : 
                      "text-green-500"
                    }`}>
                      {building.condition}%
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      building.condition < 30 ? "bg-red-500" : 
                      building.condition < 70 ? "bg-yellow-500" : 
                      "bg-green-500"
                    }`}
                    style={{ width: `${building.condition}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm mb-4">
                <span>Maintenance:</span>
                <span className="font-medium">{building.maintenanceCost.toLocaleString()} As/an</span>
              </div>
              
              <div className="flex justify-between space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 gap-1"
                  onClick={() => onViewDetails(building)}
                >
                  <Eye className="h-4 w-4" />
                  <span>Détails</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 gap-1"
                  onClick={() => onMaintain(building.id)}
                >
                  <Wrench className="h-4 w-4" />
                  <span>Maintenance</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredBuildings.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 text-center p-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">Aucun bâtiment ne correspond à ces critères.</p>
          </div>
        )}
      </div>
    </div>
  );
};
