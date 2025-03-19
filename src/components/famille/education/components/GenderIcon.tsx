
import React from 'react';
import { UserRound, CircleUser } from 'lucide-react';

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
    return <UserRound size={size} className={`text-blue-500 ${className}`} />;
  }
  
  return <CircleUser size={size} className={`text-pink-500 ${className}`} />;
};
