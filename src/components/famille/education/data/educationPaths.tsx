
import React from 'react';
import { Shield, Book, Cross } from 'lucide-react';

export const educationPaths = [
  {
    id: 'military',
    name: 'Éducation Militaire',
    description: 'Former un futur commandant militaire, apprendre les arts de la guerre et du commandement',
    icon: <Shield className="h-8 w-8 text-red-600" />,
    benefits: [
      'Augmente significativement les compétences de commandement',
      'Améliore le prestige militaire de la famille',
      'Ouvre la voie à une carrière dans l\'armée romaine'
    ],
    requirements: {
      age: 7,
      gender: 'male',
      cost: 1200,
      duration: '8 ans'
    },
    outcomes: [
      'Tribun militaire',
      'Légat de légion',
      'Commandant de cavalerie'
    ],
    specialties: [
      'Combat à l\'épée', 
      'Tactique de bataille', 
      'Survivre en campagne', 
      'Guerilla et embuscades', 
      'Commandement de légion', 
      'Cavalerie', 
      'Archerie', 
      'Siège', 
      'Navigation militaire'
    ]
  },
  {
    id: 'political',
    name: 'Éducation Politique',
    description: 'Former un orateur, un juriste et un politicien romains',
    icon: <Book className="h-8 w-8 text-blue-600" />,
    benefits: [
      'Améliore l\'éloquence et la capacité de persuasion',
      'Développe les connaissances juridiques et politiques',
      'Crée des connections avec d\'autres familles patriciennes'
    ],
    requirements: {
      age: 7,
      gender: 'male',
      cost: 1500,
      duration: '10 ans'
    },
    outcomes: [
      'Avocat du forum',
      'Sénateur influent',
      'Magistrat'
    ],
    specialties: [
      'Rhétorique avancée', 
      'Débat public', 
      'Politique et législation', 
      'Droit romain',
      'Stoïcisme et éthique politique', 
      'Administration provinciale', 
      'Diplomatie',
      'Histoire romaine', 
      'Grec ancien'
    ]
  },
  {
    id: 'religious',
    name: 'Éducation Religieuse',
    description: 'Former un prêtre ou une vestale pour servir les dieux de Rome',
    icon: <Cross className="h-8 w-8 text-amber-600" />,
    benefits: [
      'Apporte la faveur divine à la famille',
      'Améliore le prestige religieux',
      'Offre une influence spirituelle sur le peuple romain'
    ],
    requirements: {
      age: 6,
      gender: 'both',
      cost: 1000,
      duration: '12 ans'
    },
    outcomes: [
      'Prêtre de Jupiter',
      'Vestale',
      'Augure',
      'Pontife'
    ],
    specialties: [
      'Rites et cérémonies', 
      'Divination et présages', 
      'Traditions religieuses', 
      'Culte de Vesta',
      'Lecture des entrailles', 
      'Interprétation des augures', 
      'Rituels funéraires',
      'Mystères d\'Eleusis', 
      'Prophéties sibyllines'
    ]
  }
];

// Fonction utilitaire pour obtenir un chemin d'éducation par ID
export const getEducationPathById = (id: string) => {
  return educationPaths.find(path => path.id === id);
};

// Fonction utilitaire pour obtenir la liste des spécialités d'un chemin d'éducation
export const getSpecialtiesByPath = (pathId: string) => {
  const path = getEducationPathById(pathId);
  return path ? path.specialties : [];
};
