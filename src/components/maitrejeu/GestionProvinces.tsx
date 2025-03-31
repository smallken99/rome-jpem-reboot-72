
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ProvinceMap } from './components/provinces/ProvinceMap';
import { ProvincesList } from './components/provinces/ProvincesList';
import { ProvinceDetails } from './components/provinces/ProvinceDetails';
import { NewProvinceForm } from './components/provinces/NewProvinceForm';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Plus } from 'lucide-react';
import { Province } from './types/provinces';

export const GestionProvinces: React.FC = () => {
  const { provinces, updateProvince } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState<string>('map');
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [isNewProvinceDialogOpen, setIsNewProvinceDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const selectedProvince = provinces.find(p => p.id === selectedProvinceId) || null;
  
  const handleSelectProvince = (provinceId: string) => {
    setSelectedProvinceId(provinceId);
    setIsDetailsOpen(true);
  };
  
  const handleUpdateProvince = (provinceId: string, updates: Partial<Province>) => {
    updateProvince(provinceId, updates);
    setIsDetailsOpen(false);
  };
  
  const sortedProvinces = [...provinces].sort((a, b) => {
    // Sort by status first (pacifiées first, then all others)
    if (a.status === 'Pacifiée' && b.status !== 'Pacifiée') return -1;
    if (a.status !== 'Pacifiée' && b.status === 'Pacifiée') return 1;
    
    // Then sort alphabetically by name
    return a.name.localeCompare(b.name);
  });
  
  return (
    <div className="space-y-6 p-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Provinces romaines</h2>
          <p className="text-muted-foreground">
            Gérez les provinces de la République, leurs ressources et leurs gouverneurs.
          </p>
        </div>
        <Button onClick={() => setIsNewProvinceDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle province
        </Button>
      </header>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map">Carte</TabsTrigger>
          <TabsTrigger value="list">Liste</TabsTrigger>
        </TabsList>
        
        <TabsContent value="map" className="border rounded-md p-4">
          <ProvinceMap 
            provinces={sortedProvinces} 
            onSelectProvince={handleSelectProvince}
            selectedProvinceId={selectedProvinceId}
          />
        </TabsContent>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Liste des provinces</CardTitle>
            </CardHeader>
            <CardContent>
              <ProvincesList 
                provinces={sortedProvinces} 
                onSelectProvince={handleSelectProvince}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Province details dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedProvince && (
            <ProvinceDetails 
              province={selectedProvince} 
              onUpdateProvince={handleUpdateProvince}
              onClose={() => setIsDetailsOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* New province dialog */}
      <Dialog open={isNewProvinceDialogOpen} onOpenChange={setIsNewProvinceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <NewProvinceForm
            onClose={() => setIsNewProvinceDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
