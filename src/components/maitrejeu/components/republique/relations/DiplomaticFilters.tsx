
import React from 'react';
import { Filter, X, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

interface FilterOptions {
  status: string;
  region: string;
  dateFrom: string;
  dateTo: string;
  searchTerm: string;
}

interface DiplomaticFiltersProps {
  activeTab: string;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

export const DiplomaticFilters: React.FC<DiplomaticFiltersProps> = ({ 
  activeTab, 
  onFilterChange,
  onReset
}) => {
  const [filters, setFilters] = React.useState<FilterOptions>({
    status: '',
    region: '',
    dateFrom: '',
    dateTo: '',
    searchTerm: ''
  });
  
  const [isOpen, setIsOpen] = React.useState(false);
  
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setFilters(prev => ({ ...prev, searchTerm }));
    onFilterChange({ ...filters, searchTerm });
  };
  
  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };
  
  const resetFilters = () => {
    setFilters({
      status: '',
      region: '',
      dateFrom: '',
      dateTo: '',
      searchTerm: ''
    });
    onReset();
    setIsOpen(false);
  };
  
  const getStatusOptions = () => {
    switch (activeTab) {
      case 'nations':
        return [
          { value: 'Allié', label: 'Allié' },
          { value: 'Neutre', label: 'Neutre' },
          { value: 'Ennemi', label: 'Ennemi' },
          { value: 'Soumis', label: 'Soumis' }
        ];
      case 'traites':
        return [
          { value: 'Actif', label: 'Actif' },
          { value: 'Expiré', label: 'Expiré' },
          { value: 'En négociation', label: 'En négociation' },
          { value: 'Rompu', label: 'Rompu' }
        ];
      case 'alliances':
        return [
          { value: 'Actif', label: 'Actif' },
          { value: 'Inactif', label: 'Inactif' },
          { value: 'Dissous', label: 'Dissous' }
        ];
      default:
        return [];
    }
  };
  
  const regions = [
    { value: 'Europe', label: 'Europe' },
    { value: 'Afrique', label: 'Afrique' },
    { value: 'Asie Mineure', label: 'Asie Mineure' },
    { value: 'Égypte', label: 'Égypte' },
    { value: 'Gaule', label: 'Gaule' },
    { value: 'Hispanie', label: 'Hispanie' },
    { value: 'Grèce', label: 'Grèce' }
  ];
  
  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher..."
          className="w-full pl-8"
          value={filters.searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            aria-label="Filtres avancés"
          >
            <Filter size={16} />
            <span>Filtres avancés</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Filtres</h3>
              <Button variant="ghost" size="icon" onClick={resetFilters}>
                <X size={16} />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={filters.status} 
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  {getStatusOptions().map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Région</Label>
              <Select 
                value={filters.region} 
                onValueChange={(value) => handleFilterChange('region', value)}
              >
                <SelectTrigger id="region">
                  <SelectValue placeholder="Toutes les régions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les régions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="dateFrom">Date (de)</Label>
                <Input
                  id="dateFrom"
                  type="text"
                  placeholder="Ex: 200 av. J.-C."
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo">Date (à)</Label>
                <Input
                  id="dateTo"
                  type="text"
                  placeholder="Ex: 100 av. J.-C."
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={applyFilters}>Appliquer</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
