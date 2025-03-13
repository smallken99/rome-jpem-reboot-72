
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Coins, TrendingUp, ShieldCheck, Scale } from 'lucide-react';
import { useEconomy } from '@/hooks/useEconomy';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { formatMoney } from '@/utils/formatUtils';

export const TresorStats: React.FC = () => {
  const { treasury, economicFactors } = useMaitreJeu();
  const economy = useEconomy();
  
  // Utilisez les données du MJ si disponibles, sinon fallback sur les valeurs par défaut
  const totalTreasury = treasury?.balance || 15785000;
  const annualRevenue = economicFactors?.taxCollection + economicFactors?.provinceRevenue + 
                        economicFactors?.tradeRevenue + economicFactors?.warSpoilsRevenue || 3250000;
  const annualExpenses = economicFactors?.militaryExpense + economicFactors?.publicWorksExpense + 
                        economicFactors?.religiousCeremonyExpense + economicFactors?.adminExpense || 2780000;
  const monthlyBalance = Math.round((annualRevenue - annualExpenses) / 12);
  const reserves = treasury?.balance * 0.2 || 4500000;
  const taxCollection = (economicFactors?.taxCollection / (annualRevenue - economicFactors?.taxCollection)) * 100 || 87;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard 
        title="Trésor Total" 
        value={formatMoney(totalTreasury)}
        icon={<Coins className="h-5 w-5 text-rome-gold" />}
        description="Fonds disponibles dans le Trésor"
        color="bg-rome-gold/10"
      />
      
      <StatCard 
        title="Revenus Annuels" 
        value={formatMoney(annualRevenue)}
        change={+9.4}
        icon={<ArrowUpRight className="h-5 w-5 text-green-600" />}
        description="Croissance par rapport à l'année précédente"
        color="bg-green-50"
      />
      
      <StatCard 
        title="Dépenses Annuelles" 
        value={formatMoney(annualExpenses)}
        change={+5.2}
        icon={<ArrowDownRight className="h-5 w-5 text-amber-600" />}
        description="Augmentation par rapport à l'année précédente"
        color="bg-amber-50"
      />
      
      <StatCard 
        title="Balance Mensuelle" 
        value={`+${formatMoney(monthlyBalance)}`}
        icon={<TrendingUp className="h-5 w-5 text-green-600" />}
        description="Excédent moyen mensuel"
        color="bg-green-50"
      />
      
      <StatCard 
        title="Réserves Stratégiques" 
        value={formatMoney(reserves)}
        icon={<ShieldCheck className="h-5 w-5 text-rome-navy" />}
        description="Fonds réservés aux urgences"
        color="bg-rome-navy/10"
      />
      
      <StatCard 
        title="Efficacité de Collecte" 
        value={`${taxCollection.toFixed(0)}%`}
        icon={<Scale className="h-5 w-5 text-rome-terracotta" />}
        description="Taux de recouvrement des impôts"
        color="bg-rome-terracotta/10"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  description,
  color
}) => {
  return (
    <div className={`p-4 rounded-md border border-rome-gold/30 ${color} shadow-sm hover:shadow-md transition-all duration-300`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-center gap-1 mt-1">
            <p className="text-2xl font-cinzel font-semibold">{value}</p>
            {change !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${change > 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
            )}
          </div>
        </div>
        <div className="p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-sm">
          {icon}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">{description}</p>
    </div>
  );
};
