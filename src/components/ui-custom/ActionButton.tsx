
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface ActionButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  label?: string;
  description?: string;
  title?: string;
  onClick?: () => void;
  to?: string;
  className?: string;
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ icon, label, description, title, onClick, to, className, children, ...props }, ref) => {
    if (to) {
      return (
        <Button
          asChild
          onClick={onClick}
          className={className}
          title={title}
          {...props}
        >
          <Link to={to}>
            {icon && <div className="mr-2">{icon}</div>}
            <div className="flex flex-col items-start">
              <span>{label || children}</span>
              {description && <span className="text-xs text-muted-foreground">{description}</span>}
            </div>
          </Link>
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        onClick={onClick}
        className={className}
        title={title}
        {...props}
      >
        {icon && <div className="mr-2">{icon}</div>}
        <div className="flex flex-col items-start">
          <span>{label || children}</span>
          {description && <span className="text-xs text-muted-foreground">{description}</span>}
        </div>
      </Button>
    );
  }
);

ActionButton.displayName = 'ActionButton';
