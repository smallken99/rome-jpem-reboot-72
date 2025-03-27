
/**
 * Formate un nombre en monnaie romaine (as)
 * @param amount Montant à formater
 * @returns Chaîne formatée
 */
export const formatCurrency = (amount: number): string => {
  const formattedAmount = amount.toLocaleString('fr-FR');
  return `${formattedAmount} as`;
};

/**
 * Ajoute une valeur à un compte en as
 * @param currentBalance Solde actuel
 * @param amount Montant à ajouter (peut être négatif)
 * @returns Nouveau solde
 */
export const addToBalance = (currentBalance: number, amount: number): number => {
  return currentBalance + amount;
};

/**
 * Vérifie si un solde est suffisant pour une dépense
 * @param balance Solde actuel
 * @param amount Montant à dépenser
 * @returns Vrai si le solde est suffisant, faux sinon
 */
export const hasSufficientBalance = (balance: number, amount: number): boolean => {
  return balance >= amount;
};
