
import * as React from "react"
import { cn } from "@/lib/utils"

// Types for Timeline components
export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
}

export interface TimelineHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface TimelineTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export interface TimelineBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
}

// Timeline components
export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-4", className)}
      {...props}
    >
      <ul className="relative border-l border-muted">{children}</ul>
    </div>
  )
)
Timeline.displayName = "Timeline"

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, children, ...props }, ref) => (
    <li ref={ref} className={cn("ml-4 pb-6 last:pb-0", className)} {...props}>
      {children}
    </li>
  )
)
TimelineItem.displayName = "TimelineItem"

export const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center mb-1", className)}
      {...props}
    >
      {children}
    </div>
  )
)
TimelineHeader.displayName = "TimelineHeader"

export const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(
  ({ className, icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute -left-7 flex items-center justify-center rounded-full border bg-background p-1",
        className
      )}
      {...props}
    >
      {icon}
    </div>
  )
)
TimelineIcon.displayName = "TimelineIcon"

export const TimelineTitle = React.forwardRef<HTMLHeadingElement, TimelineTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-sm font-medium leading-snug", className)}
      {...props}
    >
      {children}
    </h3>
  )
)
TimelineTitle.displayName = "TimelineTitle"

export const TimelineBody = React.forwardRef<HTMLDivElement, TimelineBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </div>
  )
)
TimelineBody.displayName = "TimelineBody"
