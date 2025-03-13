
/**
 * Format a number as currency (As)
 */
export const formatMoney = (amount: number): string => {
  if (amount === undefined || amount === null) return '0 As';
  
  // Format with spaces as thousands separator
  const formattedNumber = amount.toLocaleString('fr-FR').replace(/,/g, ' ');
  
  return `${formattedNumber} As`;
};

/**
 * Format a number as a percentage
 */
export const formatPercent = (value: number, decimals = 1): string => {
  if (value === undefined || value === null) return '0%';
  
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format a number with a given unit
 */
export const formatWithUnit = (value: number, unit: string): string => {
  if (value === undefined || value === null) return `0 ${unit}`;
  
  return `${value.toLocaleString('fr-FR')} ${unit}`;
};
