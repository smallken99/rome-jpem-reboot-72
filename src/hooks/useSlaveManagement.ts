
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define the Slave interface
export interface Slave {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  origin: string;
  price: number;
  type: string;
  skills: string[];
  health: number;
  loyalty: number;
  strength: number;
  intelligence: number;
  assigned?: string;
  status: 'idle' | 'working' | 'sick' | 'recovering';
  purchaseDate?: string;
}

// Export the hook interface with all required properties
export interface SlaveManagementHook {
  slaves: Slave[];
  loading: boolean;
  totalSlaves: number;
  slavePrice: number;
  assignedSlaves: Slave[];
  slaveAssignments: Record<string, Slave[]>;
  balance: number;
  purchaseSlave: (slave: Slave, amount: number) => boolean;
  purchaseSlaves: (count: number, type?: string) => boolean;
  sellSlave: (slaveId: string) => number;
  sellSlaves: (slaveIds: string[]) => number;
  assignSlave: (slaveId: string, assignmentId: string) => boolean;
  assignSlavesToProperty: (slaveIds: string[], propertyId: string) => boolean;
  removeSlaveAssignment: (slaveId: string) => boolean;
  trainSlave: (slaveId: string, skill: string) => boolean;
}

// Implement a basic version of the hook
export const useSlaveManagement = (): SlaveManagementHook => {
  const [slaves, setSlaves] = useState<Slave[]>([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(50000);
  
  // Helper function to generate slave price
  const generateSlavePrice = useCallback(() => {
    return Math.floor(Math.random() * 2000) + 1000;
  }, []);
  
  // Implementation of hook methods
  const purchaseSlave = useCallback((slave: Slave, amount: number) => {
    if (amount <= balance) {
      setSlaves(prev => [...prev, { ...slave, id: uuidv4(), purchaseDate: new Date().toISOString() }]);
      setBalance(prev => prev - amount);
      return true;
    }
    return false;
  }, [balance]);
  
  const sellSlave = useCallback((slaveId: string) => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) return 0;
    
    const sellPrice = slave.price * 0.7;
    setSlaves(prev => prev.filter(s => s.id !== slaveId));
    setBalance(prev => prev + sellPrice);
    
    return sellPrice;
  }, [slaves]);
  
  const assignSlave = useCallback((slaveId: string, assignmentId: string) => {
    setSlaves(prev => prev.map(slave => 
      slave.id === slaveId ? { ...slave, assigned: assignmentId } : slave
    ));
    return true;
  }, []);
  
  const removeSlaveAssignment = useCallback((slaveId: string) => {
    setSlaves(prev => prev.map(slave => 
      slave.id === slaveId ? { ...slave, assigned: undefined } : slave
    ));
    return true;
  }, []);
  
  const trainSlave = useCallback((slaveId: string, skill: string) => {
    setSlaves(prev => prev.map(slave => 
      slave.id === slaveId ? { 
        ...slave, 
        skills: [...slave.skills, skill] 
      } : slave
    ));
    return true;
  }, []);
  
  // Additional methods
  const purchaseSlaves = useCallback((count: number, type?: string) => {
    const totalCost = count * generateSlavePrice();
    if (totalCost <= balance) {
      const newSlaves = Array.from({ length: count }, () => ({
        id: uuidv4(),
        name: `Slave ${Math.floor(Math.random() * 1000)}`,
        age: Math.floor(Math.random() * 30) + 15,
        gender: Math.random() > 0.5 ? 'male' : 'female',
        origin: 'Gaul',
        price: generateSlavePrice(),
        type: type || 'general',
        skills: [],
        health: Math.floor(Math.random() * 30) + 70,
        loyalty: Math.floor(Math.random() * 50) + 30,
        strength: Math.floor(Math.random() * 50) + 30,
        intelligence: Math.floor(Math.random() * 50) + 30,
        status: 'idle' as const,
        purchaseDate: new Date().toISOString()
      }));
      
      setSlaves(prev => [...prev, ...newSlaves]);
      setBalance(prev => prev - totalCost);
      return true;
    }
    return false;
  }, [balance, generateSlavePrice]);
  
  const sellSlaves = useCallback((slaveIds: string[]) => {
    let totalSellPrice = 0;
    
    const slavesToSell = slaves.filter(s => slaveIds.includes(s.id));
    slavesToSell.forEach(slave => {
      totalSellPrice += slave.price * 0.7;
    });
    
    setSlaves(prev => prev.filter(s => !slaveIds.includes(s.id)));
    setBalance(prev => prev + totalSellPrice);
    
    return totalSellPrice;
  }, [slaves]);
  
  const assignSlavesToProperty = useCallback((slaveIds: string[], propertyId: string) => {
    setSlaves(prev => prev.map(slave => 
      slaveIds.includes(slave.id) ? { ...slave, assigned: propertyId } : slave
    ));
    return true;
  }, []);
  
  // Compute derived state
  const totalSlaves = slaves.length;
  const assignedSlaves = slaves.filter(s => s.assigned);
  const slaveAssignments = slaves.reduce((acc, slave) => {
    if (slave.assigned) {
      if (!acc[slave.assigned]) {
        acc[slave.assigned] = [];
      }
      acc[slave.assigned].push(slave);
    }
    return acc;
  }, {} as Record<string, Slave[]>);
  
  return {
    slaves,
    loading,
    totalSlaves,
    slavePrice: generateSlavePrice(),
    assignedSlaves,
    slaveAssignments,
    balance,
    purchaseSlave,
    purchaseSlaves,
    sellSlave,
    sellSlaves,
    assignSlave,
    assignSlavesToProperty,
    removeSlaveAssignment,
    trainSlave
  };
};
