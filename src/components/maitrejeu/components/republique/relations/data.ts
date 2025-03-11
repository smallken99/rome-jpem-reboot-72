
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

export interface Alliance {
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
