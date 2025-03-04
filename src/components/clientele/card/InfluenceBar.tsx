
import React from 'react';
import { Star } from 'lucide-react';

interface InfluenceBarProps {
  level: number;
  color: string;
}

export const InfluenceBar: React.FC<InfluenceBarProps> = ({ level, color }) => {
  return (
    <div className="flex">
      {Array.from({ length: 10 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < level ? `${color} fill-current` : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};
