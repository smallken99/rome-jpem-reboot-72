
import { Shield, Gavel, Scale, AlertTriangle, FileText } from 'lucide-react';

export type CaseStatus = 'pending' | 'in_progress' | 'decided' | 'appealed' | 'closed';
export type CaseType = 'civil' | 'criminal' | 'political' | 'religious' | 'administrative';
export type CaseVerdict = 'guilty' | 'innocent' | 'partial' | 'dismissed' | 'pending';
export type Punishment = 'fine' | 'exile' | 'imprisonment' | 'execution' | 'public_service' | 'reparations' | 'none';

export interface JudicialCase {
  id: string;
  title: string;
  description: string;
  plaintiff: string;
  defendant: string;
  type: CaseType;
  status: CaseStatus;
  startDate: string;
  lastUpdate: string;
  verdict?: CaseVerdict;
  punishment?: Punishment;
  presidingMagistrate: string;
  witnesses: string[];
  documents: string[];
  publicInterest: number; // 0-100
  votes?: {
    for: number;
    against: number;
    abstain: number;
  };
  appeals?: {
    date: string;
    reason: string;
    status: 'pending' | 'accepted' | 'rejected';
  }[];
}

export interface JusticeStatistics {
  activeCases: number;
  resolvedLastYear: number;
  convictionRate: number;
  averageDuration: number; // en jours
  byType: Record<CaseType, number>;
  byStatus: Record<CaseStatus, number>;
  backlog: number;
}

// Données de cas judiciaires pour les procès en cours
export const mockJudicialCases: JudicialCase[] = [
  {
    id: "case-001",
    title: "Fraude commerciale au forum",
    description: "Accusation de fraude commerciale concernant la vente de marchandises importées au forum",
    plaintiff: "Marcus Licinius Crassus",
    defendant: "Quintus Servilius Caepio",
    type: "civil",
    status: "in_progress",
    startDate: "Martius 705",
    lastUpdate: "Aprilis 705",
    presidingMagistrate: "Marcus Aurelius Cotta",
    witnesses: ["Titus Sempronius Longus", "Gaius Flaminius"],
    documents: ["Contrat commercial", "Témoignages écrits"],
    publicInterest: 45,
    votes: {
      for: 12,
      against: 8,
      abstain: 5
    }
  },
  {
    id: "case-002",
    title: "Corruption d'un magistrat",
    description: "Accusation de corruption contre un questeur dans l'attribution de contrats publics",
    plaintiff: "Le Peuple Romain",
    defendant: "Lucius Cornelius Merula",
    type: "criminal",
    status: "pending",
    startDate: "Februarius 705",
    lastUpdate: "Martius 705",
    presidingMagistrate: "Pending Assignment",
    witnesses: ["Publius Valerius Flaccus", "Sextus Julius Caesar"],
    documents: ["Registres financiers", "Dépositions"],
    publicInterest: 78
  },
  {
    id: "case-003",
    title: "Litige territorial",
    description: "Dispute concernant les limites de propriétés agricoles voisines",
    plaintiff: "Gaius Marius",
    defendant: "Lucius Cornelius Sulla",
    type: "civil",
    status: "decided",
    startDate: "Januarius 705",
    lastUpdate: "Martius 705",
    verdict: "partial",
    punishment: "reparations",
    presidingMagistrate: "Marcus Aurelius Cotta",
    witnesses: ["Quintus Lutatius Catulus", "Gnaeus Domitius Ahenobarbus"],
    documents: ["Actes de propriété", "Témoignages de voisins", "Cartes cadastrales"],
    publicInterest: 35,
    votes: {
      for: 15,
      against: 10,
      abstain: 2
    }
  },
  {
    id: "case-004",
    title: "Sacrilège au Temple de Vesta",
    description: "Accusation de profanation du temple de Vesta pendant les célébrations religieuses",
    plaintiff: "Pontifex Maximus",
    defendant: "Publius Clodius Pulcher",
    type: "religious",
    status: "in_progress",
    startDate: "Martius 705",
    lastUpdate: "Aprilis 705",
    presidingMagistrate: "Marcus Aurelius Cotta",
    witnesses: ["Vestale Maxima", "Gaius Julius Caesar", "Marcus Calpurnius Bibulus"],
    documents: ["Témoignages des prêtresses", "Rapport du temple"],
    publicInterest: 92,
    votes: {
      for: 20,
      against: 5,
      abstain: 0
    }
  },
  {
    id: "case-005",
    title: "Détournement de fonds publics",
    description: "Accusation de détournement de fonds destinés à l'entretien des aqueducs",
    plaintiff: "Le Sénat Romain",
    defendant: "Tiberius Sempronius Longus",
    type: "criminal",
    status: "pending",
    startDate: "Aprilis 705",
    lastUpdate: "Aprilis 705",
    presidingMagistrate: "Pending Assignment",
    witnesses: ["Marcus Porcius Cato", "Quintus Lutatius Catulus"],
    documents: ["Registres du trésor", "Comptes publics", "Rapport des Édiles"],
    publicInterest: 65
  }
];

// Statistiques judiciaires actuelles
export const justiceStatistics: JusticeStatistics = {
  activeCases: 24,
  resolvedLastYear: 87,
  convictionRate: 62.5,
  averageDuration: 45,
  byType: {
    civil: 12,
    criminal: 8,
    political: 3,
    religious: 1,
    administrative: 0
  },
  byStatus: {
    pending: 8,
    in_progress: 16,
    decided: 0,
    appealed: 0,
    closed: 0
  },
  backlog: 14
};
