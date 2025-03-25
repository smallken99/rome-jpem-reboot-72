
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Filter } from 'lucide-react';

interface RuralBuildingFilterProps {
  onFilterChange: (value: string) => void;
  onLocationFilter: (value: string | null) => void;
  onStatusFilter: (value: string | null) => void;
  onSizeFilter: (value: string | null) => void;
  filterValue: string;
  locationFilter: string | null;
  statusFilter: string | null;
  sizeFilter: string | null;
}

export const RuralBuildingFilter: React.FC<RuralBuildingFilterProps> = ({
  onFilterChange,
  onLocationFilter,
  onStatusFilter,
  onSizeFilter,
  filterValue,
  locationFilter,
  statusFilter,
  sizeFilter
}) => {
  const locations = [
    { value: null, label: 'Toutes les régions' },
    { value: 'Latium', label: 'Latium' },
    { value: 'Campanie', label: 'Campanie' },
    { value: 'Étrurie', label: 'Étrurie' },
    { value: 'Ombrie', label: 'Ombrie' },
  ];
  
  const statusOptions = [
    { value: null, label: 'Tous les statuts' },
    { value: 'maintained', label: 'Entretenus' },
    { value: 'not-maintained', label: 'Non entretenus' },
  ];

  const sizeOptions = [
    { value: null, label: 'Toutes les tailles' },
    { value: 'small', label: 'Petit' },
    { value: 'medium', label: 'Moyen' },
    { value: 'large', label: 'Grand' },
    { value: 'huge', label: 'Très grand' },
  ];
  
  return (
    <div className="space-y-4 bg-background p-4 rounded-lg border">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Filter className="h-5 w-5" />
        Filtres
      </h3>
      
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par nom..."
          className="pl-8"
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location-filter">Région</Label>
          <Select 
            value={locationFilter || ""} 
            onValueChange={(value) => onLocationFilter(value === "" ? null : value)}
          >
            <SelectTrigger id="location-filter">
              <SelectValue placeholder="Toutes les régions" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem 
                  key={location.value || "all"} 
                  value={location.value || ""}
                >
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status-filter">Statut</Label>
          <Select 
            value={statusFilter || ""} 
            onValueChange={(value) => onStatusFilter(value === "" ? null : value)}
          >
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem 
                  key={status.value || "all"} 
                  value={status.value || ""}
                >
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="size-filter">Taille</Label>
          <Select 
            value={sizeFilter || ""} 
            onValueChange={(value) => onSizeFilter(value === "" ? null : value)}
          >
            <SelectTrigger id="size-filter">
              <SelectValue placeholder="Toutes les tailles" />
            </SelectTrigger>
            <SelectContent>
              {sizeOptions.map((size) => (
                <SelectItem 
                  key={size.value || "all"} 
                  value={size.value || ""}
                >
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
