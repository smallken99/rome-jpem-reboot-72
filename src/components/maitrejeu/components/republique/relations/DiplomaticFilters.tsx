
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';

export interface DiplomaticFiltersProps {
  activeTab: string;
  onFilterChange: (filters: any) => void;
  onReset: () => void;
  onSearch?: (term: string) => void;
  onFilter?: (filters: any) => void;
}

export const DiplomaticFilters: React.FC<DiplomaticFiltersProps> = ({
  activeTab,
  onFilterChange,
  onReset,
  onSearch,
  onFilter
}) => {
  const [status, setStatus] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [dateFrom, setDateFrom] = React.useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = React.useState<Date | undefined>(undefined);
  
  const handleApplyFilters = () => {
    const filters = {
      status,
      region,
      dateFrom: dateFrom ? dateFrom.toISOString().split('T')[0] : '',
      dateTo: dateTo ? dateTo.toISOString().split('T')[0] : ''
    };
    
    onFilterChange(filters);
    
    // Pour la compatibilité
    if (onFilter) {
      onFilter(filters);
    }
  };
  
  const handleReset = () => {
    setStatus('');
    setRegion('');
    setDateFrom(undefined);
    setDateTo(undefined);
    onReset();
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filtres</SheetTitle>
          <SheetDescription>
            Affinez les résultats en utilisant les filtres ci-dessous
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          {/* Statut */}
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les statuts</SelectItem>
                {activeTab === 'nations' && (
                  <>
                    <SelectItem value="ally">Allié</SelectItem>
                    <SelectItem value="neutral">Neutre</SelectItem>
                    <SelectItem value="enemy">Ennemi</SelectItem>
                    <SelectItem value="tributary">Tributaire</SelectItem>
                  </>
                )}
                {activeTab === 'traites' && (
                  <>
                    <SelectItem value="active">En vigueur</SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="expired">Expiré</SelectItem>
                    <SelectItem value="revoked">Révoqué</SelectItem>
                  </>
                )}
                {activeTab === 'alliances' && (
                  <>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          
          {/* Région */}
          <div className="space-y-2">
            <Label htmlFor="region">Région</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger id="region">
                <SelectValue placeholder="Toutes les régions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les régions</SelectItem>
                <SelectItem value="gaule">Gaule</SelectItem>
                <SelectItem value="hispanie">Hispanie</SelectItem>
                <SelectItem value="germanie">Germanie</SelectItem>
                <SelectItem value="illyrie">Illyrie</SelectItem>
                <SelectItem value="grèce">Grèce</SelectItem>
                <SelectItem value="asie">Asie Mineure</SelectItem>
                <SelectItem value="levant">Levant</SelectItem>
                <SelectItem value="egypte">Égypte</SelectItem>
                <SelectItem value="afrique">Afrique</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Datepickers pour la période */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateFrom">Date début</Label>
              <DatePicker 
                date={dateFrom}
                setDate={setDateFrom}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTo">Date fin</Label>
              <DatePicker 
                date={dateTo}
                setDate={setDateTo}
              />
            </div>
          </div>
        </div>
        
        <SheetFooter className="flex justify-between">
          <Button variant="ghost" onClick={handleReset}>
            Réinitialiser
          </Button>
          <SheetClose asChild>
            <Button onClick={handleApplyFilters}>Appliquer</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
