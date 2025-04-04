
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface ActionButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  to?: string;
  className?: string;
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ icon, label, onClick, to, className, children, ...props }, ref) => {
    if (to) {
      return (
        <Button
          asChild
          onClick={onClick}
          className={className}
          {...props}
        >
          <Link to={to}>
            {icon}
            {label || children}
          </Link>
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        onClick={onClick}
        className={className}
        {...props}
      >
        {icon}
        {label || children}
      </Button>
    );
  }
);

ActionButton.displayName = 'ActionButton';
