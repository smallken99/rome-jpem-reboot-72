
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

// Format un montant en deniers ou sesterces selon la valeur
export const formatOptimalCurrency = (amount: number): string => {
  // Si le montant est très élevé, afficher en aureus
  if (amount >= 1000) {
    const aureus = convertCurrency(amount, 'denarius', 'aureus');
    return `${aureus.toLocaleString(undefined, { maximumFractionDigits: 1 })} aureus`;
  }
  
  // Si le montant est assez élevé, afficher en deniers
  if (amount >= 4) {
    return `${amount.toLocaleString()} deniers`;
  }
  
  // Pour les petits montants, afficher en sesterces
  const sesterces = convertCurrency(amount, 'denarius', 'sestertius');
  return `${sesterces.toLocaleString()} sesterces`;
};

// Retourne la couleur CSS appropriée en fonction du montant (pour les variations)
export const getCurrencyVariationColor = (amount: number): string => {
  if (amount > 0) return 'text-green-600';
  if (amount < 0) return 'text-red-600';
  return 'text-gray-500';
};
