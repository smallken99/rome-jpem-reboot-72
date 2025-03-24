
// Types spécifiques pour les événements
export type EvenementType = 'politique' | 'militaire' | 'economique' | 'social' | 'religieux' | 'personnel' | 'naturel';

export const isValidEvenementType = (type: string): type is EvenementType => {
  return ['politique', 'militaire', 'economique', 'social', 'religieux', 'personnel', 'naturel'].includes(type);
};

export const getDefaultEvenementType = (): EvenementType => {
  return 'politique';
};

// Convertit une chaîne en EvenementType sécurisé
export const toEvenementType = (type: string): EvenementType => {
  return isValidEvenementType(type) ? type : getDefaultEvenementType();
};
