
import React from 'react';
import { cn } from '@/lib/utils';
import { ActionButton, ActionButtonProps } from './ActionButton';

export interface ActionsGroupProps {
  actions: Omit<ActionButtonProps, 'ref'>[];
  className?: string;
  direction?: 'row' | 'column';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  divider?: boolean;
}

export const ActionsGroup: React.FC<ActionsGroupProps> = ({
  actions,
  className,
  direction = 'row',
  justify = 'start',
  wrap = true,
  spacing = 'sm',
  divider = false
}) => {
  const spacingClasses = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4'
  };
  
  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  };
  
  return (
    <div 
      className={cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        wrap && direction === 'row' ? 'flex-wrap' : '',
        justifyClasses[justify],
        spacingClasses[spacing],
        divider && direction === 'row' ? 'divide-x divide-gray-200' : '',
        divider && direction === 'column' ? 'divide-y divide-gray-200' : '',
        className
      )}
    >
      {actions.map((action, index) => (
        <ActionButton 
          key={index}
          {...action}
          className={cn(
            action.className,
            divider && direction === 'row' ? 'pl-2 first:pl-0' : '',
            divider && direction === 'column' ? 'pt-2 first:pt-0' : ''
          )}
        />
      ))}
    </div>
  );
};
