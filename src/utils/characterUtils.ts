
import { CharacterStat } from '@/types/character';

/**
 * Utilitaire pour obtenir la valeur d'une statistique, qu'elle soit de type nombre ou CharacterStat
 */
export const getStatValue = (stat: number | CharacterStat): number => {
  if (typeof stat === 'number') {
    return stat;
  }
  return stat.value;
};

/**
 * Utilitaire pour obtenir la valeur maximale d'une statistique
 */
export const getStatMaxValue = (stat: number | CharacterStat): number => {
  if (typeof stat === 'number') {
    return 100; // Valeur par défaut pour les stats numériques
  }
  return stat.maxValue;
};

/**
 * Utilitaire pour obtenir le nom d'une statistique
 */
export const getStatName = (stat: number | CharacterStat, defaultName: string = 'Statistique'): string => {
  if (typeof stat === 'number') {
    return defaultName;
  }
  return stat.name;
};

/**
 * Utilitaire pour obtenir la couleur d'une statistique
 */
export const getStatColor = (stat: number | CharacterStat, defaultColor: string = 'bg-blue-500'): string => {
  if (typeof stat === 'number') {
    return defaultColor;
  }
  return stat.color;
};

/**
 * Vérifie si un stat est un objet CharacterStat
 */
export const isCharacterStat = (stat: number | CharacterStat): stat is CharacterStat => {
  return typeof stat !== 'number';
};
