
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

// Define types
interface Slave {
  id: string;
  name: string;
  age: number;
  price: number;
  skills: string[];
  health: number;
  loyalty: number;
  assignedTo: string | null;
}

export const useSlaveManagement = () => {
  const [slaves, setSlaves] = useState<Slave[]>([]);
  const [loading, setLoading] = useState(false);

  // Purchase a new slave
  const purchaseSlave = useCallback((slave: Slave, amount: number): boolean => {
    // Check if we have enough money
    if (amount < slave.price) {
      toast.error("Fonds insuffisants pour acheter cet esclave");
      return false;
    }

    // Add the slave to our collection
    setSlaves(prev => [...prev, slave]);
    toast.success(`Esclave ${slave.name} acheté avec succès`);
    return true;
  }, []);

  // Sell a slave
  const sellSlave = useCallback((slaveId: string): number => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) {
      toast.error("Esclave introuvable");
      return 0;
    }

    // Calculate sell price (lower than purchase price)
    const sellPrice = Math.floor(slave.price * 0.75);

    // Remove from collection
    setSlaves(prev => prev.filter(s => s.id !== slaveId));
    toast.success(`Esclave ${slave.name} vendu pour ${sellPrice} as`);

    return sellPrice;
  }, [slaves]);

  // Assign a slave to a property or task
  const assignSlave = useCallback((slaveId: string, assignmentId: string | null): boolean => {
    const slaveExists = slaves.some(s => s.id === slaveId);
    
    if (!slaveExists) {
      toast.error("Esclave introuvable");
      return false;
    }

    setSlaves(prev => 
      prev.map(slave => 
        slave.id === slaveId 
          ? { ...slave, assignedTo: assignmentId } 
          : slave
      )
    );

    if (assignmentId) {
      toast.success("Esclave assigné avec succès");
    } else {
      toast.success("Esclave retiré de son assignation");
    }
    
    return true;
  }, [slaves]);

  // Train a slave to improve skills
  const trainSlave = useCallback((slaveId: string, skill: string): boolean => {
    const slaveExists = slaves.some(s => s.id === slaveId);
    
    if (!slaveExists) {
      toast.error("Esclave introuvable");
      return false;
    }

    // Training logic
    setSlaves(prev => 
      prev.map(slave => {
        if (slave.id === slaveId) {
          // Add skill if not present
          const updatedSkills = slave.skills.includes(skill) 
            ? slave.skills 
            : [...slave.skills, skill];
            
          return { 
            ...slave, 
            skills: updatedSkills
          };
        }
        return slave;
      })
    );
    
    toast.success("Entraînement commencé");
    return true;
  }, [slaves]);

  return {
    slaves,
    loading,
    purchaseSlave,
    sellSlave,
    assignSlave,
    trainSlave
  };
};
