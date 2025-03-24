
// Types spécifiques pour les événements
export type EvenementType = 
  | 'POLITIQUE' 
  | 'MILITAIRE' 
  | 'ECONOMIQUE' 
  | 'SOCIAL' 
  | 'RELIGIEUX' 
  | 'PERSONNEL' 
  | 'NATUREL';

export type LegacyEvenementType = 
  | 'politique'
  | 'militaire'
  | 'economique'
  | 'social'
  | 'religieux'
  | 'personnel'
  | 'naturel';

export const isValidEvenementType = (type: string): type is EvenementType => {
  return [
    'POLITIQUE', 'MILITAIRE', 'ECONOMIQUE', 
    'SOCIAL', 'RELIGIEUX', 'PERSONNEL', 'NATUREL'
  ].includes(type);
};

export const isLegacyEvenementType = (type: string): type is LegacyEvenementType => {
  return [
    'politique', 'militaire', 'economique', 
    'social', 'religieux', 'personnel', 'naturel'
  ].includes(type);
};

export const getDefaultEvenementType = (): EvenementType => {
  return 'POLITIQUE';
};

// Convertit une chaîne en EvenementType sécurisé
export const toEvenementType = (type: string): EvenementType => {
  if (isValidEvenementType(type)) {
    return type;
  }
  
  // Convertir les anciennes valeurs
  if (isLegacyEvenementType(type)) {
    return type.toUpperCase() as EvenementType;
  }
  
  return getDefaultEvenementType();
};

// Convertit de l'ancien format vers le nouveau
export const convertLegacyType = (type: LegacyEvenementType): EvenementType => {
  return type.toUpperCase() as EvenementType;
};
