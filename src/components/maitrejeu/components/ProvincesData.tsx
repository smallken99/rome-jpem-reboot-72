import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Province, ProvincesDataProps } from '../types/compatibilityAdapter';

interface DataTableSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const DataTableSearch: React.FC<DataTableSearchProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Search className="h-4 w-4 text-gray-500" />
      <Input
        placeholder="Rechercher une province..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="max-w-sm h-8"
      />
    </div>
  );
};

interface DataTableFilterProps {
  filter: string | null;
  onFilterChange: (filter: string | null) => void;
}

const DataTableFilter: React.FC<DataTableFilterProps> = ({ filter, onFilterChange }) => {
  return (
    <Select value={filter || "all"} onValueChange={onFilterChange}>
      <SelectTrigger className="w-[180px] h-8 text-xs">
        <SelectValue placeholder="Filtrer par statut" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tous les statuts</SelectItem>
        <SelectItem value="pacifiée">Pacifiée</SelectItem>
        <SelectItem value="instable">Instable</SelectItem>
        <SelectItem value="rebelle">Rebelle</SelectItem>
        <SelectItem value="conquise">Conquise</SelectItem>
      </SelectContent>
    </Select>
  );
};

interface DataTableSortProps {
  sortColumn: string | null;
  sortOrder: 'asc' | 'desc' | null;
  onSort: (column: string) => void;
}

const DataTableSort: React.FC<DataTableSortProps> = ({ sortColumn, sortOrder, onSort }) => {
  const handleSort = (column: string) => {
    onSort(column);
  };

  const getSortIcon = (column: string) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? <ArrowUpDown className="h-4 w-4 ml-1" /> : <ArrowUpDown className="h-4 w-4 ml-1 rotate-180" />;
    }
    return <ArrowUpDown className="h-4 w-4 ml-1 opacity-0" />;
  };

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm" onClick={() => handleSort('name')}>
        Nom {getSortIcon('name')}
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleSort('region')}>
        Région {getSortIcon('region')}
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleSort('status')}>
        Statut {getSortIcon('status')}
      </Button>
    </div>
  );
};

export const ProvincesData: React.FC<ProvincesDataProps> = ({ provinces }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [provinceDetails, setProvinceDetails] = useState<Province | null>(null);

  const filteredProvinces = provinces.filter((province) => {
    const searchMatch = province.name.toLowerCase().includes(search.toLowerCase());
    const filterMatch = filter ? province.status === filter : true;
    return searchMatch && filterMatch;
  });

  const sortedProvinces = [...filteredProvinces].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = a[sortColumn as keyof Province];
    const bValue = b[sortColumn as keyof Province];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue);
      return sortOrder === 'asc' ? comparison : -comparison;
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : null);
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Données des Provinces</CardTitle>
        <CardDescription>
          Informations détaillées sur chaque province de la République.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <DataTableSearch value={search} onChange={setSearch} />
          <div className="flex items-center space-x-2">
            <DataTableFilter filter={filter} onFilterChange={setFilter} />
            <DataTableSort sortColumn={sortColumn} sortOrder={sortOrder} onSort={handleSort} />
          </div>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Région</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProvinces.map((province) => (
                <TableRow key={province.id}>
                  <TableCell>{province.name}</TableCell>
                  <TableCell>{province.region}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{province.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => setProvinceDetails(province)}>
                      Voir Détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Dialog open={!!provinceDetails} onOpenChange={() => setProvinceDetails(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{provinceDetails?.name}</DialogTitle>
          </DialogHeader>
          {provinceDetails && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Région:</p>
                  <p>{provinceDetails.region}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Statut:</p>
                  <p>{provinceDetails.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Population:</p>
                  <p>{provinceDetails.population}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Loyauté:</p>
                  <p>{provinceDetails.loyalty}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Description:</p>
                <p>{provinceDetails.description}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setProvinceDetails(null)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
