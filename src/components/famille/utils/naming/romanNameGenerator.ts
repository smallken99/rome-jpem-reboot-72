
export const generateRomanName = (gender: 'male' | 'female', familyName: string = ''): string => {
  const maleFirstNames = [
    'Marcus', 'Gaius', 'Lucius', 'Quintus', 'Publius', 'Titus', 'Aulus',
    'Servius', 'Decimus', 'Gnaeus', 'Sextus', 'Tiberius', 'Spurius', 'Manius'
  ];

  const femaleFirstNames = [
    'Julia', 'Cornelia', 'Claudia', 'Valeria', 'Flavia', 'Lucretia', 'Aurelia',
    'Livia', 'Octavia', 'Antonia', 'Tullia', 'Caecilia', 'Marcia', 'Sempronia'
  ];

  const romanFamilyNames = [
    'Aurelius', 'Julius', 'Claudius', 'Cornelius', 'Valerius', 'Aemilius', 'Fabius',
    'Domitius', 'Livius', 'Tullius', 'Sempronius', 'Caecilius', 'Antonius', 'Cassius'
  ];

  const firstNames = gender === 'male' ? maleFirstNames : femaleFirstNames;
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  
  // If family name is provided, use it, otherwise generate a random one
  const lastName = familyName || romanFamilyNames[Math.floor(Math.random() * romanFamilyNames.length)];
  
  if (gender === 'male') {
    return `${firstName} ${lastName}`;
  } else {
    // Female Roman names often used the feminine form of the family name
    return lastName.endsWith('us') 
      ? `${firstName} ${lastName.replace(/us$/, 'a')}` 
      : `${firstName} ${lastName}`;
  }
};
