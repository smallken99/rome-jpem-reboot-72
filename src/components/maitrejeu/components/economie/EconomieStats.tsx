
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TreasuryStatus, EconomicFactors, EconomieStatsProps } from '../../types/economie';
import { formatCurrency } from '@/utils/currencyUtils';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

export const EconomieStats: React.FC<EconomieStatsProps> = ({ 
  treasury, 
  economicFactors 
}) => {
  // Calculer un indicateur de santé économique
  const healthStatus = () => {
    if (treasury.balance > treasury.expenses * 5) return 'Excellente';
    if (treasury.balance > treasury.expenses * 2) return 'Bonne';
    if (treasury.balance > treasury.expenses) return 'Stable';
    if (treasury.balance > 0) return 'Préoccupante';
    return 'Critique';
  };

  const healthColor = () => {
    const status = healthStatus();
    switch (status) {
      case 'Excellente': return 'text-green-500';
      case 'Bonne': return 'text-emerald-500';
      case 'Stable': return 'text-blue-500';
      case 'Préoccupante': return 'text-amber-500';
      case 'Critique': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Solde du Trésor</CardTitle>
          <CardDescription>Balance actuelle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(treasury.balance)}
          </div>
          <p className={`mt-1 text-sm ${treasury.balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {treasury.balance >= 0 ? 'Solde positif' : 'Solde négatif'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Revenus</CardTitle>
          <CardDescription>Période en cours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">
            {formatCurrency(treasury.income)}
          </div>
          <div className="flex items-center mt-1 text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span>Projection: {formatCurrency(treasury.income * economicFactors.taxCollection)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Dépenses</CardTitle>
          <CardDescription>Période en cours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            {formatCurrency(treasury.expenses)}
          </div>
          <div className="flex items-center mt-1 text-sm">
            <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
            <span>Projection: {formatCurrency(treasury.expenses * economicFactors.militaryExpense)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Santé Économique</CardTitle>
          <CardDescription>Évaluation globale</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${healthColor()}`}>
            {healthStatus()}
          </div>
          <p className="mt-1 text-sm">
            Dette: {formatCurrency(treasury.debt)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
