
import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  indicatorClassName?: string;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, indicatorClassName, ...props }, ref) => {
    const percentage = Math.min(Math.max(0, value), max) / max * 100;

    return (
      <div
        ref={ref}
        className={cn("w-full h-2 bg-secondary overflow-hidden rounded-full", className)}
        {...props}
      >
        <div
          className={cn("h-full transition-all", indicatorClassName || "bg-primary")}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";
