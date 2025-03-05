
import React from 'react';
import { Plus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { useNavigate, useLocation } from 'react-router-dom';

export const PropertyManagementHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnMainPatrimoinePage = location.pathname === '/patrimoine';
  
  const handleNewConstruction = () => {
    navigate('/patrimoine/proprietes/nouvelle-construction');
  };
  
  const handleBuyProperty = () => {
    navigate('/patrimoine/proprietes/acheter');
  };
  
  return (
    <RomanCard.Header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {!isOnMainPatrimoinePage && (
          <ActionButton 
            icon={<ArrowLeft className="h-4 w-4" />}
            label=""
            variant="outline"
            className="p-2 h-9 w-9"
            onClick={() => navigate('/patrimoine')}
          />
        )}
        <h3 className="font-cinzel text-lg text-rome-navy">Gestion des Propriétés</h3>
      </div>
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
