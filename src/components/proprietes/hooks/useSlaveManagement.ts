
import { useState, useEffect, useCallback } from 'react';
import { Slave, SlaveAssignment } from '../types/slaves';
import { v4 as uuidv4 } from 'uuid';

export interface SlaveManagementHook {
  slaves: Slave[];
  loading: boolean;
  purchaseSlave: (slave: Slave, amount: number) => boolean;
  sellSlave: (slaveId: string) => number;
  assignSlave: (slaveId: string, assignmentId: string) => boolean;
  trainSlave: (slaveId: string, skill: string) => boolean;
  
  // Additional properties
  totalSlaves: number;
  slavePrice: number;
  assignedSlaves: Slave[];
  slaveAssignments: SlaveAssignment[];
  purchaseSlaves: (count: number, type: string) => boolean;
  sellSlaves: (slaveIds: string[]) => number;
  assignSlavesToProperty: (slaveIds: string[], propertyId: string) => boolean;
  removeSlaveAssignment: (slaveId: string) => boolean;
  balance: number;
}

// Implémentation complète du hook
export const useSlaveManagement = (): SlaveManagementHook => {
  const [slaves, setSlaves] = useState<Slave[]>([]);
  const [slaveAssignments, setSlaveAssignments] = useState<SlaveAssignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(10000);
  const slavePrice = 1000;

  useEffect(() => {
    // Charger les esclaves depuis une API ou un stockage local
    // Pour l'exemple, nous utilisons des données simulées
    setLoading(true);
    
    // Simulation d'un chargement asynchrone
    const timer = setTimeout(() => {
      const initialSlaves: Slave[] = [
        {
          id: '1',
          name: 'Marcus',
          age: 25,
          gender: 'male',
          skills: ['farming', 'construction'],
          price: 800,
          health: 90,
          loyalty: 80,
          origin: 'Gaule',
          status: 'idle'
        },
        {
          id: '2',
          name: 'Livia',
          age: 22,
          gender: 'female',
          skills: ['cooking', 'weaving'],
          price: 750,
          health: 85,
          loyalty: 75,
          origin: 'Hispanie',
          status: 'idle'
        }
      ];
      
      setSlaves(initialSlaves);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const purchaseSlave = useCallback((slave: Slave, amount: number): boolean => {
    if (balance < amount) return false;
    
    const newSlave = {
      ...slave,
      id: uuidv4(),
      purchaseDate: new Date(),
      status: 'idle' as const
    };
    
    setSlaves(prev => [...prev, newSlave]);
    setBalance(prev => prev - amount);
    return true;
  }, [balance]);

  const purchaseSlaves = useCallback((count: number, type: string): boolean => {
    const totalCost = count * slavePrice;
    if (balance < totalCost) return false;
    
    const newSlaves: Slave[] = Array.from({ length: count }).map(() => ({
      id: uuidv4(),
      name: `Esclave ${Math.floor(Math.random() * 1000)}`,
      age: 20 + Math.floor(Math.random() * 20),
      gender: Math.random() > 0.5 ? 'male' : 'female',
      skills: [type],
      price: slavePrice,
      health: 70 + Math.floor(Math.random() * 30),
      loyalty: 60 + Math.floor(Math.random() * 40),
      origin: 'Marché aux esclaves',
      status: 'idle',
      purchaseDate: new Date()
    }));
    
    setSlaves(prev => [...prev, ...newSlaves]);
    setBalance(prev => prev - totalCost);
    return true;
  }, [balance, slavePrice]);

  const sellSlave = useCallback((slaveId: string): number => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) return 0;
    
    // Désaffecter l'esclave avant de le vendre
    removeSlaveAssignment(slaveId);
    
    // Prix de vente (généralement inférieur au prix d'achat)
    const salePrice = Math.floor(slave.price * 0.7);
    
    setSlaves(prev => prev.filter(s => s.id !== slaveId));
    setBalance(prev => prev + salePrice);
    
    return salePrice;
  }, [slaves]);

  const sellSlaves = useCallback((slaveIds: string[]): number => {
    let totalSalePrice = 0;
    
    slaveIds.forEach(id => {
      totalSalePrice += sellSlave(id);
    });
    
    return totalSalePrice;
  }, [sellSlave]);

  const assignSlave = useCallback((slaveId: string, assignmentId: string): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave || slave.status !== 'idle') return false;
    
    // Mettre à jour le statut de l'esclave
    setSlaves(prev => prev.map(s => 
      s.id === slaveId ? { ...s, status: 'working', assigned: true, assignedTo: assignmentId } : s
    ));
    
    // Créer une nouvelle affectation
    const newAssignment: SlaveAssignment = {
      id: uuidv4(),
      slaveId,
      propertyId: assignmentId,
      role: 'worker',
      startDate: new Date(),
      efficiency: 0.8 + (Math.random() * 0.4), // 0.8-1.2 efficacité
      income: 10 + Math.floor(Math.random() * 20) // 10-30 revenus
    };
    
    setSlaveAssignments(prev => [...prev, newAssignment]);
    return true;
  }, [slaves]);

  const assignSlavesToProperty = useCallback((slaveIds: string[], propertyId: string): boolean => {
    let allSuccess = true;
    
    slaveIds.forEach(id => {
      const success = assignSlave(id, propertyId);
      if (!success) allSuccess = false;
    });
    
    return allSuccess;
  }, [assignSlave]);

  const removeSlaveAssignment = useCallback((slaveId: string): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave || !slave.assigned) return false;
    
    // Mettre à jour le statut de l'esclave
    setSlaves(prev => prev.map(s => 
      s.id === slaveId ? { ...s, status: 'idle', assigned: false, assignedTo: undefined } : s
    ));
    
    // Supprimer l'affectation
    setSlaveAssignments(prev => prev.filter(a => a.slaveId !== slaveId));
    return true;
  }, [slaves]);

  const trainSlave = useCallback((slaveId: string, skill: string): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave || slave.status === 'training') return false;
    
    // Coût de la formation
    const trainingCost = 200;
    if (balance < trainingCost) return false;
    
    // Mettre à jour le statut de l'esclave
    setSlaves(prev => prev.map(s => 
      s.id === slaveId ? { 
        ...s, 
        status: 'training',
        skills: s.skills.includes(skill) ? s.skills : [...s.skills, skill]
      } : s
    ));
    
    setBalance(prev => prev - trainingCost);
    
    // Après un délai, remettre l'esclave à son statut précédent
    setTimeout(() => {
      setSlaves(prev => prev.map(s => 
        s.id === slaveId && s.status === 'training' ? { ...s, status: 'idle' } : s
      ));
    }, 5000); // Simulation de 5 secondes pour la formation
    
    return true;
  }, [slaves, balance]);

  // Données dérivées
  const totalSlaves = slaves.length;
  const assignedSlaves = slaves.filter(s => s.assigned);

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
