
// Données des noms romains pour la génération aléatoire
export const romanNamePrefixes = [
  'Marcus', 'Lucius', 'Gaius', 'Quintus', 'Publius', 'Titus', 'Servius', 'Aulus',
  'Gnaeus', 'Decimus', 'Spurius', 'Sextus', 'Tiberius', 'Manius', 'Appius', 'Vibius'
];

export const romanNameSuffixes = [
  'Claudius', 'Cornelius', 'Fabius', 'Valerius', 'Aemilius', 'Aurelius', 'Caecilius', 'Calpurnius',
  'Cassius', 'Domitius', 'Flavius', 'Fulvius', 'Julius', 'Junius', 'Licinius', 'Marius',
  'Octavius', 'Pompeius', 'Porcius', 'Sempronius', 'Sulpicius', 'Tullius', 'Vitellius'
];

// Fonction pour générer un nom romain aléatoire
export const generateRomanName = (): string => {
  const prefix = romanNamePrefixes[Math.floor(Math.random() * romanNamePrefixes.length)];
  const suffix = romanNameSuffixes[Math.floor(Math.random() * romanNameSuffixes.length)];
  return `${prefix} ${suffix}`;
};
