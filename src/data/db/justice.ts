
// Base de données de la Justice romaine

// Types de données
export interface LegalCase {
  id: string;
  title: string;
  plaintiff: string;
  defendant: string;
  type: 'civil' | 'criminal' | 'administrative' | 'religious';
  status: 'pending' | 'in_progress' | 'decided' | 'appealed' | 'closed';
  description: string;
  filingDate: string;
  hearingDate?: string;
  judgmentDate?: string;
  magistrate?: string;
  judgment?: string;
  penalty?: string;
  witnesses: string[];
  evidence: Evidence[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface Evidence {
  id: string;
  caseId: string;
  type: 'testimony' | 'document' | 'physical' | 'expert';
  description: string;
  submittedBy: string;
  submissionDate: string;
  verified: boolean;
}

export interface LegalEdict {
  id: string;
  title: string;
  content: string;
  issuedBy: string;
  issuedDate: string;
  category: 'civil' | 'criminal' | 'administrative' | 'religious';
  status: 'draft' | 'active' | 'superseded' | 'repealed';
  precedingEdict?: string;
  supersededBy?: string;
}

export interface Magistrate {
  id: string;
  name: string;
  position: string;
  jurisdiction: string[];
  appointmentDate: string;
  endDate?: string;
  specializations: string[];
  caseload: number;
  status: 'active' | 'on_leave' | 'retired';
}

// Données mockées
export const legalCases: LegalCase[] = [
  {
    id: "case-1",
    title: "Dispute de propriété entre Gaius Sempronius et Marcus Tullius",
    plaintiff: "Gaius Sempronius",
    defendant: "Marcus Tullius",
    type: "civil",
    status: "in_progress",
    description: "Litige concernant les limites de deux propriétés adjacentes à la périphérie de Rome.",
    filingDate: "15 Mars 705 AUC",
    hearingDate: "10 Avril 705 AUC",
    magistrate: "Quintus Fabius",
    witnesses: ["Lucius Cornelius", "Publius Servilius"],
    evidence: [
      {
        id: "ev-1",
        caseId: "case-1",
        type: "document",
        description: "Acte de propriété de Gaius Sempronius",
        submittedBy: "Gaius Sempronius",
        submissionDate: "15 Mars 705 AUC",
        verified: true
      },
      {
        id: "ev-2",
        caseId: "case-1",
        type: "testimony",
        description: "Témoignage de Lucius Cornelius sur les limites traditionnelles",
        submittedBy: "Lucius Cornelius",
        submissionDate: "20 Mars 705 AUC",
        verified: true
      }
    ],
    priority: "medium"
  },
  {
    id: "case-2",
    title: "Accusation de vol contre Titus Annius",
    plaintiff: "République Romaine",
    defendant: "Titus Annius",
    type: "criminal",
    status: "pending",
    description: "Accusation de vol de fonds publics lors de la construction d'un aqueduc.",
    filingDate: "5 Avril 705 AUC",
    hearingDate: "25 Avril 705 AUC",
    magistrate: "Marcus Aurelius Cotta",
    witnesses: ["Gnaeus Pompeius", "Decimus Junius"],
    evidence: [
      {
        id: "ev-3",
        caseId: "case-2",
        type: "document",
        description: "Registres comptables du projet d'aqueduc",
        submittedBy: "Questeur Publius Licinius",
        submissionDate: "5 Avril 705 AUC",
        verified: true
      }
    ],
    priority: "high"
  },
  {
    id: "case-3",
    title: "Plainte pour blasphème contre Sextus Aemilius",
    plaintiff: "Collège des Pontifes",
    defendant: "Sextus Aemilius",
    type: "religious",
    status: "decided",
    description: "Accusation de blasphème envers les dieux romains lors d'une cérémonie publique.",
    filingDate: "10 Février 705 AUC",
    hearingDate: "1 Mars 705 AUC",
    judgmentDate: "15 Mars 705 AUC",
    magistrate: "Appius Claudius",
    judgment: "Coupable avec circonstances atténuantes",
    penalty: "Amende de 5000 as et obligation de financer un sacrifice expiatoire",
    witnesses: ["Vestale Maxima Caecilia", "Marcus Valerius"],
    evidence: [
      {
        id: "ev-4",
        caseId: "case-3",
        type: "testimony",
        description: "Témoignage de la Vestale Maxima Caecilia",
        submittedBy: "Vestale Maxima Caecilia",
        submissionDate: "15 Février 705 AUC",
        verified: true
      }
    ],
    priority: "medium"
  },
  {
    id: "case-4",
    title: "Appel de Lucius Hostius contre sa condamnation pour fraude",
    plaintiff: "Lucius Hostius",
    defendant: "République Romaine",
    type: "civil",
    status: "appealed",
    description: "Appel d'une condamnation pour fraude commerciale contre des marchands étrangers.",
    filingDate: "20 Mars 705 AUC",
    hearingDate: "15 Avril 705 AUC",
    magistrate: "Marcus Aurelius Cotta",
    witnesses: ["Tiberius Claudius", "Manius Acilius"],
    evidence: [
      {
        id: "ev-5",
        caseId: "case-4",
        type: "document",
        description: "Jugement initial du tribunal des marchands",
        submittedBy: "Lucius Hostius",
        submissionDate: "20 Mars 705 AUC",
        verified: true
      },
      {
        id: "ev-6",
        caseId: "case-4",
        type: "document",
        description: "Nouveaux témoignages écrits de marchands grecs",
        submittedBy: "Lucius Hostius",
        submissionDate: "25 Mars 705 AUC",
        verified: false
      }
    ],
    priority: "low"
  },
  {
    id: "case-5",
    title: "Dispute contractuelle entre la République et l'entrepreneur Decimus Caecilius",
    plaintiff: "République Romaine",
    defendant: "Decimus Caecilius",
    type: "administrative",
    status: "in_progress",
    description: "Litige concernant l'exécution d'un contrat pour la réparation de la Via Appia.",
    filingDate: "1 Avril 705 AUC",
    hearingDate: "20 Avril 705 AUC",
    magistrate: "Quintus Fabius",
    witnesses: ["Aulus Postumius", "Publius Decius"],
    evidence: [
      {
        id: "ev-7",
        caseId: "case-5",
        type: "document",
        description: "Contrat original signé par les parties",
        submittedBy: "Édile Lucius Cassius",
        submissionDate: "1 Avril 705 AUC",
        verified: true
      },
      {
        id: "ev-8",
        caseId: "case-5",
        type: "expert",
        description: "Rapport d'expertise sur l'état de la Via Appia",
        submittedBy: "Ingénieur Gnaeus Domitius",
        submissionDate: "5 Avril 705 AUC",
        verified: true
      }
    ],
    priority: "high"
  }
];

export const legalEdicts: LegalEdict[] = [
  {
    id: "edict-1",
    title: "Édit sur les procédures judiciaires civiles",
    content: "Par la présente, j'établis que toutes les causes civiles doivent d'abord passer par une tentative de médiation avant d'être présentées au tribunal...",
    issuedBy: "Marcus Aurelius Cotta, Préteur",
    issuedDate: "1 Janvier 705 AUC",
    category: "civil",
    status: "active"
  },
  {
    id: "edict-2",
    title: "Édit sur les dépositions de témoins",
    content: "J'ordonne que tous les témoins dans les affaires criminelles jurent par Jupiter avant de témoigner, et que les faux témoignages soient punis par...",
    issuedBy: "Marcus Aurelius Cotta, Préteur",
    issuedDate: "15 Janvier 705 AUC",
    category: "criminal",
    status: "active"
  },
  {
    id: "edict-3",
    title: "Édit sur les contrats publics",
    content: "Concernant les contrats entre la République et les entrepreneurs privés, il est désormais exigé que tous les termes soient clairement spécifiés et...",
    issuedBy: "Gaius Cornelius Scipio, Consul",
    issuedDate: "10 Février 705 AUC",
    category: "administrative",
    status: "active"
  },
  {
    id: "edict-4",
    title: "Édit sur les procédures de recours",
    content: "Les recours contre les jugements des tribunaux inférieurs doivent être déposés dans les 30 jours suivant la décision originale et accompagnés d'un...",
    issuedBy: "Marcus Aurelius Cotta, Préteur",
    issuedDate: "1 Mars 705 AUC",
    category: "civil",
    status: "active"
  },
  {
    id: "edict-5",
    title: "Édit sur les cérémonies religieuses",
    content: "En coordination avec le Collège des Pontifes, j'établis que toute perturbation des cérémonies religieuses sera considérée comme une offense grave...",
    issuedBy: "Marcus Aurelius Cotta, Préteur",
    issuedDate: "15 Mars 705 AUC",
    category: "religious",
    status: "active"
  }
];

export const justiceOfficials: Magistrate[] = [
  {
    id: "magistrate-1",
    name: "Marcus Aurelius Cotta",
    position: "Préteur",
    jurisdiction: ["civil", "criminal", "administrative", "religious"],
    appointmentDate: "1 Janvier 705 AUC",
    specializations: ["Droit civil", "Jurisprudence"],
    caseload: 12,
    status: "active"
  },
  {
    id: "magistrate-2",
    name: "Quintus Fabius",
    position: "Juge délégué",
    jurisdiction: ["civil", "administrative"],
    appointmentDate: "1 Février 705 AUC",
    specializations: ["Contrats", "Propriété"],
    caseload: 8,
    status: "active"
  },
  {
    id: "magistrate-3",
    name: "Appius Claudius",
    position: "Juge délégué",
    jurisdiction: ["religious", "criminal"],
    appointmentDate: "15 Janvier 705 AUC",
    specializations: ["Droit religieux", "Droit pénal"],
    caseload: 5,
    status: "active"
  },
  {
    id: "magistrate-4",
    name: "Lucius Licinius",
    position: "Juge auxiliaire",
    jurisdiction: ["civil"],
    appointmentDate: "1 Mars 705 AUC",
    specializations: ["Dettes", "Commerce"],
    caseload: 7,
    status: "active"
  },
  {
    id: "magistrate-5",
    name: "Titus Sempronius",
    position: "Juge auxiliaire",
    jurisdiction: ["criminal"],
    appointmentDate: "15 Février 705 AUC",
    specializations: ["Crimes contre l'État", "Vols"],
    caseload: 6,
    status: "active"
  }
];

// Fonctions d'accès aux données
export const getAllCases = (): LegalCase[] => {
  return legalCases;
};

export const getCaseById = (id: string): LegalCase | undefined => {
  return legalCases.find(c => c.id === id);
};

export const getCasesByStatus = (status: LegalCase['status']): LegalCase[] => {
  return legalCases.filter(c => c.status === status);
};

export const getCasesByType = (type: LegalCase['type']): LegalCase[] => {
  return legalCases.filter(c => c.type === type);
};

export const getCasesByMagistrate = (magistrateId: string): LegalCase[] => {
  const magistrate = justiceOfficials.find(m => m.id === magistrateId);
  if (!magistrate) return [];
  
  return legalCases.filter(c => c.magistrate === magistrate.name);
};

export const getAllEdicts = (): LegalEdict[] => {
  return legalEdicts;
};

export const getEdictById = (id: string): LegalEdict | undefined => {
  return legalEdicts.find(e => e.id === id);
};

export const getActiveEdicts = (): LegalEdict[] => {
  return legalEdicts.filter(e => e.status === 'active');
};

export const getEdictsByCategory = (category: LegalEdict['category']): LegalEdict[] => {
  return legalEdicts.filter(e => e.category === category);
};

export const getAllMagistrates = (): Magistrate[] => {
  return justiceOfficials;
};

export const getMagistrateById = (id: string): Magistrate | undefined => {
  return justiceOfficials.find(m => m.id === id);
};

export const getActiveMagistrates = (): Magistrate[] => {
  return justiceOfficials.filter(m => m.status === 'active');
};

// Fonctions de modification des données
export const createCase = (newCase: Omit<LegalCase, 'id'>): LegalCase => {
  const createdCase: LegalCase = {
    ...newCase,
    id: `case-${legalCases.length + 1}`
  };
  
  legalCases.push(createdCase);
  return createdCase;
};

export const updateCase = (id: string, updates: Partial<LegalCase>): LegalCase | null => {
  const caseIndex = legalCases.findIndex(c => c.id === id);
  if (caseIndex === -1) return null;
  
  legalCases[caseIndex] = { ...legalCases[caseIndex], ...updates };
  return legalCases[caseIndex];
};

export const addEvidence = (caseId: string, evidence: Omit<Evidence, 'id' | 'caseId'>): Evidence | null => {
  const targetCase = legalCases.find(c => c.id === caseId);
  if (!targetCase) return null;
  
  const newEvidence: Evidence = {
    ...evidence,
    id: `ev-${targetCase.evidence.length + 1}`,
    caseId
  };
  
  targetCase.evidence.push(newEvidence);
  return newEvidence;
};

export const createEdict = (edict: Omit<LegalEdict, 'id'>): LegalEdict => {
  const newEdict: LegalEdict = {
    ...edict,
    id: `edict-${legalEdicts.length + 1}`
  };
  
  legalEdicts.push(newEdict);
  return newEdict;
};

export const updateEdict = (id: string, updates: Partial<LegalEdict>): LegalEdict | null => {
  const edictIndex = legalEdicts.findIndex(e => e.id === id);
  if (edictIndex === -1) return null;
  
  legalEdicts[edictIndex] = { ...legalEdicts[edictIndex], ...updates };
  return legalEdicts[edictIndex];
};

export const addMagistrate = (magistrate: Omit<Magistrate, 'id'>): Magistrate => {
  const newMagistrate: Magistrate = {
    ...magistrate,
    id: `magistrate-${justiceOfficials.length + 1}`
  };
  
  justiceOfficials.push(newMagistrate);
  return newMagistrate;
};

export const updateMagistrate = (id: string, updates: Partial<Magistrate>): Magistrate | null => {
  const magistrateIndex = justiceOfficials.findIndex(m => m.id === id);
  if (magistrateIndex === -1) return null;
  
  justiceOfficials[magistrateIndex] = { ...justiceOfficials[magistrateIndex], ...updates };
  return justiceOfficials[magistrateIndex];
};
