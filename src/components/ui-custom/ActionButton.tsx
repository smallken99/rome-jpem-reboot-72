
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  label: string;
  variant?: 'default' | 'outline' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  label, 
  variant = 'default', 
  size = 'sm',
  className = '',
  ...props 
}) => {
  // Détermine la classe à utiliser en fonction du variant
  const buttonClass = variant === 'default' 
    ? 'roman-btn' 
    : variant === 'destructive' 
      ? '' 
      : 'roman-btn-outline';
  
  return (
    <Button 
      variant={variant} 
      size={size} 
      className={`${buttonClass} flex items-center gap-1 ${className}`}
      {...props}
    >
      {icon && icon}
      {label}
    </Button>
  );
};
