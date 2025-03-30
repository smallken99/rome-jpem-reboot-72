
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export interface Slave {
  id: string;
  name: string;
  health: number;
  skills: string[];
  origin: string;
  price: number;
  assigned?: boolean;
  buildingId?: string;
}

export interface SlaveAssignment {
  buildingId: string;
  count: number;
  efficiency: number;
  cost: number;
}

export const useSlaveManagement = () => {
  const [slaves, setSlaves] = useState<Slave[]>([]);
  const [assignments, setAssignments] = useState<SlaveAssignment[]>([]);

  // Ajouter un esclave
  const addSlave = useCallback((slave: Omit<Slave, "id">) => {
    const id = uuidv4();
    setSlaves(prev => [...prev, { ...slave, id }]);
    return id;
  }, []);

  // Supprimer un esclave
  const removeSlave = useCallback((slaveId: string) => {
    const slaveExists = slaves.some(s => s.id === slaveId);
    if (!slaveExists) return false;
    
    setSlaves(prev => prev.filter(slave => slave.id !== slaveId));
    return true;
  }, [slaves]);

  // Mettre à jour un esclave
  const updateSlave = useCallback((slaveId: string, updates: Partial<Slave>) => {
    const slaveExists = slaves.some(s => s.id === slaveId);
    if (!slaveExists) return false;
    
    setSlaves(prev => 
      prev.map(slave => 
        slave.id === slaveId ? { ...slave, ...updates } : slave
      )
    );
    return true;
  }, [slaves]);

  // Assigner des esclaves à un bâtiment
  const assignSlave = useCallback((slaveId: string, buildingId: string) => {
    setSlaves(prev => 
      prev.map(slave => 
        slave.id === slaveId 
          ? { ...slave, assigned: true, buildingId } 
          : slave
      )
    );
    
    // Mettre à jour l'assignation
    updateAssignment(buildingId);
  }, []);

  // Retirer l'assignation d'un esclave
  const unassignSlave = useCallback((slaveId: string) => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave || !slave.assigned) return false;
    
    const buildingId = slave.buildingId;
    
    setSlaves(prev => 
      prev.map(s => 
        s.id === slaveId 
          ? { ...s, assigned: false, buildingId: undefined } 
          : s
      )
    );
    
    if (buildingId) {
      updateAssignment(buildingId);
    }
    
    return true;
  }, [slaves]);

  // Mettre à jour l'assignation pour un bâtiment
  const updateAssignment = useCallback((buildingId: string) => {
    const assignedSlaves = slaves.filter(s => s.buildingId === buildingId);
    const count = assignedSlaves.length;
    
    // Calculer l'efficacité basée sur le nombre d'esclaves
    const efficiency = Math.min(100, count * 10); // Exemple simpliste
    
    // Calculer le coût de maintenance des esclaves
    const cost = count * 100; // 100 as par esclave
    
    setAssignments(prev => {
      const existingIndex = prev.findIndex(a => a.buildingId === buildingId);
      
      if (existingIndex >= 0) {
        return [
          ...prev.slice(0, existingIndex),
          { buildingId, count, efficiency, cost },
          ...prev.slice(existingIndex + 1)
        ];
      } else {
        return [...prev, { buildingId, count, efficiency, cost }];
      }
    });
  }, [slaves]);

  // Récupérer l'assignation pour un bâtiment
  const getAssignmentsByBuilding = useCallback((buildingId: string) => {
    return slaves.filter(slave => slave.buildingId === buildingId);
  }, [slaves]);

  return {
    slaves,
    assignments,
    addSlave,
    removeSlave,
    updateSlave,
    assignSlave,
    unassignSlave,
    updateAssignment,
    getAssignmentsByBuilding
  };
};
