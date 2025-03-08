
import { SenateurJouable } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const createSenateurOperations = (
  setSenateurs: React.Dispatch<React.SetStateAction<SenateurJouable[]>>
) => {
  const updateSenateur = (id: string, updates: Partial<SenateurJouable>) => {
    setSenateurs(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const assignSenateurToPlayer = (senateurId: string, playerId: string) => {
    updateSenateur(senateurId, { playerId });
  };

  const addSenateur = (senateur: Omit<SenateurJouable, "id">) => {
    const newSenateur = {
      ...senateur,
      id: uuidv4()
    };
    setSenateurs(prev => [...prev, newSenateur as SenateurJouable]);
  };

  const deleteSenateur = (id: string) => {
    setSenateurs(prev => prev.filter(s => s.id !== id));
  };

  return {
    updateSenateur,
    assignSenateurToPlayer,
    addSenateur,
    deleteSenateur
  };
};
