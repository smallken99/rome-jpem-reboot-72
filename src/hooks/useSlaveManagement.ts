
import { useState, useCallback } from 'react';
import { Slave, SlaveAssignment, adaptSlaveAssignment, createSlaveAssignment } from '@/components/proprietes/property-management/slaves/SlaveAssignmentAdapter';
import { v4 as uuidv4 } from 'uuid';

export const useSlaveManagement = () => {
  const [slaves, setSlaves] = useState<Slave[]>([]);
  const [assignments, setAssignments] = useState<SlaveAssignment[]>([]);
  const [totalSlaves, setTotalSlaves] = useState(0);
  const [slavePrice, setSlavePrice] = useState(2000); // Prix moyen d'un esclave
  const [balance, setBalance] = useState(0);

  // Ajouter un nouvel esclave
  const addSlave = useCallback((slave: Omit<Slave, 'id'>) => {
    const id = uuidv4();
    const newSlave: Slave = { ...slave, id };
    setSlaves(prev => [...prev, newSlave]);
    setTotalSlaves(prev => prev + 1);
    return id;
  }, []);

  // Supprimer un esclave
  const removeSlave = useCallback((slaveId: string) => {
    const slaveExists = slaves.some(s => s.id === slaveId);
    if (!slaveExists) return false;

    setSlaves(prev => prev.filter(s => s.id !== slaveId));
    setAssignments(prev => prev.filter(a => a.slaveId !== slaveId));
    setTotalSlaves(prev => prev - 1);
    return true;
  }, [slaves]);

  // Mettre à jour un esclave
  const updateSlave = useCallback((slaveId: string, updates: Partial<Slave>) => {
    const slaveExists = slaves.some(s => s.id === slaveId);
    if (!slaveExists) return false;

    setSlaves(prev => prev.map(s => s.id === slaveId ? { ...s, ...updates } : s));
    return true;
  }, [slaves]);

  // Acheter des esclaves
  const purchaseSlaves = useCallback((count: number, type: string = 'common') => {
    if (balance < slavePrice * count) return false;
    
    const priceMultiplier = type === 'skilled' ? 1.5 : type === 'specialized' ? 2.5 : 1;
    const totalCost = slavePrice * count * priceMultiplier;
    
    // Créer de nouveaux esclaves
    const newSlaves: Slave[] = Array.from({ length: count }, (_, i) => ({
      id: uuidv4(),
      name: `Esclave ${totalSlaves + i + 1}`,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      age: Math.floor(Math.random() * 30) + 15,
      health: Math.floor(Math.random() * 3) + 7, // 7-10
      skill: type === 'skilled' ? Math.floor(Math.random() * 3) + 7 : Math.floor(Math.random() * 5) + 3, // 3-8 ou 7-10
      origin: ['Gaule', 'Germanie', 'Thrace', 'Hispanie', 'Grèce'][Math.floor(Math.random() * 5)],
      price: slavePrice * priceMultiplier,
      assigned: false
    }));
    
    setSlaves(prev => [...prev, ...newSlaves]);
    setTotalSlaves(prev => prev + count);
    setBalance(prev => prev - totalCost);
    
    return true;
  }, [balance, slavePrice, totalSlaves]);

  // Vendre des esclaves
  const sellSlaves = useCallback((slaveIds: string[]) => {
    const slavesToSell = slaves.filter(s => slaveIds.includes(s.id));
    if (slavesToSell.length === 0) return 0;
    
    const totalValue = slavesToSell.reduce((sum, slave) => sum + (slave.price * 0.7), 0);
    
    setSlaves(prev => prev.filter(s => !slaveIds.includes(s.id)));
    setAssignments(prev => prev.filter(a => !slaveIds.includes(a.slaveId)));
    setTotalSlaves(prev => prev - slavesToSell.length);
    setBalance(prev => prev + totalValue);
    
    return totalValue;
  }, [slaves]);

  // Assigner un esclave à une propriété
  const assignSlaveToBuilding = useCallback((slaveId: string, buildingId: string, role: string = 'worker') => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) return false;
    
    const newAssignment = createSlaveAssignment(slaveId, buildingId, role);
    setAssignments(prev => [...prev, newAssignment]);
    
    setSlaves(prev => prev.map(s => 
      s.id === slaveId ? { ...s, assigned: true, assignedTo: buildingId } : s
    ));
    
    return true;
  }, [slaves]);

  // Récupérer les assignations pour un bâtiment
  const getAssignmentsByBuilding = useCallback((buildingId: string) => {
    return assignments.filter(a => a.buildingId === buildingId);
  }, [assignments]);

  // Récupérer les esclaves assignés à un bâtiment
  const getSlavesByBuilding = useCallback((buildingId: string) => {
    const buildingAssignments = assignments.filter(a => a.buildingId === buildingId);
    const slaveIds = buildingAssignments.map(a => a.slaveId);
    return slaves.filter(s => slaveIds.includes(s.id));
  }, [assignments, slaves]);

  // Supprimer une assignation
  const removeSlaveAssignment = useCallback((slaveId: string, buildingId: string) => {
    const assignmentExists = assignments.some(a => a.slaveId === slaveId && a.buildingId === buildingId);
    if (!assignmentExists) return false;
    
    setAssignments(prev => prev.filter(a => !(a.slaveId === slaveId && a.buildingId === buildingId)));
    
    setSlaves(prev => prev.map(s => 
      s.id === slaveId ? { ...s, assigned: false, assignedTo: undefined } : s
    ));
    
    return true;
  }, [assignments]);

  // Assigner plusieurs esclaves à une propriété
  const assignSlavesToProperty = useCallback((slaveIds: string[], buildingId: string, role: string = 'worker') => {
    let success = true;
    
    slaveIds.forEach(slaveId => {
      const result = assignSlaveToBuilding(slaveId, buildingId, role);
      if (!result) success = false;
    });
    
    return success;
  }, [assignSlaveToBuilding]);

  // Statistiques sur les esclaves
  const getSlaveStats = useCallback(() => {
    const total = slaves.length;
    const assigned = slaves.filter(s => s.assigned).length;
    const unassigned = total - assigned;
    const skilled = slaves.filter(s => s.skill >= 7).length;
    const maleCount = slaves.filter(s => s.gender === 'male').length;
    const femaleCount = slaves.filter(s => s.gender === 'female').length;
    
    return {
      total,
      assigned,
      unassigned,
      skilled,
      maleCount,
      femaleCount,
      averagePrice: total > 0 ? slaves.reduce((sum, s) => sum + s.price, 0) / total : 0,
      averageSkill: total > 0 ? slaves.reduce((sum, s) => sum + s.skill, 0) / total : 0,
      averageHealth: total > 0 ? slaves.reduce((sum, s) => sum + s.health, 0) / total : 0
    };
  }, [slaves]);

  return {
    slaves,
    assignments,
    addSlave,
    removeSlave,
    updateSlave,
    assignSlaveToBuilding,
    getAssignmentsByBuilding,
    getSlavesByBuilding,
    removeSlaveAssignment,
    totalSlaves,
    slavePrice,
    assignedSlaves: slaves.filter(s => s.assigned),
    slaveAssignments: assignments,
    purchaseSlaves,
    sellSlaves,
    assignSlavesToProperty,
    removeSlaveAssignment,
    balance,
    setBalance,
    getSlaveStats
  };
};
