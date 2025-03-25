
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
  
  // For other formats, just stringify
  return String(date);
};
