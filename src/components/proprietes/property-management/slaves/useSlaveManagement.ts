
import { useState } from 'react';
import { toast } from 'sonner';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useEconomy } from '@/hooks/useEconomy';

interface SlaveAssignment {
  propertyId: string;
  propertyName: string;
  assignedSlaves: number;
}

export const useSlaveManagement = (initialSlaves: number = 25) => {
  const [totalSlaves, setTotalSlaves] = useState(initialSlaves);
  const [slavePrice, setSlavePrice] = useState(800);
  const [slaveAssignments, setSlaveAssignments] = useState<SlaveAssignment[]>([]);
  const { balance } = usePatrimoine();
  const economy = useEconomy();
  
  // Calculer le nombre total d'esclaves assignés
  const assignedSlaves = slaveAssignments.reduce(
    (total, assignment) => total + assignment.assignedSlaves, 
    0
  );
  
  // Simuler l'achat d'esclaves
  const purchaseSlaves = (amount: number) => {
    const totalCost = amount * slavePrice;
    
    if (!economy.canAfford(totalCost)) {
      toast.error(`Fonds insuffisants pour acheter ${amount} esclaves (coût: ${totalCost.toLocaleString()} As)`);
      return false;
    }
    
    // Effectuer la transaction via le système économique
    const transactionSuccess = economy.makePayment(
      totalCost,
      "Marchand d'esclaves",
      "Personnel",
      `Achat de ${amount} esclaves`
    );
    
    if (transactionSuccess) {
      setTotalSlaves(prev => prev + amount);
      toast.success(`Acquisition de ${amount} esclaves pour ${totalCost.toLocaleString()} As`);
      return true;
    }
    
    return false;
  };
  
  // Vente d'esclaves
  const sellSlaves = (amount: number) => {
    if (amount > totalSlaves - assignedSlaves) {
      toast.error(`Vous ne pouvez pas vendre des esclaves assignés à des propriétés`);
      return false;
    }
    
    const totalProfit = amount * Math.floor(slavePrice * 0.7); // 70% du prix d'achat
    
    // Enregistrer la transaction via le système économique
    const transactionSuccess = economy.receivePayment(
      totalProfit,
      "Marché aux esclaves",
      "Vente de personnel",
      `Vente de ${amount} esclaves`
    );
    
    if (transactionSuccess) {
      setTotalSlaves(prev => prev - amount);
      toast.success(`Vente de ${amount} esclaves pour ${totalProfit.toLocaleString()} As`);
      return true;
    }
    
    return false;
  };
  
  // Assigner des esclaves à une propriété
  const assignSlavesToProperty = (propertyId: string, propertyName: string, amount: number) => {
    // Vérifier si on a assez d'esclaves disponibles
    if (amount > (totalSlaves - assignedSlaves)) {
      toast.error(`Pas assez d'esclaves disponibles`);
      return false;
    }
    
    // Vérifier si la propriété existe déjà dans les affectations
    const existingAssignment = slaveAssignments.find(a => a.propertyId === propertyId);
    
    if (existingAssignment) {
      // Mettre à jour l'affectation existante
      setSlaveAssignments(prev => 
        prev.map(a => 
          a.propertyId === propertyId 
            ? { ...a, assignedSlaves: amount }
            : a
        )
      );
    } else {
      // Créer une nouvelle affectation
      setSlaveAssignments(prev => [
        ...prev,
        { propertyId, propertyName, assignedSlaves: amount }
      ]);
    }
    
    toast.success(`${amount} esclaves assignés à ${propertyName}`);
    return true;
  };
  
  // Retirer des esclaves d'une propriété
  const removeSlaveAssignment = (propertyId: string) => {
    setSlaveAssignments(prev => prev.filter(a => a.propertyId !== propertyId));
    toast.success(`Esclaves retirés de la propriété`);
    return true;
  };
  
  return {
    totalSlaves,
    slavePrice,
    assignedSlaves,
    slaveAssignments,
    purchaseSlaves,
    sellSlaves,
    assignSlavesToProperty,
    removeSlaveAssignment,
    balance // Fournir la balance pour l'UI
  };
};
