import React from 'react';
import { GraduationCap, Sword, Building, ScrollText, ShieldQuestion, BookOpen } from 'lucide-react';

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
      yearsCompleted: 1,
      totalYears: 2
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
      totalYears: 2
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
  religious: ['Pontifex', 'Augure', 'Flamine', 'Vestale', 'Haruspice', 'Rex Sacrorum', 'Salii', 'Fetiales']
};

// Education paths with annual curriculum and explicitly linked stats
export const educationPaths = [
  {
    type: 'military',
    icon: <Sword className="h-5 w-5" />,
    title: 'Éducation Militaire',
    description: 'Formation aux arts de la guerre, stratégie et leadership sur le champ de bataille.',
    minAge: 12,
    suitableFor: 'male', // Explicitly for males only
    duration: 2,
    annualCurriculum: [
      { year: 1, name: "Initiation Martiale", skills: ["Maniement du bouclier", "Discipline militaire", "Marche forcée"] },
      { year: 2, name: "Tactiques Avancées", skills: ["Formation en phalange", "Commandement", "Stratégie de bataille"] }
    ],
    relatedStat: 'martialEducation' // Explicitly links to martialEducation stat
  },
  {
    type: 'political',
    icon: <Building className="h-5 w-5" />,
    title: 'Éducation Politique',
    description: 'Éducation en rhétorique, droit et philosophie pour exceller au Sénat.',
    minAge: 8,
    suitableFor: 'both',
    duration: 2,
    annualCurriculum: [
      { year: 1, name: "Fondations Politiques", skills: ["Histoire romaine", "Poésie grecque", "Élocution"] },
      { year: 2, name: "Art Oratoire Avancé", skills: ["Rhétorique", "Droit romain", "Débat public"] }
    ],
    relatedStat: 'oratory' // Explicitly links to oratory stat
  },
  {
    type: 'religious',
    icon: <ScrollText className="h-5 w-5" />,
    title: 'Éducation Religieuse',
    description: 'Étude des rites sacrés, divination et traditions religieuses romaines.',
    minAge: 6,
    suitableFor: 'both',
    duration: 2,
    annualCurriculum: [
      { year: 1, name: "Fondations Religieuses", skills: ["Panthéon romain", "Calendrier sacré", "Offrandes rituelles"] },
      { year: 2, name: "Rituels et Cérémonies Avancés", skills: ["Divination", "Sacrifices", "Direction des cérémonies"] }
    ],
    relatedStat: 'piety' // Explicitly links to piety stat
  },
];
