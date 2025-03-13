
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Calendar } from '@/components/ui/calendar';
import { Search, Filter, Calendar as CalendarIcon, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface LoisSearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterChange: (key: any, value: any) => void;
  onResetFilters: () => void;
  activeFilters?: Record<string, any>;
}

export const LoisSearchAndFilters: React.FC<LoisSearchAndFiltersProps> = ({ 
  searchTerm, 
  onSearchChange,
  onFilterChange,
  onResetFilters,
  activeFilters = {}
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      onFilterChange('year', date.getFullYear());
    } else {
      onFilterChange('year', null);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Rechercher une loi..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select onValueChange={(v) => onFilterChange('type', v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type de loi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="sociale">Sociale</SelectItem>
              <SelectItem value="politique">Politique</SelectItem>
              <SelectItem value="économique">Économique</SelectItem>
              <SelectItem value="judiciaire">Judiciaire</SelectItem>
              <SelectItem value="militaire">Militaire</SelectItem>
              <SelectItem value="religieuse">Religieuse</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={(v) => onFilterChange('état', v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="proposée">Proposée</SelectItem>
              <SelectItem value="adoptée">Adoptée</SelectItem>
              <SelectItem value="rejetée">Rejetée</SelectItem>
              <SelectItem value="Promulguée">Promulguée</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal w-[150px]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP', { locale: fr }) : "Année"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
              />
            </PopoverContent>
          </Popover>
          
          <Button variant="ghost" onClick={onResetFilters}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => (
            value && (
              <Badge 
                key={key} 
                variant="outline"
                className="flex items-center gap-1"
              >
                {key}: {value.toString()}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={() => onFilterChange(key, null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )
          ))}
        </div>
      )}
    </div>
  );
};
