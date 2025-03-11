
export interface Nation {
  id: string;
  nom: string;
  région: string;
  statut: "Allié" | "Neutre" | "Ennemi" | "Soumis";
  puissanceMilitaire: number;
  richesse: number;
  relationAvecRome: number;
  dateDernierTraité?: string;
  capitale: string;
  gouvernement: string;
  notes: string;
}

export interface Alliance {
  id: string;
  nom: string;
  membres: string[];
  type: string;
  dateFormation: string;
  objectif: string;
  puissanceCombiné: number;
  traitésAssociés: string[];
  dateCreation: string;
  commandement: string;
  forces: {
    legions: number;
    auxiliaires: number;
    navires: number;
  };
  statut: string;
}

export interface Traite {
  id: string;
  titre: string;
  parties: string[];
  type: string;
  dateSignature: string;
  duree: string;
  clauses: string[];
  statut: "Actif" | "Expiré" | "Rompu" | "En négociation";
}
