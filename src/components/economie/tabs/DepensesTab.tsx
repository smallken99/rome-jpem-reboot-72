
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ExpenseCard } from '@/components/economie/ExpenseCard';
import { Building, Landmark, Coins, Ship, Banknote } from 'lucide-react';

export const DepensesTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      <RomanCard className="h-full">
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Analyse des Dépenses</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Recommandations d'optimisation</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Réduire les dépenses en divertissements de 10%</li>
                <li>Renégocier les contrats d'entretien des propriétés</li>
                <li>Optimiser les investissements commerciaux</li>
                <li>Réorganiser le personnel domestique</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Économies potentielles</h4>
              <p className="text-sm">Une optimisation des dépenses pourrait générer des économies d'environ 12,000 As par mois, soit 144,000 As par an.</p>
            </div>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
