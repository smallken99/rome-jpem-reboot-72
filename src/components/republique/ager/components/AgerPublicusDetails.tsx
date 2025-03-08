
import React from 'react';
import { LandParcel } from '../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Edit, User, MapPin, Ruler, CircleDollarSign, CalendarDays } from 'lucide-react';

interface AgerPublicusDetailsProps {
  parcel: LandParcel;
  onClose: () => void;
}

export const AgerPublicusDetails: React.FC<AgerPublicusDetailsProps> = ({ parcel, onClose }) => {
  // Function to render the status badge
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Disponible</Badge>;
      case 'allocated':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Allouée</Badge>;
      case 'disputed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Contestée</Badge>;
      case 'protected':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Protégée</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  // Function to render type label
  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'cultivable': return 'Terre cultivable';
      case 'pastoral': return 'Terre pastorale';
      case 'forest': return 'Forêt';
      case 'wetland': return 'Zone humide';
      case 'rocky': return 'Terrain rocheux';
      default: return 'Type inconnu';
    }
  };

  return (
    <Card className="border border-muted-foreground/20">
      <CardHeader className="relative pb-2">
        <div className="absolute right-4 top-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </Button>
        </div>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          {parcel.name}
          {renderStatusBadge(parcel.status)}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {parcel.location}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1.5">
            <div className="text-sm text-muted-foreground">Type de terrain</div>
            <div className="font-medium">{getTypeLabel(parcel.type)}</div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <div className="text-sm text-muted-foreground">Taille</div>
            <div className="font-medium flex items-center gap-1">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              {parcel.size.toLocaleString()} iugera
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <div className="text-sm text-muted-foreground">Valeur estimée</div>
            <div className="font-medium flex items-center gap-1">
              <CircleDollarSign className="h-4 w-4 text-amber-600" />
              {parcel.value.toLocaleString()} as
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <div className="text-sm text-muted-foreground">Attribution</div>
            <div className="font-medium flex items-center gap-1">
              <User className="h-4 w-4 text-muted-foreground" />
              {parcel.allocation?.familyName ? (
                <span>{parcel.allocation.familyName}</span>
              ) : (
                <span className="text-muted-foreground italic">Non attribuée</span>
              )}
            </div>
          </div>
        </div>
        
        {parcel.allocation?.since && (
          <div className="mb-4">
            <div className="text-sm text-muted-foreground mb-1">Période d'attribution</div>
            <div className="flex items-center gap-1 text-sm">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>De {parcel.allocation.since} à {parcel.allocation.until || 'indéterminé'}</span>
            </div>
          </div>
        )}
        
        {parcel.resources && (
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Ressources</div>
            <div className="grid grid-cols-3 gap-2">
              {parcel.resources.fertility !== undefined && (
                <div className="bg-green-50 p-2 rounded-md text-center">
                  <div className="text-xs text-muted-foreground">Fertilité</div>
                  <div className="font-medium text-green-700">{parcel.resources.fertility}/10</div>
                </div>
              )}
              
              {parcel.resources.water !== undefined && (
                <div className="bg-blue-50 p-2 rounded-md text-center">
                  <div className="text-xs text-muted-foreground">Eau</div>
                  <div className="font-medium text-blue-700">{parcel.resources.water}/10</div>
                </div>
              )}
              
              {parcel.resources.minerals !== undefined && (
                <div className="bg-amber-50 p-2 rounded-md text-center">
                  <div className="text-xs text-muted-foreground">Minéraux</div>
                  <div className="font-medium text-amber-700">{parcel.resources.minerals}/10</div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {parcel.description && (
          <div className="mb-4">
            <div className="text-sm font-medium mb-1">Description</div>
            <p className="text-sm text-muted-foreground">{parcel.description}</p>
          </div>
        )}
      </CardContent>
      
      <Separator />
      
      <CardFooter className="flex justify-between pt-4">
        <Button variant="outline" onClick={onClose}>Fermer</Button>
        <Button className="roman-btn" disabled={parcel.status !== 'available'}>
          <Edit className="h-4 w-4 mr-2" />
          Gérer l'attribution
        </Button>
      </CardFooter>
    </Card>
  );
};
