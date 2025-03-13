
import { GameDate } from './common';

export interface EconomieRecord {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer' | 'tax';
  source: 'treasury' | 'province' | 'trade' | 'tax' | string;
  date: string | GameDate;
  category?: string;
  responsable?: string;
  notes?: string;
}

export interface EconomieSort {
  field: keyof EconomieRecord;
  direction: 'asc' | 'desc';
}

export interface EconomieFilter {
  type?: 'income' | 'expense' | 'transfer' | 'tax';
  source?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: string;
  endDate?: string;
}

export interface EconomieStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  byCategory: {
    [key: string]: number;
  };
  byMonth: {
    month: string;
    income: number;
    expenses: number;
  }[];
}
