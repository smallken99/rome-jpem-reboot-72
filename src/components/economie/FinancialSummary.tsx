
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EconomySummary } from '@/hooks/useEconomyManager';
import { formatCurrency } from '@/utils/currencyUtils';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, ArrowDownRight, Percent, TrendingUp } from 'lucide-react';

interface FinancialSummaryProps {
  summary: EconomySummary;
}

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({ summary }) => {
  // Calculer le ratio revenus/dépenses
  const incomeExpenseRatio = summary.totalExpenses > 0 
    ? Math.min(100, (summary.totalIncome / summary.totalExpenses) * 100) 
    : 100;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Résultats financiers */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Résultats Financiers</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Revenus totaux:</span>
                <span className="font-medium text-green-600 flex items-center">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  {formatCurrency(summary.totalIncome)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Dépenses totales:</span>
                <span className="font-medium text-red-600 flex items-center">
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                  {formatCurrency(summary.totalExpenses)}
                </span>
              </div>
              
              <div className="flex items-center justify-between border-t pt-4">
                <span className="font-semibold">Profit net:</span>
                <span className={`font-bold ${summary.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(summary.profit)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Taux d'inflation:</span>
                <span className="font-medium flex items-center">
                  <Percent className="mr-1 h-4 w-4" />
                  {summary.inflation.toFixed(1)}%
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ratio Revenus/Dépenses:</span>
                  <span className="font-medium flex items-center">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    {incomeExpenseRatio.toFixed(0)}%
                  </span>
                </div>
                <Progress value={incomeExpenseRatio} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Principales catégories */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Principales Catégories</h3>
            
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Revenus par catégorie</h4>
                {summary.topIncomeCategories.length > 0 ? (
                  <div className="space-y-2">
                    {summary.topIncomeCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{category.category}</span>
                        <span className="text-sm font-medium text-green-600">
                          {formatCurrency(category.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Aucune donnée disponible</p>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Dépenses par catégorie</h4>
                {summary.topExpenseCategories.length > 0 ? (
                  <div className="space-y-2">
                    {summary.topExpenseCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{category.category}</span>
                        <span className="text-sm font-medium text-red-600">
                          {formatCurrency(category.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Aucune donnée disponible</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
