
// Format a number as Roman currency (deniers, as, sesterces)
export const formatCurrency = (amount: number): string => {
  // For now, a simple implementation returning deniers
  return `${amount.toLocaleString()} deniers`;
};

// Convert between different Roman currency units
export const convertCurrency = (amount: number, from: 'as' | 'sestertius' | 'denarius' | 'aureus', 
                                to: 'as' | 'sestertius' | 'denarius' | 'aureus'): number => {
  // Currency conversion rates
  const rates: Record<string, number> = {
    'as': 1,
    'sestertius': 4,    // 1 sesterce = 4 as
    'denarius': 16,     // 1 denier = 16 as
    'aureus': 400,      // 1 aureus = 400 as (25 deniers)
  };

  // Convert to base unit (as) then to target unit
  const asAmount = amount * rates[from];
  return asAmount / rates[to];
};
