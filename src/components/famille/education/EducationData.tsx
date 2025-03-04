
import React from 'react';
import { GraduationCap, Sword, Building, ScrollText, ShieldQuestion, Coins, BookOpen } from 'lucide-react';

// Sample education data with children
export const children = [
  {
    id: '1',
    name: 'Titus Tullius',
    age: 15,
    gender: 'male',
    currentEducation: {
      type: 'military',
      mentor: 'Centurion Flavius Aquila',
      progress: 65,
      pityBonus: 10, // Piety bonus from religious activities
      skills: ['Tactique de base', 'Maniement du glaive', 'Discipline militaire'],
      yearsCompleted: 2,
      totalYears: 5
    }
  },
  {
    id: '2',
    name: 'Lucia Tullia Minor',
    age: 12,
    gender: 'female',
    currentEducation: {
      type: 'political',
      mentor: 'Sénateur Marcus Porcius',
      progress: 40,
      pityBonus: 5, // Small piety bonus
      skills: ['Rhétorique', 'Histoire romaine', 'Poésie grecque'],
      yearsCompleted: 1,
      totalYears: 4
    }
  },
  {
    id: '3',
    name: 'Quintus Tullius',
    age: 10,
    gender: 'male',
    currentEducation: {
      type: 'none',
      mentor: null,
      progress: 0,
      skills: [],
      yearsCompleted: 0,
      totalYears: 0
    }
  },
];

// Roman name components for random generation
export const romanNamePrefixes = [
  'Marcus', 'Lucius', 'Gaius', 'Quintus', 'Publius', 'Titus', 'Servius', 'Aulus',
  'Gnaeus', 'Decimus', 'Spurius', 'Sextus', 'Tiberius', 'Manius', 'Appius', 'Vibius'
];

export const romanNameSuffixes = [
  'Claudius', 'Cornelius', 'Fabius', 'Valerius', 'Aemilius', 'Aurelius', 'Caecilius', 'Calpurnius',
  'Cassius', 'Domitius', 'Flavius', 'Fulvius', 'Julius', 'Junius', 'Licinius', 'Marius',
  'Octavius', 'Pompeius', 'Porcius', 'Sempronius', 'Sulpicius', 'Tullius', 'Vitellius'
];

// Specialties by education type
export const specialties = {
  military: [
    'Combat à l\'épée', 'Tactique de bataille', 'Survivre en campagne', 'Guerilla et embuscades', 
    'Commandement de légion', 'Cavalerie', 'Archerie', 'Siège', 'Navigation militaire',
    'Logistique militaire', 'Fortification', 'Combat en formation'
  ],
  political: [
    'Rhétorique avancée', 'Débat public', 'Politique et législation', 'Droit romain',
    'Stoïcisme et éthique politique', 'Administration provinciale', 'Diplomatie',
    'Histoire romaine', 'Grec ancien', 'Éloquence', 'Philosophie politique'
  ],
  commercial: [
    'Commerce maritime', 'Finance et prêts', 'Commerce avec l\'Orient', 'Collecte d\'impôts',
    'Gestion des domaines agricoles', 'Commerce du vin', 'Commerce du grain',
    'Négociation commerciale', 'Comptabilité', 'Logistique commerciale', 'Droit commercial'
  ],
  religious: [
    'Rites et cérémonies', 'Divination et présages', 'Traditions religieuses', 'Culte de Vesta',
    'Lecture des entrailles', 'Interprétation des augures', 'Rituels funéraires',
    'Mystères d\'Eleusis', 'Prophéties sibyllines', 'Cultes orientaux', 'Sacrifices rituels'
  ]
};

// Titles by education type for preceptors
export const titles = {
  military: ['Centurion', 'Tribune', 'Vétéran', 'Légat', 'Instructeur', 'Praetor', 'Optio', 'Aquilifer'],
  political: ['Sénateur', 'Orateur', 'Consul', 'Juriste', 'Philosophe', 'Questeur', 'Édile', 'Magistrat'],
  commercial: ['Negotiator', 'Argentarius', 'Mercator', 'Publicanus', 'Agricola', 'Navarchus', 'Institor', 'Vilicus'],
  religious: ['Pontifex', 'Augure', 'Flamine', 'Vestale', 'Haruspice', 'Rex Sacrorum', 'Salii', 'Fetiales']
};

