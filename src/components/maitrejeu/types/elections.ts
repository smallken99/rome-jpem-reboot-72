
import { Season } from './common';
import { MagistratureType } from './magistratures';
import { SenateurJouable } from './senateurs';

export interface Election {
  id: string;
  année: number;
  saison: Season;
  magistrature: MagistratureType;
  candidats: SenateurJouable[];
  élu: SenateurJouable | null;
  terminée: boolean;
}

export interface ElectionPlannerProps {
  senateurs: SenateurJouable[];
  onScheduleElection: (magistrature: MagistratureType, year: number, season: Season) => void;
}
