
import { RegistrationData } from '@/types/registration';

/**
 * Calculate bonuses and maluses based on registration choices
 */
export const calculateBonusMalus = (registrationData: RegistrationData): RegistrationData => {
  const newData = { ...registrationData };
  const { gens, familyHead, headEducation } = newData;
  
  // Reset stats to base values
  if (familyHead.stats) {
    familyHead.stats.popularity.value = 20;
    familyHead.stats.oratory.value = 20;
    familyHead.stats.piety.value = 20;
    familyHead.stats.martialEducation.value = 20;
  }
  
  // Reset wealth to base value
  gens.wealth = 100000;
  
  // Apply origin bonuses/maluses
  if (gens.origin === 'aristocrate') {
    gens.wealth += 75000;
    if (familyHead.stats) familyHead.stats.popularity.value -= 5;
  } else if (gens.origin === 'agricole') {
    // Assume different property quality will be handled elsewhere
    if (familyHead.stats) familyHead.stats.piety.value -= 5;
  } else if (gens.origin === 'populaire') {
    if (familyHead.stats) familyHead.stats.popularity.value += 10;
    gens.reputation -= 5;
  }
  
  // Apply education bonuses/maluses
  if (headEducation === 'rome') {
    if (familyHead.stats) familyHead.stats.oratory.value += 10;
    gens.wealth -= 20000;
  } else if (headEducation === 'armee') {
    if (familyHead.stats) {
      familyHead.stats.martialEducation.value += 10;
      familyHead.stats.oratory.value -= 5;
    }
  } else if (headEducation === 'religieux') {
    if (familyHead.stats) {
      familyHead.stats.piety.value += 10;
      familyHead.stats.popularity.value -= 5;
    }
  }
  
  // Apply philosophy bonuses/maluses
  if (gens.philosophy === 'traditionaliste') {
    gens.reputation += 10;
    if (familyHead.stats) familyHead.stats.oratory.value -= 5;
  } else if (gens.philosophy === 'pragmatique') {
    if (familyHead.stats) {
      familyHead.stats.oratory.value += 10;
      familyHead.stats.martialEducation.value -= 5;
    }
  } else if (gens.philosophy === 'opportuniste') {
    if (familyHead.stats) familyHead.stats.popularity.value += 10;
    gens.reputation -= 5;
  }
  
  return newData;
};

/**
 * Get default registration data
 */
export const getDefaultRegistrationData = (): RegistrationData => {
  return {
    username: '',
    email: '',
    password: '',
    gens: {
      name: '',
      motto: '',
      influence: 0,
      wealth: 100000, // Default money: 100,000 as
      reputation: 0,
    },
    familyHead: {
      name: '',
      age: 35,
      gender: 'male',
      stats: {
        popularity: {
          name: 'Popularité',
          value: 20,
          maxValue: 100,
          icon: 'users',
          description: 'Votre influence auprès du peuple',
          color: 'bg-blue-500'
        },
        oratory: {
          name: 'Éloquence',
          value: 20,
          maxValue: 100,
          icon: 'message-square',
          description: 'Votre capacité à convaincre et persuader',
          color: 'bg-amber-500'
        },
        piety: {
          name: 'Piété',
          value: 20,
          maxValue: 100,
          icon: 'landmark',
          description: 'Votre dévotion aux dieux romains',
          color: 'bg-purple-500'
        },
        martialEducation: {
          name: 'Éducation Militaire',
          value: 20,
          maxValue: 100,
          icon: 'shield',
          description: "Votre connaissance de l'art de la guerre",
          color: 'bg-red-500'
        }
      }
    }
  };
};
