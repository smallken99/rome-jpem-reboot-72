import { useState, useEffect } from 'react';
import { Slave } from '@/types/slaves';

export const useSlaveManagement = () => {
  const [slaves, setSlaves] = useState<Slave[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalSlaves, setTotalSlaves] = useState(0);
  const [slavePrice, setSlavePrice] = useState(0);
  const [assignedSlaves, setAssignedSlaves] = useState<string[]>([]);
  const [slaveAssignments, setSlaveAssignments] = useState<Record<string, string>>({});
  const [balance, setBalance] = useState(0);

  // Initialize slaves from localStorage or with default values
  useEffect(() => {
    try {
      const savedSlaves = localStorage.getItem('roman-slaves');
      if (savedSlaves) {
        const parsedSlaves = JSON.parse(savedSlaves);
        setSlaves(parsedSlaves);
        setTotalSlaves(parsedSlaves.length);
        
        // Calculate assigned slaves
        const assigned = parsedSlaves
          .filter((slave: Slave) => slave.assignedTo)
          .map((slave: Slave) => slave.id);
        setAssignedSlaves(assigned);
        
        // Build assignments map
        const assignments: Record<string, string> = {};
        parsedSlaves.forEach((slave: Slave) => {
          if (slave.assignedTo) {
            assignments[slave.id] = slave.assignedTo;
          }
        });
        setSlaveAssignments(assignments);
      } else {
        // Initialize with empty array if no saved slaves
        setSlaves([]);
        setTotalSlaves(0);
      }
      
      // Set initial slave price (market fluctuations could be implemented later)
      setSlavePrice(1500 + Math.floor(Math.random() * 500));
      
      // Set initial balance from localStorage or default
      const savedBalance = localStorage.getItem('roman-balance');
      setBalance(savedBalance ? parseInt(savedBalance) : 10000);
    } catch (error) {
      console.error('Error loading slaves:', error);
      setSlaves([]);
      setTotalSlaves(0);
    }
    setLoading(false);
  }, []);

  // Helper method to save slaves to localStorage
  const saveSlaves = (updatedSlaves: Slave[]) => {
    try {
      localStorage.setItem('roman-slaves', JSON.stringify(updatedSlaves));
      setSlaves(updatedSlaves);
      setTotalSlaves(updatedSlaves.length);
      
      // Update assigned slaves
      const assigned = updatedSlaves
        .filter(slave => slave.assignedTo)
        .map(slave => slave.id);
      setAssignedSlaves(assigned);
      
      // Update assignments map
      const assignments: Record<string, string> = {};
      updatedSlaves.forEach(slave => {
        if (slave.assignedTo) {
          assignments[slave.id] = slave.assignedTo;
        }
      });
      setSlaveAssignments(assignments);
    } catch (error) {
      console.error('Error saving slaves:', error);
    }
  };

  // Purchase a new slave
  const purchaseSlave = (slave: Slave, amount: number): boolean => {
    if (balance < amount) {
      return false; // Not enough money
    }
    
    // Add the slave to the collection
    const updatedSlaves = [...slaves, slave];
    saveSlaves(updatedSlaves);
    
    // Update balance
    const newBalance = balance - amount;
    setBalance(newBalance);
    localStorage.setItem('roman-balance', newBalance.toString());
    
    return true;
  };

  // Sell a slave
  const sellSlave = (slaveId: string): number => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) {
      return 0; // Slave not found
    }
    
    // Calculate sell price (typically less than purchase price)
    const sellPrice = Math.floor(slave.value * 0.8);
    
    // Remove the slave from the collection
    const updatedSlaves = slaves.filter(s => s.id !== slaveId);
    saveSlaves(updatedSlaves);
    
    // Update balance
    const newBalance = balance + sellPrice;
    setBalance(newBalance);
    localStorage.setItem('roman-balance', newBalance.toString());
    
    return sellPrice;
  };

  // Bulk purchase slaves
  const purchaseSlaves = (slavesToBuy: Slave[], amount: number): boolean => {
    if (balance < amount) {
      return false; // Not enough money
    }
    
    // Add the slaves to the collection
    const updatedSlaves = [...slaves, ...slavesToBuy];
    saveSlaves(updatedSlaves);
    
    // Update balance
    const newBalance = balance - amount;
    setBalance(newBalance);
    localStorage.setItem('roman-balance', newBalance.toString());
    
    return true;
  };

  // Bulk sell slaves
  const sellSlaves = (slaveIds: string[]): number => {
    let totalSellPrice = 0;
    
    // Calculate total sell price
    slaveIds.forEach(id => {
      const slave = slaves.find(s => s.id === id);
      if (slave) {
        totalSellPrice += Math.floor(slave.value * 0.8);
      }
    });
    
    // Remove the slaves from the collection
    const updatedSlaves = slaves.filter(s => !slaveIds.includes(s.id));
    saveSlaves(updatedSlaves);
    
    // Update balance
    const newBalance = balance + totalSellPrice;
    setBalance(newBalance);
    localStorage.setItem('roman-balance', newBalance.toString());
    
    return totalSellPrice;
  };

  // Assign a slave to a property or task
  const assignSlave = (slaveId: string, assignmentId: string): boolean => {
    const slaveIndex = slaves.findIndex(s => s.id === slaveId);
    if (slaveIndex === -1) {
      return false; // Slave not found
    }
    
    // Update the slave's assignment
    const updatedSlaves = [...slaves];
    updatedSlaves[slaveIndex] = {
      ...updatedSlaves[slaveIndex],
      assignedTo: assignmentId
    };
    
    saveSlaves(updatedSlaves);
    return true;
  };

  // Assign multiple slaves to a property
  const assignSlavesToProperty = (slaveIds: string[], propertyId: string): boolean => {
    // Update each slave's assignment
    const updatedSlaves = slaves.map(slave => {
      if (slaveIds.includes(slave.id)) {
        return {
          ...slave,
          assignedTo: propertyId
        };
      }
      return slave;
    });
    
    saveSlaves(updatedSlaves);
    return true;
  };

  // Remove assignment
  const removeSlaveAssignment = (slaveId: string): boolean => {
    const slaveIndex = slaves.findIndex(s => s.id === slaveId);
    if (slaveIndex === -1) {
      return false; // Slave not found
    }
    
    // Remove the slave's assignment
    const updatedSlaves = [...slaves];
    updatedSlaves[slaveIndex] = {
      ...updatedSlaves[slaveIndex],
      assignedTo: null
    };
    
    saveSlaves(updatedSlaves);
    return true;
  };

  // Train a slave in a specific skill
  const trainSlave = (slaveId: string, skill: string): boolean => {
    const slaveIndex = slaves.findIndex(s => s.id === slaveId);
    if (slaveIndex === -1) {
      return false; // Slave not found
    }
    
    // Update the slave's skills
    const updatedSlaves = [...slaves];
    const slave = updatedSlaves[slaveIndex];
    
    // Add the skill if it doesn't exist, or increase its level
    if (!slave.skills) {
      slave.skills = { [skill]: 1 };
    } else if (!slave.skills[skill]) {
      slave.skills[skill] = 1;
    } else {
      slave.skills[skill] += 1;
    }
    
    // Increase the slave's value based on new skill
    slave.value += 100;
    
    saveSlaves(updatedSlaves);
    return true;
  };

  return {
    slaves,
    loading,
    totalSlaves,
    slavePrice,
    assignedSlaves,
    slaveAssignments,
    balance,
    purchaseSlave,
    sellSlave,
    purchaseSlaves,
    sellSlaves,
    assignSlave,
    assignSlavesToProperty,
    removeSlaveAssignment,
    trainSlave
  };
};
