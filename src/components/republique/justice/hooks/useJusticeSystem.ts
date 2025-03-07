
import { useState } from 'react';
import { toast } from 'sonner';

export type CaseStatus = 'pending' | 'scheduled' | 'in_progress' | 'concluded' | 'appealed' | 'dismissed';
export type CaseType = 'civil' | 'criminal' | 'political' | 'religious' | 'administrative';
export type Verdict = 'guilty' | 'not_guilty' | 'pending' | 'settled' | 'dismissed';
export type Penalty = 'fine' | 'exile' | 'imprisonment' | 'execution' | 'restitution' | 'none';

export interface JudicialCase {
  id: string;
  title: string;
  description: string;
  type: CaseType;
  status: CaseStatus;
  plaintiff: string;
  defendant: string;
  magistrate?: string;
  startDate: string;
  scheduledDate?: string;
  concludedDate?: string;
  verdict?: Verdict;
  penalty?: Penalty;
  sentenceDetails?: string;
  witnesses?: string[];
  evidenceSubmitted: boolean;
  appealed: boolean;
  notes?: string;
}

// Échantillon de données pour les cas judiciaires
const initialCases: JudicialCase[] = [
  {
    id: 'case-001',
    title: 'Violation de contrat commercial',
    description: 'Allégation de non-respect des termes d\'un contrat de livraison de grain',
    type: 'civil',
    status: 'pending',
    plaintiff: 'Marcus Tullius',
    defendant: 'Quintus Hortensius',
    startDate: '704 AUC',
    evidenceSubmitted: true,
    appealed: false,
    notes: 'Le plaignant affirme avoir payé pour 20 tonnes de grain mais n\'en avoir reçu que 15'
  },
  {
    id: 'case-002',
    title: 'Accusation de vol de terres publiques',
    description: 'Usage illégal de l\'ager publicus pour des gains personnels',
    type: 'criminal',
    status: 'scheduled',
    plaintiff: 'République romaine',
    defendant: 'Gnaeus Pompeius',
    magistrate: 'Lucius Cassius',
    startDate: '703 AUC',
    scheduledDate: '705 AUC, Aestas',
    evidenceSubmitted: true,
    appealed: false
  },
  {
    id: 'case-003',
    title: 'Négligence dans l\'administration provinciale',
    description: 'Accusation de mauvaise gouvernance et d\'extorsion dans la province de Sicile',
    type: 'political',
    status: 'in_progress',
    plaintiff: 'Citoyens de Syracuse',
    defendant: 'Caius Verres',
    magistrate: 'Marcus Cicero',
    startDate: '702 AUC',
    scheduledDate: '704 AUC, Ver',
    evidenceSubmitted: true,
    appealed: false,
    notes: 'Nombreux témoignages recueillis en Sicile'
  },
  {
    id: 'case-004',
    title: 'Profanation d\'un temple',
    description: 'Actes sacrilèges commis dans le temple de Vesta',
    type: 'religious',
    status: 'concluded',
    plaintiff: 'Collège des Pontifes',
    defendant: 'Publius Clodius',
    magistrate: 'Quintus Metellus',
    startDate: '700 AUC',
    scheduledDate: '701 AUC, Hiems',
    concludedDate: '702 AUC, Ver',
    verdict: 'guilty',
    penalty: 'exile',
    sentenceDetails: 'Exil de 5 ans et confiscation des biens',
    evidenceSubmitted: true,
    appealed: true,
    notes: 'Verdict contesté par les partisans du défendeur'
  },
  {
    id: 'case-005',
    title: 'Dispute sur les limites de propriété',
    description: 'Conflit concernant les frontières entre deux domaines adjacents',
    type: 'civil',
    status: 'concluded',
    plaintiff: 'Titus Annius',
    defendant: 'Lucius Flavius',
    magistrate: 'Publius Sulpicius',
    startDate: '703 AUC',
    scheduledDate: '704 AUC, Autumnus',
    concludedDate: '704 AUC, Hiems',
    verdict: 'settled',
    penalty: 'restitution',
    sentenceDetails: 'Redéfinition des limites et compensation de 5,000 as',
    evidenceSubmitted: true,
    appealed: false
  }
];

