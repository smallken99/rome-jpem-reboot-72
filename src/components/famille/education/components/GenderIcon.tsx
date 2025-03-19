
import React from 'react';
import { Male, Female } from 'lucide-react';

interface GenderIconProps {
  gender: 'male' | 'female';
  size?: number;
  className?: string;
}

export const GenderIcon: React.FC<GenderIconProps> = ({ 
  gender, 
  size = 16, 
  className = "" 
}) => {
  if (gender === 'male') {
    return <Male size={size} className={`text-blue-500 ${className}`} />;
  }
  
  return <Female size={size} className={`text-pink-500 ${className}`} />;
};
