
import { Preceptor, EducationType } from './types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

/**
 * Crée un nouveau précepteur avec des valeurs par défaut
 */
export function createPreceptor(data: Partial<Preceptor>): Preceptor {
  return {
    id: data.id || uuidv4(),
    name: data.name || "Nouveau précepteur",
    specialization: data.specialization as EducationType || "rhetoric",
    specialty: data.specialty || data.speciality || "Rhétorique",
    expertise: data.expertise || 5,
    specialties: data.specialties || [],
    experience: data.experience || 5,
    cost: data.cost || 3000,
    price: data.price || 3000,
    background: data.background || "",
    traits: data.traits || [],
    status: data.status || "available",
    available: data.available !== undefined ? data.available : true,
    skill: data.skill || 5,
    quality: data.quality || 3,
    description: data.description || "",
    teachingStyle: data.teachingStyle || "Standard",
    reputation: data.reputation || 50
  };
}

/**
 * Calcule le prix d'un précepteur en fonction de son expertise et son expérience
 */
export function calculatePreceptorPrice(preceptor: Preceptor): number {
  const basePrice = 2000;
  const expertiseFactor = preceptor.expertise * 300;
  const experienceFactor = preceptor.experience * 100;
  const reputationBonus = (preceptor.reputation || 50) > 80 ? 1000 : 0;
  
  return basePrice + expertiseFactor + experienceFactor + reputationBonus;
}

/**
 * Évalue la qualité d'un précepteur sur une échelle de 1 à 5
 */
export function evaluatePreceptorQuality(preceptor: Preceptor): number {
  const expertise = preceptor.expertise || 5;
  const experience = preceptor.experience || 5;
  const reputation = preceptor.reputation || 50;
  
  const score = (expertise * 0.5) + (experience * 0.3) + (reputation * 0.2 / 10);
  
  if (score >= 9) return 5; // Exceptionnel
  if (score >= 7) return 4; // Excellent
  if (score >= 5) return 3; // Bon
  if (score >= 3) return 2; // Moyen
  return 1; // Médiocre
}

/**
 * Génère un formatage pour afficher les traits d'un précepteur
 */
export function formatPreceptorTraits(preceptor: Preceptor): string {
  if (!preceptor.traits || preceptor.traits.length === 0) {
    return "Aucun trait particulier";
  }
  
  return preceptor.traits.join(", ");
}
