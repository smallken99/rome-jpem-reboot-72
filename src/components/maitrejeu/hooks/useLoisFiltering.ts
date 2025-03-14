
import { useState, useMemo } from 'react';
import { Loi } from '../types/lois';

export interface LoisFilterState {
  searchTerm: string;
  filterCriteria: Record<string, any>;
}

export function useLoisFiltering(lois: Loi[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState<Record<string, any>>({});
  
  // Apply filters to lois
  const filteredLois = useMemo(() => {
    return lois.filter(loi => {
      // Filter by search term
      const matchesSearch = searchTerm === '' || 
        (loi.title || loi.titre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        loi.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (loi.proposedBy || loi.proposeur || loi.auteur || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      
      // Apply additional filters if any
      if (Object.keys(filterCriteria).length === 0) return true;
      
      // Add custom filtering logic for each criteria
      return true; // For now return true, would expand based on filter criteria
    });
  }, [lois, searchTerm, filterCriteria]);
  
  // Helper to normalize loi status
  const normalizeStatus = (loi: Loi): 'active' | 'proposed' | 'rejected' | 'expired' => {
    if (loi.status === 'active') return 'active';
    if (loi.status === 'proposed') return 'proposed';
    if (loi.status === 'rejected') return 'rejected';
    if (loi.status === 'expired') return 'expired';
    
    // Handle legacy status field
    if (loi.état === 'Promulguée' || loi.état === 'adoptée' || loi.état === 'promulguée') return 'active';
    if (loi.état === 'proposée' || loi.état === 'En délibération') return 'proposed';
    if (loi.état === 'rejetée') return 'rejected';
    
    // Handle République format
    if (loi.statut === 'promulguée') return 'active';
    if (loi.statut === 'proposée' || loi.statut === 'en_débat') return 'proposed';
    if (loi.statut === 'rejetée') return 'rejected';
    
    return 'proposed'; // Default
  };
  
  // Get filtered lois by status
  const getLoisByStatus = (status: 'active' | 'proposed' | 'rejected') => {
    return filteredLois.filter(loi => normalizeStatus(loi) === status);
  };
  
  const loisActives = useMemo(() => getLoisByStatus('active'), [filteredLois]);
  const loisProposees = useMemo(() => getLoisByStatus('proposed'), [filteredLois]);
  const loisRejetees = useMemo(() => getLoisByStatus('rejected'), [filteredLois]);
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterCriteria({});
  };
  
  // Update filter criteria
  const updateFilterCriteria = (key: string, value: any) => {
    setFilterCriteria(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return {
    searchTerm,
    setSearchTerm,
    filterCriteria,
    updateFilterCriteria,
    resetFilters,
    filteredLois,
    loisActives,
    loisProposees,
    loisRejetees,
    normalizeStatus
  };
}
