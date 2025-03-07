
import { useState } from 'react';
import { toast } from 'sonner';

export type LoiStatus = 'proposed' | 'debate' | 'voting' | 'approved' | 'rejected' | 'vetoed';
export type LoiCategory = 'politique' | 'economique' | 'sociale' | 'judiciaire' | 'militaire' | 'religieuse';

export interface Loi {
  id: string;
  name: string;
  description: string;
  category: LoiCategory;
  proposedBy: string;
  proposedDate: string;
  status: LoiStatus;
  votes?: {
    for: number;
    against: number;
    abstain: number;
  };
  effects?: string[];
  requiredMajority?: number; // pourcentage requis pour l'adoption
}

// Données initiales pour les lois
const initialLois: Loi[] = [
  {
    id: 'lex-001',
    name: 'Lex Frumentaria',
    description: 'Distribution de grain à prix réduit aux citoyens romains',
    category: 'sociale',
    proposedBy: 'Gaius Gracchus',
    proposedDate: '631 AUC',
    status: 'approved',
    votes: {
      for: 156,
      against: 102,
      abstain: 23
    },
    effects: [
      'Augmentation de la popularité auprès des plébéiens',
      'Coût annuel pour le trésor: 75,000 As',
      'Réduction du prix du grain de 30%'
    ]
  },
  {
    id: 'lex-002',
    name: 'Lex Militaris',
    description: 'Réforme de l\'équipement militaire aux frais de l\'État',
    category: 'militaire',
    proposedBy: 'Gaius Marius',
    proposedDate: '647 AUC',
    status: 'debate',
    effects: [
      'Coût initial pour le trésor: 500,000 As',
      'Amélioration de l\'efficacité militaire: +15%',
      'Possibilité de recruter des citoyens sans propriété'
    ]
  },
  {
    id: 'lex-003',
    name: 'Lex Agraria',
    description: 'Limitation de la taille des propriétés de l\'Ager Publicus',
    category: 'economique',
    proposedBy: 'Tiberius Gracchus',
    proposedDate: '621 AUC',
    status: 'voting',
    votes: {
      for: 98,
      against: 87,
      abstain: 16
    },
    requiredMajority: 51,
    effects: [
      'Redistribution des terres excédentaires aux citoyens pauvres',
      'Limite de 500 jugera (125 hectares) par famille',
      'Augmentation du nombre de petits propriétaires'
    ]
  }
];

export const useLoisManagement = () => {
  const [lois, setLois] = useState<Loi[]>(initialLois);
  const [activeLoi, setActiveLoi] = useState<Loi | null>(null);
  const [filterCategory, setFilterCategory] = useState<LoiCategory | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<LoiStatus | 'all'>('all');

  // Filtrer les lois selon les critères
  const filteredLois = lois.filter(loi => {
    const matchesCategory = filterCategory === 'all' || loi.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || loi.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  // Proposer une nouvelle loi
  const proposerLoi = (newLoi: Omit<Loi, 'id' | 'status' | 'proposedDate'>) => {
    const currentDate = new Date();
    const auc = 753 + currentDate.getFullYear() - 1; // Calcul approximatif de l'année AUC
    
    const loi: Loi = {
      ...newLoi,
      id: `lex-${lois.length.toString().padStart(3, '0')}`,
      status: 'proposed',
      proposedDate: `${auc} AUC`,
      votes: {
        for: 0,
        against: 0,
        abstain: 0
      }
    };
    
    setLois(prev => [...prev, loi]);
    toast.success(`La loi ${loi.name} a été proposée`);
    return loi;
  };

  // Faire avancer une loi dans le processus législatif
  const advanceLoi = (loiId: string) => {
    setLois(prev => prev.map(loi => {
      if (loi.id !== loiId) return loi;
      
      let newStatus: LoiStatus = loi.status;
      
      // Déterminer le prochain statut
      switch (loi.status) {
        case 'proposed':
          newStatus = 'debate';
          toast.info(`La loi ${loi.name} est maintenant en débat`);
          break;
        case 'debate':
          newStatus = 'voting';
          toast.info(`La loi ${loi.name} est maintenant soumise au vote`);
          break;
        case 'voting':
          // Simuler un vote
          if (loi.votes) {
            const totalVotes = loi.votes.for + loi.votes.against + loi.votes.abstain;
            const forPercentage = (loi.votes.for / totalVotes) * 100;
            
            if (forPercentage >= (loi.requiredMajority || 50)) {
              newStatus = 'approved';
              toast.success(`La loi ${loi.name} a été approuvée`);
            } else {
              newStatus = 'rejected';
              toast.error(`La loi ${loi.name} a été rejetée`);
            }
          }
          break;
      }
      
      return { ...loi, status: newStatus };
    }));
  };

  // Voter pour une loi
  const voteForLoi = (loiId: string, voteType: 'for' | 'against' | 'abstain') => {
    setLois(prev => prev.map(loi => {
      if (loi.id !== loiId || loi.status !== 'voting') return loi;
      
      const newVotes = { 
        ...loi.votes,
        [voteType]: (loi.votes?.[voteType] || 0) + 1
      };
      
      return { ...loi, votes: newVotes as Loi['votes'] };
    }));
    
    toast.info(`Votre vote a été enregistré`);
  };

  // Mettre un veto à une loi (par un tribun ou un consul)
  const vetoLoi = (loiId: string) => {
    setLois(prev => prev.map(loi => {
      if (loi.id !== loiId || (loi.status !== 'debate' && loi.status !== 'voting')) 
        return loi;
      
      toast.warning(`La loi ${loi.name} a été bloquée par veto`);
      return { ...loi, status: 'vetoed' };
    }));
  };

  return {
    lois,
    filteredLois,
    activeLoi,
    setActiveLoi,
    filterCategory,
    setFilterCategory,
    filterStatus,
    setFilterStatus,
    proposerLoi,
    advanceLoi,
    voteForLoi,
    vetoLoi
  };
};
