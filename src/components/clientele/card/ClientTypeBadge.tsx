
import React from 'react';
import { 
  ShoppingBag,
  LandmarkIcon,
  BookOpen,
  Skull,
  Building,
  User
} from 'lucide-react';
import { ClientType } from '../ClientCard';

interface ClientTypeBadgeProps {
  type: ClientType;
}

export const ClientTypeBadge: React.FC<ClientTypeBadgeProps> = ({ type }) => {
  const getClientTypeIcon = () => {
    switch (type) {
      case 'artisan_commercant':
        return <ShoppingBag className="h-5 w-5 text-blue-600" />;
      case 'politicien':
        return <LandmarkIcon className="h-5 w-5 text-purple-600" />;
      case 'religieux':
        return <BookOpen className="h-5 w-5 text-amber-600" />;
      case 'proprietaire':
        return <Building className="h-5 w-5 text-green-600" />;
      case 'pegre':
        return <Skull className="h-5 w-5 text-red-600" />;
      default:
        return <User className="h-5 w-5 text-gray-600" />;
    }
  };

  return getClientTypeIcon();
};
