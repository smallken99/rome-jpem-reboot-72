
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Coins, Building, Swords, Ship, LandPlot } from 'lucide-react';
import { useEconomy } from '@/hooks/useEconomy';

export const TresorStats: React.FC = () => {
  const economy = useEconomy();
  
  // Récupérer les totaux par catégorie
  const incomeTotals = economy.getCategoryTotals('income');
  const expenseTotals = economy.getCategoryTotals('expense');
  
  // Calculer les valeurs pour chaque section
  const getTotalForCategory = (category: string, type: 'income' | 'expense') => {
    const totals = type === 'income' ? incomeTotals : expenseTotals;
    const found = totals.find(t => t.category === category);
    return found?.total || 0;
  };
  
  // Utiliser des valeurs calculées ou des exemples si les catégories n'existent pas encore
  const totalTaxes = getTotalForCategory('Tributum', 'income') || 1250000;
  const travauxPublics = getTotalForCategory('Travaux Publics', 'expense') || 850000;
  const armeeDepenses = getTotalForCategory('Armée', 'expense') || 1200000;
  const commerceRevenu = getTotalForCategory('Commerce', 'income') || 980000;
  
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
        value={`${travauxPublics.toLocaleString()} As`}
        icon={<Building className="w-5 h-5" />}
        trend="down"
        trendValue="-5.2%"
        description="Dépenses"
      />
      
      <StatBox 
        title="Armée"
        value={`${armeeDepenses.toLocaleString()} As`}
        icon={<Swords className="w-5 h-5" />}
        trend="up"
        trendValue="+12.3%"
        description="Dépenses"
      />
      
      <StatBox 
        title="Commerce"
        value={`${commerceRevenu.toLocaleString()} As`}
        icon={<Ship className="w-5 h-5" />}
        trend="up"
        trendValue="+8.7%"
        description="Portorium"
      />
    </div>
  );
};
