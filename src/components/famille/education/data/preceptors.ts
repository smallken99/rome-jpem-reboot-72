
import { Preceptor } from '../types/educationTypes';
import { romanNames } from './romanNames';
import { educationSpecialties } from './specialties';

// Générer des précepteurs (mentors) pour le système d'éducation
export const generatePreceptors = (): Record<string, Preceptor[]> => {
  const preceptorsByType: Record<string, Preceptor[]> = {};
  
  // Créer une copie des noms pour éviter de modifier l'original
  const availableNames = [...romanNames];
  
  // Créer les précepteurs pour chaque type d'éducation
  Object.keys(educationSpecialties).forEach(type => {
    preceptorsByType[type] = [];
    
    // Générer 3 précepteurs pour chaque type
    for (let i = 0; i < 3; i++) {
      const reputation = i === 0 ? "Excellent" : i === 1 ? "Bon" : "Moyen";
      const quality = i === 0 ? 5 : i === 1 ? 4 : 3;
      const cost = i === 0 ? 10000 : i === 1 ? 7000 : 4000;
      
      // Choisir aléatoirement un nom et une spécialité
      const nameIndex = Math.floor(Math.random() * availableNames.length);
      const specialtyIndex = Math.floor(Math.random() * educationSpecialties[type].length);
      
      preceptorsByType[type].push({
        id: `${type}-${i}`,
        name: `${availableNames[nameIndex]} ${i === 0 ? 'le Sage' : i === 1 ? 'l\'Érudit' : ''}`,
        specialty: educationSpecialties[type][specialtyIndex],
        skill: i === 0 ? 85 : i === 1 ? 70 : 55,
        price: cost,
        status: 'available',
        background: `Un éducateur expérimenté, spécialisé en ${educationSpecialties[type][specialtyIndex]}.`,
        childId: null
      });
      
      // Éviter les doublons de noms
      availableNames.splice(nameIndex, 1);
    }
  });
  
  return preceptorsByType;
};
