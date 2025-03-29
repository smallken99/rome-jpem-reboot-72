
import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Slave, SlaveAssignment as BaseSlaveAssignment } from '@/types/slave';
import { SlaveAssignment, createSlaveAssignment, adaptSlaveAssignment } from './SlaveAssignments';
import { useBalance } from '@/hooks/useBalance';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const baseSlavePrice = 1000;
const randomSlaveName = () => {
  const names = [
    'Quintus', 'Servius', 'Titus', 'Gaius', 'Marcus', 'Decimus', 'Lucius',
    'Aelia', 'Claudia', 'Livia', 'Octavia', 'Antonia', 'Julia', 'Valeria'
  ];
  const index = Math.floor(Math.random() * names.length);
  return names[index];
};

// Génère un esclave aléatoire
const generateRandomSlave = (id: string): Slave => {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const age = Math.floor(Math.random() * 30) + 15;
  const skillLevels = ['débutant', 'compétent', 'expérimenté', 'expert'];
  const skills = ['travail manuel', 'agriculture', 'domestique'];
  
  if (Math.random() > 0.7) {
    skills.push('artisanat');
  }
  
  if (Math.random() > 0.8) {
    skills.push('lettré');
  }
  
  const level = Math.floor(Math.random() * 3) + 1;
  const origins = ['Gaule', 'Germanie', 'Hispanie', 'Grèce', 'Afrique', 'Asie'];
  
  return {
    id,
    name: randomSlaveName(),
    gender,
    age,
    skills,
    level,
    price: baseSlavePrice + (level * 200) + (Math.random() * 300),
    health: 80 + Math.floor(Math.random() * 20),
    origin: origins[Math.floor(Math.random() * origins.length)],
    productivity: 80 + Math.floor(Math.random() * 20),
    assigned: false
  };
};

