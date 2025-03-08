import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, Plus, Map, Edit, Eye 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProvinceCard } from './components/ProvinceCard';
import { ProvincesData } from './components/ProvincesData';
import { ProvinceModal } from './components/ProvinceModal';

export const GestionProvinces: React.FC = () => {
  const { provinces, updateProvince } = useMaitreJeu();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [isEditingProvince, setIsEditingProvince] = useState(false);
  const [isProvinceModalOpen, setIsProvinceModalOpen] = useState(false);
  const [sortField, setSortField] = useState('nom');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortedProvinces, setSortedProvinces] = useState(provinces);

  useEffect(() => {
    setSortedProvinces(provinces);
  }, [provinces]);

  const displayedProvinces = sortedProvinces.filter(province =>
    province.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    province.région.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProvince = (provinceId: string) => {
    const province = provinces.find(p => p.id === provinceId);
    setSelectedProvince(province);
    setIsEditingProvince(false);
    setIsProvinceModalOpen(true);
  };

  const handleEditProvince = (provinceId: string) => {
    const province = provinces.find(p => p.id === provinceId);
    setSelectedProvince(province);
    setIsEditingProvince(true);
    setIsProvinceModalOpen(true);
  };

  const handleCloseProvinceModal = () => {
    setIsProvinceModalOpen(false);
    setSelectedProvince(null);
    setIsEditingProvince(false);
  };

  const handleSaveProvince = (province) => {
    updateProvince(province.id, province);
    handleCloseProvinceModal();
  };

  const handleAddProvince = () => {
    setSelectedProvince({
      id: `new-province-${Date.now()}`,
      nom: '',
      région: '',
      gouverneur: null,
      status: 'pacifiée',
      population: 0,
      revenu: 0,
      dépense: 0,
      armée: 0,
      loyauté: 50,
      description: '',
      ressources: [],
      position: { x: 0, y: 0 }
    });
    setIsEditingProvince(true);
    setIsProvinceModalOpen(true);
  };

  const sortByRevenue = () => {
    setSortedProvinces([...sortedProvinces].sort((a, b) => b.revenu - a.revenu));
    setSortDirection('desc');
    setSortField('revenu');
  };
  
  const sortByExpense = () => {
    setSortedProvinces([...sortedProvinces].sort((a, b) => b.dépense - a.dépense));
    setSortDirection('desc');
    setSortField('dépense');
  };
  
  const sortByStatus = () => {
    setSortedProvinces([...sortedProvinces].sort((a, b) => {
      if (a.status === b.status) return 0;
      if (a.status === 'pacifiée') return -1;
      if (b.status === 'pacifiée') return 1;
      if (a.status === 'instable') return -1;
      if (b.status === 'instable') return 1;
      return 0;
    }));
    setSortDirection('asc');
    setSortField('status');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="liste" className="w-full">
          <TabsList>
            <TabsTrigger value="liste" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              <span>Liste</span>
            </TabsTrigger>
            <TabsTrigger value="tableau" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              <span>Tableau</span>
            </TabsTrigger>
            <TabsTrigger value="carte" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>Carte</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex justify-between items-center mt-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Rechercher..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[250px]" 
              />
            </div>
            <Button 
              className="flex items-center gap-2"
              onClick={handleAddProvince}
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter</span>
            </Button>
          </div>
          
          <TabsContent value="liste" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Liste des provinces</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayedProvinces.map(province => (
                    <ProvinceCard
                      key={province.id} 
                      province={province}
                      onClick={() => handleViewProvince(province.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tableau" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Données des provinces</CardTitle>
              </CardHeader>
              <CardContent>
                <ProvincesData 
                  provinces={provinces} 
                  onViewProvince={handleViewProvince}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="carte" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Carte des provinces</CardTitle>
              </CardHeader>
              <CardContent>
                <div>Carte en construction</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {selectedProvince && (
        <ProvinceModal
          province={selectedProvince}
          mode={isEditingProvince ? 'edit' : 'add'}
          onClose={handleCloseProvinceModal}
          onSave={handleSaveProvince}
        />
      )}
    </div>
  );
};
