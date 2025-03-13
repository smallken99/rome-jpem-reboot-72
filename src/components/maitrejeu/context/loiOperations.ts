
import { Loi } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const createLoiOperations = (
  setLois: React.Dispatch<React.SetStateAction<Loi[]>>
) => {
  const addLoi = (loiData: Omit<Loi, "id">) => {
    // Générer un ID pour la nouvelle loi
    const newLoi: Loi = {
      ...loiData,
      id: uuidv4(),
      // S'assurer que tous les champs obligatoires sont présents
      votes: loiData.votes || {
        pour: loiData.votesPositifs || 0,
        contre: loiData.votesNégatifs || 0,
        abstention: loiData.votesAbstention || 0
      }
    };
    
    setLois(prev => [...prev, newLoi]);
    return newLoi.id;
  };

  const voteLoi = (id: string, vote: 'pour' | 'contre' | 'abstention', count: number = 1) => {
    setLois(prev => prev.map(loi => {
      if (loi.id === id) {
        const newVotes = { ...loi.votes };
        newVotes[vote] += count;
        return {
          ...loi,
          votes: newVotes,
          votesPositifs: vote === 'pour' ? loi.votesPositifs + count : loi.votesPositifs,
          votesNégatifs: vote === 'contre' ? loi.votesNégatifs + count : loi.votesNégatifs,
          votesAbstention: vote === 'abstention' ? loi.votesAbstention + count : loi.votesAbstention
        };
      }
      return loi;
    }));
  };

  return {
    addLoi,
    voteLoi
  };
};
