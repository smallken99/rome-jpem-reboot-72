
// Create a helper for form handling that can deal with complex GameDate objects
import { useState } from 'react';
import { Loi } from '../../../types/lois';
import { formatAnyGameDate, ensureGameDate } from '../utils/dateHelpers';

export const useLoiForm = (initialLoi?: Loi) => {
  const [formData, setFormData] = useState<Partial<Loi>>(initialLoi || {
    id: '',
    titre: '',
    description: '',
    proposeur: '',
    catégorie: 'Politique',
    date: { year: new Date().getFullYear(), season: 'Ver' },
    état: 'En délibération',
    importance: 'normale',
    votesPositifs: 0,
    votesNégatifs: 0,
    votesAbstention: 0,
    effets: {},
    // Add the other fields that might be used
    commentaires: [],
    clauses: [],
    tags: [],
    type: 'Politique'
  });
  
  // Handle standard input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select input changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle date changes (special case due to GameDate format)
  const handleDateChange = (date: string) => {
    try {
      const gameDate = ensureGameDate(date);
      setFormData(prev => ({ ...prev, date: gameDate }));
    } catch (e) {
      console.error('Error parsing date:', e);
    }
  };
  
  // Format a date for display in the form
  const formatDateForDisplay = (date: any): string => {
    if (!date) return '';
    return formatAnyGameDate(date);
  };
  
  // Add effect to the law
  const addEffect = (effect: string) => {
    if (!effect.trim()) return;
    
    setFormData(prev => {
      const updatedEffets = Array.isArray(prev.effets) 
        ? [...prev.effets, effect] 
        : { ...(prev.effets || {}), [Date.now()]: effect };
      
      return {
        ...prev,
        effets: updatedEffets
      };
    });
  };
  
  return {
    formData,
    setFormData,
    handleChange,
    handleSelectChange,
    handleDateChange,
    formatDateForDisplay,
    addEffect
  };
};
