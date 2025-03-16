
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Loan {
  id: string;
  amount: number;
  lender: string;
  lenderId: string;
  interestRate: number;
  duration: number; // en années
  purpose: string;
  dateIssued: Date;
  remainingPayments: number;
  status: 'active' | 'repaid' | 'defaulted';
  nextPaymentDue?: Date;
}

export interface LoanPayment {
  id: string;
  loanId: string;
  amount: number;
  date: Date;
  interestAmount: number;
  principalAmount: number;
}

export interface LoanHistory {
  id: string;
  loanId: string;
  amount: number;
  lender: string;
  interestRate: number;
  dateIssued: Date;
  dateRepaid: Date;
  totalPaid: number;
  payments: LoanPayment[];
  status: 'repaid' | 'defaulted';
}

export interface Lender {
  id: string;
  name: string;
  type: 'banker' | 'private' | 'senator' | 'temple';
  baseInterestRate: number;
  maxLoanAmount: number;
  description: string;
  requirements?: string;
}

export const useLoanManagement = () => {
  // État des prêts actifs
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: 'loan-1',
      amount: 50000,
      lender: 'Banque des Publicains',
      lenderId: 'lender-1',
      interestRate: 8,
      duration: 2,
      purpose: 'Acquisition de propriété commerciale',
      dateIssued: new Date(new Date().setMonth(new Date().getMonth() - 3)),
      remainingPayments: 7,
      status: 'active',
      nextPaymentDue: new Date(new Date().setMonth(new Date().getMonth() + 1))
    }
  ]);
  
  // Historique des prêts
  const [loanHistory, setLoanHistory] = useState<LoanHistory[]>([
    {
      id: 'history-1',
      loanId: 'old-loan-1',
      amount: 30000,
      lender: 'Temple de Jupiter',
      interestRate: 5,
      dateIssued: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      dateRepaid: new Date(new Date().setMonth(new Date().getMonth() - 2)),
      totalPaid: 31500,
      payments: [],
      status: 'repaid'
    }
  ]);
  
  // Prêteurs disponibles
  const [lenders, setLenders] = useState<Lender[]>([
    {
      id: 'lender-1',
      name: 'Banque des Publicains',
      type: 'banker',
      baseInterestRate: 8,
      maxLoanAmount: 200000,
      description: 'Institution financière établie, spécialisée dans les prêts commerciaux.',
      requirements: 'Requiert des garanties immobilières ou commerciales.'
    },
    {
      id: 'lender-2',
      name: 'Temple de Jupiter',
      type: 'temple',
      baseInterestRate: 5,
      maxLoanAmount: 50000,
      description: 'Prêts à taux préférentiel pour les patriciens et les personnes pieuses.',
      requirements: 'Requiert une bonne réputation religieuse et des offrandes régulières.'
    },
    {
      id: 'lender-3',
      name: 'Sénateur Marcus Crassus',
      type: 'senator',
      baseInterestRate: 12,
      maxLoanAmount: 100000,
      description: 'Prête à titre personnel. Taux d\'intérêt élevés mais grande discrétion.',
      requirements: 'Aime les arrangements politiques en échange de conditions favorables.'
    },
    {
      id: 'lender-4',
      name: 'Societates de Pompéius',
      type: 'private',
      baseInterestRate: 10,
      maxLoanAmount: 150000,
      description: 'Consortium d\'investisseurs privés cherchant à diversifier leurs actifs.',
      requirements: 'Préfère les emprunteurs ayant des connexions commerciales.'
    }
  ]);
  
  // Ajouter un nouveau prêt
  const addLoan = (loanData: Omit<Loan, 'id' | 'status' | 'nextPaymentDue'>): string => {
    const newLoan: Loan = {
      ...loanData,
      id: `loan-${uuidv4()}`,
      status: 'active',
      nextPaymentDue: new Date(new Date().setMonth(new Date().getMonth() + 3)) // Premier paiement dans 3 mois
    };
    
    setLoans(prev => [...prev, newLoan]);
    return newLoan.id;
  };
  
  // Calculer le montant du paiement pour un prêt (principal + intérêts)
  const calculateInterest = (loan: Loan): number => {
    // Calculer le montant du principal par paiement
    const principalPerPayment = loan.amount / (loan.duration * 4); // 4 paiements par an
    
    // Calculer les intérêts sur le solde restant
    const remainingPrincipal = (loan.remainingPayments / (loan.duration * 4)) * loan.amount;
    const interestAmount = (remainingPrincipal * loan.interestRate / 100) / 4; // Intérêt trimestriel
    
    // Montant total du paiement
    return Math.round(principalPerPayment + interestAmount);
  };
  
  // Effectuer un paiement sur un prêt
  const repayLoan = (loanId: string, amount: number): boolean => {
    let fullyRepaid = false;
    
    setLoans(prev => prev.map(loan => {
      if (loan.id === loanId) {
        // Décrémenter le nombre de paiements restants
        const newRemainingPayments = loan.remainingPayments - 1;
        
        // Vérifier si le prêt est entièrement remboursé
        const newStatus = newRemainingPayments <= 0 ? 'repaid' : 'active';
        fullyRepaid = newStatus === 'repaid';
        
        // Calculer la prochaine date d'échéance (3 mois plus tard)
        const nextPaymentDue = new Date(loan.nextPaymentDue || new Date());
        nextPaymentDue.setMonth(nextPaymentDue.getMonth() + 3);
        
        return {
          ...loan,
          remainingPayments: newRemainingPayments,
          status: newStatus,
          nextPaymentDue: newStatus === 'repaid' ? undefined : nextPaymentDue
        };
      }
      return loan;
    }));
    
    // Si le prêt est entièrement remboursé, l'ajouter à l'historique
    if (fullyRepaid) {
      const loan = loans.find(l => l.id === loanId);
      if (loan) {
        const totalPaid = loan.amount * (1 + (loan.interestRate / 100) * loan.duration);
        
        setLoanHistory(prev => [
          ...prev,
          {
            id: `history-${uuidv4()}`,
            loanId: loan.id,
            amount: loan.amount,
            lender: loan.lender,
            interestRate: loan.interestRate,
            dateIssued: loan.dateIssued,
            dateRepaid: new Date(),
            totalPaid: Math.round(totalPaid),
            payments: [],
            status: 'repaid'
          }
        ]);
        
        // Supprimer le prêt remboursé de la liste des prêts actifs
        setLoans(prev => prev.filter(l => l.id !== loanId));
      }
    }
    
    return fullyRepaid;
  };
  
  return {
    loans,
    loanHistory,
    lenders,
    addLoan,
    repayLoan,
    calculateInterest
  };
};
