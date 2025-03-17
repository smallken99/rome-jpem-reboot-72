import React from 'react';
import { useMonetaryManagement } from './hooks/useMonetaryManagement';
import { TransactionList } from './monetary/TransactionList';
import { PaymentForm } from './monetary/PaymentForm';
import { FinancialSummary } from './monetary/FinancialSummary';
import { Wallet, Receipt, ArrowRightLeft, PieChart, TrendingUp, Coins } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { formatCurrency } from '@/utils/currencyUtils';

export const MonetaryManagementTab: React.FC = () => {
  const { 
    balance, 
    transactions, 
    recipients, 
    makePayment,
    incomeStats,
    expenseStats
  } = useMonetaryManagement();
  
  // Create a temporary adapter function to match expected signature
  const adaptMakePayment = (originalMakePayment: (amount: number, recipient: string, category: string) => boolean) => {
    return (recipientId: string, amount: number, description: string, category: string): boolean => {
      return originalMakePayment(amount, recipientId, category);
    };
  };

  // Use adaptedMakePayment instead of makePayment in the component
  const adaptedMakePayment = adaptMakePayment(makePayment);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h3 className="font-cinzel text-xl text-rome-navy flex items-center gap-2">
            <Coins className="h-5 w-5 text-rome-gold" />
            Gestion Monétaire
          </h3>
          <p className="text-sm text-muted-foreground">
            Gérez votre trésorerie, effectuez des paiements et suivez vos transactions
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-rome-gold/30 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-4 flex items-center h-full">
            <div className="h-12 w-12 rounded-full bg-rome-gold/10 flex items-center justify-center mr-3">
              <Wallet className="h-6 w-6 text-rome-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Solde actuel</p>
              <p className="text-xl font-bold text-rome-navy">{formatCurrency(balance)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-rome-gold/30 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-4 flex items-center h-full">
            <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center mr-3">
              <Receipt className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenus mensuels</p>
              <p className="text-xl font-bold text-green-600">+{formatCurrency(incomeStats.monthly)}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-rome-gold/30 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-4 flex items-center h-full">
            <div className="h-12 w-12 rounded-full bg-rome-terracotta/10 flex items-center justify-center mr-3">
              <ArrowRightLeft className="h-6 w-6 text-rome-terracotta" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dépenses mensuelles</p>
              <p className="text-xl font-bold text-rome-terracotta">-{formatCurrency(expenseStats.monthly)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-rome-parchment w-full sm:w-auto justify-start">
          <TabsTrigger 
            value="summary" 
            className="data-[state=active]:bg-white data-[state=active]:text-rome-navy font-cinzel"
          >
            <PieChart className="h-4 w-4 mr-2" />
            Synthèse
          </TabsTrigger>
          <TabsTrigger 
            value="payments" 
            className="data-[state=active]:bg-white data-[state=active]:text-rome-navy font-cinzel"
          >
            <Wallet className="h-4 w-4 mr-2" />
            Paiements
          </TabsTrigger>
          <TabsTrigger 
            value="transactions" 
            className="data-[state=active]:bg-white data-[state=active]:text-rome-navy font-cinzel"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Transactions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg">Synthèse financière</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <FinancialSummary incomeStats={incomeStats} expenseStats={expenseStats} />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="payments">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg">Effectuer un paiement</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <PaymentForm 
                makePayment={adaptedMakePayment}
                recipients={recipients}
                balance={balance}
              />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="transactions">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg">Historique des transactions</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <TransactionList transactions={transactions} />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
      
      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg">Conseils financiers</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-rome-gold/30 rounded-md bg-white hover:shadow-md transition-all">
              <h4 className="font-cinzel text-base text-rome-navy mb-2">Gestion des revenus</h4>
              <p className="text-sm text-muted-foreground">
                Diversifiez vos sources de revenus entre propriétés urbaines, domaines agricoles et investissements commerciaux.
              </p>
            </div>
            
            <div className="p-4 border border-rome-gold/30 rounded-md bg-white hover:shadow-md transition-all">
              <h4 className="font-cinzel text-base text-rome-navy mb-2">Optimisation fiscale</h4>
              <p className="text-sm text-muted-foreground">
                Consultez régulièrement un questeur pour connaître les exemptions fiscales auxquelles votre famille peut prétendre.
              </p>
            </div>
            
            <div className="p-4 border border-rome-gold/30 rounded-md bg-white hover:shadow-md transition-all">
              <h4 className="font-cinzel text-base text-rome-navy mb-2">Prestige et dépenses</h4>
              <p className="text-sm text-muted-foreground">
                Les investissements dans des bâtiments publics augmentent votre prestige, mais veillez à maintenir un équilibre avec vos finances.
              </p>
            </div>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
