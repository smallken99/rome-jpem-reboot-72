
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
