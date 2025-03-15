
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString()} As`;
}

export function calculateProfitMargin(revenue: number, expenses: number): number {
  if (revenue === 0) return 0;
  return ((revenue - expenses) / revenue) * 100;
}

export function calculateROI(profit: number, investment: number): number {
  if (investment === 0) return 0;
  return (profit / investment) * 100;
}

// Fonctions utilitaires pour les dates et les périodes
export function formatDate(date: { year: number; season: string; day?: number }): string {
  const { year, season, day } = date;
  return day ? `Jour ${day} - ${season} ${year} AUC` : `${season} ${year} AUC`;
}

// Fonctions de génération aléatoire pour les simulations
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Conversion et formatage
export function numberToRoman(num: number): string {
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  let roman = '';
  let remainingNum = num;

  for (const { value, numeral } of romanNumerals) {
    while (remainingNum >= value) {
      roman += numeral;
      remainingNum -= value;
    }
  }

  return roman;
}