// Education paths with annual curriculum
export const educationPaths = [
  {
    type: 'military',
    icon: <Sword className="h-5 w-5" />,
    title: 'Éducation Militaire',
    description: 'Formation aux arts de la guerre, stratégie et leadership sur le champ de bataille.',
    minAge: 12,
    suitableFor: 'male', // Explicitly for males only
    benefits: ['Accès aux légions', 'Réputation militaire', 'Possibilité de triomphe'],
    careers: ['Tribun militaire', 'Légat', 'Général'],
    duration: 5, // Total years required
    annualCurriculum: [
      { year: 1, name: "Initiation Martiale", skills: ["Maniement du bouclier", "Discipline militaire", "Marche forcée"] },
      { year: 2, name: "Tactiques Basiques", skills: ["Formation en phalange", "Armement légionnaire", "Lecture de terrain"] },
      { year: 3, name: "Équitation Militaire", skills: ["Combat monté", "Manœuvres de cavalerie", "Soins équestres"] },
      { year: 4, name: "Commandement", skills: ["Diriger une centurie", "Logistique militaire", "Fortifications"] },
      { year: 5, name: "Stratégie Avancée", skills: ["Siège", "Campagnes étendues", "Navigation militaire"] }
    ]
  },
  {
    type: 'political',
    icon: <Building className="h-5 w-5" />,
    title: 'Éducation Politique',
    description: 'Éducation en rhétorique, droit et philosophie pour exceller au Sénat.',
    minAge: 10,
    suitableFor: 'both',
    benefits: ['Éloquence', 'Réseau politique', 'Prestige au Sénat'],
    careers: ['Questeur', 'Édile', 'Préteur', 'Consul'],
    duration: 4,
    annualCurriculum: [
      { year: 1, name: "Fondations Politiques", skills: ["Histoire romaine", "Poésie grecque", "Élocution"] },
      { year: 2, name: "Art Oratoire", skills: ["Rhétorique", "Techniques de mémorisation", "Débat public"] },
      { year: 3, name: "Jurisprudence", skills: ["Droit romain", "Procédures judiciaires", "Plaidoirie"] },
      { year: 4, name: "Politique Avancée", skills: ["Stratégie électorale", "Administration provinciale", "Diplomatie"] }
    ]
  },
  {
    type: 'commercial',
    icon: <Coins className="h-5 w-5" />,
    title: 'Éducation Commerciale',
    description: 'Formation à la gestion des finances, commerce maritime et administration des terres.',
    minAge: 14,
    suitableFor: 'both',
    benefits: ['Prospérité économique', 'Réseau commercial', 'Gestion efficace des terres'],
    careers: ['Negotiator', 'Publicani', 'Argentarii'],
    duration: 3,
    annualCurriculum: [
      { year: 1, name: "Fondamentaux du Commerce", skills: ["Comptabilité", "Évaluation des marchandises", "Gestion d'entrepôt"] },
      { year: 2, name: "Commerce Maritime", skills: ["Cartographie", "Droit maritime", "Finance d'expédition"] },
      { year: 3, name: "Négociations Commerciales", skills: ["Commerce international", "Contrats légaux", "Gestion des crises"] }
    ]
  },
  {
    type: 'religious',
    icon: <ScrollText className="h-5 w-5" />,
    title: 'Éducation Religieuse',
    description: 'Étude des rites sacrés, divination et traditions religieuses romaines.',
    minAge: 12,
    suitableFor: 'both',
    benefits: ['Prestige religieux', 'Influence spirituelle', 'Exemption militaire'],
    careers: ['Pontife', 'Augure', 'Flamine', 'Vestale (femmes uniquement)'],
    duration: 4,
    annualCurriculum: [
      { year: 1, name: "Fondations Religieuses", skills: ["Panthéon romain", "Calendrier sacré", "Offrandes rituelles"] },
      { year: 2, name: "Rituels et Cérémonies", skills: ["Procession sacrée", "Sacrifices", "Interprétation des signes"] },
      { year: 3, name: "Arts Divinatoires", skills: ["Augures", "Haruspices", "Interprétation des prophéties"] },
      { year: 4, name: "Mystères Sacrés", skills: ["Rites initiatiques", "Conservation des traditions", "Direction des cérémonies"] }
    ]
  },
];
