
import { useState } from 'react';

/**
 * Hook to manage password visibility state
 */
export const usePasswordVisibility = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState);
  
  const toggle = () => {
    setIsVisible(prev => !prev);
  };
  
  return {
    isVisible,
    toggle
  };
};
