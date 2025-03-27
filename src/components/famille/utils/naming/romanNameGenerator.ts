
import { romanNames, femaleRomanNames } from '../../education/data/romanNames';

export const generateRomanName = (gender: 'male' | 'female', familyName?: string): string => {
  if (gender === 'male') {
    const praenomen = romanNames[Math.floor(Math.random() * romanNames.length)].split(' ')[0];
    return `${praenomen} ${familyName || 'Ignotus'}`;
  } else {
    const name = femaleRomanNames[Math.floor(Math.random() * femaleRomanNames.length)];
    if (familyName) {
      // Pour les femmes romaines, on utilise souvent le nom de famille au féminin
      return `${name} ${familyName}`;
    }
    return name;
  }
};

export const generateFullRomanName = (gender: 'male' | 'female', gens?: string): string => {
  if (gender === 'male') {
    const randomNameIndex = Math.floor(Math.random() * romanNames.length);
    const nameParts = romanNames[randomNameIndex].split(' ');
    const praenomen = nameParts[0]; // Prénom (ex: Marcus)
    const nomen = gens || nameParts[1]; // Nom de gens (ex: Tullius)
    
    // Parfois ajouter un cognomen (surnom)
    const cognomens = ['Cicero', 'Magnus', 'Caesar', 'Scipio', 'Cato', 'Brutus', 'Flaccus', 'Rufus'];
    const hasCognomen = Math.random() > 0.5;
    
    if (hasCognomen) {
      const cognomen = cognomens[Math.floor(Math.random() * cognomens.length)];
      return `${praenomen} ${nomen} ${cognomen}`;
    }
    
    return `${praenomen} ${nomen}`;
  } else {
    // Les femmes romaines portaient généralement le nomen de leur père au féminin
    const name = femaleRomanNames[Math.floor(Math.random() * femaleRomanNames.length)];
    
    if (gens) {
      // Pour les femmes romaines, on utilise souvent le nom de famille au féminin
      return `${name} ${gens}a`;
    }
    
    return name;
  }
};
