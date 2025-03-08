
import React, { useState } from 'react';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Plus, Search, Filter, SlidersHorizontal
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProvinceCard } from './components/ProvinceCard';
import { ProvincesData } from './components/ProvincesData';
import { ProvincesMap } from './components/ProvincesMap';
import { ProvinceModal } from './components/ProvinceModal';
import { Province } from './types/maitreJeuTypes';

export const GestionProvinces: React.FC = () => {
  const { provinces, addProvince, updateProvince, deleteProvince, assignGovernor } = useMaitreJeu();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('nom');
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [activeTab, setActiveTab] = useState('liste');
  
  const handleAddProvince = () => {
    setModalMode('add');
    setSelectedProvinceId('');
    setModalOpen(true);
  };
  
  const handleEditProvince = (provinceId: string) => {
    setModalMode('edit');
    setSelectedProvinceId(provinceId);
    setModalOpen(true);
  };
  
  const handleSaveProvince = (province: Province) => {
    if (modalMode === 'add') {
      addProvince(province);
    } else {
      updateProvince(province.id, province);
    }
    setModalOpen(false);
  };
  
  const filteredProvinces = provinces.filter(province => {
    const matchesSearch = province.nom.toLowerCase().includes(searchTerm.toLowerCase()) 
      || province.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (filter === 'all') return matchesSearch;
    if (filter === 'pacifiees') return matchesSearch && province.status === 'pacifiée';
    if (filter === 'instables') return matchesSearch && province.status === 'instable';
    if (filter === 'revoltes') return matchesSearch && province.status === 'en révolte';
    if (filter === 'sans-gouverneur') return matchesSearch && !province.gouverneur;
    
    return matchesSearch;
  });
  
  const sortedProvinces = [...filteredProvinces].sort((a, b) => {
    if (sortBy === 'nom') return a.nom.localeCompare(b.nom);
    if (sortBy === 'region') return a.région.localeCompare(b.région);
    if (sortBy === 'population') return b.population - a.population;
    if (sortBy === 'revenu') return b.revenu - a.revenu;
    if (sortBy === 'depense') return b.dépense - a.dépense;
    if (sortBy === 'status') {
      const order = { 'pacifiée': 0, 'instable': 1, 'en révolte': 2 };
      return (order[a.status as keyof typeof order] || 0) - (order[b.status as keyof typeof order] || 0);
    }
    return 0;
  });
  
  const selectedProvince = provinces.find(p => p.id === selectedProvinceId);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Provinces</h2>
        <Button 
          className="flex items-center gap-2"
          onClick={handleAddProvince}
        >
          <Plus className="h-4 w-4" />
          <span>Nouvelle Province</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Filtres</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Rechercher..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8" 
              />
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les provinces</SelectItem>
                <SelectItem value="pacifiees">Provinces pacifiées</SelectItem>
                <SelectItem value="instables">Provinces instables</SelectItem>
                <SelectItem value="revoltes">Provinces en révolte</SelectItem>
                <SelectItem value="sans-gouverneur">Sans gouverneur</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nom">Par nom</SelectItem>
                <SelectItem value="region">Par région</SelectItem>
                <SelectItem value="population">Par population</SelectItem>
                <SelectItem value="revenu">Par revenu</SelectItem>
                <SelectItem value="depense">Par dépense</SelectItem>
                <SelectItem value="status">Par statut</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="liste">Liste</TabsTrigger>
                <TabsTrigger value="carte">Carte</TabsTrigger>
                <TabsTrigger value="donnees">Données</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="pt-6">
            <TabsContent value="liste" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProvinces.map(province => (
                  <ProvinceCard 
                    key={province.id} 
                    province={province} 
                    onViewProvince={() => handleEditProvince(province.id)} 
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="carte" className="m-0">
              <ProvincesMap
                provinces={provinces}
                onProvinceSelect={setSelectedProvinceId}
              />
            </TabsContent>
            
            <TabsContent value="donnees" className="m-0">
              <ProvincesData
                provinces={sortedProvinces}
                onViewProvince={(province) => handleEditProvince(province.id)}
              />
            </TabsContent>
          </CardContent>
        </Card>
      </div>
      
      {selectedProvince && (
        <ProvinceModal
          province={selectedProvince}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveProvince}
          open={modalOpen}
        />
      )}
    </div>
  );
};
