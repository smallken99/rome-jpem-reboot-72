
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { ProvinceCard } from './components/ProvinceCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  MapPin, 
  Map as MapIcon, 
  BarChart 
} from 'lucide-react';
import { ProvincesMap } from './components/ProvincesMap';
import { ProvinceModal } from './components/ProvinceModal';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { ProvincesData } from './components/ProvincesData';

export const GestionProvinces: React.FC = () => {
  const { provinces } = useMaitreJeu();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  
  // Filtrer les provinces
  const filteredProvinces = provinces.filter(province => 
    province.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    province.statut.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleOpenModal = (provinceId?: string) => {
    setSelectedProvince(provinceId || null);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProvince(null);
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="carte" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="carte" className="flex items-center gap-2">
              <MapIcon className="h-4 w-4" />
              <span>Carte</span>
            </TabsTrigger>
            <TabsTrigger value="liste" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Liste</span>
            </TabsTrigger>
            <TabsTrigger value="donnees" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Données</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Rechercher une province..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[200px]" 
              />
            </div>
            <Button 
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter une province</span>
            </Button>
          </div>
        </div>
        
        <TabsContent value="carte">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Carte des provinces romaines</CardTitle>
            </CardHeader>
            <CardContent>
              <ProvincesMap 
                provinces={filteredProvinces} 
                onProvinceSelect={handleOpenModal}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="liste">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProvinces.length > 0 ? (
              filteredProvinces.map(province => (
                <ProvinceCard 
                  key={province.id} 
                  province={province} 
                  onEdit={() => handleOpenModal(province.id)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground italic">
                {searchTerm ? 'Aucune province trouvée pour cette recherche' : 'Aucune province dans la base de données'}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="donnees">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Données des provinces</CardTitle>
            </CardHeader>
            <CardContent>
              <ProvincesData provinces={filteredProvinces} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <ProvinceModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        provinceId={selectedProvince}
      />
    </div>
  );
};
