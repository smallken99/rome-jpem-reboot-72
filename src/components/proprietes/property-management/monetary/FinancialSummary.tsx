
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FinancialStats } from '../hooks/useMonetaryManagement';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/utils/currencyUtils';

type FinancialSummaryProps = {
  incomeStats: FinancialStats;
  expenseStats: FinancialStats;
};

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({ incomeStats, expenseStats }) => {
  // Calculer le solde mensuel
  const monthlyBalance = incomeStats.monthly - expenseStats.monthly;
  const isPositiveBalance = monthlyBalance >= 0;
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-cinzel text-lg text-rome-navy mb-4">Synthèse Financière</h3>
        
        <Card className={`border ${isPositiveBalance ? 'border-green-200' : 'border-red-200'} mb-6`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Balance mensuelle</p>
                <p className={`text-xl font-bold ${isPositiveBalance ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositiveBalance ? '+' : ''}{formatCurrency(monthlyBalance)}
                </p>
              </div>
              <div className={`rounded-full p-2 ${isPositiveBalance ? 'bg-green-100' : 'bg-red-100'}`}>
                {isPositiveBalance ? (
                  <TrendingUp className="h-6 w-6 text-green-600" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
            <p className="text-sm mt-2 text-muted-foreground">
              {isPositiveBalance 
                ? 'Votre fortune augmente chaque mois - envisagez des investissements pour faire fructifier davantage vos deniers.' 
                : 'Attention, vos dépenses dépassent vos revenus. Pensez à réduire certaines dépenses ou à augmenter vos sources de revenus.'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenus */}
        <div>
          <h4 className="font-cinzel text-base text-rome-navy mb-3 flex items-center">
            <ArrowDownRight className="h-4 w-4 mr-2 text-green-600" />
            Revenus ({formatCurrency(incomeStats.monthly)}/mois)
          </h4>
          
          <div className="space-y-3">
            {incomeStats.categories.map((category, index) => (
              <div key={index} className="border border-rome-gold/20 rounded p-3 bg-green-50">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-green-600">{formatCurrency(category.amount)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-right mt-1 text-muted-foreground">
                  {category.percentage}% des revenus
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Dépenses */}
        <div>
          <h4 className="font-cinzel text-base text-rome-navy mb-3 flex items-center">
            <ArrowUpRight className="h-4 w-4 mr-2 text-rome-terracotta" /> 
            Dépenses ({formatCurrency(expenseStats.monthly)}/mois)
          </h4>
          
          <div className="space-y-3">
            {expenseStats.categories.map((category, index) => (
              <div key={index} className="border border-rome-gold/20 rounded p-3 bg-red-50">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-rome-terracotta">{formatCurrency(category.amount)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-rome-terracotta h-2 rounded-full" 
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-right mt-1 text-muted-foreground">
                  {category.percentage}% des dépenses
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 border border-rome-gold/30 rounded-md bg-rome-parchment/20">
        <h4 className="font-cinzel text-base text-rome-navy mb-2 flex items-center">
          <DollarSign className="h-4 w-4 mr-2 text-rome-gold" />
          Conseils de gestion
        </h4>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>Maintenez toujours une réserve d'au moins 50 000 As pour faire face aux dépenses imprévues</li>
          <li>Investissez dans de nouvelles propriétés pour diversifier vos sources de revenus</li>
          <li>Optimisez l'entretien de vos domaines pour réduire les coûts</li>
          <li>Évaluez vos relations clientèle et concentrez vos ressources sur les plus profitables</li>
        </ul>
      </div>
    </div>
  );
};
