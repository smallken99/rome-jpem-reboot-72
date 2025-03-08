
import { Loi } from '../types';

export const createLoiOperations = (
  setLois: React.Dispatch<React.SetStateAction<Loi[]>>
) => {
  const addLoi = (loi: Loi) => {
    setLois(prev => [...prev, loi]);
  };

  return {
    addLoi
  };
};
