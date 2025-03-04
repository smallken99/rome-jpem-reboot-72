
import React from 'react';
import { Button } from '@/components/ui/button';
import { ClientType } from './ClientCard';

interface ClientTypeFilterProps {
  filter: string | null;
  handleTypeFilter: (type: string | null) => void;
}

export const ClientTypeFilter: React.FC<ClientTypeFilterProps> = ({ filter, handleTypeFilter }) => {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
      <Button 
        variant={filter === null ? "default" : "outline"} 
        size="sm"
        className="text-xs gap-1 roman-btn"
        onClick={() => handleTypeFilter(null)}
      >
        Tous
      </Button>
      <Button 
        variant={filter === "artisan_commercant" ? "default" : "outline"} 
        size="sm"
        className="text-xs gap-1 roman-btn-outline"
        onClick={() => handleTypeFilter("artisan_commercant")}
      >
        Artisans & Commerçants
      </Button>
      <Button 
        variant={filter === "politicien" ? "default" : "outline"} 
        size="sm"
        className="text-xs gap-1 roman-btn-outline"
        onClick={() => handleTypeFilter("politicien")}
      >
        Politiciens
      </Button>
      <Button 
        variant={filter === "religieux" ? "default" : "outline"} 
        size="sm"
        className="text-xs gap-1 roman-btn-outline"
        onClick={() => handleTypeFilter("religieux")}
      >
        Religieux
      </Button>
      <Button 
        variant={filter === "proprietaire" ? "default" : "outline"} 
        size="sm"
        className="text-xs gap-1 roman-btn-outline"
        onClick={() => handleTypeFilter("proprietaire")}
      >
        Propriétaires
      </Button>
      <Button 
        variant={filter === "pegre" ? "default" : "outline"} 
        size="sm"
        className="text-xs gap-1 roman-btn-outline"
        onClick={() => handleTypeFilter("pegre")}
      >
        Pègre
      </Button>
    </div>
  );
};
