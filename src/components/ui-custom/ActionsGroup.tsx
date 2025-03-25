
import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ActionItem {
  icon?: ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
}

interface ActionsGroupProps {
  actions: ActionItem[];
  direction?: "row" | "column";
  justify?: "start" | "center" | "end" | "between";
  spacing?: "none" | "xs" | "sm" | "md" | "lg";
  wrap?: boolean;
  className?: string;
}

export const ActionsGroup: React.FC<ActionsGroupProps> = ({
  actions,
  direction = "row",
  justify = "start",
  spacing = "md",
  wrap = false,
  className
}) => {
  const spacingClasses = {
    none: "gap-0",
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6"
  };
  
  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between"
  };
  
  const containerClasses = cn(
    "flex",
    direction === "row" ? "flex-row" : "flex-col",
    justifyClasses[justify],
    spacingClasses[spacing],
    wrap && "flex-wrap",
    className
  );
  
  return (
    <div className={containerClasses}>
      {actions.map((action, index) => (
        <Button
          key={index}
          onClick={action.onClick}
          variant={action.variant || "default"}
          size={action.size || "default"}
          disabled={action.disabled}
        >
          {action.icon && <span className="mr-2">{action.icon}</span>}
          {action.label}
        </Button>
      ))}
    </div>
  );
};
