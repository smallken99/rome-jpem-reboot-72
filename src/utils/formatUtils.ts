
/**
 * Formats a number as currency (denarii/as)
 * @param amount The amount to format
 * @returns Formatted string with Roman currency symbol
 */
export const formatMoney = (amount: number): string => {
  return `${amount.toLocaleString()} ₳`;
};

/**
 * Formats a date in Roman calendar (AUC - Ab Urbe Condita)
 * @param year Year in AUC format
 * @returns Formatted year string
 */
export const formatRomanYear = (year: number): string => {
  return `${year} AUC`;
};

/**
 * Formats uptime in a human-readable format
 * @param seconds Uptime in seconds
 * @returns Formatted uptime string
 */
export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};
