
import React from 'react';
import { User, MapPin } from 'lucide-react';

interface ClientDetailsProps {
  subType: string;
  location: string;
}

export const ClientDetails: React.FC<ClientDetailsProps> = ({ subType, location }) => {
  return (
    <div className="space-y-2 mt-4">
      <div className="flex items-center text-sm text-muted-foreground">
        <User className="h-4 w-4 mr-2 text-rome-navy/70" />
        <span>{subType}</span>
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 mr-2 text-rome-navy/70" />
        <span>{location}</span>
      </div>
    </div>
  );
};
