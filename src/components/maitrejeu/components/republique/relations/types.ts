
export interface Traite {
  id: string;
  titre: string;
  type: string;
  parties: string[];
  dateSignature: string;
  duree?: string;
  statut: "Actif" | "Expiré" | "En négociation" | "Rompu";
  termes?: string[];
  conditions?: string[];
  bénéfices?: {
    économiques?: number;
    militaires?: number;
    politiques?: number;
  };
  pénalités?: string[];
}

export interface Nation {
  id: string;
  nom: string;
  région: string;
  statut: "Allié" | "Neutre" | "Ennemi" | "Soumis";
  puissanceMilitaire: number;
  richesse: number;
  relationAvecRome: number;
  dateDernierTraité: string;
  capitale: string;
  gouvernement: string;
  notes: string;
}

export interface Alliance {
  id: string;
  nom: string;
  type: string;
  membres: string[];
  dateFormation: string;
  dateCreation: string;
  objectif?: string;
  puissanceCombiné?: number;
  traitésAssociés?: string[];
  commandement: string;
  forces: {
    légions?: number;
    auxiliaires?: number;
  };
  statut: "Actif" | "Inactif" | "Dissous";
}
