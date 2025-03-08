
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
  disabled?: boolean;
}

interface ActionsPanelProps {
  title?: string;
  description?: string;
  actions: ActionItem[];
  className?: string;
}

export const ActionsPanel: React.FC<ActionsPanelProps> = ({
  title = "Actions disponibles",
  description,
  actions,
  className
}) => {
  return (
    <div className={cn("bg-white border border-rome-gold/30 rounded-md p-4", className)}>
      <h3 className="font-cinzel text-lg text-rome-navy">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1 mb-4">{description}</p>
      )}
      
      <div className="flex flex-wrap gap-2 mt-4">
        {actions.map((action, index) => (
          <Button
            key={index}
            onClick={action.onClick}
            variant={action.variant || 'default'}
            className={cn(
              action.variant === 'default' ? 'roman-btn' : 
              action.variant === 'outline' ? 'roman-btn-outline' : 
              action.variant === 'secondary' ? 'roman-btn-secondary' : ''
            )}
            disabled={action.disabled}
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
