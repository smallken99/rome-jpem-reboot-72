
import { Evenement } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const createEvenementOperations = (
  setEvenements: React.Dispatch<React.SetStateAction<Evenement[]>>
) => {
  const addEvenement = (evenement: Omit<Evenement, "id">) => {
    const newEvenement = {
      ...evenement,
      id: uuidv4()
    };
    setEvenements(prev => [...prev, newEvenement as Evenement]);
  };

  const resolveEvenement = (id: string, optionId: string) => {
    setEvenements(prev => prev.map(e => {
      if (e.id === id) {
        return { ...e, resolved: true, selectedOption: optionId };
      }
      return e;
    }));
  };

  return {
    addEvenement,
    resolveEvenement
  };
};
