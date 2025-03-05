
import React from 'react';
import { Sword, Building, ScrollText } from 'lucide-react';
import { EducationPath } from '../types/educationTypes';

// Parcours éducatifs avec cursus annuel et statistiques explicitement liées
export const educationPaths: EducationPath[] = [
  {
    type: 'military',
    icon: <Sword className="h-5 w-5" />,
    title: 'Éducation Militaire',
    description: 'Formation aux arts de la guerre, stratégie et leadership sur le champ de bataille.',
    minAge: 10, // Abaissé de 12 à 10 ans
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
    minAge: 6, // Abaissé de 8 à 6 ans
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
    minAge: 5, // Abaissé de 6 à 5 ans
    suitableFor: 'both',
    duration: 2,
    annualCurriculum: [
      { year: 1, name: "Fondations Religieuses", skills: ["Panthéon romain", "Calendrier sacré", "Offrandes rituelles"] },
      { year: 2, name: "Rituels et Cérémonies Avancés", skills: ["Divination", "Sacrifices", "Direction des cérémonies"] }
    ],
    relatedStat: 'piety' // Explicitly links to piety stat
  },
];
