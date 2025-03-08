
import React from 'react';
import { LandParcel } from '../types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, ShieldPlus, Eye } from 'lucide-react';

interface AgerPublicusTableProps {
  parcels: LandParcel[];
  isLoading: boolean;
  onSelectParcel: (parcel: LandParcel) => void;
}

export const AgerPublicusTable: React.FC<AgerPublicusTableProps> = ({
  parcels,
  isLoading,
  onSelectParcel
}) => {
  // Fonction pour obtenir la couleur de badge de statut
  const getStatusBadge = (status: LandParcel['status']) => {
    switch (status) {
      case 'allocated':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">Allouée</Badge>;
      case 'available':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Disponible</Badge>;
      case 'disputed':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700">Disputée</Badge>;
      case 'protected':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700">Protégée</Badge>;
      default:
        return <Badge variant="outline">Inconnue</Badge>;
    }
  };
  
  // Fonction pour obtenir la couleur en fonction de l'efficacité
  const getEfficiencyColor = (efficiency?: number) => {
    if (!efficiency) return 'bg-gray-200';
    if (efficiency >= 80) return 'bg-emerald-500';
    if (efficiency >= 60) return 'bg-green-500';
    if (efficiency >= 40) return 'bg-yellow-500';
    if (efficiency >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  // Fonction pour obtenir le badge du type de parcelle
  const getTypeLabel = (type: LandParcel['type']) => {
    switch (type) {
      case 'cultivable':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Cultivable</Badge>;
      case 'pastoral':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pâturage</Badge>;
      case 'forest':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Forêt</Badge>;
      case 'wetland':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Zone humide</Badge>;
      case 'rocky':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Rocailleuse</Badge>;
      default:
        return <Badge variant="outline">Autre</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        Chargement des données...
      </div>
    );
  }
  
  return (
    <Table>
      <TableCaption>
        Liste des parcelles de l'Ager Publicus - {parcels.length} parcelles enregistrées
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Localisation</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Taille</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Main d'œuvre</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parcels.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-4">
              Aucune parcelle trouvée
            </TableCell>
          </TableRow>
        ) : (
          parcels.map((parcel) => (
            <TableRow key={parcel.id}>
              <TableCell className="font-medium">{parcel.name}</TableCell>
              <TableCell>{parcel.location}</TableCell>
              <TableCell>{getTypeLabel(parcel.type)}</TableCell>
              <TableCell>{parcel.size.toLocaleString()} iugera</TableCell>
              <TableCell>
                {getStatusBadge(parcel.status)}
                {parcel.allocation?.familyName && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Famille {parcel.allocation.familyName}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {((parcel.workforce?.magistrates || 0) + 
                      (parcel.workforce?.overseers || 0) + 
                      (parcel.workforce?.publicSlaves || 0)) || 0}
                  </span>
                </div>
                
                {parcel.workforce?.efficiency !== undefined && (
                  <div className="mt-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={parcel.workforce.efficiency} 
                        className={`h-2 w-20 ${getEfficiencyColor(parcel.workforce.efficiency)}`} 
                      />
                      <span className="text-xs">{parcel.workforce.efficiency}%</span>
                    </div>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-2" 
                    onClick={() => onSelectParcel(parcel)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Voir détails</span>
                  </Button>
                  {parcel.status !== 'allocated' && parcel.status !== 'protected' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2"
                    >
                      <ShieldPlus className="h-4 w-4" />
                      <span className="sr-only">Protéger</span>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
