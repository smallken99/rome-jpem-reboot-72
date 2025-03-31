
import { EconomieRecord, EconomieCreationData, EconomieFilter, EconomieSort } from "../types/economie";
import { GameDate } from "../types/common";
import { v4 as uuidv4 } from 'uuid';

/**
 * Converts an EconomieCreationData to an EconomieRecord
 */
export function createEconomieRecord(data: EconomieCreationData): EconomieRecord {
  return {
    id: uuidv4(),
    ...data
  };
}

/**
 * Normalizes date values for consistent comparison
 */
export function normalizeDate(date: string | Date | GameDate): Date {
  if (typeof date === 'string') {
    return new Date(date);
  } else if (date instanceof Date) {
    return date;
  } else if (date && typeof date === 'object' && 'year' in date && 'season' in date) {
    // Convert GameDate to approximate Date
    const seasonToMonth: Record<string, number> = {
      'VER': 2, // Spring - March
      'SPRING': 2,
      'AESTAS': 5, // Summer - June
      'SUMMER': 5,
      'AUTUMNUS': 8, // Autumn - September
      'AUTUMN': 8,
      'HIEMS': 11, // Winter - December
      'WINTER': 11
    };
    
    // Get month from season, defaulting to January (0)
    const month = seasonToMonth[date.season.toUpperCase()] || 0;
    
    // Convert Roman year to CE year (approximate)
    const ceYear = date.year <= 500 ? 753 - date.year : date.year;
    
    return new Date(ceYear, month, 1);
  }
  
  // Default fallback
  return new Date();
}

/**
 * Filters economy records based on criteria
 */
export function filterEconomieRecords(records: EconomieRecord[], filter: EconomieFilter): EconomieRecord[] {
  if (!filter) return records;
  
  return records.filter(record => {
    // Filter by type
    if (filter.types && filter.types.length > 0 && !filter.types.includes(record.type)) {
      return false;
    }
    
    // Filter by category
    if (filter.category && filter.category !== 'all' && record.category !== filter.category) {
      return false;
    }
    
    // Filter by amount range
    if (filter.minAmount !== undefined && record.amount < filter.minAmount) {
      return false;
    }
    
    if (filter.maxAmount !== undefined && record.amount > filter.maxAmount) {
      return false;
    }
    
    // Filter by date range
    if (filter.dateRange) {
      const recordDate = normalizeDate(record.date);
      
      let startDate: Date | null = null;
      let endDate: Date | null = null;
      
      if (Array.isArray(filter.dateRange)) {
        if (filter.dateRange[0]) startDate = new Date(filter.dateRange[0]);
        if (filter.dateRange[1]) endDate = new Date(filter.dateRange[1]);
      } else {
        if (filter.dateRange.start) startDate = new Date(filter.dateRange.start);
        if (filter.dateRange.end) endDate = new Date(filter.dateRange.end);
      }
      
      if (startDate && recordDate < startDate) return false;
      if (endDate && recordDate > endDate) return false;
    }
    
    // Filter by search term
    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      return (
        (record.description && record.description.toLowerCase().includes(searchLower)) ||
        (record.source && record.source.toLowerCase().includes(searchLower))
      );
    }
    
    // Filter by recurring status
    if (filter.showRecurring !== undefined && record.recurring !== filter.showRecurring) {
      return false;
    }
    
    // Filter by approval status
    if (filter.showApproved !== undefined && record.approved !== filter.showApproved) {
      return false;
    }
    
    return true;
  });
}

/**
 * Sorts economy records
 */
export function sortEconomieRecords(records: EconomieRecord[], sort: EconomieSort): EconomieRecord[] {
  if (!sort) return records;
  
  const field = typeof sort === 'object' ? sort.field : 'date';
  const direction = typeof sort === 'object' ? sort.direction : 'desc';
  
  return [...records].sort((a, b) => {
    switch (field) {
      case 'date': {
        const dateA = normalizeDate(a.date).getTime();
        const dateB = normalizeDate(b.date).getTime();
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      case 'amount':
        return direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      case 'type':
        return direction === 'asc' 
          ? a.type.localeCompare(b.type) 
          : b.type.localeCompare(a.type);
      case 'category':
        return direction === 'asc' 
          ? (a.category || '').localeCompare(b.category || '') 
          : (b.category || '').localeCompare(a.category || '');
      default:
        return direction === 'asc' 
          ? String(a.id).localeCompare(String(b.id)) 
          : String(b.id).localeCompare(String(a.id));
    }
  });
}
