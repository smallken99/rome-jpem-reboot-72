
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Wheat, ArrowUpDown, User, Eye } from 'lucide-react';

// Interface pour les données de terre
interface Land {
  id: string;
  name: string;
  location: string;
  description: string;
  size: string;
  type: string;
  value: number;
  status: 'available' | 'allocated' | 'reserved';
  allocatedTo?: string;
  revenue?: number;
}

interface AgerAllocationTableProps {
  lands: Land[];
  type: 'available' | 'allocated';
  onSelect: (id: string) => void;
  onOpenDialog: (open: boolean) => void;
}

export const AgerAllocationTable: React.FC<AgerAllocationTableProps> = ({ 
  lands, 
  type,
  onSelect,
  onOpenDialog
}) => {
  const handleAction = (id: string) => {
    onSelect(id);
    onOpenDialog(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Disponible</Badge>;
      case 'allocated':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Attribuée</Badge>;
      case 'reserved':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Réservée</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">
            {type === 'available' ? 'Terres Disponibles' : 'Terres Attribuées'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {type === 'available' 
              ? 'Terres publiques pouvant être attribuées aux citoyens romains'
              : 'Terres publiques déjà concédées à des citoyens ou colons'}
          </p>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-cinzel">Nom</TableHead>
              <TableHead className="font-cinzel">Localisation</TableHead>
              <TableHead className="font-cinzel">Type</TableHead>
              <TableHead className="font-cinzel">
                <div className="flex items-center">
                  Superficie
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="font-cinzel">
                <div className="flex items-center">
                  Valeur
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              {type === 'allocated' && (
                <>
                  <TableHead className="font-cinzel">Attribuée à</TableHead>
                  <TableHead className="font-cinzel">Revenus</TableHead>
                </>
              )}
              <TableHead className="font-cinzel">Statut</TableHead>
              <TableHead className="font-cinzel">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lands.map((land) => (
              <TableRow key={land.id}>
                <TableCell className="font-medium">{land.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-rome-terracotta" />
                    {land.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Wheat className="h-4 w-4 mr-2 text-amber-600" />
                    {land.type}
                  </div>
                </TableCell>
                <TableCell>{land.size}</TableCell>
                <TableCell>{land.value.toLocaleString()} As</TableCell>
                {type === 'allocated' && (
                  <>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-600" />
                        {land.allocatedTo}
                      </div>
                    </TableCell>
                    <TableCell>{land.revenue?.toLocaleString()} As/an</TableCell>
                  </>
                )}
                <TableCell>{getStatusBadge(land.status)}</TableCell>
                <TableCell>
                  {type === 'available' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs font-medium roman-btn-outline"
                      onClick={() => handleAction(land.id)}
                    >
                      Attribuer
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleAction(land.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
