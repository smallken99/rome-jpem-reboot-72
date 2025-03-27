
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Home, 
  MapPin, 
  Calendar, 
  DollarSign 
} from 'lucide-react';
import { formatCurrency } from '@/utils/currencyUtils';
import { Property, PropertyType } from '@/types/proprietes';

interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
  isSelected?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  isSelected = false
}) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(property);
    }
  };

  const getTypeIcon = (type: PropertyType) => {
    switch (type) {
      case 'villa':
        return <Home className="h-5 w-5 text-lime-600" />;
      case 'domus':
        return <Home className="h-5 w-5 text-indigo-600" />;
      case 'insula':
        return <Building className="h-5 w-5 text-amber-600" />;
      default:
        return <Building className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeLabel = (type: PropertyType): string => {
    switch (type) {
      case 'villa':
        return 'Villa Rustica';
      case 'domus':
        return 'Domus';
      case 'insula':
        return 'Insula';
      default:
        return 'Propriété';
    }
  };

  return (
    <Card 
      className={`cursor-pointer hover:border-blue-300 transition-all ${
        isSelected ? 'border-blue-500 bg-blue-50' : ''
      }`}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium">{property.name}</h3>
          <Badge variant="outline" className="capitalize">
            {getTypeLabel(property.type)}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="truncate">{property.location}</span>
          </div>
          
          <div className="flex items-center gap-1.5 justify-end">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>Acquis en {new Date(property.acquired).getFullYear()}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-emerald-500" />
            <span>{formatCurrency(property.income)} /an</span>
          </div>
          
          <div className="flex items-center gap-1.5 justify-end">
            <DollarSign className="h-4 w-4 text-red-500" />
            <span>{formatCurrency(property.maintenance)} /an</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
