import React, { useState } from 'react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ProvincesMap } from './components/ProvincesMap';
import { ProvinceModal } from './components/ProvinceModal';
import { ProvinceCard } from './components/ProvinceCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Province } from './types/maitreJeuTypes';

export const GestionProvinces = () => {
  const { provinces, updateProvince } = useMaitreJeu();
  
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('');
  const [isProvinceModalOpen, setIsProvinceModalOpen] = useState(false);
  
  const handleProvinceSelect = (provinceId: string) => {
    setSelectedProvinceId(provinceId);
    setIsProvinceModalOpen(true);
  };
  
  const handleOpenProvinceDetails = (provinceId: string) => {
    setSelectedProvinceId(provinceId);
    setIsProvinceModalOpen(true);
  };
  
  const handleSaveProvince = (updatedProvince: Province) => {
    updateProvince(updatedProvince.id, updatedProvince);
    setIsProvinceModalOpen(false);
    toast.success(`Province mise à jour: ${updatedProvince.nom}`);
  };
  
  return (
    <div>
      <PageHeader
        title="Gestion des Provinces"
        subtitle="Administrez les provinces de la République et suivez leur état"
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        
        <RomanCard className="col-span-full">
          <RomanCard.Content>
            <ProvincesMap 
              provinces={provinces} 
              onProvinceSelect={handleProvinceSelect} 
            />
          </RomanCard.Content>
        </RomanCard>
        
        <Tabs defaultValue="all" className="col-span-full mt-6">
          <TabsList>
            <TabsTrigger value="all">Toutes les provinces</TabsTrigger>
            {/* <TabsTrigger value="strategique">Carte stratégique</TabsTrigger>
            <TabsTrigger value="economique">Situation économique</TabsTrigger> */}
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {provinces.map((province) => (
                <ProvinceCard 
                  key={province.id} 
                  province={province} 
                  onViewProvince={() => handleOpenProvinceDetails(province.id)} 
                />
              ))}
            </div>
          </TabsContent>
          
          {/* <TabsContent value="strategique">
            <p>Carte stratégique des provinces</p>
          </TabsContent>
          
          <TabsContent value="economique">
            <p>Situation économique des provinces</p>
          </TabsContent> */}
        </Tabs>
      </div>
      
      {selectedProvinceId && (
        <ProvinceModal 
          province={provinces.find(p => p.id === selectedProvinceId)!} 
          open={isProvinceModalOpen}
          onClose={() => setIsProvinceModalOpen(false)}
          onSave={handleSaveProvince}
        />
      )}
    </div>
  );
};
