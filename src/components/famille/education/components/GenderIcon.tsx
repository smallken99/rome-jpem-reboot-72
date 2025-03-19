
import React from 'react';
import { MaleIcon, FemaleIcon } from 'lucide-react';

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
    return <MaleIcon size={size} className={`text-blue-500 ${className}`} />;
  }
  
  return <FemaleIcon size={size} className={`text-pink-500 ${className}`} />;
};
