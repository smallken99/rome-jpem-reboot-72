
import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { useNavigate } from 'react-router-dom';

export const PropertyManagementHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNewConstruction = () => {
    navigate('/patrimoine/proprietes/nouvelle-construction');
  };
  
  const handleBuyProperty = () => {
    navigate('/patrimoine/proprietes/acheter');
  };
  
  return (
    <RomanCard.Header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h3 className="font-cinzel text-lg text-rome-navy">Gestion des Propriétés</h3>
      <div className="flex gap-2">
        <ActionButton 
          icon={<Plus className="h-4 w-4" />} 
          label="Nouvelle Construction"
          onClick={handleNewConstruction}
        />
        <ActionButton 
          icon={<ShoppingCart className="h-4 w-4" />} 
          label="Acheter" 
          variant="outline"
          onClick={handleBuyProperty}
        />
      </div>
    </RomanCard.Header>
  );
};
