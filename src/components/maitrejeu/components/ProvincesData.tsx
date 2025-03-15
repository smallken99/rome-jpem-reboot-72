
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon, EyeIcon } from 'lucide-react';
import { Province } from '../types';

interface ProvincesDataProps {
  provinces: Province[];
  onViewProvince: (id: string) => void;
}

export const ProvincesData: React.FC<ProvincesDataProps> = ({ provinces, onViewProvince }) => {
  const [sortField, setSortField] = useState<keyof Province>('nom');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const handleSort = (field: keyof Province) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const getSortedProvinces = () => {
    let filteredProvinces = [...provinces];
    
    // Apply text filter
    if (filter) {
      const lowercaseFilter = filter.toLowerCase();
      filteredProvinces = filteredProvinces.filter(province =>
        province.nom.toLowerCase().includes(lowercaseFilter) ||
        province.gouverneur.toLowerCase().includes(lowercaseFilter) ||
        province.région.toLowerCase().includes(lowercaseFilter)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filteredProvinces = filteredProvinces.filter(province => {
        const lowerStatus = province.status.toLowerCase();
        return lowerStatus === statusFilter.toLowerCase();
      });
    }
    
    // Apply sorting
    return filteredProvinces.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];
      
      // Handle sorting for different types
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        if (sortDirection === 'asc') {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        if (sortDirection === 'asc') {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      }
      
      return 0;
    });
  };
  
  const sortedProvinces = getSortedProvinces();
  
  const renderSortIndicator = (field: keyof Province) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />;
    }
    return null;
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Statistiques des Provinces</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="text-blue-800 text-sm font-medium">Population Totale</div>
              <div className="text-2xl font-bold mt-1">
                {provinces.reduce((sum, province) => sum + province.population, 0).toLocaleString()}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <div className="text-green-800 text-sm font-medium">Revenus Totaux</div>
              <div className="text-2xl font-bold mt-1">
                {provinces.reduce((sum, province) => sum + (province.richesse || 0), 0).toLocaleString()} as
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-md">
              <div className="text-amber-800 text-sm font-medium">Provinces</div>
              <div className="text-2xl font-bold mt-1">
                {provinces.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="relative w-full md:w-64">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Rechercher une province..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="w-full md:w-auto">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="Pacifiée">Pacifiée</SelectItem>
              <SelectItem value="Instable">Instable</SelectItem>
              <SelectItem value="En guerre">En guerre</SelectItem>
              <SelectItem value="Rebelle">Rebelle</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort('nom')}>
                <div className="flex items-center gap-1">
                  Province {renderSortIndicator('nom')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('région')}>
                <div className="flex items-center gap-1">
                  Région {renderSortIndicator('région')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('gouverneur')}>
                <div className="flex items-center gap-1">
                  Gouverneur {renderSortIndicator('gouverneur')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort('population')}>
                <div className="flex items-center justify-end gap-1">
                  Population {renderSortIndicator('population')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort('loyauté')}>
                <div className="flex items-center justify-end gap-1">
                  Loyauté {renderSortIndicator('loyauté')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort('richesse')}>
                <div className="flex items-center justify-end gap-1">
                  Richesse {renderSortIndicator('richesse')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                <div className="flex items-center gap-1">
                  Statut {renderSortIndicator('status')}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProvinces.map((province) => (
              <TableRow key={province.id}>
                <TableCell className="font-medium">{province.nom}</TableCell>
                <TableCell>{province.région}</TableCell>
                <TableCell>{province.gouverneur || 'Aucun'}</TableCell>
                <TableCell className="text-right">{province.population.toLocaleString()}</TableCell>
                <TableCell className="text-right">{province.loyauté !== undefined ? `${province.loyauté}%` : 'N/A'}</TableCell>
                <TableCell className="text-right">{province.richesse !== undefined ? `${province.richesse.toLocaleString()} as` : '-'}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${province.status === 'Pacifiée' ? 'bg-green-100 text-green-800' : ''}
                    ${province.status === 'Instable' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${province.status === 'Rebelle' ? 'bg-red-100 text-red-800' : ''}
                    ${province.status === 'En guerre' ? 'bg-red-100 text-red-800' : ''}
                  `}>
                    {province.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewProvince(province.id)}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {sortedProvinces.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                  Aucune province trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
