
import React from "react";
import { cn } from "@/lib/utils";

export interface TimelineItemProps {
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  iconBackground?: string;
  className?: string;
}

export interface TimelineProps {
  items: TimelineItemProps[];
  className?: string;
}

const TimelineItem = ({
  title,
  content,
  icon,
  iconBackground = "bg-primary",
  className,
}: TimelineItemProps) => {
  return (
    <div className={cn("flex gap-4", className)}>
      <div className="flex flex-col items-center">
        <div className={cn("rounded-full p-2 text-white", iconBackground)}>
          {icon}
        </div>
        <div className="w-px grow bg-border"></div>
      </div>
      <div className="pb-8 pt-1">
        <div className="font-medium">{title}</div>
        <div className="text-muted-foreground">{content}</div>
      </div>
    </div>
  );
};

export const Timeline = ({ items, className }: TimelineProps) => {
  return (
    <div className={cn("space-y-0", className)}>
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          title={item.title}
          content={item.content}
          icon={item.icon}
          iconBackground={item.iconBackground}
        />
      ))}
    </div>
  );
};

export const TimelineConnector = () => <div className="w-px grow bg-border"></div>;
export const TimelineContent = ({ children }: { children: React.ReactNode }) => (
  <div className="pb-8 pt-1">{children}</div>
);
export const TimelineIcon = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("rounded-full p-2 text-white bg-primary", className)}>
    {children}
  </div>
);
export const TimelineSeparator = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center">{children}</div>
);
