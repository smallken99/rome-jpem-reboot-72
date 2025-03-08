
import React from 'react';
import { cn } from '@/lib/utils';

interface RomanCardProps {
  children: React.ReactNode;
  className?: string;
}

interface RomanCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface RomanCardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface RomanCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface RomanCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface RomanCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface RomanCardDialogProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const RomanCardHeader: React.FC<RomanCardHeaderProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn("border-b border-rome-gold/20 p-4 font-medium", className)}>
      {children}
    </div>
  );
};

const RomanCardContent: React.FC<RomanCardContentProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn("p-4", className)}>
      {children}
    </div>
  );
};

const RomanCardFooter: React.FC<RomanCardFooterProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn("border-t border-rome-gold/20 p-4 mt-auto", className)}>
      {children}
    </div>
  );
};

const RomanCardTitle: React.FC<RomanCardTitleProps> = ({
  children,
  className
}) => {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
      {children}
    </h3>
  );
};

const RomanCardDescription: React.FC<RomanCardDescriptionProps> = ({
  children,
  className
}) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
};

const RomanCardDialog: React.FC<RomanCardDialogProps> = ({
  children,
  className,
  open,
  onOpenChange
}) => {
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black/50", 
      open ? "block" : "hidden", 
      className
    )}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const RomanCard = ({ 
  children, 
  className,
}: RomanCardProps) => {
  return (
    <div className={cn("bg-white rounded-md border border-rome-gold/30 shadow-sm overflow-hidden", className)}>
      {children}
    </div>
  );
};

RomanCard.Header = RomanCardHeader;
RomanCard.Content = RomanCardContent;
RomanCard.Footer = RomanCardFooter;
RomanCard.Title = RomanCardTitle;
RomanCard.Description = RomanCardDescription;
RomanCard.Dialog = RomanCardDialog;

export { RomanCard };
