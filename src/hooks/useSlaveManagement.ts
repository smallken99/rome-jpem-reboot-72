
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Slave {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  origin: string;
  price: number;
  skills: string[];
  health: number;
  morale: number;
  productivity: number;
  assigned?: string;
  assignedTo?: string;
}

export interface SlaveAssignment {
  id: string;
  name: string;
  description: string;
  capacity: number;
  slaves: string[];
  productivity: number;
  type: string;
  location?: string;
}

export interface SlaveManagementHook {
  slaves: Slave[];
  loading: boolean;
  
  // Core slave management
  purchaseSlave: (slave: Slave, amount: number) => boolean;
  sellSlave: (slaveId: string) => number;
  assignSlave: (slaveId: string, assignmentId: string) => boolean;
  trainSlave: (slaveId: string, skill: string) => boolean;
  
  // Additional properties
  totalSlaves: number;
  slavePrice: number;
  assignedSlaves: number;
  slaveAssignments: SlaveAssignment[];
  purchaseSlaves: (count: number, options?: any) => Slave[];
  sellSlaves: (slaves: string[]) => number;
  assignSlavesToProperty: (slaveIds: string[], propertyId: string) => boolean;
  removeSlaveAssignment: (slaveId: string) => boolean;
  balance: number;
}

export const useSlaveManagement = (initialSlaves: Slave[] = []): SlaveManagementHook => {
  const [slaves, setSlaves] = useState<Slave[]>(initialSlaves);
  const [loading, setLoading] = useState(false);
  const [slaveAssignments, setSlaveAssignments] = useState<SlaveAssignment[]>([]);
  const [balance, setBalance] = useState(10000); // Example starting money
  
  // Calculate derived values
  const totalSlaves = slaves.length;
  const assignedSlaves = slaves.filter(slave => slave.assigned).length;
  const slavePrice = 1000; // Base price
  
  // Basic slave management functions
  const purchaseSlave = (slave: Slave, amount: number): boolean => {
    if (balance < amount) return false;
    
    setSlaves(prev => [...prev, { ...slave, id: uuidv4() }]);
    setBalance(prev => prev - amount);
    return true;
  };
  
  const sellSlave = (slaveId: string): number => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) return 0;
    
    const sellingPrice = slave.price * 0.7; // 70% of purchase price
    
    setSlaves(prev => prev.filter(s => s.id !== slaveId));
    setBalance(prev => prev + sellingPrice);
    
    return sellingPrice;
  };
  
  const assignSlave = (slaveId: string, assignmentId: string): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    const assignment = slaveAssignments.find(a => a.id === assignmentId);
    
    if (!slave || !assignment) return false;
    if (assignment.slaves.length >= assignment.capacity) return false;
    
    setSlaves(prev => 
      prev.map(s => 
        s.id === slaveId ? { ...s, assigned: assignmentId } : s
      )
    );
    
    setSlaveAssignments(prev => 
      prev.map(a => 
        a.id === assignmentId 
          ? { ...a, slaves: [...a.slaves, slaveId] } 
          : a
      )
    );
    
    return true;
  };
  
  const trainSlave = (slaveId: string, skill: string): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) return false;
    
    if (slave.skills.includes(skill)) return false;
    
    setSlaves(prev => 
      prev.map(s => 
        s.id === slaveId 
          ? { ...s, skills: [...s.skills, skill], productivity: s.productivity + 5 } 
          : s
      )
    );
    
    return true;
  };
  
  // Additional functions
  const purchaseSlaves = (count: number, options: any = {}): Slave[] => {
    const newSlaves: Slave[] = [];
    const totalCost = count * slavePrice;
    
    if (balance < totalCost) return [];
    
    for (let i = 0; i < count; i++) {
      const newSlave: Slave = {
        id: uuidv4(),
        name: `Slave ${slaves.length + i + 1}`,
        age: Math.floor(Math.random() * 30) + 15,
        gender: Math.random() > 0.5 ? 'male' : 'female',
        origin: options.origin || 'Gaul',
        price: slavePrice,
        skills: [],
        health: Math.floor(Math.random() * 30) + 70,
        morale: Math.floor(Math.random() * 30) + 50,
        productivity: Math.floor(Math.random() * 30) + 60
      };
      
      newSlaves.push(newSlave);
    }
    
    setSlaves(prev => [...prev, ...newSlaves]);
    setBalance(prev => prev - totalCost);
    
    return newSlaves;
  };
  
  const sellSlaves = (slaveIds: string[]): number => {
    const slavesToSell = slaves.filter(s => slaveIds.includes(s.id));
    const totalPrice = slavesToSell.reduce((sum, slave) => sum + (slave.price * 0.7), 0);
    
    setSlaves(prev => prev.filter(s => !slaveIds.includes(s.id)));
    setBalance(prev => prev + totalPrice);
    
    return totalPrice;
  };
  
  const assignSlavesToProperty = (slaveIds: string[], propertyId: string): boolean => {
    // First check if all slaves exist
    const allSlavesExist = slaveIds.every(id => slaves.some(s => s.id === id));
    if (!allSlavesExist) return false;
    
    // Update slaves to be assigned to this property
    setSlaves(prev => 
      prev.map(slave => 
        slaveIds.includes(slave.id) 
          ? { ...slave, assigned: propertyId, assignedTo: propertyId } 
          : slave
      )
    );
    
    return true;
  };
  
  const removeSlaveAssignment = (slaveId: string): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave || !slave.assigned) return false;
    
    // Remove slave from assignment
    if (slave.assigned) {
      setSlaveAssignments(prev => 
        prev.map(a => 
          a.id === slave.assigned 
            ? { ...a, slaves: a.slaves.filter(id => id !== slaveId) } 
            : a
        )
      );
    }
    
    // Update slave's assignment status
    setSlaves(prev => 
      prev.map(s => 
        s.id === slaveId 
          ? { ...s, assigned: undefined, assignedTo: undefined } 
          : s
      )
    );
    
    return true;
  };
  
  return {
    slaves,
    loading,
    purchaseSlave,
    sellSlave,
    assignSlave,
    trainSlave,
    totalSlaves,
    slavePrice,
    assignedSlaves,
    slaveAssignments,
    purchaseSlaves,
    sellSlaves,
    assignSlavesToProperty,
    removeSlaveAssignment,
    balance
  };
};
