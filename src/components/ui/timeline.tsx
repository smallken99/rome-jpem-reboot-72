
import React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn("space-y-8 relative", className)}>
      <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-muted"></div>
      {children}
    </div>
  );
}

interface TimelineItemProps {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export function TimelineItem({ children, active, className }: TimelineItemProps) {
  return (
    <div className={cn("relative pl-10", className)}>
      <div
        className={cn(
          "absolute left-0 flex items-center justify-center w-8 h-8 rounded-full border",
          active
            ? "bg-primary border-primary-foreground text-primary-foreground"
            : "bg-background border-muted text-muted-foreground"
        )}
      >
        <div className={cn("w-2 h-2 rounded-full", active ? "bg-primary-foreground" : "bg-muted-foreground")}></div>
      </div>
      {children}
    </div>
  );
}

interface TimelineItemContentProps {
  children: React.ReactNode;
  className?: string;
}

export function TimelineItemContent({ children, className }: TimelineItemContentProps) {
  return (
    <div
      className={cn(
        "p-4 border rounded-lg bg-background",
        className
      )}
    >
      {children}
    </div>
  );
}

interface TimelineItemHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function TimelineItemHeading({ children, className }: TimelineItemHeadingProps) {
  return <h3 className={cn("text-sm font-medium leading-none", className)}>{children}</h3>;
}

interface TimelineItemDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function TimelineItemDescription({ children, className }: TimelineItemDescriptionProps) {
  return <p className={cn("mt-2 text-xs text-muted-foreground", className)}>{children}</p>;
}

interface TimelineItemDateProps {
  children: React.ReactNode;
  className?: string;
}

export function TimelineItemDate({ children, className }: TimelineItemDateProps) {
  return <div className={cn("text-xs text-muted-foreground", className)}>{children}</div>;
}
