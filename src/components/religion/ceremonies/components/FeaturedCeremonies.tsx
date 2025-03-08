
import React from 'react';
import { Ceremony } from '../types';
import { CeremonyCard } from './CeremonyCard';

interface FeaturedCeremoniesProps {
  ceremonies: Ceremony[];
}

export const FeaturedCeremonies: React.FC<FeaturedCeremoniesProps> = ({ ceremonies }) => {
  // Display only the first 3 ceremonies
  const featuredCeremonies = ceremonies.slice(0, 3);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {featuredCeremonies.map(ceremony => (
        <CeremonyCard key={ceremony.id} ceremony={ceremony} />
      ))}
    </div>
  );
};
