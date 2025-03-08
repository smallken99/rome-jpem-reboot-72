
// Mise à jour des imports pour GestionProvinces
import { useContext, useState, useEffect } from 'react';
import { MaitreJeuContext } from './context/MaitreJeuContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, PlusCircle, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ProvinceCard } from './components/ProvinceCard';
import { ProvinceModal } from './components/ProvinceModal';
import { ProvincesMap } from './components/ProvincesMap';
import { ProvincesData } from './components/ProvincesData';
import { Province } from './types/provinces';

export const GestionProvinces = () => {
  const { provinces, updateProvince } = useContext(MaitreJeuContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('carte');
  const [showProvinceModal, setShowProvinceModal] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  
  // Filtre pour les provinces
  const filteredProvinces = provinces.filter(province => 
    province.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (province.région && province.région.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (province.gouverneur && province.gouverneur.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Gestion de la sélection de province sur la carte
  const handleProvinceSelect = (provinceId: string) => {
    const province = provinces.find(p => p.id === provinceId);
    if (province) {
      setSelectedProvince(province);
      setShowProvinceModal(true);
    }
  };

  // Gestion de la mise à jour d'une province
  const handleSaveProvince = (updatedProvince: Province) => {
    updateProvince(updatedProvince.id, updatedProvince);
    setShowProvinceModal(false);
  };
  
  // Fonction pour voir les détails d'une province
  const handleViewProvince = (provinceId: string) => {
    const province = provinces.find(p => p.id === provinceId);
    if (province) {
      setSelectedProvince(province);
      setShowProvinceModal(true);
    }
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Gestion des Provinces</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher une province..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="carte">Carte</TabsTrigger>
          <TabsTrigger value="liste">Liste des provinces</TabsTrigger>
          <TabsTrigger value="économie">Données économiques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="carte">
          <ProvincesMap provinces={provinces} onProvinceSelect={handleProvinceSelect} />
        </TabsContent>
        
        <TabsContent value="liste">
          <div className="grid grid-cols-3 gap-4">
            {filteredProvinces.map(province => (
              <ProvinceCard 
                key={province.id} 
                province={province} 
                onViewProvince={handleViewProvince} 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="économie">
          <ProvincesData provinces={provinces} onViewProvince={handleViewProvince} />
        </TabsContent>
      </Tabs>
      
      {selectedProvince && (
        <ProvinceModal
          province={selectedProvince}
          open={showProvinceModal}
          onClose={() => setShowProvinceModal(false)}
          onSave={handleSaveProvince}
        />
      )}
    </div>
  );
};
