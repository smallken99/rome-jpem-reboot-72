
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ActionButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  label: string;
  variant?: 'default' | 'outline' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  to?: string; // Ajout d'une propriété pour la redirection
  onClick?: (e: React.MouseEvent) => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  label, 
  variant = 'default', 
  size = 'sm',
  className = '',
  to,
  onClick,
  ...props 
}) => {
  // Détermine la classe à utiliser en fonction du variant
  const buttonClass = variant === 'default' 
    ? 'roman-btn' 
    : variant === 'destructive' 
      ? '' 
      : 'roman-btn-outline';
  
  // Si un chemin de redirection est fourni, utilisons Link
  if (to) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        className={`${buttonClass} flex items-center gap-1 ${className}`}
        asChild
        {...props}
      >
        <Link to={to}>
          {icon && icon}
          {label}
        </Link>
      </Button>
    );
  }
  
  // Sinon, utilisons un bouton standard
  return (
    <Button 
      variant={variant} 
      size={size} 
      className={`${buttonClass} flex items-center gap-1 ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && icon}
      {label}
    </Button>
  );
};
