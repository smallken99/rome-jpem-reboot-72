
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronsUpDown, FileSearch, Globe, MapPin, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { ProvincesMap } from './components/ProvincesMap';
import { ProvincesData } from './components/ProvincesData';
import { ProvinceCard } from './components/ProvinceCard';
import { ProvinceModal } from './components/ProvinceModal';
import { Province } from './types/maitreJeuTypes';

export const GestionProvinces: React.FC = () => {
  const { provinces, addProvince, updateProvince, deleteProvince } = useMaitreJeu();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('map');
  const [isSortedByRevenue, setIsSortedByRevenue] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [isAddingProvince, setIsAddingProvince] = useState(false);
  const [isEditingProvince, setIsEditingProvince] = useState(false);
  
  // Filter and sort provinces
  const filteredProvinces = provinces.filter(province => 
    province.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    province.gouverneur?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    province.région.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedProvinces = [...filteredProvinces].sort((a, b) => {
    if (isSortedByRevenue) {
      return (b.revenu || 0) - (a.revenu || 0);
    }
    return a.nom.localeCompare(b.nom);
  });
  
  // Get the selected province
  const selectedProvince = selectedProvinceId 
    ? provinces.find(p => p.id === selectedProvinceId) || null
    : null;
  
  // Handlers
  const handleAddProvince = () => {
    setSelectedProvinceId(null);
    setIsAddingProvince(true);
    setIsEditingProvince(false);
  };
  
  const handleEditProvince = (provinceId: string) => {
    setSelectedProvinceId(provinceId);
    setIsEditingProvince(true);
    setIsAddingProvince(false);
  };
  
  const handleSaveProvince = (province: Province) => {
    if (isAddingProvince) {
      // @ts-ignore - We're passing a province with an id but the type expects it without
      addProvince(province);
    } else if (isEditingProvince && selectedProvinceId) {
      updateProvince(selectedProvinceId, province);
    }
    
    setIsAddingProvince(false);
    setIsEditingProvince(false);
  };
  
  // Calculate key stats
  const totalProvinces = provinces.length;
  const totalRevenue = provinces.reduce((sum, province) => sum + (province.revenu || 0), 0);
  const totalExpenses = provinces.reduce((sum, province) => sum + (province.dépense || 0), 0);
  const romanProvinces = provinces.filter(province => province.status === 'province').length;
  const clientKingdoms = provinces.filter(province => province.status === 'client').length;
  const unconquered = provinces.filter(province => province.status === 'unconquered').length;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestion des Provinces</h2>
          <p className="text-muted-foreground">
            Gérez les territoires de la République
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleAddProvince}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle province
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Statistiques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total provinces:</span>
              <span className="font-medium">{totalProvinces}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenus annuels:</span>
              <span className="font-medium">{totalRevenue} denarii</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dépenses annuelles:</span>
              <span className="font-medium">{totalExpenses} denarii</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Provinces romaines:</span>
              <span className="font-medium">{romanProvinces}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Royaumes clients:</span>
              <span className="font-medium">{clientKingdoms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Non conquis:</span>
              <span className="font-medium">{unconquered}</span>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="map">
                <Globe className="h-4 w-4 mr-2" />
                Carte
              </TabsTrigger>
              <TabsTrigger value="list">
                <FileSearch className="h-4 w-4 mr-2" />
                Liste
              </TabsTrigger>
              <TabsTrigger value="details">
                <MapPin className="h-4 w-4 mr-2" />
                Détails
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="pt-4">
              <ProvincesMap 
                provinces={provinces} 
                onProvinceSelect={setSelectedProvinceId} 
              />
            </TabsContent>
            
            <TabsContent value="list" className="pt-4">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-medium">Liste des Provinces</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsSortedByRevenue(!isSortedByRevenue)}
                >
                  <ChevronsUpDown className="h-4 w-4 mr-2" />
                  {isSortedByRevenue ? 'Tri par revenu' : 'Tri par nom'}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedProvinces.map(province => (
                  <ProvinceCard 
                    key={province.id} 
                    province={province} 
                    onViewProvince={() => handleEditProvince(province.id)} 
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="pt-4">
              <ProvincesData 
                provinces={provinces} 
                onViewProvince={(province) => handleEditProvince(province.id)} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Modal for adding or editing a province */}
      {(isAddingProvince || (isEditingProvince && selectedProvince)) && (
        <ProvinceModal
          province={isAddingProvince ? {
            id: '',
            nom: '',
            région: '',
            status: 'unconquered',
            gouverneur: null,
            description: '',
            population: 0,
            revenu: 0,
            dépense: 0
          } : selectedProvince!}
          onClose={() => {
            setIsAddingProvince(false);
            setIsEditingProvince(false);
          }}
          onSave={handleSaveProvince}
        />
      )}
    </div>
  );
};
