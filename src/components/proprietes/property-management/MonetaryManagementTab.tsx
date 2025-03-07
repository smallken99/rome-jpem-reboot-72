
import React from 'react';
import { useMonetaryManagement } from './hooks/useMonetaryManagement';
import { TransactionList } from './monetary/TransactionList';
import { PaymentForm } from './monetary/PaymentForm';
import { FinancialSummary } from './monetary/FinancialSummary';
import { Wallet, Receipt, ArrowRightLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const MonetaryManagementTab: React.FC = () => {
  const { 
    balance, 
    transactions, 
    recipients, 
    addTransaction, 
    makePayment,
    incomeStats,
    expenseStats
  } = useMonetaryManagement();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h3 className="font-cinzel text-lg text-rome-navy">Gestion Monétaire</h3>
          <p className="text-sm text-muted-foreground">
            Gérez votre trésorerie, effectuez des paiements et suivez vos transactions
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-rome-gold/30 shadow-sm">
          <CardContent className="p-4 flex items-center">
            <Wallet className="h-8 w-8 mr-3 text-rome-navy" />
            <div>
              <p className="text-sm text-muted-foreground">Solde actuel</p>
              <p className="text-xl font-bold text-rome-navy">{balance.toLocaleString()} As</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-rome-gold/30 shadow-sm">
          <CardContent className="p-4 flex items-center">
            <Receipt className="h-8 w-8 mr-3 text-green-600" />
            <div>
              <p className="text-sm text-muted-foreground">Revenus mensuels</p>
              <p className="text-xl font-bold text-green-600">+{incomeStats.monthly.toLocaleString()} As</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-rome-gold/30 shadow-sm">
          <CardContent className="p-4 flex items-center">
            <ArrowRightLeft className="h-8 w-8 mr-3 text-rome-terracotta" />
            <div>
              <p className="text-sm text-muted-foreground">Dépenses mensuelles</p>
              <p className="text-xl font-bold text-rome-terracotta">-{expenseStats.monthly.toLocaleString()} As</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-rome-parchment">
          <TabsTrigger value="summary" className="data-[state=active]:bg-white">
            Synthèse
          </TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:bg-white">
            Effectuer un paiement
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-white">
            Transactions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="p-4 border border-rome-gold/30 rounded-md bg-white shadow-sm">
          <FinancialSummary incomeStats={incomeStats} expenseStats={expenseStats} />
        </TabsContent>
        
        <TabsContent value="payments" className="p-4 border border-rome-gold/30 rounded-md bg-white shadow-sm">
          <PaymentForm 
            makePayment={makePayment}
            recipients={recipients}
            balance={balance}
          />
        </TabsContent>
        
        <TabsContent value="transactions" className="p-4 border border-rome-gold/30 rounded-md bg-white shadow-sm">
          <TransactionList transactions={transactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
