
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProfitablePropertiesTableProps } from '../types/profitabilityTypes';

export const ProfitablePropertiesTable: React.FC<ProfitablePropertiesTableProps> = ({ 
  properties,
  activeView
}) => {
  return (
    <Card className="border-rome-gold/30">
      <CardHeader className="pb-2">
        <CardTitle className="font-cinzel text-lg">
          Rentabilité des Propriétés {activeView === 'yearly' ? '(Annuelle)' : '(Mensuelle)'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Propriété</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Revenus</TableHead>
              <TableHead className="text-right">Dépenses</TableHead>
              <TableHead className="text-right">Profit</TableHead>
              <TableHead className="text-right">Marge (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.name}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell className="text-right text-green-600">
                  {property.revenue.toLocaleString()} As
                </TableCell>
                <TableCell className="text-right text-red-600">
                  {property.expenses.toLocaleString()} As
                </TableCell>
                <TableCell className="text-right font-medium">
                  {property.profit.toLocaleString()} As
                </TableCell>
                <TableCell className="text-right">
                  <span className={property.profitMargin > 0 ? 'text-green-600' : 'text-red-600'}>
                    {property.profitMargin.toFixed(1)}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
