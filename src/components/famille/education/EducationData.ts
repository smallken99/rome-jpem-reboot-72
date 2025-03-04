
import React from 'react';
import { GraduationCap, Sword, Building, ScrollText, ShieldQuestion, Coins } from 'lucide-react';

// Sample education data
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
      skills: ['Tactique de base', 'Maniement du glaive', 'Discipline militaire']
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
      skills: ['Rhétorique', 'Histoire romaine', 'Poésie grecque']
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
      skills: []
    }
  },
];

// Education paths
export const educationPaths = [
  {
    type: 'military',
    icon: <Sword className="h-5 w-5" />,
    title: 'Carrière Militaire',
    description: 'Formation aux arts de la guerre, stratégie et leadership sur le champ de bataille.',
    minAge: 12,
    suitableFor: 'male',
    benefits: ['Accès aux légions', 'Réputation militaire', 'Possibilité de triomphe'],
    careers: ['Tribun militaire', 'Légat', 'Général']
  },
  {
    type: 'political',
    icon: <Building className="h-5 w-5" />,
    title: 'Carrière Politique',
    description: 'Éducation en rhétorique, droit et philosophie pour exceller au Sénat.',
    minAge: 10,
    suitableFor: 'both',
    benefits: ['Éloquence', 'Réseau politique', 'Prestige au Sénat'],
    careers: ['Questeur', 'Édile', 'Préteur', 'Consul']
  },
  {
    type: 'commercial',
    icon: <Coins className="h-5 w-5" />,
    title: 'Commerce et Agriculture',
    description: 'Formation à la gestion des finances, commerce maritime et administration des terres.',
    minAge: 14,
    suitableFor: 'both',
    benefits: ['Prospérité économique', 'Réseau commercial', 'Gestion efficace des terres'],
    careers: ['Negotiator', 'Publicani', 'Argentarii']
  },
  {
    type: 'religious',
    icon: <ScrollText className="h-5 w-5" />,
    title: 'Carrière Religieuse',
    description: 'Étude des rites sacrés, divination et traditions religieuses romaines.',
    minAge: 12,
    suitableFor: 'both',
    benefits: ['Prestige religieux', 'Influence spirituelle', 'Exemption militaire'],
    careers: ['Pontife', 'Augure', 'Flamine', 'Vestale (femmes uniquement)']
  },
];
