
// Liste des noms romains pour les précepteurs
export const romanNames = [
  'Gaius Livius', 'Marcus Tullius', 'Quintus Fabius', 'Lucius Aemilius', 
  'Titus Flavius', 'Publius Cornelius', 'Gnaeus Pompeius', 'Sextus Julius',
  'Aulus Postumius', 'Decimus Valerius', 'Tiberius Claudius', 'Marcus Porcius',
  'Servius Sulpicius', 'Manius Curius', 'Appius Claudius', 'Spurius Furius'
];

// Export en tant que préfixes et suffixes pour la compatibilité avec d'autres fichiers
export const romanNamePrefixes = romanNames.map(name => name.split(' ')[0]);
export const romanNameSuffixes = romanNames.map(name => name.split(' ')[1]);
