
import { useMemo } from 'react';
import { ceremonies } from '../data/mockCeremonies';
import { sortCeremoniesByProximity } from '../utils/ceremonyUtils';

export const useCeremonies = () => {
  // Return sorted ceremonies
  const sortedCeremonies = useMemo(() => 
    sortCeremoniesByProximity(ceremonies), 
    [ceremonies]
  );
  
  return {
    ceremonies: sortedCeremonies
  };
};
