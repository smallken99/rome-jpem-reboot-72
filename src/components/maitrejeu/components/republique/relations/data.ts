
// Types pour les relations diplomatiques
export interface Traite {
  id: string;
  titre: string;
  parties: string[];
  type: string;
  dateSignature: string;
  duree: string;
  statut: string;
  clauses: string[];
}

export interface Nation {
  id: string;
  nom: string;
  region: string;
  capitale: string;
  gouvernement: string;
  relation: string;
  relationLevel: string;
  commerceLevel: number;
  militaryThreat: number;
  notes: string;
}

export interface AllianceMilitaire {
  id: string;
  nom: string;
  membres: string[];
  type: string;
  dateCreation: string;
  commandement: string;
  forces: {
    legions: number;
    auxiliaires: number;
    navires: number;
  };
  statut: string;
}

// Données fictives pour les traités
export const traitesMock: Traite[] = [
  { 
    id: '1', 
    titre: 'Traité de Paix Romain-Carthaginois', 
    parties: ['Rome', 'Carthage'],
    type: 'Paix',
    dateSignature: '15/04/240 av. J.-C.',
    duree: 'Indéfinie',
    statut: 'En vigueur',
    clauses: [
      'Carthage évacuera la Sicile',
      'Carthage paiera une indemnité de guerre de 3 200 talents'
    ]
  },
  { 
    id: '2', 
    titre: 'Traité Commercial Romain-Grec', 
    parties: ['Rome', 'Ligue Achéenne'],
    type: 'Commerce',
    dateSignature: '22/07/235 av. J.-C.',
    duree: '20 ans',
    statut: 'En vigueur',
    clauses: [
      'Tarifs préférentiels pour les marchands romains',
      'Accès aux ports grecs sans taxe portuaire'
    ]
  },
  { 
    id: '3', 
    titre: 'Alliance défensive avec Massilia', 
    parties: ['Rome', 'Massilia'],
    type: 'Alliance',
    dateSignature: '08/02/230 av. J.-C.',
    duree: '10 ans',
    statut: 'En vigueur',
    clauses: [
      "Défense mutuelle en cas d'attaque",
      "Échange d'informations militaires"
    ]
  }
];

// Données fictives pour les nations
export const nationsMock: Nation[] = [
  { 
    id: '1', 
    nom: 'Carthage', 
    region: 'Afrique du Nord',
    capitale: 'Carthage',
    gouvernement: 'République oligarchique',
    relation: 'Paix fragile',
    relationLevel: 'Neutre',
    commerceLevel: 3,
    militaryThreat: 4,
    notes: 'Puissance maritime et commerciale'
  },
  { 
    id: '2', 
    nom: 'Royaume de Macédoine', 
    region: 'Grèce',
    capitale: 'Pella',
    gouvernement: 'Monarchie',
    relation: 'Alliance',
    relationLevel: 'Allié',
    commerceLevel: 4,
    militaryThreat: 2,
    notes: "Dynastie Antigonide, héritière d'Alexandre"
  },
  { 
    id: '3', 
    nom: 'Ligue Étolienne', 
    region: 'Grèce centrale',
    capitale: 'Thermos',
    gouvernement: 'Confédération',
    relation: 'Méfiance',
    relationLevel: 'Hostile',
    commerceLevel: 2,
    militaryThreat: 3,
    notes: 'Force terrestre importante, mercenaires'
  },
  { 
    id: '4', 
    nom: 'Royaume des Galates', 
    region: 'Asie Mineure',
    capitale: 'Ancyre',
    gouvernement: 'Tribus confédérées',
    relation: 'Hostile',
    relationLevel: 'Ennemi',
    commerceLevel: 1,
    militaryThreat: 3,
    notes: 'Descendants des Celtes, guerriers redoutables'
  }
];

// Données fictives pour les alliances militaires
export const alliancesMock: AllianceMilitaire[] = [
  { 
    id: '1', 
    nom: 'Foedus Aequum Romain-Massilia', 
    membres: ['Rome', 'Massilia'],
    type: 'Défensive',
    dateCreation: '08/02/230 av. J.-C.',
    commandement: 'Rome',
    forces: {
      legions: 2,
      auxiliaires: 5000,
      navires: 15
    },
    statut: 'Active'
  },
  { 
    id: '2', 
    nom: 'Alliance contre les Barbares du Nord', 
    membres: ['Rome', 'Tribus Galloises pacifiées'],
    type: 'Offensive',
    dateCreation: '12/05/231 av. J.-C.',
    commandement: 'Rome',
    forces: {
      legions: 1,
      auxiliaires: 3000,
      navires: 0
    },
    statut: 'Active'
  }
];
