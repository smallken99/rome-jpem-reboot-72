
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Trash2, Filter, Search } from 'lucide-react';
import { EconomieFilter, ECONOMIE_CATEGORIES } from '@/components/maitrejeu/types/economie';

interface EconomieFiltersProps {
  filter: EconomieFilter;
  onFilterChange: (filter: EconomieFilter) => void;
  onResetFilters: () => void;
}

export const EconomieFilters: React.FC<EconomieFiltersProps> = ({
  filter,
  onFilterChange,
  onResetFilters
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filter,
      search: e.target.value
    });
  };
  
  const handleTypeChange = (value: string) => {
    onFilterChange({
      ...filter,
      type: value === 'all' ? 'all' : (value as 'income' | 'expense')
    });
  };
  
  const handleEntityChange = (value: string) => {
    onFilterChange({
      ...filter,
      affectedEntity: value as 'senateur' | 'province' | 'all'
    });
  };
  
  const handleAmountChange = (field: 'minAmount' | 'maxAmount', value: string) => {
    const numValue = value === '' ? undefined : Number(value);
    onFilterChange({
      ...filter,
      [field]: numValue
    });
  };
  
  const handleCategoryToggle = (category: string) => {
    const updatedCategories = filter.categories.includes(category)
      ? filter.categories.filter(c => c !== category)
      : [...filter.categories, category];
    
    onFilterChange({
      ...filter,
      categories: updatedCategories
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="search">Rechercher</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Rechercher par source, description..."
              value={filter.search}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="w-full md:w-[180px]">
          <Label htmlFor="type">Type</Label>
          <Select
            value={filter.type || 'all'}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="income">Revenus</SelectItem>
              <SelectItem value="expense">Dépenses</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-[180px]">
          <Label htmlFor="entity">Entité affectée</Label>
          <Select
            value={filter.affectedEntity || 'all'}
            onValueChange={handleEntityChange}
          >
            <SelectTrigger id="entity">
              <SelectValue placeholder="Toutes les entités" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les entités</SelectItem>
              <SelectItem value="senateur">Sénateurs</SelectItem>
              <SelectItem value="province">Provinces</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtres avancés
              {(filter.minAmount !== undefined || 
                filter.maxAmount !== undefined || 
                filter.categories.length > 0) && (
                <Badge variant="secondary" className="ml-1">
                  {(filter.minAmount !== undefined ? 1 : 0) + 
                   (filter.maxAmount !== undefined ? 1 : 0) + 
                   (filter.categories.length > 0 ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Filtres avancés</h4>
              
              <div className="space-y-2">
                <Label htmlFor="min-amount">Montant minimum</Label>
                <Input
                  id="min-amount"
                  type="number"
                  placeholder="Min As"
                  value={filter.minAmount || ''}
                  onChange={(e) => handleAmountChange('minAmount', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-amount">Montant maximum</Label>
                <Input
                  id="max-amount"
                  type="number"
                  placeholder="Max As"
                  value={filter.maxAmount || ''}
                  onChange={(e) => handleAmountChange('maxAmount', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Catégories</Label>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {ECONOMIE_CATEGORIES.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filter.categories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          variant="ghost" 
          onClick={onResetFilters} 
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Réinitialiser
        </Button>
      </div>
      
      {filter.categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filter.categories.map(category => (
            <Badge 
              key={category} 
              variant="secondary"
              className="flex items-center gap-1"
            >
              {category}
              <button
                onClick={() => handleCategoryToggle(category)}
                className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center hover:bg-muted"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
