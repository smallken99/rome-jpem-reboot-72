
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

interface LoisSearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
}

export const LoisSearchAndFilters: React.FC<LoisSearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  onFilterClick
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher une loi..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <Button variant="outline" className="flex items-center gap-2" onClick={onFilterClick}>
        <Filter className="h-4 w-4" />
        Filtres
      </Button>
    </div>
  );
};
