
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDatabaseManager } from './hooks/useDatabaseManager';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download, Eye, Search, Expand, Filter } from 'lucide-react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { JsonView } from './JsonView';

export const DatabaseViewer: React.FC = () => {
  const { tableDetails, getTableData, exportTable } = useDatabaseManager();
  const [selectedTable, setSelectedTable] = useState(Object.keys(tableDetails)[0] || 'senateurs');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [viewRecord, setViewRecord] = useState<any>(null);
  const [filterField, setFilterField] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  // Récupérer les données de la table sélectionnée
  const allTableData = getTableData(selectedTable);
  
  // Extraire les champs de la première entrée pour les filtres
  const tableFields = allTableData.length > 0 
    ? Object.keys(allTableData[0]).filter(key => 
        typeof allTableData[0][key] !== 'object' && 
        typeof allTableData[0][key] !== 'function'
      )
    : [];
  
  // Filtrer les données
  const filteredData = allTableData
    .filter(item => {
      // Filtre par terme de recherche
      const matchesSearch = searchTerm.trim() === '' ? true : 
        Object.values(item).some(value => 
          value && typeof value === 'string' && 
          value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      // Filtre par champ spécifique
      const matchesFieldFilter = filterField && filterValue 
        ? String(item[filterField]).toLowerCase().includes(filterValue.toLowerCase())
        : true;
        
      return matchesSearch && matchesFieldFilter;
    });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Fonction pour obtenir les colonnes à afficher
  const getColumns = () => {
    if (paginatedData.length === 0) return [];
    
    const firstItem = paginatedData[0];
    const allKeys = Object.keys(firstItem);
    
    // Prioriser les champs importants
    const priorityFields = ['id', 'nom', 'name', 'titre', 'date', 'type', 'status', 'statut'];
    const priority = priorityFields.filter(field => allKeys.includes(field));
    
    // Ajouter des champs supplémentaires pour compléter
    const remaining = allKeys
      .filter(key => !priority.includes(key))
      .filter(key => {
        const value = firstItem[key];
        return typeof value !== 'object' || value === null;
      })
      .slice(0, 6 - priority.length);
    
    return [...priority, ...remaining];
  };

  const columns = getColumns();

  // Formatage des valeurs de cellule
  const formatCellValue = (value: any) => {
    if (value === undefined || value === null) {
      return <span className="text-muted-foreground">-</span>;
    }
    
    if (typeof value === 'boolean') {
      return value ? 'Oui' : 'Non';
    }
    
    if (typeof value === 'string' && value.length > 50) {
      return value.substring(0, 47) + '...';
    }
    
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return <Badge variant="outline">{value.length} éléments</Badge>;
      }
      return <Badge variant="outline">Objet</Badge>;
    }
    
    return String(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Explorateur de données</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 mb-4">
          <div className="flex space-x-4">
            <Select value={selectedTable} onValueChange={setSelectedTable}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Sélectionner une table" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(tableDetails).map(key => (
                  <SelectItem key={key} value={key}>
                    {tableDetails[key].name} ({tableDetails[key].recordCount})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1); // Réinitialiser à la première page lors de la recherche
                }}
                className="pl-8"
              />
            </div>
            
            <Button 
              variant="outline"
              onClick={() => exportTable(selectedTable)}
            >
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
          
          {/* Filtres avancés */}
          <div className="flex space-x-4">
            <Select value={filterField} onValueChange={setFilterField}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrer par champ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun filtre</SelectItem>
                {tableFields.map(field => (
                  <SelectItem key={field} value={field}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {filterField && (
              <div className="relative flex-1">
                <Filter className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`Filtrer par ${filterField}...`}
                  value={filterValue}
                  onChange={(e) => {
                    setFilterValue(e.target.value);
                    setPage(1); // Réinitialiser à la première page lors du filtrage
                  }}
                  className="pl-8"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column} className="font-medium">
                    {column}
                  </TableHead>
                ))}
                <TableHead className="w-16">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                    Aucune donnée à afficher
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item: any, index) => (
                  <TableRow key={item.id || index}>
                    {columns.map((column) => (
                      <TableCell key={column}>
                        {formatCellValue(item[column])}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setViewRecord(item)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Affichage de {(page - 1) * rowsPerPage + 1} à {Math.min(page * rowsPerPage, filteredData.length)} sur {filteredData.length} enregistrements
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Précédent
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Suivant
              </Button>
            </div>
          </div>
        )}
        
        {/* Modal pour afficher les détails d'un enregistrement */}
        <AlertDialog open={!!viewRecord} onOpenChange={(open) => !open && setViewRecord(null)}>
          <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex justify-between items-center">
                <span>Détails de l'enregistrement</span>
                <Badge>{selectedTable}</Badge>
              </AlertDialogTitle>
              <AlertDialogDescription className="sr-only">
                Visualisation détaillée de l'enregistrement
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <ScrollArea className="mt-2 max-h-[500px]">
              {viewRecord && <JsonView data={viewRecord} />}
            </ScrollArea>
            
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel>Fermer</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};
