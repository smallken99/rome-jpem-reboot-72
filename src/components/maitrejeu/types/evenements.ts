
import { Season, ImportanceType, GameDate } from './common';

export type EvenementType = 'POLITIQUE' | 'GUERRE' | 'CRISE' | 'ECONOMIQUE' | 'ÉCONOMIQUE' | 'RELIGION' | 'DIPLOMATIQUE' | 'SOCIAL';

export interface Evenement {
  id: string;
  titre: string;
  description: string;
  type: EvenementType;
  date: GameDate;
  importance: ImportanceType;
  options?: EvenementAction[];
  resolved: boolean;
  impact?: any; // Pour compatibilité avec le code existant
}

export interface EvenementAction {
  id: string;
  texte: string;
  titre?: string; // Pour compatibilité avec le code existant
  description?: string; // Pour compatibilité avec le code existant
  effets: {
    stabilité?: number;
    trésorPublique?: number;
    prestigeRome?: number;
    religion?: number;
    influence?: number;
    finance?: number;
    militaire?: number;
    economie?: number;
    autre?: string;
  };
  résultat?: string;
  impact?: any; // Pour compatibilité avec le code existant
}

export interface EvenementsListProps {
  evenements: Evenement[];
  onResolve: (id: string, optionId: string) => void;
  filteredType?: EvenementType | 'ALL';
}

export interface PoliticalEventsTimelineProps {
  events: any[];
}
