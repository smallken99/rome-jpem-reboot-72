
import { Election } from '../types';
import { MagistratureType } from '../types/magistratures';
import { Season } from '../types/common';
import { v4 as uuidv4 } from 'uuid';
import { EVENT_STATUS_REVERSE_MAP } from '../constants/gamePhases';

export const createElectionOperations = (
  setElections: React.Dispatch<React.SetStateAction<Election[]>>
) => {
  const scheduleElection = (magistrature: MagistratureType, year: number, season: Season): string => {
    const election: Election = {
      id: uuidv4(),
      magistrature,
      année: year,
      annee: year, // Ajouter la version sans accent
      saison: season,
      season: season, // Ajouter alias en anglais
      candidats: [],
      results: null,
      statut: 'planifiée',
      status: 'scheduled', // Ajouter alias en anglais
      poste: magistrature // Ajouter alias
    };
    setElections(prev => [...prev, election]);
    return election.id;
  };

  return {
    scheduleElection
  };
};
