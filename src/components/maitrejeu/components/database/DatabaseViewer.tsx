
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export const DatabaseViewer: React.FC = () => {
  const { familles, senateurs, provinces, lois } = useMaitreJeu();
  const [selectedTable, setSelectedTable] = useState('senateurs');
  const [searchTerm, setSearchTerm] = useState('');

  // Fonction pour obtenir les données filtrées en fonction de la table sélectionnée
  const getFilteredData = () => {
    let data = [];
    
    switch (selectedTable) {
      case 'familles':
        data = familles;
        break;
      case 'senateurs':
        data = senateurs;
        break;
      case 'provinces':
        data = provinces;
        break;
      case 'lois':
        data = lois;
        break;
      default:
        data = [];
    }
    
    if (searchTerm.trim() === '') return data;
    
    return data.filter((item: any) => 
      Object.values(item).some(value => 
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const filteredData = getFilteredData();

  // Fonction pour obtenir les colonnes en fonction de la table sélectionnée
  const getColumns = () => {
    if (filteredData.length === 0) return [];
    
    const firstItem = filteredData[0];
    return Object.keys(firstItem).filter(key => 
      typeof firstItem[key] !== 'object' && 
      typeof firstItem[key] !== 'function'
    ).slice(0, 5); // Limiter à 5 colonnes pour la lisibilité
  };

  const columns = getColumns();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Explorateur de données</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select value={selectedTable} onValueChange={setSelectedTable}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner une table" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="familles">Familles</SelectItem>
              <SelectItem value="senateurs">Sénateurs</SelectItem>
              <SelectItem value="provinces">Provinces</SelectItem>
              <SelectItem value="lois">Lois</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length || 1} className="h-24 text-center">
                    Aucune donnée à afficher
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.slice(0, 10).map((item: any, itemIndex) => (
                  <TableRow key={itemIndex}>
                    {columns.map((column, columnIndex) => (
                      <TableCell key={columnIndex}>
                        {item[column]?.toString()}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          
          {filteredData.length > 10 && (
            <div className="py-2 px-4 bg-muted/20 text-center text-sm text-muted-foreground">
              Affichage de 10 sur {filteredData.length} enregistrements
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
