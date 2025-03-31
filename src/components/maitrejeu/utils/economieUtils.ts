
import { EconomieRecord, EconomieFilter, EconomieSort } from '../types/economie';
import { GameDate } from '../types/common';

/**
 * Function to filter economie records
 */
export function filterEconomieRecords(records: EconomieRecord[], filter: EconomieFilter): EconomieRecord[] {
  if (!filter) return records;

  return records.filter(record => {
    // Filter by types (income/expense)
    if (filter.types && filter.types.length > 0 && !filter.types.includes(record.type)) {
      return false;
    }

    // Filter by category
    if (filter.category && filter.category !== 'all' && record.category !== filter.category) {
      return false;
    }

    // Filter by min amount
    if (filter.minAmount !== undefined && record.amount < filter.minAmount) {
      return false;
    }

    // Filter by max amount
    if (filter.maxAmount !== undefined && record.amount > filter.maxAmount) {
      return false;
    }

    // Filter by search term (applies to description or source)
    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      return (
        (record.description && record.description.toLowerCase().includes(searchLower)) ||
        (record.source && record.source.toLowerCase().includes(searchLower))
      );
    }

    return true;
  });
}

/**
 * Extract numeric value from economy object or nested properties
 */
export function getEconomicValue(value: any): number {
  if (typeof value === 'number') {
    return value;
  }
  
  if (typeof value === 'object' && value !== null) {
    // Handle economic complex object
    if ('stabilite' in value) {
      return (value.stabilite + value.croissance + value.commerce + value.agriculture) / 4;
    }
    
    // Calculate average of all numeric properties
    const numericValues = Object.values(value).filter(v => typeof v === 'number') as number[];
    if (numericValues.length > 0) {
      return numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length;
    }
  }
  
  return 0;
}

/**
 * Constants for economie types and categories
 */
export const ECONOMIE_TYPES = ['income', 'expense', 'revenue', 'cost', 'tax'];
export const ECONOMIE_CATEGORIES = [
  'trade', 
  'tax', 
  'military', 
  'construction', 
  'maintenance', 
  'administration', 
  'religion', 
  'games', 
  'subsidy', 
  'tribute',
  'other'
];
