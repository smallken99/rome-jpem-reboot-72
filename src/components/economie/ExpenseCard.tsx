
import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ExpenseCardProps {
  title?: string;
  category?: string;
  amount: string;
  period?: string;
  description?: string;
  percentage?: number;
  icon?: React.ReactNode;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ 
  title, 
  category,
  amount, 
  period,
  description,
  percentage,
  icon
}) => {
  // Use category as title if title is not provided
  const displayTitle = title || category;

  return (
    <div className="rounded-md overflow-hidden border border-rome-gold/30 hover:border-rome-gold transition-all bg-white/90 p-4">
      <div className="flex items-center gap-2">
        {icon && <div className="text-rome-navy">{icon}</div>}
        <h3 className="font-cinzel text-lg font-semibold text-rome-navy">{displayTitle}</h3>
      </div>
      
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-xl font-bold">{amount}</span>
        {period && <span className="text-sm text-muted-foreground">/ {period}</span>}
      </div>
      
      {percentage !== undefined && (
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-rome-gold h-2 rounded-full" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {description && (
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      
      <div className="mt-4 flex justify-between gap-2">
        <Button variant="outline" className="roman-btn-outline text-xs flex-1">
          Détails
        </Button>
        <Button variant="outline" className="roman-btn-outline text-xs flex-1">
          Ajuster
        </Button>
      </div>
    </div>
  );
};
