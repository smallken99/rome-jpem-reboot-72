
import React, { useState, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search, Eye, Filter } from 'lucide-react';
import { CardContent, CardFooter } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { JsonView } from '../database/JsonView';

interface DatabaseTableProps {
  tableName: string;
  data: any[];
  onExport: () => void;
}

export const DatabaseTable: React.FC<DatabaseTableProps> = ({ 
  tableName, 
  data, 
  onExport 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const rowsPerPage = 10;
  
  // Filtrage des données
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(item => {
      return Object.entries(item).some(([key, value]) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return false;
      });
    });
  }, [data, searchTerm]);
  
  // Pagination
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);
  
  // Colonnes à afficher (limiter à un nombre raisonnable)
  const columns = useMemo(() => {
    if (data.length === 0) return [];
    
    // Prioriser les champs communs importants
    const priorityFields = ['id', 'nom', 'titre', 'name', 'date', 'statut', 'status'];
    const sample = data[0];
    
    // Récupérer toutes les clés puis filtrer pour limiter à 6 colonnes max
    let keys = Object.keys(sample);
    
    // D'abord les champs prioritaires s'ils existent
    const priority = priorityFields.filter(field => keys.includes(field));
    
    // Puis compléter avec d'autres champs (en excluant les objets/tableaux complexes)
    const remaining = keys
      .filter(key => !priority.includes(key))
      .filter(key => {
        const value = sample[key];
        return typeof value !== 'object' || value === null;
      })
      .slice(0, 6 - priority.length);
    
    return [...priority, ...remaining];
  }, [data]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucune donnée disponible pour cette table
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="py-1 px-2">
            {filteredData.length} entrées
          </Badge>
          
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>
      
      {selectedItem ? (
        <JsonView 
          data={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      ) : (
        <div className="rounded-md border">
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
              {paginatedData.map((item, index) => (
                <TableRow key={item.id || index}>
                  {columns.map((column) => (
                    <TableCell key={column}>
                      {renderCellValue(item[column])}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setSelectedItem(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {page} sur {totalPages}
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
    </div>
  );
};

// Fonction pour rendre les valeurs des cellules
function renderCellValue(value: any): React.ReactNode {
  if (value === undefined || value === null) {
    return <span className="text-muted-foreground">-</span>;
  }
  
  if (typeof value === 'boolean') {
    return value ? 'Oui' : 'Non';
  }
  
  if (typeof value === 'string' || typeof value === 'number') {
    // Limiter la longueur des chaînes de caractères
    if (typeof value === 'string' && value.length > 50) {
      return value.substring(0, 47) + '...';
    }
    return value;
  }
  
  if (Array.isArray(value)) {
    return <Badge variant="outline">{value.length} éléments</Badge>;
  }
  
  if (typeof value === 'object') {
    return <Badge variant="outline">Objet</Badge>;
  }
  
  return String(value);
}
