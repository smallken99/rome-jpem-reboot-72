
import React from 'react';
import { Star } from 'lucide-react';

interface PreceptorQualityStarsProps {
  quality: number;
}

export const PreceptorQualityStars: React.FC<PreceptorQualityStarsProps> = ({ quality }) => {
  return (
    <div className="flex items-center gap-1">
      {Array(5).fill(0).map((_, index) => (
        <Star 
          key={index} 
          className={`h-4 w-4 ${index < quality ? 'text-rome-gold fill-rome-gold' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};
