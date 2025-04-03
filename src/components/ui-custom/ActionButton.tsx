
import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, X } from 'lucide-react';

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  label?: string;
  description?: string;
  rightIcon?: ReactNode;
  rightText?: string;
  showBadge?: boolean;
  badgeText?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  showTooltip?: boolean;
  tooltipContent?: ReactNode;
  success?: boolean;
  error?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  fullWidth?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({
    icon,
    label,
    description,
    rightIcon,
    rightText,
    showBadge = false,
    badgeText,
    badgeVariant = 'secondary',
    showTooltip = false,
    tooltipContent,
    success = false,
    error = false,
    variant = 'default',
    size = 'default',
    fullWidth = false,
    className,
    onClick,
    children,
    ...props
  }, ref) => {
    // Déterminer l'icône d'état
    let statusIcon = rightIcon;
    if (success) statusIcon = <Check className="h-4 w-4 text-green-500" />;
    if (error) statusIcon = <X className="h-4 w-4 text-red-500" />;
    
    const button = (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        onClick={onClick}
        className={cn(
          "flex items-center",
          fullWidth && "w-full",
          description && "flex-col items-start",
          rightText && "justify-between",
          className
        )}
        {...props}
      >
        <div className="flex items-center">
          {icon && <span className={cn("mr-2", !label && !children && "mr-0")}>{icon}</span>}
          
          <div className={cn("flex flex-col", !description && "flex-row items-center")}>
            {label && <span>{label}</span>}
            {description && <span className="text-xs text-muted-foreground">{description}</span>}
            {children}
          </div>
        </div>
        
        <div className="flex items-center">
          {showBadge && badgeText && (
            <Badge variant={badgeVariant} className="ml-2">
              {badgeText}
            </Badge>
          )}
          
          {rightText && <span className="ml-2 text-sm">{rightText}</span>}
          
          {statusIcon && <span className="ml-2">{statusIcon}</span>}
          
          {!statusIcon && !rightText && !showBadge && variant === 'link' && (
            <ArrowRight className="ml-1 h-4 w-4" />
          )}
        </div>
      </Button>
    );
    
    if (showTooltip && tooltipContent) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {button}
            </TooltipTrigger>
            <TooltipContent>
              {tooltipContent}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return button;
  }
);

ActionButton.displayName = 'ActionButton';
