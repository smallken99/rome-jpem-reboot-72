
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Home, 
  LandPlot,
  MapPin,
  Church,
  Landmark,
  Castle,
  Wheat,
  TreeDeciduous,
  Utensils,
  Tractor
} from 'lucide-react';

// Update the PropertyType to include all property types
type PropertyType = 
  // Urban Properties
  'villa' | 'domus' | 'insulae' | 
  // Public Buildings
  'statue' | 'thermes' | 'maison_indigents' |
  // Religious Buildings
  'statuaire' | 'autel' | 'temple' |
  // Rural Properties
  'domaine_cereales' | 'domaine_vignoble' | 'domaine_oliviers' |
  'paturage_equides' | 'paturage_bovins' | 'paturage_moutons' |
  // Legacy types (for compatibility)
  'Résidence principale' | 'Immeuble de rapport' | 'Résidence secondaire' | 
  'Commerces' | 'Villa agricole' | 'Exploitation viticole' | 'Exploitation oléicole';

// Property size types
type PropertySize = 'petit' | 'moyen' | 'grand' | null;

interface PropertyCardProps {
  name: string;
  location: string;
  value: string;
  type: PropertyType;
  size?: PropertySize;
  status: string;
  revenue?: string;
  maintenance?: string;
  benefits?: string[];
  image?: string;
  imageUrl?: string; // For backward compatibility
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  name, 
  location, 
  value, 
  type, 
  size = null,
  status,
  revenue,
  maintenance,
  benefits,
  image,
  imageUrl
}) => {
  // Use imageUrl as fallback if image is not provided
  const displayImage = image || imageUrl || '/placeholder.svg';

  const getIcon = () => {
    // Urban - Residential
    if (type.includes('villa') || type === 'Résidence principale' || type === 'Résidence secondaire' || type === 'Villa agricole') {
      return <Home className="h-5 w-5" />;
    }
    // Urban - Residential/Commercial
    if (type.includes('insulae') || type === 'Immeuble de rapport' || type === 'Commerces') {
      return <Building className="h-5 w-5" />;
    }
    // Urban - Residential
    if (type.includes('domus')) {
      return <Castle className="h-5 w-5" />;
    }
    // Urban - Religious
    if (type.includes('temple') || type.includes('autel') || type.includes('statuaire')) {
      return <Church className="h-5 w-5" />;
    }
    // Urban - Public
    if (type.includes('thermes') || type.includes('statue') || type.includes('maison_indigents')) {
      return <Landmark className="h-5 w-5" />;
    }
    // Rural - Agricultural
    if (type.includes('domaine_') || type === 'Exploitation viticole' || type === 'Exploitation oléicole') {
      if (type.includes('cereales')) return <Wheat className="h-5 w-5" />;
      if (type.includes('vignoble')) return <Utensils className="h-5 w-5" />; // Using Utensils for vineyard
      if (type.includes('oliviers')) return <TreeDeciduous className="h-5 w-5" />;
      return <TreeDeciduous className="h-5 w-5" />; // Default rural icon
    }
    // Rural - Pasture
    if (type.includes('paturage_')) {
      return <Tractor className="h-5 w-5" />; // Replacing Horse with Tractor
    }
    
    // Default
    return <Building className="h-5 w-5" />;
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

  const getSizeLabel = () => {
    if (!size) return '';
    return `(${size.charAt(0).toUpperCase() + size.slice(1)})`;
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
        <h3 className="font-cinzel text-lg font-semibold text-rome-navy">
          {name} {getSizeLabel()}
        </h3>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-3 w-3 mr-1" /> 
          {location}
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="flex justify-between text-sm">
            <span>Valeur:</span>
            <span className="font-bold">{value}</span>
          </div>
          {maintenance && (
            <div className="flex justify-between text-sm">
              <span>Entretien:</span>
              <span className="font-medium text-red-600">{maintenance}</span>
            </div>
          )}
          {revenue && (
            <div className="flex justify-between text-sm">
              <span>Revenu:</span>
              <span className="font-medium text-green-600">{revenue}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span>État:</span>
            <span className={`font-bold ${getStatusColor()}`}>{status}</span>
          </div>
        </div>
        
        {benefits && benefits.length > 0 && (
          <div className="mt-3 pt-2 border-t border-rome-gold/20">
            <p className="text-xs text-muted-foreground mb-1">Avantages:</p>
            <ul className="text-xs space-y-1">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-1 text-rome-gold">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-4 flex justify-between gap-2">
          <Button variant="outline" className="roman-btn-outline text-xs flex-1">Gérer</Button>
          <Button variant="outline" className="roman-btn-outline text-xs flex-1">Détails</Button>
        </div>
      </div>
    </div>
  );
};
