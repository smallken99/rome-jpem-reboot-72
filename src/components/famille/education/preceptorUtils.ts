
import { romanNamePrefixes, romanNameSuffixes, specialties, titles } from './EducationData';

// Generate a random Roman name
export const generateRomanName = () => {
  const prefix = romanNamePrefixes[Math.floor(Math.random() * romanNamePrefixes.length)];
  const suffix = romanNameSuffixes[Math.floor(Math.random() * romanNameSuffixes.length)];
  return `${prefix} ${suffix}`;
};

// Generate a random speciality based on education type
export const generateSpeciality = (type: string) => {
  const typeSpecialties = specialties[type as keyof typeof specialties] || [];
  return typeSpecialties[Math.floor(Math.random() * typeSpecialties.length)];
};

// Generate a random reputation
export const generateReputation = () => {
  const reputations: ('Excellent' | 'Bon' | 'Moyen')[] = ['Excellent', 'Bon', 'Moyen'];
  const weights = [0.3, 0.5, 0.2]; // 30% Excellent, 50% Bon, 20% Moyen
  
  const random = Math.random();
  let cumulativeWeight = 0;
  
  for (let i = 0; i < reputations.length; i++) {
    cumulativeWeight += weights[i];
    if (random < cumulativeWeight) {
      return reputations[i];
    }
  }
  
  return 'Bon'; // Fallback
};

// Generate a random fee based on reputation
export const generateFee = (reputation: string) => {
  const baseFee = 1000;
  const reputationMultiplier = reputation === 'Excellent' ? 1.5 : 
                              reputation === 'Bon' ? 1.2 : 1.0;
  const randomVariation = 0.8 + Math.random() * 0.4; // 80% to 120% variation
  
  return Math.round(baseFee * reputationMultiplier * randomVariation / 100) * 100;
};

// Generate a random title based on education type
// Removed high-ranking titles like Consul, Pontifex, Legate, Praetor, etc.
export const generateTitle = (type: string) => {
  // Define appropriate titles for each education type without high-ranking positions
  const preceptorTitles = {
    military: ['Vétéran', 'Instructeur', 'Optio', 'Aquilifer', 'Decurion', 'Signifer'],
    political: ['Orateur', 'Juriste', 'Philosophe', 'Rhéteur', 'Scribe', 'Grammairien'],
    religious: ['Augure', 'Haruspice', 'Salii', 'Fetiales', 'Acolyte', 'Prêtre']
  };
  
  const typeTitles = preceptorTitles[type as keyof typeof preceptorTitles] || [];
  return typeTitles[Math.floor(Math.random() * typeTitles.length)];
};

// Generate a stat bonus based on preceptor reputation
export const generateStatBonus = (reputation: string) => {
  switch(reputation) {
    case 'Excellent':
      return 15 + Math.floor(Math.random() * 6); // 15-20 points
    case 'Bon':
      return 10 + Math.floor(Math.random() * 5); // 10-14 points
    case 'Moyen':
      return 5 + Math.floor(Math.random() * 5); // 5-9 points
    default:
      return 5; // Fallback
  }
};
