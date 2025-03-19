
/**
 * Format a number with thousands separator
 */
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

/**
 * Format a percentage value
 */
export const formatPercentage = (value: number, decimalPlaces = 1): string => {
  return `${value.toFixed(decimalPlaces)}%`;
};

/**
 * Format a date in Roman style
 */
export const formatRomanDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.toMonth() + 1;
  const year = date.getFullYear();
  
  // Convert month number to Roman month name
  const romanMonths = [
    "Ianuarius", "Februarius", "Martius", "Aprilis", "Maius", "Iunius",
    "Iulius", "Augustus", "September", "October", "November", "December"
  ];
  
  const romanMonth = romanMonths[month - 1];
  
  return `${day} ${romanMonth} ${year}`;
};

/**
 * Format a currency value in Roman as
 */
export const formatCurrency = (value: number): string => {
  return `${formatNumber(value)} as`;
};
