
export interface Politique {
  populares: number;      // Soutien pour les populares
  optimates: number;      // Soutien pour les optimates
  moderates: number;      // Soutien pour les modérés
  // Ces alias sont pour la rétrocompatibilité
  populaires?: number;    // Alias pour populares
}

export interface Militaire {
  morale: number;        // Morale des troupes
  loyaute: number;       // Loyauté envers Rome/République
  puissance: number;     // Puissance militaire générale
  discipline: number;    // Niveau de discipline
  effectifs: number;     // Nombre de soldats disponibles
  equipement: number;    // Qualité de l'équipement
  // Ces alias sont pour la rétrocompatibilité
  moral?: number;        // Alias pour morale
}

export interface Social {
  patriciens: number;    // Influence des patriciens
  plebeiens: number;     // Influence des plébéiens
  esclaves: number;      // Proportion d'esclaves
  cohesion: number;      // Cohésion sociale
  // Ces alias sont pour la rétrocompatibilité
  plébéiens?: number;    // Alias pour plebeiens
}

export interface Economie {
  stabilite: number;     // Stabilité économique
  croissance: number;    // Taux de croissance
  commerce: number;      // Volume commercial
  agriculture: number;   // Productivité agricole
}

export interface Religion {
  piete: number;         // Niveau de piété générale
  traditions: number;    // Respect des traditions
  superstition: number;  // Niveau de superstition
}

export interface Stabilite {
  senat: number;         // Stabilité du Sénat
  tribuns: number;       // Influence des tribuns
  lois: number;          // Respect des lois
}
