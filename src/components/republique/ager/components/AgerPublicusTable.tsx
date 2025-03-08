
import React from 'react';
import { LandParcel } from '../types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface AgerPublicusTableProps {
  parcels: LandParcel[];
  isLoading: boolean;
  onSelectParcel: (parcel: LandParcel) => void;
}

export const AgerPublicusTable: React.FC<AgerPublicusTableProps> = ({ parcels, isLoading, onSelectParcel }) => {
  // Function to render the status badge
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case 'available':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Disponible</Badge>;
      case 'allocated':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Allouée</Badge>;
      case 'disputed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Contestée</Badge>;
      case 'protected':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Protégée</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  // Function to render the type badge
  const renderTypeBadge = (type: string) => {
    switch(type) {
      case 'cultivable':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Cultivable</Badge>;
      case 'pastoral':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pastorale</Badge>;
      case 'forest':
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Forestière</Badge>;
      case 'wetland':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Humide</Badge>;
      case 'rocky':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Rocheuse</Badge>;
      default:
        return <Badge variant="outline">Autre</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground italic">Chargement des données...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Taille (iugera)</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Valeur (as)</TableHead>
              <TableHead>Attribution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcels.length > 0 ? (
              parcels.map((parcel) => (
                <TableRow 
                  key={parcel.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSelectParcel(parcel)}
                >
                  <TableCell className="font-medium">{parcel.name}</TableCell>
                  <TableCell>{parcel.location}</TableCell>
                  <TableCell>{parcel.size.toLocaleString()}</TableCell>
                  <TableCell>{renderTypeBadge(parcel.type)}</TableCell>
                  <TableCell>{renderStatusBadge(parcel.status)}</TableCell>
                  <TableCell className="text-right">{parcel.value.toLocaleString()}</TableCell>
                  <TableCell>
                    {parcel.allocation?.familyName ? (
                      <span>{parcel.allocation.familyName}</span>
                    ) : (
                      <span className="text-muted-foreground italic">Non attribuée</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground italic">
                  Aucune parcelle trouvée.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
