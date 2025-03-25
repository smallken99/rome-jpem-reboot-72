
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ActionButtonProps {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  title?: string;
}

interface ActionsGroupProps {
  actions: ActionButtonProps[];
  direction?: 'row' | 'col';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
}

export const ActionsGroup: React.FC<ActionsGroupProps> = ({
  actions,
  direction = 'row',
  justify = 'start',
  wrap = false,
  spacing = 'md'
}) => {
  const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';
  
  const justifyClass = {
    'start': 'justify-start',
    'end': 'justify-end',
    'center': 'justify-center',
    'between': 'justify-between',
    'around': 'justify-around',
    'evenly': 'justify-evenly'
  }[justify];
  
  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';
  
  const spacingClass = {
    'none': direction === 'row' ? 'gap-0' : 'gap-0',
    'xs': direction === 'row' ? 'gap-1' : 'gap-1',
    'sm': direction === 'row' ? 'gap-2' : 'gap-2',
    'md': direction === 'row' ? 'gap-4' : 'gap-3',
    'lg': direction === 'row' ? 'gap-6' : 'gap-4'
  }[spacing];
  
  return (
    <div className={cn('flex', directionClass, justifyClass, wrapClass, spacingClass)}>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'default'}
          size={action.size || 'default'}
          onClick={action.onClick}
          className={action.className}
          disabled={action.disabled}
          title={action.title}
        >
          {action.icon && <span className="mr-2">{action.icon}</span>}
          {action.label}
        </Button>
      ))}
    </div>
  );
};