export const useSlaveManagement = () => {
  const { balance, addBalance, subtractBalance } = useBalance();
  const [slaves, setSlaves] = useLocalStorage<Slave[]>('slaves', []);
  const [assignments, setAssignments] = useLocalStorage<SlaveAssignment[]>('slaveAssignments', []);
  const [loading, setLoading] = useState(false);
  
  // Calcule le nombre total d'esclaves
  const totalSlaves = slaves.length;
  
  // Prix actuel des esclaves sur le marché
  const slavePrice = baseSlavePrice;
  
  // Nombre d'esclaves assignés à des propriétés
  const assignedSlaves = assignments.reduce((sum, assignment) => sum + assignment.count, 0);
  
  // Acheter un certain nombre d'esclaves
  const purchaseSlaves = useCallback((amount: number) => {
    const totalCost = amount * slavePrice;
    
    if (totalCost > balance) {
      toast.error("Vous n'avez pas assez d'argent pour cet achat");
      return false;
    }
    
    // Créer les nouveaux esclaves
    const newSlaves: Slave[] = [];
    for (let i = 0; i < amount; i++) {
      newSlaves.push(generateRandomSlave(uuidv4()));
    }
    
    // Mettre à jour le state
    subtractBalance(totalCost);
    setSlaves(prev => [...prev, ...newSlaves]);
    toast.success(`${amount} esclave${amount > 1 ? 's' : ''} acheté${amount > 1 ? 's' : ''} pour ${totalCost} as`);
    
    return true;
  }, [balance, slavePrice, subtractBalance, setSlaves]);
  
  // Vendre un certain nombre d'esclaves
  const sellSlaves = useCallback((amount: number) => {
    const availableSlaves = totalSlaves - assignedSlaves;
    
    if (amount > availableSlaves) {
      toast.error(`Vous ne pouvez vendre que ${availableSlaves} esclaves non assignés`);
      return false;
    }
    
    // Calculer le prix de vente (légèrement inférieur au prix d'achat)
    const saleValue = amount * (slavePrice * 0.8);
    
    // Trier les esclaves non assignés
    const unassignedSlaves = slaves.filter(slave => !slave.buildingId);
    
    // Mettre à jour le state
    setSlaves(prev => {
      const slavesToKeep = [...prev];
      for (let i = 0; i < amount; i++) {
        const index = slavesToKeep.findIndex(s => !s.buildingId);
        if (index !== -1) {
          slavesToKeep.splice(index, 1);
        }
      }
      return slavesToKeep;
    });
    
    addBalance(saleValue);
    toast.success(`${amount} esclave${amount > 1 ? 's' : ''} vendu${amount > 1 ? 's' : ''} pour ${saleValue} as`);
    
    return true;
  }, [totalSlaves, assignedSlaves, slaves, slavePrice, addBalance, setSlaves]);
  
  // Assigner des esclaves à une propriété
  const assignSlavesToProperty = useCallback((buildingId: string, propertyName: string, count: number) => {
    const availableSlaves = totalSlaves - assignedSlaves;
    
    if (count > availableSlaves) {
      toast.error(`Vous n'avez que ${availableSlaves} esclaves disponibles`);
      return false;
    }
    
    // Créer une nouvelle assignation si elle n'existe pas, sinon mettre à jour l'existante
    const existingAssignment = assignments.find(a => a.buildingId === buildingId);
    
    if (existingAssignment) {
      // Mettre à jour l'assignation existante
      setAssignments(prev => 
        prev.map(a => 
          a.buildingId === buildingId 
            ? { ...a, count: a.count + count }
            : a
        )
      );
    } else {
      // Créer une nouvelle assignation
      const propertyId = `property-${uuidv4()}`; // Générer un ID temporaire si nécessaire
      const newAssignment = createSlaveAssignment(
        `slave-group-${uuidv4()}`, 
        buildingId, 
        propertyId, 
        propertyName
      );
      
      newAssignment.count = count;
      
      setAssignments(prev => [...prev, newAssignment]);
    }
    
    // Mettre à jour les esclaves non assignés
    let remainingToAssign = count;
    setSlaves(prev => {
      return prev.map(slave => {
        if (!slave.buildingId && !slave.assigned && remainingToAssign > 0) {
          remainingToAssign--;
          return { ...slave, buildingId, assignment: "Travail", assigned: true };
        }
        return slave;
      });
    });
    
    toast.success(`${count} esclave${count > 1 ? 's' : ''} assigné${count > 1 ? 's' : ''} à la propriété`);
    return true;
  }, [totalSlaves, assignedSlaves, assignments, setAssignments, setSlaves]);
  
  // Retirer des esclaves d'une propriété
  const removeSlaveAssignment = useCallback((buildingId: string, count: number = 0) => {
    // Trouver l'assignation pour ce bâtiment
    const assignment = assignments.find(a => a.buildingId === buildingId);
    
    if (!assignment) {
      toast.error("Aucun esclave n'est assigné à cette propriété");
      return false;
    }
    
    const removeCount = count || assignment.count;
    
    if (removeCount > assignment.count) {
      toast.error(`Il n'y a que ${assignment.count} esclaves assignés à cette propriété`);
      return false;
    }
    
    // Mettre à jour l'assignation
    setAssignments(prev => {
      const updated = prev.map(a => {
        if (a.buildingId === buildingId) {
          return { ...a, count: a.count - removeCount };
        }
        return a;
      });
      
      // Supprimer l'assignation si le count est à 0
      return updated.filter(a => a.count > 0);
    });
    
    // Libérer les esclaves
    let remainingToFree = removeCount;
    setSlaves(prev => {
      return prev.map(slave => {
        if (slave.buildingId === buildingId && remainingToFree > 0) {
          remainingToFree--;
          return { ...slave, buildingId: undefined, assignment: undefined, assigned: false };
        }
        return slave;
      });
    });
    
    toast.success(`${removeCount} esclave${removeCount > 1 ? 's' : ''} retiré${removeCount > 1 ? 's' : ''} de la propriété`);
    return true;
  }, [assignments, setAssignments, setSlaves]);
  
  return {
    slaves,
    loading,
    totalSlaves,
    slavePrice,
    assignedSlaves,
    slaveAssignments: assignments,
    purchaseSlaves,
    sellSlaves,
    assignSlavesToProperty,
    removeSlaveAssignment,
    balance
  };
};
