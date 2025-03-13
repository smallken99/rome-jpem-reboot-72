
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

/**
 * Format system uptime
 */
export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  let result = '';
  if (days > 0) result += `${days}j `;
  if (hours > 0 || days > 0) result += `${hours}h `;
  result += `${minutes}m`;
  
  return result;
};

/**
 * Use this instead of the date-specific functions from dateUtils when only formatting is needed
 */
export const formatDate = (date: Date | string): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Date invalide';
  }
  
  return dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
