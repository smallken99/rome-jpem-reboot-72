
import { useState, useEffect, useCallback } from 'react';
import { Slave, SlaveAssignment } from '@/components/proprietes/types/slave';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export const useSlaveManagement = () => {
  const [slaves, setSlaves] = useState<Slave[]>([]);
  const [slaveAssignments, setSlaveAssignments] = useState<SlaveAssignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(10000);
  const slavePrice = 1000;

  useEffect(() => {
    // Charger les esclaves depuis le localStorage ou avec des données par défaut
    setLoading(true);
    
    try {
      const savedSlaves = localStorage.getItem('roman-slaves');
      const savedAssignments = localStorage.getItem('roman-slave-assignments');
      const savedBalance = localStorage.getItem('roman-balance');
      
      if (savedSlaves) {
        setSlaves(JSON.parse(savedSlaves));
      } else {
        // Données d'exemple
        setSlaves([
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
            status: 'idle',
            value: 800
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
            status: 'idle',
            value: 750
          }
        ]);
      }
      
      if (savedAssignments) {
        setSlaveAssignments(JSON.parse(savedAssignments));
      }
      
      if (savedBalance) {
        setBalance(parseInt(savedBalance, 10));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
    
    setLoading(false);
  }, []);

  // Sauvegarde des données dans le localStorage
  const saveData = useCallback(() => {
    try {
      localStorage.setItem('roman-slaves', JSON.stringify(slaves));
      localStorage.setItem('roman-slave-assignments', JSON.stringify(slaveAssignments));
      localStorage.setItem('roman-balance', balance.toString());
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }
  }, [slaves, slaveAssignments, balance]);

  // Effet pour sauvegarder les données lorsqu'elles changent
  useEffect(() => {
    saveData();
  }, [slaves, slaveAssignments, balance, saveData]);

  // Méthodes de base
  const addSlave = useCallback((slave: Omit<Slave, "id">): string => {
    const id = uuidv4();
    const newSlave: Slave = {
      ...slave,
      id,
      status: slave.status || 'idle'
    };
    
    setSlaves(prev => [...prev, newSlave]);
    return id;
  }, []);

  const removeSlave = useCallback((slaveId: string): boolean => {
    const slaveExists = slaves.some(s => s.id === slaveId);
    if (!slaveExists) return false;
    
    // Si l'esclave est assigné, supprimer l'assignation
    removeSlaveAssignment(slaveId);
    
    setSlaves(prev => prev.filter(slave => slave.id !== slaveId));
    return true;
  }, [slaves]);

  const updateSlave = useCallback((slaveId: string, updates: Partial<Slave>): boolean => {
    const slaveExists = slaves.some(s => s.id === slaveId);
    if (!slaveExists) return false;
    
    setSlaves(prev => 
      prev.map(slave => 
        slave.id === slaveId ? { ...slave, ...updates } : slave
      )
    );
    return true;
  }, [slaves]);

  // Méthodes d'assignation
  const assignSlave = useCallback((slaveId: string, buildingId: string): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) {
      toast.error("Esclave introuvable");
      return false;
    }
    
    if (slave.assigned) {
      toast.error("Cet esclave est déjà assigné");
      return false;
    }
    
    setSlaves(prev => 
      prev.map(s => 
        s.id === slaveId ? { ...s, assigned: true, buildingId, status: 'working' } : s
      )
    );
    
    return true;
  }, [slaves]);

  const unassignSlave = useCallback((slaveId: string): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave || !slave.assigned) return false;
    
    setSlaves(prev => 
      prev.map(s => 
        s.id === slaveId ? { ...s, assigned: false, buildingId: undefined, status: 'idle' } : s
      )
    );
    
    return true;
  }, [slaves]);

  const assignSlaveToBuilding = useCallback((
    slaveId: string, 
    buildingId: string, 
    propertyId: string, 
    propertyName: string,
    buildingName?: string
  ): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) {
      toast.error("Esclave introuvable");
      return false;
    }
    
    if (slave.assigned) {
      toast.error("Cet esclave est déjà assigné");
      return false;
    }
    
    // Mettre à jour l'esclave
    setSlaves(prev => 
      prev.map(s => 
        s.id === slaveId ? { 
          ...s, 
          assigned: true, 
          buildingId, 
          assignedTo: propertyName,
          status: 'working' 
        } : s
      )
    );
    
    // Créer une nouvelle assignation
    const newAssignment: SlaveAssignment = {
      id: uuidv4(),
      slaveId,
      propertyId,
      buildingId,
      role: "worker",
      startDate: new Date(),
      efficiency: 80 + Math.floor(Math.random() * 20),
      productivity: 80 + Math.floor(Math.random() * 20)
    };
    
    setSlaveAssignments(prev => [...prev, newAssignment]);
    
    toast.success(`${slave.name} assigné à ${buildingName || propertyName}`);
    return true;
  }, [slaves]);

  const assignSlavesToProperty = useCallback((slaveIds: string[], propertyId: string): boolean => {
    let success = true;
    
    slaveIds.forEach(slaveId => {
      const result = assignSlaveToBuilding(slaveId, propertyId, propertyId, "Propriété");
      if (!result) success = false;
    });
    
    return success;
  }, [assignSlaveToBuilding]);

  const removeSlaveAssignment = useCallback((slaveId: string): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) return false;
    
    // Mettre à jour l'esclave
    setSlaves(prev => 
      prev.map(s => 
        s.id === slaveId ? { 
          ...s, 
          assigned: false, 
          buildingId: undefined, 
          assignedTo: undefined,
          status: 'idle' 
        } : s
      )
    );
    
    // Supprimer l'assignation
    setSlaveAssignments(prev => prev.filter(assignment => assignment.slaveId !== slaveId));
    
    return true;
  }, [slaves]);

  // Méthodes de commerce
  const purchaseSlave = useCallback((newSlave: Omit<Slave, "id">, amount: number): boolean => {
    if (balance < amount) {
      toast.error("Fonds insuffisants");
      return false;
    }
    
    const id = addSlave(newSlave);
    setBalance(prev => prev - amount);
    
    return !!id;
  }, [addSlave, balance]);

  const purchaseSlaves = useCallback((count: number, type: string): boolean => {
    if (count <= 0) {
      toast.error("Le nombre d'esclaves doit être positif");
      return false;
    }
    
    const totalCost = count * slavePrice;
    
    if (balance < totalCost) {
      toast.error("Fonds insuffisants");
      return false;
    }
    
    for (let i = 0; i < count; i++) {
      const newSlave: Omit<Slave, "id"> = {
        name: `Esclave ${Math.floor(Math.random() * 1000)}`,
        age: 20 + Math.floor(Math.random() * 20),
        gender: Math.random() > 0.5 ? 'male' : 'female',
        skills: [type || 'labor'],
        price: slavePrice,
        health: 70 + Math.floor(Math.random() * 30),
        loyalty: 50 + Math.floor(Math.random() * 40),
        origin: 'Marché aux esclaves',
        status: 'idle',
        acquired: new Date(),
        value: slavePrice
      };
      
      addSlave(newSlave);
    }
    
    setBalance(prev => prev - totalCost);
    toast.success(`${count} esclaves achetés pour ${totalCost} as`);
    
    return true;
  }, [addSlave, balance, slavePrice]);

  const sellSlave = useCallback((slaveId: string): number => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) return 0;
    
    // Calculer le prix de vente (généralement 70-90% du prix d'achat)
    const sellValue = Math.floor((slave.value || slave.price) * 0.8);
    
    // Si l'esclave est assigné, annuler l'assignation
    if (slave.assigned) {
      removeSlaveAssignment(slaveId);
    }
    
    // Supprimer l'esclave
    setSlaves(prev => prev.filter(s => s.id !== slaveId));
    
    // Ajouter l'argent au solde
    setBalance(prev => prev + sellValue);
    
    toast.success(`${slave.name} vendu pour ${sellValue} as`);
    return sellValue;
  }, [slaves, removeSlaveAssignment]);

  const sellSlaves = useCallback((slaveIds: string[]): number => {
    let totalValue = 0;
    
    slaveIds.forEach(id => {
      const value = sellSlave(id);
      totalValue += value;
    });
    
    return totalValue;
  }, [sellSlave]);

  // Méthode d'entraînement
  const trainSlave = useCallback((slaveId: string, skill: string): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) return false;
    
    if (slave.status === 'training') {
      toast.error("Cet esclave est déjà en formation");
      return false;
    }
    
    const trainingCost = 200;
    if (balance < trainingCost) {
      toast.error("Fonds insuffisants pour la formation");
      return false;
    }
    
    // Vérifier si l'esclave a déjà cette compétence
    const hasSkill = slave.skills.includes(skill);
    
    // Mettre à jour l'esclave
    setSlaves(prev => 
      prev.map(s => 
        s.id === slaveId ? { 
          ...s, 
          status: 'training',
          skills: hasSkill ? s.skills : [...s.skills, skill] 
        } : s
      )
    );
    
    // Réduire le solde
    setBalance(prev => prev - trainingCost);
    
    // Créer une formation
    const training: SlaveTraining = {
      id: uuidv4(),
      slaveId,
      skill,
      progress: 0,
      startDate: new Date(),
      cost: trainingCost
    };
    
    // Simuler la fin de la formation après un certain temps
    setTimeout(() => {
      setSlaves(prev => 
        prev.map(s => 
          s.id === slaveId && s.status === 'training' ? { 
            ...s, 
            status: 'idle',
            health: Math.min(100, s.health + 5),
            loyalty: Math.min(100, s.loyalty + 10),
            value: (s.value || s.price) + 100 // Augmentation de la valeur
          } : s
        )
      );
      
      toast.success(`Formation terminée pour ${slave.name}`);
    }, 5000); // 5 secondes pour la simulation
    
    toast.success(`${slave.name} commence sa formation en ${skill}`);
    return true;
  }, [slaves, balance]);

  // Méthodes de requête
  const getAvailableSlaves = useCallback((): Slave[] => {
    return slaves.filter(slave => !slave.assigned);
  }, [slaves]);

  const getAssignedSlaves = useCallback((): Slave[] => {
    return slaves.filter(slave => slave.assigned);
  }, [slaves]);

  const getSlavesByBuilding = useCallback((buildingId: string): Slave[] => {
    return slaves.filter(slave => slave.buildingId === buildingId);
  }, [slaves]);

  const getAssignmentsByBuilding = useCallback((buildingId: string): SlaveAssignment[] => {
    return slaveAssignments.filter(assignment => assignment.buildingId === buildingId);
  }, [slaveAssignments]);

  // Variables dérivées
  const totalSlaves = slaves.length;
  const availableSlaves = getAvailableSlaves();
  const assignedSlaves = getAssignedSlaves();

  return {
    // État
    slaves,
    loading,
    totalSlaves,
    slavePrice,
    assignedSlaves,
    availableSlaves,
    slaveAssignments,
    balance,
    
    // Méthodes de base
    addSlave,
    removeSlave,
    updateSlave,
    
    // Méthodes d'assignation
    assignSlave,
    unassignSlave,
    assignSlaveToBuilding,
    assignSlavesToProperty,
    removeSlaveAssignment,
    
    // Méthodes de commerce
    purchaseSlave,
    sellSlave,
    purchaseSlaves,
    sellSlaves,
    
    // Méthode d'entraînement
    trainSlave,
    
    // Méthodes de requête
    getAvailableSlaves,
    getAssignedSlaves,
    getSlavesByBuilding,
    getAssignmentsByBuilding
  };
};
