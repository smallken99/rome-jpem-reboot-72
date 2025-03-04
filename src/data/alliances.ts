
import { Alliance } from '@/components/famille/alliances/AllianceList';

// Données d'alliance partagées entre les pages
export const familyAlliances: Alliance[] = [
  {
    id: '1',
    name: 'Gens Cornelia',
    member: 'Marcus Aurelius Cotta',
    spouse: 'Livia Aurelia',
    type: 'matrimoniale',
    status: 'actif',
    benefits: ['Stabilité familiale', 'Gestion du patrimoine'],
    date: '705 AUC'
  },
  {
    id: '2',
    name: 'Gens Fabia',
    member: 'Julia Aurelia',
    spouse: 'Quintus Fabius',
    type: 'matrimoniale',
    status: 'en négociation',
    benefits: ['Soutien militaire', 'Accès aux ports'],
    date: '710 AUC (prévu)'
  }
];

// Alliances politiques distinctes des alliances matrimoniales
export const politicalAlliances: Alliance[] = [
  { 
    id: '3',
    name: 'Gens Julia', 
    type: 'politique', 
    status: 'actif',
    benefits: ['Influence au Sénat +2', 'Protection contre les rivalités politiques', 'Accès aux marchés d\'Asie']
  },
  { 
    id: '4',
    name: 'Gens Flavia', 
    type: 'politique', 
    status: 'rompu',
    benefits: []
  }
];

// Combine toutes les alliances pour l'affichage
export const getAllAlliances = (): Alliance[] => {
  return [
    ...familyAlliances,
    ...politicalAlliances.filter(alliance => 
      !familyAlliances.some(fa => fa.name === alliance.name)
    )
  ];
};
