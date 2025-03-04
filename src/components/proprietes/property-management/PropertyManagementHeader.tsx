
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart } from 'lucide-react';
import { RomanCard } from '@/components/ui-custom/RomanCard';

export const PropertyManagementHeader: React.FC = () => {
  return (
    <RomanCard.Header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h3 className="font-cinzel text-lg text-rome-navy">Gestion des Propriétés</h3>
      <div className="flex gap-2">
        <Button size="sm" className="roman-btn flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Nouvelle Construction
        </Button>
        <Button variant="outline" size="sm" className="roman-btn-outline flex items-center gap-1">
          <ShoppingCart className="h-4 w-4" />
          Acheter
        </Button>
      </div>
    </RomanCard.Header>
  );
};
