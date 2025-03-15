
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfitablePropertiesTableProps } from './types/profitabilityTypes';

export const ProfitablePropertiesTable: React.FC<ProfitablePropertiesTableProps> = ({ 
  properties, 
  sortBy, 
  onSortChange,
  activeView
}) => {
  const handleSort = (column: string) => {
    if (onSortChange) {
      onSortChange(column);
    }
  };
  
  // Get profit margin color
  const getProfitMarginColor = (margin: number) => {
    if (margin > 50) return 'bg-green-100 text-green-800 border-green-300';
    if (margin > 20) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (margin > 0) return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Propriété</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSort('revenue')}
                className="h-8 flex items-center gap-1 -ml-3"
              >
                <span>Revenu</span>
                <ArrowUpDown className="h-3.5 w-3.5" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSort('expenses')}
                className="h-8 flex items-center gap-1 -ml-3"
              >
                <span>Dépenses</span>
                <ArrowUpDown className="h-3.5 w-3.5" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSort('profit')}
                className="h-8 flex items-center gap-1 -ml-3"
              >
                <span>Profit</span>
                <ArrowUpDown className="h-3.5 w-3.5" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSort('profitMargin')}
                className="h-8 flex items-center gap-1 -ml-3"
              >
                <span>Marge</span>
                <ArrowUpDown className="h-3.5 w-3.5" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleSort('roi')}
                className="h-8 flex items-center gap-1 -ml-3"
              >
                <span>ROI</span>
                <ArrowUpDown className="h-3.5 w-3.5" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.name}</TableCell>
              <TableCell>{property.type}</TableCell>
              <TableCell className="text-right">{property.revenue.toLocaleString()} As</TableCell>
              <TableCell className="text-right">{property.expenses.toLocaleString()} As</TableCell>
              <TableCell className="text-right font-medium">
                {property.profit.toLocaleString()} As
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="outline" className={getProfitMarginColor(property.profitMargin)}>
                  {property.profitMargin.toFixed(1)}%
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {property.roi.toFixed(1)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
