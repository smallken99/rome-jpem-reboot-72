
import { Province } from '../types';

export const createProvinceOperations = (
  setProvinces: React.Dispatch<React.SetStateAction<Province[]>>
) => {
  const updateProvince = (province: Province) => {
    setProvinces(prev => prev.map(p => p.id === province.id ? province : p));
  };

  return {
    updateProvince
  };
};
