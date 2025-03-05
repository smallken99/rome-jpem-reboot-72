
export const formatDowry = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' As';
};
