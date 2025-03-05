
import React from 'react';
import { Coins } from 'lucide-react';

interface PreceptorCostInfoProps {
  cost: number;
  available: boolean;
}

export const PreceptorCostInfo: React.FC<PreceptorCostInfoProps> = ({ cost, available }) => {
  return (
    <div>
      <h3 className="font-medium mb-3 flex items-center gap-2">
        <Coins className="h-5 w-5 text-rome-gold" />
        <span>Coût & Disponibilité</span>
      </h3>
      
      <div className="space-y-3">
        <div className="bg-rome-parchment/50 p-3 rounded-md">
          <div className="font-medium mb-1">Coût annuel</div>
          <div className="text-sm">{cost.toLocaleString()} As par an</div>
        </div>
        
        <div className={`p-3 rounded-md ${available ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="font-medium mb-1">Statut</div>
          <div className={`text-sm ${available ? 'text-green-700' : 'text-red-700'}`}>
            {available ? 'Disponible immédiatement' : 'Non disponible actuellement'}
          </div>
        </div>
      </div>
    </div>
  );
};
