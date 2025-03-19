
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
  const month = date.getMonth() + 1;
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

/**
 * Format uptime in a human-readable format
 */
export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) {
    return `${days}j ${hours}h ${minutes}m`;
  }
  
  return `${hours}h ${minutes}m`;
};

/**
 * Format money value
 */
export const formatMoney = (amount: number): string => {
  return `${formatNumber(amount)} as`;
};

/**
 * Format date
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Format season
 */
export const formatSeason = (date: Date): string => {
  const month = date.getMonth();
  
  if (month >= 2 && month <= 4) return "Printemps";
  if (month >= 5 && month <= 7) return "Été";
  if (month >= 8 && month <= 10) return "Automne";
  return "Hiver";
};
