
import { Sword, Building, ScrollText, ShieldQuestion, Coins } from 'lucide-react';
import React from 'react';

// Options interface for the icons
interface IconOptions {
  size?: number;
  className?: string;
}

// Get education type icon based on type
export const getEducationTypeIcon = (type: string, options?: IconOptions) => {
  const size = options?.size || 16;
  const className = options?.className || "";
  
  switch(type) {
    case 'military':
      return <Sword className={`h-${size/4} w-${size/4} ${className}`} size={size} />;
    case 'political':
      return <Building className={`h-${size/4} w-${size/4} ${className}`} size={size} />;
    case 'commercial':
      return <Coins className={`h-${size/4} w-${size/4} ${className}`} size={size} />;
    case 'religious':
      return <ScrollText className={`h-${size/4} w-${size/4} ${className}`} size={size} />;
    default:
      return <ShieldQuestion className={`h-${size/4} w-${size/4} ${className}`} size={size} />;
  }
};

// Get education type name based on type
export const getEducationTypeName = (type: string) => {
  switch(type) {
    case 'military':
      return 'Militaire';
    case 'political':
      return 'Politique';
    case 'commercial':
      return 'Commerce';
    case 'religious':
      return 'Religieuse';
    default:
      return 'Aucune';
  }
};

// Get related stat name based on education type
export const getRelatedStatName = (type: string): string => {
  switch(type) {
    case 'military':
      return 'Éducation Martiale';
    case 'political':
      return 'Éloquence';
    case 'religious':
      return 'Piété';
    case 'commercial':
      return 'Commerce';
    default:
      return 'Caractéristique';
  }
};
