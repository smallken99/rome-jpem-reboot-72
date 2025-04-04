
/**
 * Formatte un nombre en monnaie romaine (As)
 * @param amount - Montant à formater
 * @returns Chaîne formatée
 */
export const formatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} As`;
};

/**
 * Convertit les As en différentes dénominations romaines
 * @param as - Montant en As
 * @returns Objet contenant les différentes dénominations
 */
export const convertToRomanDenominations = (as: number) => {
  // 1 denarius = 16 as (après 141 av. J.-C.)
  // 1 sestertius = 4 as (après 141 av. J.-C.)
  // 1 aureus = 400 as (environ, selon l'époque)
  
  const aureus = Math.floor(as / 400);
  const remainingAfterAureus = as % 400;
  
  const denarii = Math.floor(remainingAfterAureus / 16);
  const remainingAfterDenarii = remainingAfterAureus % 16;
  
  const sestertii = Math.floor(remainingAfterDenarii / 4);
  const remainingAs = remainingAfterDenarii % 4;
  
  return {
    aureus,
    denarii,
    sestertii,
    as: remainingAs,
    totalAs: as
  };
};

/**
 * Formatte un montant en dénominations romaines complètes
 * @param as - Montant en As
 * @returns Chaîne formatée avec toutes les dénominations
 */
export const formatFullRomanCurrency = (as: number): string => {
  const { aureus, denarii, sestertii, as: remainingAs } = convertToRomanDenominations(as);
  
  const parts = [];
  
  if (aureus > 0) {
    parts.push(`${aureus} aureus`);
  }
  
  if (denarii > 0) {
    parts.push(`${denarii} denarii`);
  }
  
  if (sestertii > 0) {
    parts.push(`${sestertii} sestertii`);
  }
  
  if (remainingAs > 0 || parts.length === 0) {
    parts.push(`${remainingAs} as`);
  }
  
  return parts.join(', ');
};
