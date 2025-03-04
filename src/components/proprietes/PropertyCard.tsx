
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Home, 
  LandPlot,
  MapPin
} from 'lucide-react';

// Update the PropertyType to include all used types in the application
type PropertyType = 'villa' | 'insulae' | 'terres' | 'Résidence principale' | 'Immeuble de rapport' | 
  'Résidence secondaire' | 'Commerces' | 'Villa agricole' | 'Exploitation viticole' | 'Exploitation oléicole';

interface PropertyCardProps {
  name: string;
  location: string;
  value: string;
  type: PropertyType;
  status: string;
  image?: string;
  imageUrl?: string; // Added to support current usage
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  name, 
  location, 
  value, 
  type, 
  status,
  image,
  imageUrl
}) => {
  // Use imageUrl as fallback if image is not provided
  const displayImage = image || imageUrl || '/placeholder.svg';

  const getIcon = () => {
    switch (type.toLowerCase()) {
      case 'villa':
      case 'résidence principale':
      case 'résidence secondaire':
      case 'villa agricole':
        return <Home className="h-5 w-5" />;
      case 'insulae':
      case 'immeuble de rapport':
      case 'commerces':
        return <Building className="h-5 w-5" />;
      case 'terres':
      case 'exploitation viticole':
      case 'exploitation oléicole':
        return <LandPlot className="h-5 w-5" />;
      default:
        return <Building className="h-5 w-5" />;
    }
  };

  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'excellent':
      case 'excellente':
        return 'text-green-600';
      case 'bon':
      case 'bonne':
      case 'très bon':
        return 'text-green-500';
      case 'moyen':
      case 'moyenne':
        return 'text-yellow-500';
      case 'mauvais':
      case 'mauvaise':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="rounded-md overflow-hidden border border-rome-gold/30 hover:border-rome-gold transition-all bg-white/90">
      <div className="relative h-40 bg-gray-200">
        <img 
          src={displayImage} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
          {getIcon()}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-cinzel text-lg font-semibold text-rome-navy">{name}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-3 w-3 mr-1" /> 
          {location}
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="flex justify-between text-sm">
            <span>Valeur:</span>
            <span className="font-bold">{value}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>État:</span>
            <span className={`font-bold ${getStatusColor()}`}>{status}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between gap-2">
          <Button variant="outline" className="roman-btn-outline text-xs flex-1">Gérer</Button>
          <Button variant="outline" className="roman-btn-outline text-xs flex-1">Détails</Button>
        </div>
      </div>
    </div>
  );
};
