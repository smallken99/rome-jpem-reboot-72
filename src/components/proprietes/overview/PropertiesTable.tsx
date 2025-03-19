
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { Property } from '@/types/patrimoine';
import { formatCurrency } from '@/utils/currencyUtils';
import { Eye, Edit, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PropertiesTable: React.FC = () => {
  const { properties, sellProperty } = usePatrimoine();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const navigate = useNavigate();
  
  const handlePropertyView = (id: string) => {
    navigate(`/patrimoine/proprietes/${id}`);
  };
  
  const handlePropertyEdit = (id: string) => {
    navigate(`/patrimoine/proprietes/${id}/edit`);
  };
  
  const handlePropertyDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir vendre cette propriété?')) {
      sellProperty(id);
    }
  };
  
  const getConditionBadge = (condition: number) => {
    if (condition >= 90) return <Badge className="bg-green-500">Excellent</Badge>;
    if (condition >= 70) return <Badge className="bg-emerald-500">Bon</Badge>;
    if (condition >= 50) return <Badge className="bg-yellow-500">Moyen</Badge>;
    if (condition >= 30) return <Badge className="bg-orange-500">Mauvais</Badge>;
    return <Badge className="bg-red-500">Critique</Badge>;
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Lieu</TableHead>
          <TableHead>Valeur</TableHead>
          <TableHead>Revenus</TableHead>
          <TableHead>État</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <TableRow key={property.id}>
            <TableCell className="font-medium">{property.name}</TableCell>
            <TableCell>{property.type}</TableCell>
            <TableCell>{property.location}</TableCell>
            <TableCell>{formatCurrency(property.value)}</TableCell>
            <TableCell>{formatCurrency(property.income)}</TableCell>
            <TableCell>{getConditionBadge(property.condition)}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handlePropertyView(property.id)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handlePropertyEdit(property.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handlePropertyDelete(property.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
