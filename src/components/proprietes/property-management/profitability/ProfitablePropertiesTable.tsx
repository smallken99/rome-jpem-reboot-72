
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatCurrency } from '@/lib/utils';
import { ProfitablePropertiesTableProps } from './types/profitabilityTypes';

export const ProfitablePropertiesTable: React.FC<ProfitablePropertiesTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Propriété</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Revenus</TableHead>
            <TableHead className="text-right">Dépenses</TableHead>
            <TableHead className="text-right">Profit</TableHead>
            <TableHead className="text-right">Marge (%)</TableHead>
            <TableHead className="text-right">Rentabilité (%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.name}</TableCell>
              <TableCell>{property.type}</TableCell>
              <TableCell className="text-right">{formatCurrency(property.revenue)}</TableCell>
              <TableCell className="text-right">{formatCurrency(property.expenses)}</TableCell>
              <TableCell className="text-right font-semibold">
                {formatCurrency(property.profit)}
              </TableCell>
              <TableCell className="text-right">
                {property.profitMargin.toFixed(1)}%
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
