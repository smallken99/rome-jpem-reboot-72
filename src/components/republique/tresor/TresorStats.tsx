
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Coins, Building, Swords, Ship, LandPlot } from 'lucide-react';
import { useEconomy } from '@/hooks/useEconomy';

export const TresorStats: React.FC = () => {
  const economy = useEconomy();
  
  // Utiliser les données du système économique pour calculer les valeurs
  const totalTaxes = 1250000;
  const travaux = 850000;
  const armee = 1200000;
  const commerce = 980000;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatBox 
        title="Solde"
        value={`${economy.balance.toLocaleString()} As`}
        icon={<Coins className="w-5 h-5" />}
        trend={economy.balance > 3000000 ? "up" : "down"}
        trendValue={economy.balance > 3000000 ? "+2.4%" : "-1.2%"}
        description="Balance actuelle"
      />
      
      <StatBox 
        title="Impôts directs"
        value={`${totalTaxes.toLocaleString()} As`}
        icon={<LandPlot className="w-5 h-5" />}
        trend="up"
        trendValue="+1.1%"
        description="Tributum"
      />
      
      <StatBox 
        title="Travaux publics"
        value={`${travaux.toLocaleString()} As`}
        icon={<Building className="w-5 h-5" />}
        trend="down"
        trendValue="-5.2%"
        description="Dépenses"
      />
      
      <StatBox 
        title="Armée"
        value={`${armee.toLocaleString()} As`}
        icon={<Swords className="w-5 h-5" />}
        trend="up"
        trendValue="+12.3%"
        description="Dépenses"
      />
      
      <StatBox 
        title="Commerce"
        value={`${commerce.toLocaleString()} As`}
        icon={<Ship className="w-5 h-5" />}
        trend="up"
        trendValue="+8.7%"
        description="Portorium"
      />
    </div>
  );
};
