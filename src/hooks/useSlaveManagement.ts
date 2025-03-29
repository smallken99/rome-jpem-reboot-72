import { useState, useEffect } from 'react';
import { Slave, SlaveAssignment } from '@/components/proprietes/types/slave';
import { v4 as uuidv4 } from 'uuid';

export interface SlaveManagementHook {
  slaves: Slave[];
  loading: boolean;
  totalSlaves?: number;
  slavePrice?: number;
  assignedSlaves?: Slave[];
  slaveAssignments?: SlaveAssignment[];
  balance?: number;
  purchaseSlave: (slave: Slave, amount: number) => boolean;
  sellSlave: (slaveId: string) => number;
  assignSlave: (slaveId: string, assignmentId: string) => boolean;
  trainSlave: (slaveId: string, skill: string) => boolean;
  purchaseSlaves?: (slaves: Slave[], amount: number) => boolean;
  sellSlaves?: (slaveIds: string[]) => number;
  assignSlavesToProperty?: (slaveIds: string[], propertyId: string) => boolean;
  removeSlaveAssignment?: (slaveId: string) => boolean;
}

export const useSlaveManagement = (): SlaveManagementHook => {
  const [slaves, setSlaves] = useState<Slave[]>([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(50000); // Starting balance
  const [slavePrice, setSlavePrice] = useState(2000); // Average slave price
  const [slaveAssignments, setSlaveAssignments] = useState<SlaveAssignment[]>([
    {
      id: 'assignment-1',
      name: 'Domestic Service',
      type: 'domestic',
      description: 'Household duties including cleaning, cooking, and serving',
      requiredSkills: ['cleaning', 'cooking', 'serving'],
      benefits: {
        prestige: 5
      }
    },
    {
      id: 'assignment-2',
      name: 'Field Work',
      type: 'agriculture',
      description: 'Working in fields and farms',
      requiredSkills: ['farming', 'strength'],
      benefits: {
        income: 100
      }
    },
    {
      id: 'assignment-3',
      name: 'Craft Workshop',
      type: 'craft',
      description: 'Creating goods in workshops',
      requiredSkills: ['crafting', 'detail-oriented'],
      benefits: {
        income: 150,
        productivity: 10
      }
    },
    {
      id: 'assignment-4',
      name: 'Education',
      type: 'education',
      description: 'Teaching and tutoring',
      requiredSkills: ['literacy', 'teaching', 'languages'],
      benefits: {
        prestige: 15
      }
    }
  ]);

  // Load initial slaves
  useEffect(() => {
    // Simulate loading from an API
    const loadSlaves = async () => {
      // Mock data
      const mockSlaves: Slave[] = [
        {
          id: uuidv4(),
          name: 'Titus',
          age: 25,
          origin: 'Gaul',
          skills: ['strength', 'farming'],
          health: 90,
          price: 1800,
          loyalty: 60,
          assignment: null
        },
        {
          id: uuidv4(),
          name: 'Helena',
          age: 22,
          origin: 'Greece',
          skills: ['literacy', 'teaching', 'languages'],
          health: 85,
          price: 3000,
          loyalty: 70,
          assignment: null,
          specialization: 'education'
        },
        {
          id: uuidv4(),
          name: 'Marcus',
          age: 30,
          origin: 'Hispania',
          skills: ['crafting', 'detail-oriented', 'metalwork'],
          health: 80,
          price: 2500,
          loyalty: 65,
          assignment: 'assignment-3',
          specialization: 'craft'
        }
      ];

      setSlaves(mockSlaves);
      setLoading(false);
    };

    loadSlaves();
  }, []);

  // Calculate derived values
  const totalSlaves = slaves.length;
  const assignedSlaves = slaves.filter(slave => slave.assignment !== null);

  // Purchase a slave
  const purchaseSlave = (slave: Slave, amount: number): boolean => {
    if (balance < amount) {
      return false; // Not enough money
    }

    const newSlave = {
      ...slave,
      id: uuidv4(), // Generate a new ID
      assignment: null // Reset assignment
    };

    setSlaves(prev => [...prev, newSlave]);
    setBalance(prev => prev - amount);
    return true;
  };

  // Purchase multiple slaves
  const purchaseSlaves = (newSlaves: Slave[], amount: number): boolean => {
    if (balance < amount) {
      return false; // Not enough money
    }

    const slavesWithIds = newSlaves.map(slave => ({
      ...slave,
      id: uuidv4(),
      assignment: null
    }));

    setSlaves(prev => [...prev, ...slavesWithIds]);
    setBalance(prev => prev - amount);
    return true;
  };

  // Sell a slave
  const sellSlave = (slaveId: string): number => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) return 0;

    const salePrice = Math.round(slave.price * 0.8); // 80% of original price
    
    setSlaves(prev => prev.filter(s => s.id !== slaveId));
    setBalance(prev => prev + salePrice);
    
    return salePrice;
  };

  // Sell multiple slaves
  const sellSlaves = (slaveIds: string[]): number => {
    let totalSalePrice = 0;
    
    slaveIds.forEach(id => {
      const slave = slaves.find(s => s.id === id);
      if (slave) {
        totalSalePrice += Math.round(slave.price * 0.8);
      }
    });
    
    if (totalSalePrice > 0) {
      setSlaves(prev => prev.filter(s => !slaveIds.includes(s.id)));
      setBalance(prev => prev + totalSalePrice);
    }
    
    return totalSalePrice;
  };

  // Assign a slave to a task
  const assignSlave = (slaveId: string, assignmentId: string): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    const assignment = slaveAssignments.find(a => a.id === assignmentId);
    
    if (!slave || !assignment) return false;
    
    // Check if slave has required skills
    const hasRequiredSkills = assignment.requiredSkills.some(skill => 
      slave.skills.includes(skill)
    );
    
    if (!hasRequiredSkills) return false;
    
    setSlaves(prev => prev.map(s => 
      s.id === slaveId ? { ...s, assignment: assignmentId } : s
    ));
    
    return true;
  };

  // Assign multiple slaves to a property
  const assignSlavesToProperty = (slaveIds: string[], propertyId: string): boolean => {
    // Create a property-specific assignment
    const propertyAssignment: SlaveAssignment = {
      id: `property-${propertyId}`,
      name: `Property Work (${propertyId})`,
      type: 'property',
      description: 'Working at a specific property',
      requiredSkills: [],
      benefits: {
        productivity: 5
      },
      propertyId
    };
    
    // Add the assignment if it doesn't exist
    if (!slaveAssignments.find(a => a.id === propertyAssignment.id)) {
      setSlaveAssignments(prev => [...prev, propertyAssignment]);
    }
    
    // Assign all slaves to this property
    let allAssigned = true;
    slaveIds.forEach(id => {
      const success = assignSlave(id, propertyAssignment.id);
      if (!success) allAssigned = false;
    });
    
    return allAssigned;
  };

  // Remove a slave's assignment
  const removeSlaveAssignment = (slaveId: string): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) return false;
    
    setSlaves(prev => prev.map(s => 
      s.id === slaveId ? { ...s, assignment: null } : s
    ));
    
    return true;
  };

  // Train a slave in a new skill
  const trainSlave = (slaveId: string, skill: string): boolean => {
    const slave = slaves.find(s => s.id === slaveId);
    if (!slave) return false;
    
    // Check if slave already has this skill
    if (slave.skills.includes(skill)) return false;
    
    // Training costs money
    const trainingCost = 500;
    if (balance < trainingCost) return false;
    
    setSlaves(prev => prev.map(s => 
      s.id === slaveId ? { 
        ...s, 
        skills: [...s.skills, skill],
        loyalty: Math.min(100, s.loyalty + 5) // Training increases loyalty
      } : s
    ));
    
    setBalance(prev => prev - trainingCost);
    
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
    assignSlave,
    trainSlave,
    purchaseSlaves,
    sellSlaves,
    assignSlavesToProperty,
    removeSlaveAssignment
  };
};
