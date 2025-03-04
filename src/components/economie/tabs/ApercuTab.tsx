
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { RevenueChart } from '@/components/economie/RevenueChart';
import { ExpenseCard } from '@/components/economie/ExpenseCard';
import { Building, Landmark, Coins, Ship, Banknote } from 'lucide-react';

export const ApercuTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <RomanCard className="h-full">
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Revenus par Source</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <RevenueChart />
        </RomanCard.Content>
      </RomanCard>
      
      <RomanCard className="h-full">
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Principales Dépenses</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <ExpenseCard 
              category="Entretien des propriétés" 
              amount="22,000 As" 
              percentage={26} 
              icon={<Building className="h-5 w-5" />} 
            />
            <ExpenseCard 
              category="Patronage politique" 
              amount="18,000 As" 
              percentage={21} 
              icon={<Landmark className="h-5 w-5" />} 
            />
            <ExpenseCard 
              category="Personnel domestique" 
              amount="15,000 As" 
              percentage={18} 
              icon={<Coins className="h-5 w-5" />} 
            />
            <ExpenseCard 
              category="Investissements commerciaux" 
              amount="12,000 As" 
              percentage={14} 
              icon={<Ship className="h-5 w-5" />} 
            />
            <ExpenseCard 
              category="Divertissements et réceptions" 
              amount="10,000 As" 
              percentage={12} 
              icon={<Banknote className="h-5 w-5" />} 
            />
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
