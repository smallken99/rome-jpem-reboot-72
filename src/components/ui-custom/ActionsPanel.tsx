
import React from 'react';
import { cn } from '@/lib/utils';
import { ActionButton, ActionButtonProps } from './ActionButton';

export interface ActionItem extends Omit<ActionButtonProps, 'ref'> {}

export interface ActionsPanelProps {
  title?: string;
  description?: string;
  actions: ActionItem[];
  className?: string;
  showDivider?: boolean;
}

export const ActionsPanel: React.FC<ActionsPanelProps> = ({
  title,
  description,
  actions,
  className,
  showDivider = true
}) => {
  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      {(title || description) && (
        <div className="p-4 bg-muted/50">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <div className={cn("flex flex-col", showDivider && "divide-y")}>
        {actions.map((action, index) => (
          <ActionButton
            key={index}
            {...action}
            className={cn(
              "justify-between hover:bg-muted/50 transition-colors py-3 px-4",
              action.className
            )}
          />
        ))}
      </div>
    </div>
  );
};
