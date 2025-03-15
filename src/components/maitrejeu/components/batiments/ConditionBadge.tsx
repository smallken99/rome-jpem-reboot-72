
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ConditionBadgeProps {
  condition: number;
}

export const ConditionBadge: React.FC<ConditionBadgeProps> = ({ condition }) => {
  let color: "default" | "secondary" | "destructive" | "outline" | "success" = "default";
  let label = "";
  
  if (condition >= 80) {
    color = "success";
    label = "Excellent";
  } else if (condition >= 60) {
    color = "secondary";
    label = "Bon";
  } else if (condition >= 30) {
    color = "outline";
    label = "Moyen";
  } else {
    color = "destructive";
    label = "Critique";
  }
  
  return (
    <div className="flex items-center">
      <div className="w-full bg-muted rounded-full h-2 mr-2">
        <div 
          className={`h-2 rounded-full ${getBgColorClass(condition)}`}
          style={{ width: `${condition}%` }}
        />
      </div>
      <Badge variant={color}>{label}</Badge>
    </div>
  );
};

function getBgColorClass(condition: number): string {
  if (condition >= 80) return "bg-green-500";
  if (condition >= 60) return "bg-blue-500";
  if (condition >= 30) return "bg-amber-500";
  return "bg-red-500";
}
