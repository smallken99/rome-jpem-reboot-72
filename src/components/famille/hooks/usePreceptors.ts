
import { useState, useCallback } from 'react';
import { Preceptor, PreceptorFilter, PreceptorSort } from '../types/preceptor';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

// Données de précepteurs fictives pour le développement
const initialPreceptors: Preceptor[] = [
  {
    id: '1',
    name: 'Marcus Tullius',
    origin: 'Athènes',
    age: 45,
    skills: [
      { name: 'Rhétorique', level: 9, description: 'Art de convaincre et persuader' },
      { name: 'Philosophie', level: 8, description: 'Enseignement des grandes écoles philosophiques' },
      { name: 'Histoire', level: 7, description: 'Connaissance de l\'histoire romaine et grecque' }
    ],
    specialization: 'Lettres',
    cost: 5000,
    reputation: 9,
    background: 'Ancien tuteur de familles nobles athéniennes',
    availableUntil: new Date(2025, 5, 30),
    performance: 85
  },
  {
    id: '2',
    name: 'Lucius Aemilius',
    origin: 'Rome',
    age: 38,
    skills: [
      { name: 'Combat', level: 8, description: 'Techniques de combat au glaive et bouclier' },
      { name: 'Stratégie', level: 9, description: 'Art de la guerre et tactiques militaires' },
      { name: 'Leadership', level: 7, description: 'Commandement et gestion des hommes' }
    ],
    specialization: 'Militaire',
    cost: 4200,
    reputation: 8,
    background: 'Ancien centurion de la IXe légion',
    availableUntil: new Date(2025, 4, 15),
    performance: 80
  },
  {
    id: '3',
    name: 'Gaius Sempronius',
    origin: 'Alexandrie',
    age: 52,
    skills: [
      { name: 'Mathématiques', level: 9, description: 'Arithmétique, géométrie et astronomie' },
      { name: 'Médecine', level: 7, description: 'Connaissances médicales de base' },
      { name: 'Sciences naturelles', level: 8, description: 'Étude des plantes et des animaux' }
    ],
    specialization: 'Sciences',
    cost: 6000,
    reputation: 9,
    background: 'Ancien bibliothécaire à Alexandrie',
    availableUntil: new Date(2025, 6, 10),
    performance: 90
  }
];

export const usePreceptors = () => {
  const [preceptors, setPreceptors] = useState<Preceptor[]>(initialPreceptors);
  const [filters, setFilters] = useState<PreceptorFilter>({});
  const [sort, setSort] = useState<PreceptorSort>({ field: 'reputation', direction: 'desc' });
  
  // Filtrer les précepteurs
  const filteredPreceptors = useCallback(() => {
    return preceptors.filter(preceptor => {
      if (filters.specialization && preceptor.specialization !== filters.specialization) return false;
      if (filters.minReputation && preceptor.reputation < filters.minReputation) return false;
      if (filters.maxCost && preceptor.cost > filters.maxCost) return false;
      if (filters.origin && preceptor.origin !== filters.origin) return false;
      if (filters.available === true && preceptor.assignedTo) return false;
      return true;
    }).sort((a, b) => {
      const multiplier = sort.direction === 'asc' ? 1 : -1;
      return (a[sort.field] > b[sort.field] ? 1 : -1) * multiplier;
    });
  }, [preceptors, filters, sort]);
  
  // Obtenir un précepteur par ID
  const getPreceptorById = useCallback((id: string): Preceptor | undefined => {
    return preceptors.find(p => p.id === id);
  }, [preceptors]);
  
  // Ajouter un précepteur
  const addPreceptor = useCallback((preceptor: Omit<Preceptor, 'id'>): string => {
    const id = uuidv4();
    setPreceptors(prev => [...prev, { ...preceptor, id }]);
    toast.success(`Précepteur ${preceptor.name} ajouté avec succès`);
    return id;
  }, []);
  
  // Mettre à jour un précepteur
  const updatePreceptor = useCallback((id: string, updates: Partial<Omit<Preceptor, 'id'>>): boolean => {
    let updated = false;
    setPreceptors(prev => 
      prev.map(p => {
        if (p.id === id) {
          updated = true;
          return { ...p, ...updates };
        }
        return p;
      })
    );
    
    if (updated) {
      toast.success(`Précepteur mis à jour avec succès`);
    }
    return updated;
  }, []);
  
  // Supprimer un précepteur
  const deletePreceptor = useCallback((id: string): boolean => {
    let deleted = false;
    setPreceptors(prev => {
      const filtered = prev.filter(p => p.id !== id);
      deleted = filtered.length < prev.length;
      return filtered;
    });
    
    if (deleted) {
      toast.success(`Précepteur supprimé avec succès`);
    }
    return deleted;
  }, []);
  
  // Assigner un précepteur à un membre de famille
  const assignPreceptor = useCallback((preceptorId: string, memberId: string | null): boolean => {
    let assigned = false;
    setPreceptors(prev => 
      prev.map(p => {
        if (p.id === preceptorId) {
          assigned = true;
          return { 
            ...p, 
            assignedTo: memberId, 
            assignedDate: memberId ? new Date() : undefined 
          };
        }
        return p;
      })
    );
    
    if (assigned) {
      toast.success(memberId 
        ? `Précepteur assigné avec succès` 
        : `Précepteur libéré de son assignation`
      );
    }
    return assigned;
  }, []);
  
  // Évaluer les performances d'un précepteur
  const evaluatePreceptor = useCallback((preceptorId: string, performance: number): boolean => {
    let evaluated = false;
    setPreceptors(prev => 
      prev.map(p => {
        if (p.id === preceptorId) {
          evaluated = true;
          return { ...p, performance };
        }
        return p;
      })
    );
    
    if (evaluated) {
      toast.success(`Évaluation du précepteur mise à jour`);
    }
    return evaluated;
  }, []);
  
  return {
    preceptors,
    filteredPreceptors: filteredPreceptors(),
    filters,
    setFilters,
    sort,
    setSort,
    getPreceptorById,
    addPreceptor,
    updatePreceptor,
    deletePreceptor,
    assignPreceptor,
    evaluatePreceptor
  };
};
