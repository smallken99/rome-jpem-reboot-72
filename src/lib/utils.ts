
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Add formatCurrency utility
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAG', // Silver currency for Roman times
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
    .replace('XAG', 'As'); // Replace currency code with As
}
