
import React, { useState } from 'react';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Province } from './types/maitreJeuTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProvincesMap } from './components/ProvincesMap';
import { ProvinceCard } from './components/ProvinceCard';
import { ProvincesData } from './components/ProvincesData';
import { ProvinceModal } from './components/ProvinceModal';
import { PlusCircle, Search, Map } from 'lucide-react';

export const GestionProvinces: React.FC = () => {
  const { provinces, updateProvince } = useMaitreJeu();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('carte');
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProvince, setCurrentProvince] = useState<Province | null>(null);
  
  // Filtrer les provinces en fonction du terme de recherche
  const filteredProvinces = provinces.filter(province => 
    province.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    province.région.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Gérer l'affichage du détail d'une province
  const handleViewProvince = (provinceId: string) => {
    const province = provinces.find(p => p.id === provinceId);
    if (province) {
      setCurrentProvince(province);
      setModalOpen(true);
    }
  };
  
  // Gérer l'ajout d'une nouvelle province
  const handleAddProvince = () => {
    const newProvince: Province = {
      id: `province-${Date.now()}`,
      nom: 'Nouvelle Province',
      gouverneur: null,
      région: 'Non spécifiée',
      population: 0,
      status: 'conquise',
      description: '',
      revenu: 0,
      dépense: 0,
      loyauté: 50,
      légions: 0,
      garnison: 0,
      richesse: 0,
      revenuAnnuel: 0,
      impôts: 0,
      ressourcesPrincipales: [],
      problèmes: [],
      opportunités: [],
      coordonnées: {
        x: 300,
        y: 200
      }
    };
    
    setCurrentProvince(newProvince);
    setModalOpen(true);
  };
  
  // Gérer la sauvegarde d'une province
  const handleSaveProvince = (province: Province) => {
    updateProvince(province.id, province);
    setModalOpen(false);
    setCurrentProvince(null);
  };
  
  const provinceStats = {
    total: provinces.length,
    pacifiées: provinces.filter(p => p.status === 'pacifiée').length,
    instables: provinces.filter(p => p.status === 'instable').length,
    rebelles: provinces.filter(p => p.status === 'rebelle').length,
    revenuTotal: provinces.reduce((sum, p) => sum + p.revenu, 0),
    dépenseTotal: provinces.reduce((sum, p) => sum + p.dépense, 0),
    rebellions: provinces.filter(p => p.status === 'rebelle' || p.loyauté < 30).length
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Provinces</h2>
        <Button onClick={handleAddProvince}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter une Province
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Provinces</h3>
            <div className="text-3xl font-bold">{provinceStats.total}</div>
            <div className="text-sm text-gray-500">
              {provinceStats.pacifiées} pacifiées • {provinceStats.instables} instables • {provinceStats.rebelles} rebelles
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Bilan Financier</h3>
            <div className="text-3xl font-bold">
              {provinceStats.revenuTotal - provinceStats.dépenseTotal > 0 ? '+' : ''}
              {(provinceStats.revenuTotal - provinceStats.dépenseTotal).toLocaleString()} D
            </div>
            <div className="text-sm text-gray-500">
              Revenus: {provinceStats.revenuTotal.toLocaleString()} D • Dépenses: {provinceStats.dépenseTotal.toLocaleString()} D
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Problèmes</h3>
            <div className="text-3xl font-bold">{provinceStats.rebellions}</div>
            <div className="text-sm text-gray-500">
              Provinces nécessitant une attention immédiate
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white p-4 rounded-md shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher une province..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="ml-4">
            <TabsList>
              <TabsTrigger value="carte" className="flex items-center">
                <Map className="mr-1 h-4 w-4" />
                Carte
              </TabsTrigger>
              <TabsTrigger value="liste">Liste</TabsTrigger>
              <TabsTrigger value="données">Données</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <TabsContent value="carte" className="pt-2">
          <ProvincesMap 
            provinces={filteredProvinces} 
            onProvinceSelect={setSelectedProvinceId}
          />
        </TabsContent>
        
        <TabsContent value="liste" className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProvinces.length === 0 ? (
              <div className="col-span-3 text-center py-8 text-gray-500">
                Aucune province trouvée avec ces critères de recherche.
              </div>
            ) : (
              filteredProvinces.map(province => (
                <ProvinceCard 
                  key={province.id} 
                  province={province} 
                  onViewProvince={() => handleViewProvince(province.id)}
                />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="données" className="pt-2">
          <ProvincesData 
            provinces={filteredProvinces} 
            onViewProvince={handleViewProvince}
          />
        </TabsContent>
      </div>
      
      {currentProvince && (
        <ProvinceModal
          province={currentProvince}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveProvince}
        />
      )}
    </div>
  );
};
