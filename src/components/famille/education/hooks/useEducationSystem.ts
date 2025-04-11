
import { useState, useCallback } from 'react';
import { useCharacters } from '../../hooks/useCharacters';
import { Character } from '@/types/character';
import { 
  EducationPath, 
  EducationType,
  EducationLevel
} from '../types/educationTypes';
import { getAllEducationPaths } from '../data/paths';

// Interface pour les paramètres de filtrage
interface EducationFilters {
  type?: EducationType;
  minLevel?: number;
  maxLevel?: number;
  suitableFor?: 'male' | 'female' | 'both';
}

export const useEducationSystem = () => {
  const [filters, setFilters] = useState<EducationFilters>({});
  const { characters, updateCharacter } = useCharacters();
  
  // Récupérer tous les chemins d'éducation disponibles
  const allEducationPaths = getAllEducationPaths();
  
  // Filtrer les chemins d'éducation en fonction des critères
  const filteredPaths = useCallback((characterGender?: 'male' | 'female') => {
    return allEducationPaths.filter(path => {
      // Filtrer par type si spécifié
      if (filters.type && path.type !== filters.type) {
        return false;
      }
      
      // Filtrer par niveau minimum
      if (filters.minLevel !== undefined && path.level < filters.minLevel) {
        return false;
      }
      
      // Filtrer par niveau maximum
      if (filters.maxLevel !== undefined && path.level > filters.maxLevel) {
        return false;
      }
      
      // Filtrer par genre approprié
      if (characterGender && path.suitableFor) {
        if (typeof path.suitableFor === 'string') {
          return path.suitableFor === 'both' || path.suitableFor === characterGender;
        } else if (Array.isArray(path.suitableFor)) {
          return path.suitableFor.includes(characterGender);
        } else if (path.suitableFor.gender) {
          return path.suitableFor.gender === 'both' || path.suitableFor.gender === characterGender;
        }
      }
      
      return true;
    });
  }, [filters, allEducationPaths]);
  
  // Fonction pour mettre à jour les filtres
  const setEducationFilters = useCallback((newFilters: Partial<EducationFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  
  // Fonction pour assigner un chemin d'éducation à un personnage
  const assignEducationPath = useCallback((characterId: string, pathId: string) => {
    const character = characters.find(c => c.id === characterId);
    const path = allEducationPaths.find(p => p.id === pathId);
    
    if (!character || !path) return false;
    
    const updatedCharacter = {
      ...character,
      currentEducation: {
        ...character.currentEducation,
        pathId: pathId,
        progress: 0,
        level: path.level || 1,
        type: path.type
      }
    };
    
    updateCharacter(updatedCharacter);
    return true;
  }, [characters, allEducationPaths, updateCharacter]);
  
  // Récupérer le chemin d'éducation actuel d'un personnage
  const getCurrentEducationPath = useCallback((character: Character) => {
    if (!character.currentEducation?.pathId) return null;
    return allEducationPaths.find(path => path.id === character.currentEducation?.pathId) || null;
  }, [allEducationPaths]);
  
  return {
    allEducationPaths,
    filteredPaths,
    setEducationFilters,
    assignEducationPath,
    getCurrentEducationPath
  };
};
