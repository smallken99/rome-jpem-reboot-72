
import { useState } from 'react';

export const useBalance = (initialBalance = 10000) => {
  const [balance, setBalance] = useState(initialBalance);
  
  const addBalance = (amount: number) => {
    setBalance(prev => prev + amount);
    return true;
  };
  
  const subtractBalance = (amount: number) => {
    if (amount > balance) {
      return false;
    }
    
    setBalance(prev => prev - amount);
    return true;
  };
  
  return {
    balance,
    setBalance,
    addBalance,
    subtractBalance
  };
};
