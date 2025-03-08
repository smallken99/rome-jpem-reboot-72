
import React, { useState } from 'react';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Globe, Map, List, Plus, Search, CircleDollarSign, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Province } from './types/maitreJeuTypes';

// Importer les composants pour les provinces
import { ProvinceCard } from './components/ProvinceCard';
import { ProvincesMap } from './components/ProvincesMap';
import { ProvinceModal } from './components/ProvinceModal';
import { ProvincesData } from './components/ProvincesData';

export const GestionProvinces: React.FC = () => {
  const { provinces, addProvince, updateProvince } = useMaitreJeu();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  
  const handleCreateProvince = () => {
    setSelectedProvince(null);
    setModalMode('add');
    setIsModalOpen(true);
  };
  
  const handleEditProvince = (province: Province) => {
    setSelectedProvince(province);
    setModalMode('edit');
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const filteredProvinces = searchTerm
    ? provinces.filter(province => 
        province.nom.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : provinces;
  
  // Statistiques des provinces
  const totalProvinces = provinces.length;
  const totalPopulation = provinces.reduce((sum, province) => sum + province.population, 0);
  const totalRevenu = provinces.reduce((sum, province) => sum + province.revenus, 0);
  const totalDépenses = provinces.reduce((sum, province) => sum + province.dépenses, 0);
  const provincesInstables = provinces.filter(p => p.statut === 'INSTABLE' || p.statut === 'REBELLE' || p.statut === 'EN_GUERRE').length;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center">
            <Globe className="h-5 w-5 mr-3 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Total des provinces</p>
              <p className="text-2xl font-bold">{totalProvinces}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <CircleDollarSign className="h-5 w-5 mr-3 text-green-500" />
            <div>
              <p className="text-sm font-medium">Revenu net</p>
              <p className="text-2xl font-bold">{totalRevenu - totalDépenses} <span className="text-sm">as</span></p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <Shield className="h-5 w-5 mr-3 text-red-500" />
            <div>
              <p className="text-sm font-medium">Provinces instables</p>
              <p className="text-2xl font-bold">{provincesInstables}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center">
            <List className="h-5 w-5 mr-3 text-purple-500" />
            <div>
              <p className="text-sm font-medium">Population totale</p>
              <p className="text-2xl font-bold">{totalPopulation}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="carte" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="carte" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              Carte
            </TabsTrigger>
            <TabsTrigger value="liste" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Liste
            </TabsTrigger>
            <TabsTrigger value="données" className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4" />
              Données
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
            <button
              className="flex items-center bg-rome-gold text-white px-3 py-2 rounded-md text-sm"
              onClick={handleCreateProvince}
            >
              <Plus className="h-4 w-4 mr-1" />
              Nouvelle Province
            </button>
          </div>
        </div>
        
        <TabsContent value="carte">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="bg-gray-100 rounded-md h-[600px] relative">
                <ProvincesMap 
                  provinces={filteredProvinces} 
                  onSelectProvince={handleEditProvince} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="liste">
          {filteredProvinces.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Aucune province trouvée.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProvinces.map(province => (
                <ProvinceCard 
                  key={province.id} 
                  province={province} 
                  onClick={() => handleEditProvince(province)} 
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="données">
          <ProvincesData provinces={filteredProvinces} />
        </TabsContent>
      </Tabs>
      
      {isModalOpen && (
        <ProvinceModal 
          province={selectedProvince} 
          mode={modalMode} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};
