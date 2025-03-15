
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DiplomaticFiltersProps {
  activeTab: string;
  onFilterChange: (filters: any) => void;
  onReset: () => void;
}

export const DiplomaticFilters: React.FC<DiplomaticFiltersProps> = ({
  activeTab,
  onFilterChange,
  onReset
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    status: '',
    region: '',
    dateFrom: '',
    dateTo: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
  };
  
  const handleReset = () => {
    setLocalFilters({
      status: '',
      region: '',
      dateFrom: '',
      dateTo: ''
    });
    onReset();
    setIsOpen(false);
  };
  
  // Dynamic options based on active tab
  const getStatusOptions = () => {
    switch (activeTab) {
      case 'nations':
        return [
          { value: 'ally', label: 'Allié' },
          { value: 'enemy', label: 'Ennemi' },
          { value: 'neutral', label: 'Neutre' },
          { value: 'tributary', label: 'Tributaire' }
        ];
      case 'traites':
        return [
          { value: 'peace', label: 'Paix' },
          { value: 'trade', label: 'Commerce' },
          { value: 'military', label: 'Militaire' },
          { value: 'tribute', label: 'Tribut' }
        ];
      case 'alliances':
        return [
          { value: 'defensive', label: 'Défensive' },
          { value: 'offensive', label: 'Offensive' },
          { value: 'full', label: 'Complète' }
        ];
      default:
        return [];
    }
  };
  
  const getRegionOptions = () => {
    switch (activeTab) {
      case 'nations':
        return [
          { value: 'North Africa', label: 'Afrique du Nord' },
          { value: 'Asia', label: 'Asie' },
          { value: 'Europe', label: 'Europe' },
          { value: 'Middle East', label: 'Moyen-Orient' }
        ];
      case 'traites':
      case 'alliances':
        return [
          { value: 'active', label: 'Actif' },
          { value: 'expired', label: 'Expiré' },
          { value: 'violated', label: 'Violé' },
          { value: 'dissolved', label: 'Dissout' }
        ];
      default:
        return [];
    }
  };
  
  const statusLabel = activeTab === 'nations' ? 'Statut' : 
                     activeTab === 'traites' ? 'Type' : 'Type';
  
  const regionLabel = activeTab === 'nations' ? 'Région' : 'Statut';

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filtres diplomatiques</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="px-2 py-2">
          <Label htmlFor="status" className="text-xs">{statusLabel}</Label>
          <div className="grid grid-cols-2 gap-1 mt-1">
            {getStatusOptions().map(option => (
              <Button 
                key={option.value}
                variant={localFilters.status === option.value ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleSelectChange('status', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-2">
          <Label htmlFor="region" className="text-xs">{regionLabel}</Label>
          <div className="grid grid-cols-2 gap-1 mt-1">
            {getRegionOptions().map(option => (
              <Button 
                key={option.value}
                variant={localFilters.region === option.value ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleSelectChange('region', option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-2">
          <Label htmlFor="dateFrom" className="text-xs">Date (de)</Label>
          <Input
            id="dateFrom"
            name="dateFrom"
            type="date"
            value={localFilters.dateFrom}
            onChange={handleInputChange}
            className="h-7 mt-1"
          />
        </div>
        
        <div className="px-2 py-2">
          <Label htmlFor="dateTo" className="text-xs">Date (à)</Label>
          <Input
            id="dateTo"
            name="dateTo"
            type="date"
            value={localFilters.dateTo}
            onChange={handleInputChange}
            className="h-7 mt-1"
          />
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="px-2 py-2 flex justify-between">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <X className="h-4 w-4 mr-1" />
            Réinitialiser
          </Button>
          <Button size="sm" onClick={handleApplyFilters}>Appliquer</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
