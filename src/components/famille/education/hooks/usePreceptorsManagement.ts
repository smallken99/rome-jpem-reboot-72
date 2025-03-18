
import { useState, useEffect } from 'react';
import { Preceptor } from '../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_PRECEPTORS: Preceptor[] = [
  {
    id: '1',
    name: 'Marcus Tullius',
    specialties: ['Éloquence', 'Débat', 'Littérature'],
    expertise: 80,
    cost: 1500,
    reputation: 85,
    available: true,
    skill: 85,
    specialty: 'Rhétorique',
    quality: 4,
    status: 'available',
    background: 'Ancien consul et orateur renommé',
    rating: 4.5,
    description: 'Un ancien consul réputé pour son éloquence et ses écrits philosophiques.'
  },
  {
    id: '2',
    name: 'Lucius Cornelius',
    specialties: ['Tactique', 'Leadership', 'Stratégie'],
    expertise: 90,
    cost: 2000,
    reputation: 90,
    available: true,
    skill: 90,
    specialty: 'Militaire',
    quality: 5,
    status: 'available',
    background: 'Ancien général victorieux',
    rating: 5,
    description: 'Général décoré ayant servi sous plusieurs consuls. Expert en tactique militaire.'
  },
  {
    id: '3',
    name: 'Quintus Servilius',
    specialties: ['Rituels', 'Divination', 'Traditions'],
    expertise: 75,
    cost: 1200,
    reputation: 80,
    available: true,
    skill: 80,
    specialty: 'Religieux',
    quality: 4,
    status: 'available',
    background: 'Ancien augure respecté',
    rating: 4,
    description: 'Un augure respecté qui a servi dans les principaux temples de Rome.'
  },
  {
    id: '4',
    name: 'Publius Sempronius',
    specialties: ['Négociation', 'Diplomatie', 'Lois'],
    expertise: 85,
    cost: 1800,
    reputation: 80,
    available: true,
    skill: 85,
    specialty: 'Politique',
    quality: 4,
    status: 'available',
    background: 'Ancien tribun de la plèbe',
    rating: 4.2,
    description: 'Tribun de la plèbe qui s\'est distingué par sa connaissance des lois et sa capacité à négocier.'
  },
  {
    id: '5',
    name: 'Aulus Postumius',
    specialties: ['Combat', 'Discipline', 'Stratégie'],
    expertise: 70,
    cost: 1200,
    reputation: 75,
    available: true,
    skill: 75,
    specialty: 'Militaire',
    quality: 3,
    status: 'available',
    background: 'Centurion retraité',
    rating: 3.8,
    description: 'Ancien centurion ayant servi pendant 20 ans dans les légions romaines.'
  }
];

export const usePreceptorsManagement = () => {
  const [preceptors, setPreceptors] = useState<Preceptor[]>(DEFAULT_PRECEPTORS);
  
  const addPreceptor = (preceptorData: Omit<Preceptor, 'id'>) => {
    const newPreceptor: Preceptor = {
      id: uuidv4(),
      ...preceptorData
    };
    
    setPreceptors(prev => [...prev, newPreceptor]);
    return newPreceptor.id;
  };
  
  const updatePreceptor = (id: string, updates: Partial<Preceptor>) => {
    setPreceptors(prev => 
      prev.map(preceptor => 
        preceptor.id === id ? { ...preceptor, ...updates } : preceptor
      )
    );
  };
  
  const removePreceptor = (id: string) => {
    setPreceptors(prev => 
      prev.filter(preceptor => preceptor.id !== id)
    );
  };
  
  const getPreceptorsBySpecialty = (specialty: string) => {
    return preceptors.filter(p => 
      p.specialties.includes(specialty) || p.specialty === specialty
    );
  };
  
  const getAvailablePreceptors = () => {
    return preceptors.filter(p => p.available);
  };
  
  const getAssignedPreceptors = () => {
    return preceptors.filter(p => !p.available);
  };
  
  return {
    preceptors,
    setPreceptors,
    addPreceptor,
    updatePreceptor,
    removePreceptor,
    getPreceptorsBySpecialty,
    getAvailablePreceptors,
    getAssignedPreceptors
  };
};
