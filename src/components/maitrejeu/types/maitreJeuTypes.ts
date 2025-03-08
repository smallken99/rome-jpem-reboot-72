
// Types pour la page Maître du Jeu

// Événement du jeu
export interface Evenement {
  id: string;
  titre: string;
  description: string;
  type: 'militaire' | 'civil' | 'politique' | 'religieux' | 'naturel' | 'economique';
  impact: {
    militaire: number;
    populaire: number;
    senat: number;
  };
  dateCreation: Date;
  statut: 'pending' | 'active' | 'resolved' | 'cancelled';
  dateResolution?: Date;
}

// Entrée historique
export interface HistoireEntry {
  id: string;
  titre: string;
  contenu: string;
  annee: string;
  importance: 'mineure' | 'moyenne' | 'majeure';
  date: Date;
}

// Événement politique
export interface PoliticalEvent {
  id: string;
  title: string;
  description: string;
  type: 'election' | 'law' | 'decree' | 'scandal' | 'other';
  date: Date;
  actors: string[];
  impact: {
    stability: number;
    popularity: number;
    senate: number;
  };
}

// Donnée de province
export interface ProvinceData {
  id: string;
  nom: string;
  statut: 'core' | 'province' | 'client' | 'occupied' | 'hostile';
  richesse: number;
  stabilite: number;
  gouverneur: string | null;
  ressources: string[];
  population: number;
  troupes: number;
  villes: string[];
}

// Sénateur jouable
export interface SenateurJouable {
  id: string;
  nom: string;
  famille: string;
  influence: number;
  richesse: number;
  commandement: number;
  eloquence: number;
  loyaute: number;
  traits: string[];
}

// Action de faction
export interface FactionAction {
  id: string;
  factionId: string;
  type: 'proposal' | 'veto' | 'alliance' | 'attack' | 'support';
  targetId?: string;
  description: string;
  cost: number;
  success: number;
}

// Type pour la gestion de l'équilibre
export interface EquilibreParameters {
  defaultSenat: number;
  defaultPopulaire: number;
  defaultMilitaire: number;
  critiqueInferieur: number;
  critiqueSuperieur: number;
  facteurDecroissance: number;
}

// Définition d'une faction politique
export interface FactionPolitique {
  id: string;
  nom: string;
  leader: string;
  membres: string[];
  orientation: 'populares' | 'optimates' | 'neutre';
  influence: number;
  richesse: number;
  alignementMilitaire: number;
  alignementReligieux: number;
}

// Configuration d'une partie
export interface GameConfiguration {
  nom: string;
  dateDebut: string;
  parametresEquilibre: EquilibreParameters;
  factionsActives: boolean;
  evenementsAleatoires: boolean;
  frequenceEvenements: number;
  difficulte: 'facile' | 'normal' | 'difficile' | 'historique';
}
