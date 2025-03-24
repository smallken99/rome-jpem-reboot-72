import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

export interface ActionButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  label: string;
  variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  to?: string; // Propriété pour le routage
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  title?: string; // Pour tooltip
  disabled?: boolean;
  showTooltip?: boolean;
  animateHover?: boolean;
  animateClick?: boolean;
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
  disabled = false,
  showTooltip = true,
  animateHover = true,
  animateClick = true,
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
      {icon && <span className={`${label ? 'mr-1.5' : ''}`}>{icon}</span>}
      {label && <span>{label}</span>}
    </>
  );
  
  const buttonElement = (
    <Button 
      variant={variant} 
      size={size} 
      className={cn(buttonClass, "flex items-center gap-1", className)}
      onClick={onClick}
      disabled={disabled}
      asChild={!!to}
      {...props}
    >
      {to ? (
        <Link to={to}>{buttonContent}</Link>
      ) : (
        buttonContent
      )}
    </Button>
  );
  
  // Décidez si nous devons animer le bouton
  const renderAnimatedButton = () => {
    if (!animateHover && !animateClick) {
      return buttonElement;
    }
    
    return (
      <motion.div
        whileHover={animateHover ? { scale: 1.03 } : undefined}
        whileTap={animateClick ? { scale: 0.97 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {buttonElement}
      </motion.div>
    );
  };
  
  // Si un titre est fourni et showTooltip est activé, envelopper avec un tooltip
  if (title && showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {renderAnimatedButton()}
          </TooltipTrigger>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  // Sinon, juste rendre le bouton
  return renderAnimatedButton();
};
