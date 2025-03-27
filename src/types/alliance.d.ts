
export type AllianceType = 'matrimoniale' | 'politique' | 'militaire' | 'commerciale';
export type AllianceStatus = 'active' | 'pending' | 'broken' | 'en négociation' | 'inactive' | 'rompue' | 'En délibération' | 'promulguée' | 'adoptée' | 'proposée' | 'rejetée';

export interface Alliance {
  id: string;
  name?: string;
  type: AllianceType;
  established: string;
  status: AllianceStatus;
  benefits: string[];
  members?: string[];
  
  // Additional properties for FamilleAlliance compatibility
  famille1Id?: string;
  famille2Id?: string;
  dateDebut?: string;
  dateFin?: string;
  statut?: string;
  termes?: string;
  benefices?: string[];
  membres?: string[];
}

export interface FamilyAlliance extends Alliance {
  // Additional properties specific to family alliances
}
