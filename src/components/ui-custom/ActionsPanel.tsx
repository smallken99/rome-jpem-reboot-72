
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ActionsGroup } from './ActionsGroup';
import { ActionButtonProps } from './ActionButton';
import { motion } from 'framer-motion';

interface ActionsPanelProps {
  title?: string;
  description?: string;
  actions: Omit<ActionButtonProps, 'ref'>[];
  className?: string;
  variant?: 'default' | 'bordered' | 'ghost';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  animate?: boolean;
}

export const ActionsPanel: React.FC<ActionsPanelProps> = ({
  title = "Actions disponibles",
  description,
  actions,
  className,
  variant = 'default',
  spacing = 'sm',
  justify = 'start',
  wrap = true,
  animate = true
}) => {
  const CardComponent = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};
  
  const getCardClass = () => {
    switch (variant) {
      case 'bordered':
        return "bg-white border border-rome-gold/30 rounded-md";
      case 'ghost':
        return "bg-transparent border-none shadow-none";
      default:
        return "bg-white border border-gray-100 rounded-md shadow-sm";
    }
  };
  
  return (
    <CardComponent 
      className={cn(getCardClass(), className)} 
      {...animationProps}
    >
      {(title || description) && (
        <CardHeader className="pb-2">
          {title && <CardTitle className="font-cinzel text-lg text-rome-navy">{title}</CardTitle>}
          {description && (
            <CardDescription className="text-sm text-muted-foreground mt-1">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}
      
      <CardContent className={cn("pt-0", !title && !description && "pt-4")}>
        <ActionsGroup 
          actions={actions}
          spacing={spacing}
          justify={justify}
          wrap={wrap}
        />
      </CardContent>
    </CardComponent>
  );
};
