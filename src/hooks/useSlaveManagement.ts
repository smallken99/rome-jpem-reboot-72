import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Slave interface
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
  status: 'idle' | 'assigned' | 'training' | 'ill' | 'escaped';
  purchaseDate: string;
  assignment?: string;
  assignmentId?: string;
}

// Slave Assignment interface
export interface SlaveAssignment {
  id: string;
  name: string;
  location: string;
  type: string;
  capacity: number;
  assignedSlaves: string[];
  efficiency: number;
  description: string;
}

// Slave Management Hook interface
export interface SlaveManagementHook {
  slaves: Slave[];
  loading: boolean;
  totalSlaves: number;
  slavePrice: number;
  assignedSlaves: Slave[];
  slaveAssignments: SlaveAssignment[];
  balance: number;
  
  // Functions
  purchaseSlave: (slave: Slave, amount: number) => boolean;
  sellSlave: (slaveId: string) => number;
  assignSlave: (slaveId: string, assignmentId: string) => boolean;
  trainSlave: (slaveId: string, skill: string) => boolean;
  purchaseSlaves: (count: number, type: string) => boolean;
  sellSlaves: (slaveIds: string[]) => number;
  assignSlavesToProperty: (slaveIds: string[], propertyId: string) => boolean;
  removeSlaveAssignment: (slaveId: string) => boolean;
}

// Mock implementation for useSlaveManagement hook
export const useSlaveManagement = (): SlaveManagementHook => {
  const [slaves, setSlaves] = useState<Slave[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Mock implementation with dummy functions
  const purchaseSlave = (slave: Slave, amount: number) => {
    const newSlave = {
      ...slave,
      id: uuidv4(),
      purchaseDate: new Date().toISOString(),
      status: 'idle' as const
    };
    
    setSlaves(prev => [...prev, newSlave]);
    return true;
  };
  
  const sellSlave = (slaveId: string) => {
    setSlaves(prev => prev.filter(s => s.id !== slaveId));
    return 500; // Mock price
  };
  
  const assignSlave = (slaveId: string, assignmentId: string) => {
    setSlaves(prev => 
      prev.map(slave => 
        slave.id === slaveId 
          ? { ...slave, status: 'assigned' } 
          : slave
      )
    );
    return true;
  };
  
  const trainSlave = (slaveId: string, skill: string) => {
    setSlaves(prev => 
      prev.map(slave => 
        slave.id === slaveId 
          ? { ...slave, status: 'training', skills: [...slave.skills, skill] } 
          : slave
      )
    );
    return true;
  };

  // Additional implementation to satisfy the interface
  const purchaseSlaves = (count: number, type: string) => {
    for (let i = 0; i < count; i++) {
      const newSlave: Slave = {
        id: uuidv4(),
        name: `Slave ${slaves.length + i + 1}`,
        age: Math.floor(Math.random() * 30) + 15,
        gender: Math.random() > 0.5 ? 'male' : 'female',
        origin: 'Gaul',
        price: 500 + Math.floor(Math.random() * 500),
        type: type,
        skills: [],
        health: 70 + Math.floor(Math.random() * 30),
        loyalty: 50 + Math.floor(Math.random() * 30),
        strength: 50 + Math.floor(Math.random() * 50),
        intelligence: 50 + Math.floor(Math.random() * 50),
        status: 'idle',
        purchaseDate: new Date().toISOString()
      };
      
      purchaseSlave(newSlave, newSlave.price);
    }
    return true;
  };
  
  const sellSlaves = (slaveIds: string[]) => {
    let total = 0;
    slaveIds.forEach(id => {
      total += sellSlave(id);
    });
    return total;
  };
  
  const assignSlavesToProperty = (slaveIds: string[], propertyId: string) => {
    slaveIds.forEach(id => {
      assignSlave(id, propertyId);
    });
    return true;
  };
  
  const removeSlaveAssignment = (slaveId: string) => {
    setSlaves(prev => 
      prev.map(slave => 
        slave.id === slaveId 
          ? { ...slave, status: 'idle' } 
          : slave
      )
    );
    return true;
  };
  
  return {
    slaves,
    loading,
    totalSlaves: slaves.length,
    slavePrice: 1000, // Mock average price
    assignedSlaves: slaves.filter(s => s.status === 'assigned'),
    slaveAssignments: [],
    balance: 10000, // Mock balance
    purchaseSlave,
    sellSlave,
    assignSlave,
    trainSlave,
    purchaseSlaves,
    sellSlaves,
    assignSlavesToProperty,
    removeSlaveAssignment
  };
};

export default useSlaveManagement;
