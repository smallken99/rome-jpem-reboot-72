
import React from 'react';
import { Button } from '@/components/ui/button';

interface ExpenseCardProps {
  title: string;
  amount: string;
  period: string;
  description: string;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ 
  title, 
  amount, 
  period, 
  description 
}) => {
  return (
    <div className="rounded-md overflow-hidden border border-rome-gold/30 hover:border-rome-gold transition-all bg-white/90 p-4">
      <h3 className="font-cinzel text-lg font-semibold text-rome-navy">{title}</h3>
      
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-xl font-bold">{amount}</span>
        <span className="text-sm text-muted-foreground">/ {period}</span>
      </div>
      
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      
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
