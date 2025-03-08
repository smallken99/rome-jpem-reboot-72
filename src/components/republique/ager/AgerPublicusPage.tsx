import React, { useState } from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AgerPublicusStats } from './components/AgerPublicusStats';
import { AgerPublicusMap } from './components/AgerPublicusMap';
import { AgerPublicusTable } from './components/AgerPublicusTable';
import { AgerPublicusDetails } from './components/AgerPublicusDetails';
import { useAgerPublicus } from './hooks/useAgerPublicus';
import { LandParcel } from './types';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Plus } from 'lucide-react';

export const AgerPublicusPage: React.FC = () => {
  const { landParcels, isLoading, error } = useAgerPublicus();
  const [selectedParcel, setSelectedParcel] = useState<LandParcel | null>(null);
  const [activeTab, setActiveTab] = useState('map');

  const handleParcelSelect = (parcel: LandParcel) => {
    setSelectedParcel(parcel);
    setActiveTab('details');
  };

  const handleCloseDetails = () => {
    setSelectedParcel(null);
    setActiveTab('map');
  };

  if (error) {
    return <div className="p-4 text-red-500">Erreur: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Ager Publicus" 
          subtitle="Gestion des terres publiques de la République" 
        />
        <ActionButton 
          label="Nouvelle Parcelle" 
          icon={<Plus />} 
          variant="default"
        />
      </div>

      <AgerPublicusStats parcels={landParcels || []} isLoading={isLoading} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map">Carte</TabsTrigger>
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedParcel}>
            Détails
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-6">
          <AgerPublicusMap 
            parcels={landParcels || []} 
            isLoading={isLoading}
            onSelectParcel={handleParcelSelect}
            selectedParcelId={selectedParcel?.id}
          />
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <AgerPublicusTable 
            parcels={landParcels || []} 
            isLoading={isLoading}
            onSelectParcel={handleParcelSelect}
          />
        </TabsContent>

        <TabsContent value="details" className="mt-6">
          {selectedParcel && (
            <AgerPublicusDetails 
              parcel={selectedParcel} 
              onClose={handleCloseDetails}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgerPublicusPage;
