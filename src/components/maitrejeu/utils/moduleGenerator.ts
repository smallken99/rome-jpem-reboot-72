
import { v4 as uuidv4 } from 'uuid';
import { GameDate } from '../types/common';

/**
 * Génère un identifiant unique
 */
export function generateId(): string {
  return uuidv4().slice(0, 8);
}

/**
 * Formate une date au format de jeu
 */
export function formatDate(date: Date | GameDate | string): string {
  if (typeof date === 'string') {
    return date;
  }
  
  if ('year' in date && 'season' in date) {
    return `${date.year} AUC, ${date.season}`;
  }
  
  return date.toLocaleDateString();
}

/**
 * Transforme un nom en identifiant (kebab-case)
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

/**
 * Calcule une moyenne d'un ensemble de valeurs
 */
export function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/**
 * Fonction utilitaire pour obtenir un statut de couleur à partir d'une valeur
 */
export function getStatusColor(value: number, thresholds = { low: 30, medium: 60, high: 90 }): string {
  if (value <= thresholds.low) return 'bg-red-100 text-red-800';
  if (value <= thresholds.medium) return 'bg-yellow-100 text-yellow-800';
  if (value <= thresholds.high) return 'bg-green-100 text-green-800';
  return 'bg-blue-100 text-blue-800';
}

/**
 * Fonction pour créer une structure de données de module avec typages génériques
 */
export function createModuleData<T extends Record<string, any>>(
  data: T, 
  options: { 
    createId?: boolean, 
    timestamp?: boolean,
    defaultValues?: Partial<T>
  } = {}
): T {
  const { createId = true, timestamp = true, defaultValues = {} } = options;
  
  return {
    ...defaultValues,
    ...data,
    ...(createId && !data.id ? { id: generateId() } : {}),
    ...(timestamp && !data.createdAt ? { createdAt: new Date().toISOString() } : {})
  };
}
