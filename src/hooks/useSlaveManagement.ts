
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useBalance } from './useBalance';

export interface Slave {
  id: string;
  name: string;
  gender: string;
  age: number;
  skills: string[];
  level: number;
  price: number;
  health: number;
  origin: string;
  assignment?: string;
  buildingId?: string;
}

export interface SlaveAssignment {
  buildingId: string;
  buildingName: string;
  count: number;
  efficiency: number;
}

export const useSlaveManagement = (initialSlaves: Slave[] = []) => {
  const [slaves, setSlaves] = useState<Slave[]>(initialSlaves);
  const [loading, setLoading] = useState(false);
  const [totalSlaves, setTotalSlaves] = useState(initialSlaves.length);
  const [assignedSlaves, setAssignedSlaves] = useState(0);
  const { balance, addBalance, subtractBalance } = useBalance();
  const [slavePrice, setSlavePrice] = useState(2500);
  const [slaveAssignments, setSlaveAssignments] = useState<SlaveAssignment[]>([]);
  
  useEffect(() => {
    // Calculate assigned slaves on initial load
    const assigned = slaves.filter(slave => slave.assignment || slave.buildingId).length;
    setAssignedSlaves(assigned);
    setTotalSlaves(slaves.length);
  }, [slaves]);
  
  const purchaseSlaves = (amount: number) => {
    const totalCost = amount * slavePrice;
    
    if (totalCost > balance) {
      toast.error("Fonds insuffisants pour cet achat");
      return false;
    }
    
    // Generate new slaves
    const newSlaves: Slave[] = Array.from({ length: amount }).map((_, i) => ({
      id: `slave-${Date.now()}-${i}`,
      name: `Esclave ${totalSlaves + i + 1}`,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      age: 20 + Math.floor(Math.random() * 20),
      skills: [],
      level: 1,
      price: slavePrice,
      health: 80 + Math.floor(Math.random() * 20),
      origin: 'Gaule',
    }));
    
    setSlaves(prev => [...prev, ...newSlaves]);
    setTotalSlaves(prev => prev + amount);
    subtractBalance(totalCost);
    
    toast.success(`${amount} esclaves achetés avec succès`);
    return true;
  };
  
  const sellSlaves = (amount: number) => {
    const availableSlaves = slaves.filter(slave => !slave.assignment && !slave.buildingId);
    
    if (amount > availableSlaves.length) {
      toast.error(`Vous ne pouvez vendre que ${availableSlaves.length} esclaves non assignés`);
      return 0;
    }
    
    const slavesToSell = availableSlaves.slice(0, amount);
    const totalValue = slavesToSell.reduce((acc, slave) => acc + Math.floor(slave.price * 0.8), 0);
    
    // Remove slaves
    const slaveIdsToRemove = slavesToSell.map(slave => slave.id);
    setSlaves(prev => prev.filter(slave => !slaveIdsToRemove.includes(slave.id)));
    setTotalSlaves(prev => prev - amount);
    
    // Add money
    addBalance(totalValue);
    
    toast.success(`${amount} esclaves vendus pour ${totalValue} As`);
    return totalValue;
  };
  
  const assignSlavesToProperty = (buildingId: string, buildingName: string, count: number) => {
    const availableSlaves = slaves.filter(slave => !slave.assignment && !slave.buildingId);
    
    if (count > availableSlaves.length) {
      toast.error(`Vous n'avez que ${availableSlaves.length} esclaves disponibles`);
      return false;
    }
    
    // Update slaves
    const slavesToAssign = availableSlaves.slice(0, count);
    setSlaves(prev => 
      prev.map(slave => 
        slavesToAssign.includes(slave) 
          ? { ...slave, buildingId, assignment: buildingName } 
          : slave
      )
    );
    
    // Update assignments
    const existingAssignment = slaveAssignments.find(a => a.buildingId === buildingId);
    if (existingAssignment) {
      setSlaveAssignments(prev => 
        prev.map(a => 
          a.buildingId === buildingId 
            ? { ...a, count: a.count + count } 
            : a
        )
      );
    } else {
      setSlaveAssignments(prev => [
        ...prev, 
        { 
          buildingId, 
          buildingName, 
          count, 
          efficiency: 100 
        }
      ]);
    }
    
    setAssignedSlaves(prev => prev + count);
    
    toast.success(`${count} esclaves assignés à ${buildingName}`);
    return true;
  };
  
  const removeSlaveAssignment = (buildingId: string, count?: number) => {
    const assignment = slaveAssignments.find(a => a.buildingId === buildingId);
    if (!assignment) return false;
    
    const removeCount = count || assignment.count;
    const slavesToFree = slaves
      .filter(slave => slave.buildingId === buildingId)
      .slice(0, removeCount);
    
    // Update slaves
    setSlaves(prev => 
      prev.map(slave => 
        slavesToFree.includes(slave) 
          ? { ...slave, buildingId: undefined, assignment: undefined } 
          : slave
      )
    );
    
    // Update assignments
    if (removeCount >= assignment.count) {
      setSlaveAssignments(prev => prev.filter(a => a.buildingId !== buildingId));
    } else {
      setSlaveAssignments(prev => 
        prev.map(a => 
          a.buildingId === buildingId 
            ? { ...a, count: a.count - removeCount } 
            : a
        )
      );
    }
    
    setAssignedSlaves(prev => prev - removeCount);
    
    toast.success(`${removeCount} esclaves libérés de leurs assignations`);
    return true;
  };
  
  return {
    slaves,
    loading,
    totalSlaves,
    assignedSlaves,
    slavePrice,
    slaveAssignments,
    balance,
    purchaseSlaves,
    sellSlaves,
    assignSlavesToProperty,
    removeSlaveAssignment,
    purchaseSlave: (slave: Slave, amount: number) => purchaseSlaves(amount),
    sellSlave: (slaveId: string) => {
      const slave = slaves.find(s => s.id === slaveId);
      if (!slave) return 0;
      setSlaves(prev => prev.filter(s => s.id !== slaveId));
      setTotalSlaves(prev => prev - 1);
      const value = Math.floor(slave.price * 0.8);
      addBalance(value);
      return value;
    },
    assignSlave: (slaveId: string, assignmentId: string) => {
      setSlaves(prev => 
        prev.map(s => 
          s.id === slaveId 
            ? { ...s, buildingId: assignmentId, assignment: 'Assigned' } 
            : s
        )
      );
      return true;
    },
    trainSlave: (slaveId: string, skill: string) => {
      setSlaves(prev => 
        prev.map(s => 
          s.id === slaveId 
            ? { ...s, skills: [...s.skills, skill], level: s.level + 1 } 
            : s
        )
      );
      return true;
    }
  };
};