// Fonctions et hooks pour gérer les cas judiciaires
export const useJusticeSystem = () => {
  const [cases, setCases] = useState<JudicialCase[]>(initialCases);
  const [activeCase, setActiveCase] = useState<JudicialCase | null>(null);
  const [filterType, setFilterType] = useState<CaseType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<CaseStatus | 'all'>('all');

  // Filtrer les cas selon les critères
  const filteredCases = cases.filter(c => {
    const matchesType = filterType === 'all' || c.type === filterType;
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesType && matchesStatus;
  });

  // Créer un nouveau cas judiciaire
  const createCase = (newCase: Omit<JudicialCase, 'id' | 'status' | 'evidenceSubmitted' | 'appealed'>) => {
    const caseId = `case-${(cases.length + 1).toString().padStart(3, '0')}`;
    
    const judicialCase: JudicialCase = {
      ...newCase,
      id: caseId,
      status: 'pending',
      evidenceSubmitted: false,
      appealed: false
    };
    
    setCases(prev => [...prev, judicialCase]);
    toast.success(`Nouvelle affaire enregistrée: ${newCase.title}`);
    return judicialCase;
  };

  // Mettre à jour le statut d'un cas
  const updateCaseStatus = (caseId: string, newStatus: CaseStatus, details?: Partial<JudicialCase>) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      
      let statusMessage;
      switch (newStatus) {
        case 'scheduled':
          statusMessage = `L'affaire ${c.title} a été programmée`;
          break;
        case 'in_progress':
          statusMessage = `Le procès ${c.title} a commencé`;
          break;
        case 'concluded':
          statusMessage = `L'affaire ${c.title} est terminée`;
          break;
        case 'appealed':
          statusMessage = `Appel déposé pour l'affaire ${c.title}`;
          break;
        case 'dismissed':
          statusMessage = `L'affaire ${c.title} a été rejetée`;
          break;
        default:
          statusMessage = `Statut de l'affaire ${c.title} mis à jour`;
      }
      
      toast.info(statusMessage);
      
      return { ...c, status: newStatus, ...details };
    }));
  };

  // Rendre un verdict dans une affaire
  const renderVerdict = (caseId: string, verdict: Verdict, penalty?: Penalty, sentenceDetails?: string) => {
    const currentDate = new Date();
    const auc = 753 + currentDate.getFullYear() - 1; // Calcul approximatif de l'année AUC
    const concludedDate = `${auc} AUC`;
    
    updateCaseStatus(caseId, 'concluded', { 
      verdict, 
      penalty: penalty || 'none', 
      sentenceDetails,
      concludedDate
    });
    
    const caseDetails = cases.find(c => c.id === caseId);
    if (caseDetails) {
      let verdictMessage;
      switch (verdict) {
        case 'guilty':
          verdictMessage = `${caseDetails.defendant} a été déclaré coupable dans l'affaire ${caseDetails.title}`;
          break;
        case 'not_guilty':
          verdictMessage = `${caseDetails.defendant} a été déclaré non coupable dans l'affaire ${caseDetails.title}`;
          break;
        case 'settled':
          verdictMessage = `L'affaire ${caseDetails.title} a été réglée à l'amiable`;
          break;
        case 'dismissed':
          verdictMessage = `L'affaire ${caseDetails.title} a été classée sans suite`;
          break;
        default:
          verdictMessage = `Un verdict a été rendu dans l'affaire ${caseDetails.title}`;
      }
      
      toast.success(verdictMessage);
    }
  };

  // Planifier une audience
  const scheduleHearing = (caseId: string, scheduledDate: string) => {
    updateCaseStatus(caseId, 'scheduled', { scheduledDate });
  };

  // Soumettre des preuves
  const submitEvidence = (caseId: string) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      
      toast.success(`Preuves soumises pour l'affaire ${c.title}`);
      return { ...c, evidenceSubmitted: true };
    }));
  };

  // Faire appel d'un verdict
  const appealCase = (caseId: string, reason: string) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId || c.status !== 'concluded') return c;
      
      toast.warning(`Appel déposé pour l'affaire ${c.title}: ${reason}`);
      return { 
        ...c, 
        status: 'appealed', 
        appealed: true,
        notes: c.notes ? `${c.notes}\n\nAppel: ${reason}` : `Appel: ${reason}`
      };
    }));
  };

  // Assigner un magistrat à une affaire
  const assignMagistrate = (caseId: string, magistrate: string) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      
      toast.info(`${magistrate} a été assigné à l'affaire ${c.title}`);
      return { ...c, magistrate };
    }));
  };

  return {
    cases,
    filteredCases,
    activeCase,
    setActiveCase,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
    createCase,
    updateCaseStatus,
    renderVerdict,
    scheduleHearing,
    submitEvidence,
    appealCase,
    assignMagistrate
  };
};
