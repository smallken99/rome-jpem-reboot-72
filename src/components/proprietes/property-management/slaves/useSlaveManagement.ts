
import { useState } from 'react';
import { toast } from 'sonner';
import { usePatrimoine } from '@/hooks/usePatrimoine';

export const useSlaveManagement = (initialSlaves: number = 25) => {
  const [totalSlaves, setTotalSlaves] = useState(initialSlaves);
  const [slavePrice, setSlavePrice] = useState(800);
  const { balance, updateBalance } = usePatrimoine();
  
  // Simuler l'achat d'esclaves
  const purchaseSlaves = (amount: number) => {
    const totalCost = amount * slavePrice;
    
    if (balance < totalCost) {
      toast.error(`Fonds insuffisants pour acheter ${amount} esclaves (coût: ${totalCost.toLocaleString()} As)`);
      return false;
    }
    
    setTotalSlaves(prev => prev + amount);
    updateBalance(-totalCost);
    toast.success(`Acquisition de ${amount} esclaves pour ${totalCost.toLocaleString()} As`);
    return true;
  };
  
  return {
    totalSlaves,
    slavePrice,
    purchaseSlaves
  };
};
