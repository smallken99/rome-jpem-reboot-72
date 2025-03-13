
// Types partagés pour l'économie

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: Date | string;
  source?: string;
  recurring?: boolean;
}

export interface EconomyStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactionCount: number;
  categoryBreakdown: Record<string, number>;
  // Statistiques supplémentaires
  annualIncome: number;
  annualExpenses: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  annualTaxes: number;
  annualTithes: number;
  inflation: number;
}

export type TransactionType = 'income' | 'expense';
export type TransactionCategory = 'Agriculture' | 'Commerce' | 'Impôts' | 'Militaire' | 'Religion' | 'Administration' | 'Divers';

export interface TransactionFilter {
  type?: TransactionType;
  category?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: Date;
  endDate?: Date;
  search?: string;
}
