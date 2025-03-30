
import { useState, useCallback } from 'react';
import { Slave } from '@/types/slave';
import { 
  SlaveAssignment, 
  createSlaveAssignment, 
  adaptSlaveAssignment 
} from './SlaveAssignmentAdapter';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export const useSlaveManagement = () => {
  const [slaves, setSlaves] = useState<Slave[]>([
    {
      id: 'slave-1',
      name: 'Marcus',
      age: 30,
      health: 85,
      skill: 70,
      specialty: 'agriculture',
      price: 2000,
      origin: 'Gaul',
      status: 'healthy',
      gender: 'male'
    },
    {
      id: 'slave-2',
      name: 'Livia',
      age: 25,
      health: 90,
      skill: 75,
      specialty: 'domestic',
      price: 2500,
      origin: 'Greece',
      status: 'healthy',
      gender: 'female'
    }
  ]);
  
  const [assignments, setAssignments] = useState<SlaveAssignment[]>([]);

  const addSlave = useCallback((slave: Omit<Slave, 'id'>): string => {
    const newId = `slave-${uuidv4()}`;
    const newSlave: Slave = {
      ...slave,
      id: newId,
      assigned: false
    };
    
    setSlaves(prev => [...prev, newSlave]);
    toast.success(`Nouvel esclave ${slave.name} ajouté`);
    return newId;
  }, []);

  const removeSlave = useCallback((slaveId: string): boolean => {
    try {
      // Check if slave is assigned to a building
      const isAssigned = assignments.some(a => a.slaveId === slaveId);
      
      if (isAssigned) {
        // Remove assignments for this slave
        setAssignments(prev => prev.filter(a => a.slaveId !== slaveId));
      }
      
      // Remove the slave
      setSlaves(prev => prev.filter(s => s.id !== slaveId));
      toast.success("Esclave retiré avec succès");
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'esclave:", error);
      toast.error("Erreur lors de la suppression de l'esclave");
      return false;
    }
  }, [assignments]);

  const updateSlave = useCallback((slaveId: string, updates: Partial<Slave>): boolean => {
    try {
      setSlaves(prev => 
        prev.map(slave => 
          slave.id === slaveId ? { ...slave, ...updates } : slave
        )
      );
      return true;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'esclave:", error);
      return false;
    }
  }, []);

  const assignSlaveToBuilding = useCallback((
    slaveId: string, 
    buildingId: string, 
    propertyId: string, 
    propertyName: string,
    buildingName?: string
  ): boolean => {
    try {
      // Vérifier que l'esclave existe
      const slave = slaves.find(s => s.id === slaveId);
      if (!slave) {
        toast.error("Esclave introuvable");
        return false;
      }
      
      // Vérifier que l'esclave n'est pas déjà assigné
      const existingAssignment = assignments.find(a => a.slaveId === slaveId);
      if (existingAssignment) {
        toast.error("Cet esclave est déjà assigné à une propriété");
        return false;
      }
      
      // Créer l'assignation
      const newAssignment = createSlaveAssignment(
        slaveId, 
        buildingId, 
        propertyId, 
        propertyName,
        buildingName
      );
      
      setAssignments(prev => [...prev, newAssignment]);
      
      // Mettre à jour le statut de l'esclave
      updateSlave(slaveId, { 
        assigned: true,
        assignedTo: propertyName,
        buildingId
      });
      
      toast.success(`${slave.name} assigné à ${propertyName}`);
      return true;
    } catch (error) {
      console.error("Erreur lors de l'assignation de l'esclave:", error);
      toast.error("Erreur lors de l'assignation de l'esclave");
      return false;
    }
  }, [slaves, assignments, updateSlave]);

  const removeAssignment = useCallback((slaveId: string): boolean => {
    try {
      // Vérifier que l'assignation existe
      const assignment = assignments.find(a => a.slaveId === slaveId);
      if (!assignment) {
        toast.error("Assignation introuvable");
        return false;
      }
      
      // Supprimer l'assignation
      setAssignments(prev => prev.filter(a => a.slaveId !== slaveId));
      
      // Mettre à jour le statut de l'esclave
      updateSlave(slaveId, { 
        assigned: false,
        assignedTo: undefined,
        buildingId: undefined
      });
      
      const slave = slaves.find(s => s.id === slaveId);
      toast.success(`${slave?.name || 'Esclave'} retiré de l'assignation`);
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'assignation:", error);
      toast.error("Erreur lors de la suppression de l'assignation");
      return false;
    }
  }, [assignments, slaves, updateSlave]);

  const getAvailableSlaves = useCallback((): Slave[] => {
    return slaves.filter(slave => !slave.assigned);
  }, [slaves]);

  const getAssignedSlaves = useCallback((): Slave[] => {
    return slaves.filter(slave => slave.assigned);
  }, [slaves]);

  const getSlavesByBuilding = useCallback((buildingId: string): Slave[] => {
    const slaveIds = assignments
      .filter(a => a.buildingId === buildingId)
      .map(a => a.slaveId);
    
    return slaves.filter(slave => slaveIds.includes(slave.id));
  }, [slaves, assignments]);

  const getAssignmentsByBuilding = useCallback((buildingId: string): SlaveAssignment[] => {
    return assignments.filter(a => a.buildingId === buildingId);
  }, [assignments]);

  return {
    slaves,
    assignments,
    addSlave,
    removeSlave,
    updateSlave,
    assignSlaveToBuilding,
    removeAssignment,
    getAvailableSlaves,
    getAssignedSlaves,
    getSlavesByBuilding,
    getAssignmentsByBuilding
  };
};
