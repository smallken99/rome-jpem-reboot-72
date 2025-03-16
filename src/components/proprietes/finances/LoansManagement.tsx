
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ActiveLoans } from './ActiveLoans';
import { LoanHistory } from './LoanHistory';
import { NewLoanRequest } from './NewLoanRequest';
import { Button } from '@/components/ui/button';
import { Coins, History, PlusCircle } from 'lucide-react';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { toast } from 'sonner';
import { useLoanManagement } from './hooks/useLoanManagement';

export const LoansManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const patrimoine = usePatrimoine();
  const { 
    loans, 
    addLoan, 
    repayLoan, 
    calculateInterest, 
    loanHistory, 
    lenders 
  } = useLoanManagement();
  
  // Simuler la réception d'une réponse de prêt après quelques secondes
  const handleLoanRequest = (
    amount: number, 
    lenderId: string, 
    duration: number, 
    purpose: string
  ) => {
    const lender = lenders.find(l => l.id === lenderId);
    if (!lender) {
      toast.error("Prêteur non trouvé");
      return;
    }
    
    toast.info(`Votre demande de prêt de ${amount.toLocaleString()} As est en cours d'examen...`, {
      duration: 3000
    });
    
    // Simuler un délai de traitement
    setTimeout(() => {
      // Décision aléatoire (75% de chances d'acceptation)
      const approved = Math.random() < 0.75;
      
      if (approved) {
        // Calculer le taux d'intérêt en fonction du montant et de la durée
        const baseRate = lender.baseInterestRate;
        const interestRate = baseRate + (amount > 50000 ? 2 : 0) + (duration > 3 ? 1 : 0);
        
        // Ajouter le prêt
        const loanId = addLoan({
          amount,
          lender: lender.name,
          lenderId,
          interestRate,
          duration,
          purpose,
          dateIssued: new Date(),
          remainingPayments: duration * 4 // Paiements trimestriels
        });
        
        // Ajouter le montant du prêt au patrimoine
        patrimoine.addTransaction({
          amount: amount,
          description: `Prêt reçu de ${lender.name}`,
          category: "Prêt",
          type: 'income'
        });
        
        toast.success(`Votre demande de prêt de ${amount.toLocaleString()} As a été acceptée!`);
        
        // Passer à l'onglet des prêts actifs
        setActiveTab('active');
      } else {
        toast.error(`Votre demande de prêt a été refusée par ${lender.name}.`);
      }
    }, 3000);
  };
  
  // Effectuer un paiement sur un prêt
  const handleLoanPayment = (loanId: string) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) {
      toast.error("Prêt non trouvé");
      return;
    }
    
    // Calculer le montant du paiement (principal + intérêts)
    const paymentAmount = calculateInterest(loan);
    
    // Vérifier si les fonds sont suffisants
    if (paymentAmount > patrimoine.balance) {
      toast.error(`Fonds insuffisants pour effectuer ce paiement (${paymentAmount.toLocaleString()} As requis)`);
      return;
    }
    
    // Effectuer le paiement
    patrimoine.addTransaction({
      amount: -paymentAmount,
      description: `Paiement sur prêt à ${loan.lender}`,
      category: "Paiement de prêt",
      type: 'expense'
    });
    
    // Mettre à jour le prêt
    const fullyRepaid = repayLoan(loanId, paymentAmount);
    
    if (fullyRepaid) {
      toast.success(`Félicitations! Votre prêt auprès de ${loan.lender} a été entièrement remboursé.`);
    } else {
      toast.success(`Paiement de ${paymentAmount.toLocaleString()} As effectué sur votre prêt.`);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 mb-6">
        <Button 
          variant={activeTab === 'active' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setActiveTab('active')}
        >
          <Coins className="h-4 w-4" />
          <span>Prêts actifs</span>
        </Button>
        <Button 
          variant={activeTab === 'new' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setActiveTab('new')}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Nouveau prêt</span>
        </Button>
        <Button 
          variant={activeTab === 'history' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setActiveTab('history')}
        >
          <History className="h-4 w-4" />
          <span>Historique</span>
        </Button>
      </div>
      
      <RomanCard>
        <RomanCard.Content className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="active" className="p-6 m-0">
              <ActiveLoans 
                loans={loans} 
                onPayment={handleLoanPayment} 
                calculateInterest={calculateInterest}
                balance={patrimoine.balance}
              />
            </TabsContent>
            
            <TabsContent value="new" className="p-6 m-0">
              <NewLoanRequest 
                lenders={lenders}
                onRequestLoan={handleLoanRequest}
                balance={patrimoine.balance}
              />
            </TabsContent>
            
            <TabsContent value="history" className="p-6 m-0">
              <LoanHistory loanHistory={loanHistory} />
            </TabsContent>
          </Tabs>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
