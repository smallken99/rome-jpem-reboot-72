
// Format a number as Roman currency (deniers, as, sesterces)
export const formatCurrency = (amount: number): string => {
  // Simple implementation returning As
  return `${amount.toLocaleString()} As`;
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
  // Pour maintenant, tout afficher en As comme demandé
  return `${amount.toLocaleString()} As`;
};

// Retourne la couleur CSS appropriée en fonction du montant (pour les variations)
export const getCurrencyVariationColor = (amount: number): string => {
  if (amount > 0) return 'text-green-600';
  if (amount < 0) return 'text-red-600';
  return 'text-gray-500';
};
