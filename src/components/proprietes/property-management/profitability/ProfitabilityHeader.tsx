
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProfitabilityHeaderProps {
  activeView: 'yearly' | 'monthly';
  setActiveView: (view: 'yearly' | 'monthly') => void;
}

export const ProfitabilityHeader: React.FC<ProfitabilityHeaderProps> = ({
  activeView,
  setActiveView
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-4">
      <div>
        <h3 className="font-cinzel text-lg text-rome-navy">Analyse de Rentabilité</h3>
        <p className="text-sm text-muted-foreground">
          Examinez la performance financière de vos propriétés pour optimiser votre patrimoine.
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant={activeView === 'yearly' ? 'default' : 'outline'} 
          size="sm"
          className={activeView === 'yearly' ? 'roman-btn' : 'roman-btn-outline'}
          onClick={() => setActiveView('yearly')}
        >
          Annuel
        </Button>
        <Button 
          variant={activeView === 'monthly' ? 'default' : 'outline'} 
          size="sm"
          className={activeView === 'monthly' ? 'roman-btn' : 'roman-btn-outline'}
          onClick={() => setActiveView('monthly')}
        >
          Mensuel
        </Button>
      </div>
    </div>
  );
};
