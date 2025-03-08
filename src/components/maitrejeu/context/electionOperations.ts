
import { Election } from '../types';
import { MagistratureType } from '../types/magistratures';
import { Season } from '../types/common';
import { v4 as uuidv4 } from 'uuid';

export const createElectionOperations = (
  setElections: React.Dispatch<React.SetStateAction<Election[]>>
) => {
  const scheduleElection = (magistrature: MagistratureType, year: number, season: Season): string => {
    const election: Election = {
      id: uuidv4(),
      magistrature,
      annee: year,
      saison: season,
      candidats: [],
      results: null,
      status: 'planifiée'
    };
    setElections(prev => [...prev, election]);
    return election.id;
  };

  return {
    scheduleElection
  };
};
