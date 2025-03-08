
import * as React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {children}
      </div>
    );
  }
);
Timeline.displayName = "Timeline";

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex gap-4", className)} {...props}>
        {children}
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

export interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
}

export const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full bg-background border-2",
          className
        )}
        {...props}
      >
        {icon}
      </div>
    );
  }
);
TimelineIcon.displayName = "TimelineIcon";

export interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex-1", className)} {...props}>
        {children}
      </div>
    );
  }
);
TimelineContent.displayName = "TimelineContent";
