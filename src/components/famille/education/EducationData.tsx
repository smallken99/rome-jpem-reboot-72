
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

// Available preceptors for each education path
export const preceptors = {
  military: [
    { id: 'm1', name: 'Centurion Flavius Aquila', speciality: 'Combat à l\'épée', reputation: 'Excellent', fee: 1500 },
    { id: 'm2', name: 'Tribune Gaius Marius', speciality: 'Tactique de bataille', reputation: 'Bon', fee: 1200 },
    { id: 'm3', name: 'Vétéran Lucius Cassius', speciality: 'Survivre en campagne', reputation: 'Moyen', fee: 800 },
    { id: 'm4', name: 'Instructeur Quintus Sertorius', speciality: 'Guerilla et embuscades', reputation: 'Excellent', fee: 1700 },
    { id: 'm5', name: 'Légat Marcus Calpurnius', speciality: 'Commandement de légion', reputation: 'Bon', fee: 1400 }
  ],
  political: [
    { id: 'p1', name: 'Sénateur Marcus Porcius', speciality: 'Rhétorique avancée', reputation: 'Excellent', fee: 2000 },
    { id: 'p2', name: 'Orateur Quintus Hortensius', speciality: 'Débat public', reputation: 'Bon', fee: 1600 },
    { id: 'p3', name: 'Consul Antonius', speciality: 'Politique et législation', reputation: 'Excellent', fee: 2200 },
    { id: 'p4', name: 'Juriste Servius Sulpicius', speciality: 'Droit romain', reputation: 'Excellent', fee: 1900 },
    { id: 'p5', name: 'Philosophe Cato Minor', speciality: 'Stoïcisme et éthique politique', reputation: 'Bon', fee: 1500 }
  ],
  commercial: [
    { id: 'c1', name: 'Negotiator Lucius Caecilius', speciality: 'Commerce maritime', reputation: 'Excellent', fee: 1800 },
    { id: 'c2', name: 'Argentarius Cassius', speciality: 'Finance et prêts', reputation: 'Bon', fee: 1500 },
    { id: 'c3', name: 'Mercator Marcus Crassus', speciality: 'Commerce avec l\'Orient', reputation: 'Excellent', fee: 2000 },
    { id: 'c4', name: 'Publicanus Titus Aufidius', speciality: 'Collecte d\'impôts et contrats publics', reputation: 'Bon', fee: 1700 },
    { id: 'c5', name: 'Agricola Lucius Quinctius', speciality: 'Gestion des domaines agricoles', reputation: 'Moyen', fee: 1200 }
  ],
  religious: [
    { id: 'r1', name: 'Pontifex Aemilius', speciality: 'Rites et cérémonies', reputation: 'Excellent', fee: 1800 },
    { id: 'r2', name: 'Augure Claudius', speciality: 'Divination et présages', reputation: 'Bon', fee: 1500 },
    { id: 'r3', name: 'Flamine Valerius', speciality: 'Traditions religieuses', reputation: 'Moyen', fee: 1000 },
    { id: 'r4', name: 'Vestale Claudia', speciality: 'Culte de Vesta et feu sacré', reputation: 'Excellent', fee: 1900 },
    { id: 'r5', name: 'Haruspice Titus Veturius', speciality: 'Lecture des entrailles', reputation: 'Bon', fee: 1400 }
  ]
};

// Education paths with annual curriculum
export const educationPaths = [
  {
    type: 'military',
    icon: <Sword className="h-5 w-5" />,
    title: 'Carrière Militaire',
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
    title: 'Carrière Politique',
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
    title: 'Commerce et Agriculture',
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
    title: 'Carrière Religieuse',
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
