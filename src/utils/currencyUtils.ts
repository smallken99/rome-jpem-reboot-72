
// Format a number as Roman currency (As)
export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} As`;
};

// Convert between different Roman currency units (tout est converti en As)
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

// Format un montant en As (la monnaie standard)
export const formatOptimalCurrency = (amount: number): string => {
  // Toujours formater en As
  return `${Math.round(amount).toLocaleString()} As`;
};

// Retourne la couleur CSS appropriée en fonction du montant (pour les variations)
export const getCurrencyVariationColor = (amount: number): string => {
  if (amount > 0) return 'text-green-600';
  if (amount < 0) return 'text-red-600';
  return 'text-gray-500';
};

// Calculate the annual maintenance cost for a building based on its value
export const calculateMaintenanceCost = (buildingValue: number): number => {
  // Typically, annual maintenance is 2-5% of a building's value
  return Math.round(buildingValue * 0.03); // 3% is a reasonable default
};

// Formater pour afficher un montant comme prix à payer
export const formatPrice = (amount: number): string => {
  return `${Math.round(amount).toLocaleString()} As`;
};

// Formater le revenu avec un signe + devant les montants positifs
export const formatIncome = (amount: number): string => {
  const prefix = amount > 0 ? '+' : '';
  return `${prefix}${Math.round(amount).toLocaleString()} As`;
};

// Calculer la valeur totale d'une propriété en tenant compte de son état
export const calculatePropertyValue = (baseValue: number, condition: number): number => {
  // La condition varie de 0 à 100, où 100 est parfait
  const conditionFactor = Math.max(0.5, condition / 100);
  return Math.round(baseValue * conditionFactor);
};
