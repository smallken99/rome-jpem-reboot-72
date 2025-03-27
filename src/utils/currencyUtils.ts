
/**
 * Formate une valeur monétaire en As romains
 * @param amount Montant à formater
 * @param includeCurrency Inclure le symbole de devise (As)
 */
export const formatCurrency = (amount: number, includeCurrency = true): string => {
  const formattedAmount = amount.toLocaleString('fr-FR');
  return includeCurrency ? `${formattedAmount} As` : formattedAmount;
};

/**
 * Convertit une valeur en As en d'autres unités monétaires romaines
 * @param amount Montant en As
 */
export const convertCurrency = (amount: number): {
  denarii: number;
  sestertii: number;
  as: number;
} => {
  // 1 denarius = 16 as
  // 1 sestertius = 4 as
  const denarii = Math.floor(amount / 16);
  const remainingAfterDenarii = amount % 16;
  const sestertii = Math.floor(remainingAfterDenarii / 4);
  const as = remainingAfterDenarii % 4;
  
  return {
    denarii,
    sestertii,
    as
  };
};

/**
 * Représente un montant avec des unités monétaires romaines mixtes
 * @param amount Montant en As
 */
export const formatMixedCurrency = (amount: number): string => {
  const { denarii, sestertii, as } = convertCurrency(amount);
  
  const parts = [];
  if (denarii > 0) {
    parts.push(`${denarii} denarii`);
  }
  if (sestertii > 0) {
    parts.push(`${sestertii} sestertii`);
  }
  if (as > 0 || parts.length === 0) {
    parts.push(`${as} as`);
  }
  
  return parts.join(', ');
};

/**
 * Détermine si le montant est suffisant pour un achat
 * @param available Montant disponible
 * @param cost Coût de l'achat
 */
export const canAfford = (available: number, cost: number): boolean => {
  return available >= cost;
};
