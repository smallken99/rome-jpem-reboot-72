
// Types pour l'équilibre de la République
export interface RepublicEquilibre {
  populares: number;
  optimates: number;
  moderates: number;
  populaires: number; // Pour compatibilité avec l'ancien nom
  neutrales?: number; // Pour compatibilité
  armée?: number;
  facteurMilitaire?: number;
  économie?: number;
  economicStability?: number;
  morale?: number; 
  loyauté?: number;
  patriciens?: number;
  facteurPatriciens?: number;
  plébéiens?: number;
  facteurPlebs?: number;
  // Ajout du champ population requis par Equilibre
  population: number;
}

// Alias pour la compatibilité avec le code existant - important de définir les propriétés requises!
export type Equilibre = RepublicEquilibre;

// Types pour les factions politiques
export interface PoliticalFaction {
  id: string;
  name: string;
  leader: string;
  power: number; // 0-100
  influence: number; // 0-100
  alignment: 'populares' | 'optimates' | 'neutral';
  supportBase: string;
  color: string;
}

// Types pour les élections
export interface Election {
  id: string;
  magistrature: string;
  year: number;
  annee?: number; // Pour compatibilité
  season: string;
  saison?: string; // Pour compatibilité
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  candidates?: string[];
  winner?: string;
}

// Types pour les provinces
export interface Province {
  id: string;
  name: string;
  governor: string;
  population: number;
  taxRevenue: number;
  resources: string[];
  stability: number; // 0-100
  loyalty: number; // 0-100
}

// Types pour les statistiques de la République
export interface RepublicStatistics {
  population: {
    total: number;
    patricians: number;
    plebeians: number;
    slaves: number;
    growth: number;
    satisfaction: number;
  };
  economy: {
    treasury: number;
    annualRevenue: number;
    annualExpenses: number;
    taxRate: number;
    inflation: number;
  };
  military: {
    legions: number;
    totalSoldiers: number;
    readiness: number;
    morale: number;
  };
  politics: {
    senateApproval: number;
    plebsApproval: number;
    patricianApproval: number;
    politicalStability: number;
  };
}
