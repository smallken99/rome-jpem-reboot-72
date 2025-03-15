
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ChartBar, TrendingUp } from 'lucide-react';
import { ProfitabilityHeaderProps } from './types/profitabilityTypes';

export const ProfitabilityHeader: React.FC<ProfitabilityHeaderProps> = ({ 
  activeView, 
  setActiveView 
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Rentabilité des Propriétés</h2>
        <p className="text-sm text-muted-foreground">
          Analysez la performance économique de vos propriétés
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="bg-card border rounded-lg p-1 flex">
          <Button 
            variant={activeView === 'monthly' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveView('monthly')}
            className="rounded-r-none"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Mensuel
          </Button>
          <Button 
            variant={activeView === 'quarterly' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveView('quarterly')}
            className="rounded-none"
          >
            <ChartBar className="h-4 w-4 mr-1" />
            Trimestriel
          </Button>
          <Button 
            variant={activeView === 'yearly' || activeView === 'annual' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setActiveView('yearly')}
            className="rounded-l-none"
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Annuel
          </Button>
        </div>
      </div>
    </div>
  );
};
