
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Plus, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ProvincesMap } from './components/ProvincesMap';
import { ProvinceCard } from './components/ProvinceCard';
import { ProvinceModal } from './components/ProvinceModal';
import { useMaitreJeu } from './context';
import { Province } from './types/provinces';

export const GestionProvinces = () => {
  const { provinces, updateProvince } = useMaitreJeu();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('liste');
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleProvinceSelect = (provinceId: string) => {
    const province = provinces.find(p => p.id === provinceId);
    if (province) {
      setSelectedProvince(province);
      setIsModalOpen(true);
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProvince(null);
  };
  
  const handleSaveProvince = (updatedProvince: Province) => {
    updateProvince(updatedProvince.id, updatedProvince);
    handleCloseModal();
  };
  
  // Filter provinces based on search
  const filteredProvinces = provinces.filter(province => 
    province.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    province.région.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Provinces</CardTitle>
          <CardDescription>
            Gérez les provinces de la République et leurs ressources
          </CardDescription>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="liste">Liste des Provinces</TabsTrigger>
              <TabsTrigger value="carte">Carte de l'Empire</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une province..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Province
            </Button>
          </div>
          
          <TabsContent value="liste" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProvinces.map((province) => (
                <ProvinceCard 
                  key={province.id} 
                  province={province} 
                  onSelect={() => handleProvinceSelect(province.id)}
                />
              ))}
              
              {filteredProvinces.length === 0 && (
                <div className="col-span-full text-center py-10 text-muted-foreground">
                  Aucune province ne correspond à votre recherche.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="carte" className="mt-0">
            <div className="h-[500px] border rounded-md overflow-hidden">
              <ProvincesMap 
                provinces={provinces} 
                onProvinceSelect={handleProvinceSelect}
              />
            </div>
          </TabsContent>
        </CardContent>
      </Card>
      
      {selectedProvince && (
        <ProvinceModal 
          province={selectedProvince} 
          isOpen={isModalOpen}
          onClose={handleCloseModal} 
          onSave={handleSaveProvince}
        />
      )}
    </div>
  );
};
