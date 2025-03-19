
import React from 'react';
import { Mars, Venus } from 'lucide-react';

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
    return <Mars size={size} className={`text-blue-500 ${className}`} />;
  }
  
  return <Venus size={size} className={`text-pink-500 ${className}`} />;
};
