
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ActionButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  label: string;
  variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  to?: string; // Property for routing
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  title?: string; // For tooltip
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  label, 
  variant = 'default', 
  size = 'sm',
  className = '',
  to,
  onClick,
  title,
  ...props 
}) => {
  // Determine class to use based on variant
  const getButtonClass = () => {
    switch (variant) {
      case 'default':
        return 'roman-btn';
      case 'destructive':
        return '';
      case 'secondary':
        return 'roman-btn-secondary';
      case 'outline':
        return 'roman-btn-outline';
      default:
        return '';
    }
  };
  
  const buttonClass = getButtonClass();
  const buttonContent = (
    <>
      {icon && <span className="mr-1">{icon}</span>}
      {label && <span>{label}</span>}
    </>
  );
  
  // If a redirect path is provided, use Link
  if (to) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        className={cn(buttonClass, "flex items-center gap-1", className)}
        title={title}
        asChild
        {...props}
      >
        <Link to={to}>
          {buttonContent}
        </Link>
      </Button>
    );
  }
  
  // Sinon, utilisons un bouton standard
  return (
    <Button 
      variant={variant} 
      size={size} 
      className={cn(buttonClass, "flex items-center gap-1", className)}
      onClick={onClick}
      title={title}
      {...props}
    >
      {buttonContent}
    </Button>
  );
};
