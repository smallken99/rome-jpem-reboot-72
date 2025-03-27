
// Préfixes et suffixes de noms romains
const maleFirstNames = [
  'Marcus', 'Gaius', 'Lucius', 'Titus', 'Quintus', 
  'Publius', 'Aulus', 'Servius', 'Decimus', 'Gnaeus',
  'Tiberius', 'Appius', 'Spurius', 'Sextus', 'Manius'
];

const femaleFirstNames = [
  'Julia', 'Cornelia', 'Claudia', 'Valeria', 'Lucretia',
  'Tullia', 'Livia', 'Aurelia', 'Antonia', 'Fulvia',
  'Octavia', 'Caecilia', 'Camilla', 'Flavia', 'Calpurnia'
];

const familyNames = [
  'Claudius', 'Julius', 'Cornelius', 'Aurelius', 'Valerius',
  'Fabius', 'Tullius', 'Aemilius', 'Livius', 'Caecilius',
  'Antonius', 'Sergius', 'Licinius', 'Cassius', 'Octavius'
];

/**
 * Génère un nom romain basé sur le genre
 * @param gender le genre ('male' ou 'female')
 * @param familyName le nom de famille, si déjà connu
 * @returns un nom complet au format romain
 */
export function generateRomanName(gender: 'male' | 'female', familyName?: string): string {
  const firstNamesList = gender === 'male' ? maleFirstNames : femaleFirstNames;
  const firstName = firstNamesList[Math.floor(Math.random() * firstNamesList.length)];
  
  // Si le nom de famille est fourni, l'utiliser; sinon en générer un
  const lastName = familyName || familyNames[Math.floor(Math.random() * familyNames.length)];
  
  // Pour les femmes, le nom de famille est généralement féminisé
  const finalLastName = gender === 'female' && !familyName 
    ? lastName.replace(/us$/, 'a') 
    : lastName;
  
  return `${firstName} ${finalLastName}`;
}

/**
 * Extrait le prénom d'un nom romain complet
 */
export function extractFirstName(fullName: string): string {
  return fullName.split(' ')[0] || fullName;
}

/**
 * Extrait le nom de famille d'un nom romain complet
 */
export function extractFamilyName(fullName: string): string {
  const parts = fullName.split(' ');
  return parts.length > 1 ? parts[1] : '';
}
