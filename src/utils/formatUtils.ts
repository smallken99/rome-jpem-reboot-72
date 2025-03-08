
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
