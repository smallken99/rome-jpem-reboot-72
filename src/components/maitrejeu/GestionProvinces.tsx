
import React, { useState } from 'react';
import { useMaitreJeu } from './context';
import { ProvinceMap } from './components/provinces/ProvinceMap';
import { ProvincesList } from './components/provinces/ProvincesList';
import { ProvinceDetails } from './components/provinces/ProvinceDetails';
import { NewProvinceForm } from './components/provinces/NewProvinceForm';

export const GestionProvinces: React.FC = () => {
  const { provinces, updateProvince } = useMaitreJeu();
  
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [isAddingProvince, setIsAddingProvince] = useState(false);
  
  const handleSelectProvince = (provinceId: string) => {
    setSelectedProvinceId(provinceId);
    setIsAddingProvince(false);
  };
  
  const handleAddProvince = () => {
    setIsAddingProvince(true);
    setSelectedProvinceId(null);
  };
  
  return (
    <div className="space-y-6">
      <ProvinceMap />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProvincesList 
          onSelectProvince={handleSelectProvince}
          onAddProvince={handleAddProvince}
        />
        
        {isAddingProvince ? (
          <NewProvinceForm 
            onCancel={() => setIsAddingProvince(false)} 
          />
        ) : (
          selectedProvinceId && (
            <ProvinceDetails 
              provinceId={selectedProvinceId}
              onClose={() => setSelectedProvinceId(null)}
            />
          )
        )}
      </div>
    </div>
  );
};
