
import { Equilibre, Risk, RiskType } from '../types/equilibre';
import { GameDate, Season } from '../types/common';

// Function to convert string seasons to the proper Season type
export function normalizeSeasonType(season: string): Season {
  // Map capitalized seasons to lowercase
  const seasonMap: Record<string, Season> = {
    'Spring': 'spring',
    'Summer': 'summer',
    'Autumn': 'fall',
    'Winter': 'winter',
    'SPRING': 'SPRING',
    'SUMMER': 'SUMMER',
    'AUTUMN': 'AUTUMN',
    'WINTER': 'WINTER',
    'Ver': 'Ver',
    'Aestas': 'Aestas',
    'Autumnus': 'Autumnus',
    'Hiems': 'Hiems'
  };
  
  return seasonMap[season] || season as Season;
}

// Function to convert an economie object to proper economic factors
export function normalizeEconomicValue(value: number | any): number | any {
  if (typeof value === 'number') {
    return value;
  }
  
  // If it's an object with stabilite property, calculate average value
  if (value && typeof value === 'object' && 'stabilite' in value) {
    return Math.round((value.stabilite + value.croissance + value.commerce + value.agriculture) / 4);
  }
  
  return value;
}

// Function to normalize risk object
export function normalizeRiskType(type: string): RiskType {
  const riskMap: Record<string, RiskType> = {
    'political': 'politique',
    'economic': 'economique',
    'military': 'militaire',
    'religious': 'religieux',
    'social': 'social'
  };
  
  return riskMap[type] || type as RiskType;
}

// Function to create a default risk object
export function createRisk(options: Partial<Risk>): Risk {
  return {
    id: options.id || Math.random().toString(36).substr(2, 9),
    type: options.type || 'politique',
    name: options.name || 'Nouveau risque',
    description: options.description || '',
    severity: options.severity || 5,
    createdAt: options.createdAt || new Date().toISOString(),
    active: options.active !== undefined ? options.active : true,
    impact: options.impact || {}
  };
}

// Function to ensure a GameDate object is valid
export function ensureValidGameDate(date: any): GameDate {
  if (!date) {
    return { year: 510, season: 'spring' };
  }
  
  if (typeof date.season === 'string' && typeof date.year === 'number') {
    return { 
      year: date.year, 
      season: normalizeSeasonType(date.season) 
    };
  }
  
  // Default date
  return { year: 510, season: 'spring' };
}
