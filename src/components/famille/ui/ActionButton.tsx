
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  description?: string;
  onClick: () => void;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  description,
  onClick,
  className
}) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "flex flex-col items-center justify-center h-auto p-4 space-y-2 text-center hover:bg-accent rounded-lg min-h-[120px]",
        className
      )}
      onClick={onClick}
    >
      <div className="text-2xl text-primary">{icon}</div>
      <div className="font-medium">{label}</div>
      {description && <div className="text-xs text-muted-foreground">{description}</div>}
    </Button>
  );
};
