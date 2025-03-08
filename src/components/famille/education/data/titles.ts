
// Titres par type d'éducation pour les précepteurs
export const titles = {
  military: ['Centurion', 'Tribune', 'Vétéran', 'Légat', 'Instructeur', 'Praetor', 'Optio', 'Aquilifer'],
  political: ['Sénateur', 'Orateur', 'Consul', 'Juriste', 'Philosophe', 'Questeur', 'Édile', 'Magistrat'],
  religious: ['Pontifex', 'Augure', 'Flamine', 'Vestale', 'Haruspice', 'Rex Sacrorum', 'Salii', 'Fetiales']
};

// Fonction pour assigner un titre basé sur la spécialité
export const assignRandomTitle = (speciality: string): string => {
  // Détermine le type de précepteur basé sur sa spécialité
  let typeCategory: 'military' | 'political' | 'religious' = 'political'; // Par défaut

  const militarySpecialties = [
    'Tactique militaire', 'Stratégie militaire', 'Ingénierie militaire', 
    'Combat à l\'épée', 'Guerilla et embuscades', 'Commandement de légion', 
    'Cavalerie', 'Archerie', 'Siège', 'Navigation militaire', 'Fortification'
  ];

  const religiousSpecialties = [
    'Rituel religieux', 'Augure', 'Divination', 
    'Rites et cérémonies', 'Lecture des entrailles', 'Interprétation des augures', 
    'Rituels funéraires', 'Prophéties sibyllines', 'Cultes orientaux'
  ];

  if (militarySpecialties.some(s => speciality.includes(s))) {
    typeCategory = 'military';
  } else if (religiousSpecialties.some(s => speciality.includes(s))) {
    typeCategory = 'religious';
  }

  // Prend un titre aléatoire pour le type approprié
  const availableTitles = titles[typeCategory];
  return availableTitles[Math.floor(Math.random() * availableTitles.length)];
};
