
import React from 'react';

// Function to safely format a game date for rendering
export const formatGameDateForRender = (date: any): React.ReactNode => {
  if (!date) return "-";
  
  if (typeof date === 'string') {
    return date;
  }
  
  if (typeof date === 'object' && 'year' in date && 'season' in date) {
    return `${date.season} ${date.year}`;
  }
  
  // For Date objects
  if (date instanceof Date) {
    return date.toLocaleDateString();
  }
  
  // For other formats, just stringify
  return String(date);
};

// Function to determine if a value is a GameDate object
export const isGameDate = (date: any): boolean => {
  return typeof date === 'object' && date !== null && 'year' in date && 'season' in date;
};

// Function to extract year and season from any date format
export const extractGameDateComponents = (date: any): { year: number, season: string } | null => {
  if (!date) return null;
  
  if (typeof date === 'object' && 'year' in date && 'season' in date) {
    return { year: date.year, season: date.season };
  }
  
  if (typeof date === 'string') {
    // Try to parse string like "632 SUMMER"
    const parts = date.split(' ');
    if (parts.length >= 2) {
      return {
        year: parseInt(parts[0], 10),
        season: parts[1]
      };
    }
  }
  
  return null;
};
