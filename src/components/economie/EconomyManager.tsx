
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEconomyManager } from '@/hooks/useEconomyManager';
import { formatCurrency } from '@/utils/currencyUtils';
import { TransactionTable } from './TransactionTable';
import { IncomeExpenseChart } from './IncomeExpenseChart';
import { FinancialSummary } from './FinancialSummary';
import { PaymentForm } from './PaymentForm';
import { Button } from '@/components/ui/button';
import { PlusCircle, Wallet, Download, TrendingUp, History, CreditCard } from 'lucide-react';

export const EconomyManager: React.FC = () => {
  const {
    balance,
    transactions,
    makePayment,
    receivePayment,
    calculateSummary,
    getRecentTransactions
  } = useEconomyManager();
  
  const economySummary = calculateSummary();
  const recentTransactions = getRecentTransactions(10);
  
  return (
    <div className="space-y-6">
      {/* En-tête et statistiques */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestion Économique</h2>
          <p className="text-muted-foreground">
            Gérez vos finances, suivez vos revenus et vos dépenses
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle transaction
          </Button>
        </div>
      </div>
      
      {/* Résumé financier */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Wallet className="h-5 w-5 mr-2 text-primary" />
              Solde actuel
            </CardTitle>
            <CardDescription>Solde disponible</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Revenu mensuel
            </CardTitle>
            <CardDescription>30 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(economySummary.monthlyIncome)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-red-500" />
              Dépenses mensuelles
            </CardTitle>
            <CardDescription>30 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">
              {formatCurrency(economySummary.monthlyExpenses)}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Onglets principaux */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="analysis">Analyse</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Résumé Financier</CardTitle>
              <CardDescription>Vue d'ensemble de vos finances</CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialSummary summary={economySummary} />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Transactions Récentes</CardTitle>
                <CardDescription>Dernières activités financières</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionTable transactions={recentTransactions} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenus vs Dépenses</CardTitle>
                <CardDescription>Répartition mensuelle</CardDescription>
              </CardHeader>
              <CardContent>
                <IncomeExpenseChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Transactions</CardTitle>
              <CardDescription>Liste complète des transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionTable transactions={transactions} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Effectuer un Paiement</CardTitle>
              <CardDescription>Créez une nouvelle transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentForm onPayment={makePayment} onReceive={receivePayment} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Analyse Financière</CardTitle>
              <CardDescription>Tendances et prévisions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fonctionnalité d'analyse approfondie à venir dans une prochaine mise à jour.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
