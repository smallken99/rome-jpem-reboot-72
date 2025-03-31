
import { useState } from 'react';
import { Client } from '../../types/clients';

const defaultFormData: Partial<Client> = {
  name: '',
  type: 'standard',
  subType: '',
  location: 'Forum',
  loyalty: 'moyenne',
  influences: {
    political: 0,
    popular: 0,
    religious: 0
  },
  competences: {},
  specialAbilities: [],
  backstory: '',
  activeStatus: 'active',
  relationshipLevel: 1,
  lastInteraction: new Date().toISOString(),
  age: 30  // Make age a number by default
};

export const useAdvancedClientForm = (client: Client | null) => {
  const [formData, setFormData] = useState<Partial<Client>>(
    client ? { ...client } : defaultFormData
  );
  
  const [newAbility, setNewAbility] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleInfluenceChange = (type: keyof Client['influences'], value: number) => {
    if (!formData.influences) {
      setFormData(prev => ({
        ...prev,
        influences: {
          political: 0,
          popular: 0,
          religious: 0,
          [type]: value
        }
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      influences: {
        ...(prev.influences || { political: 0, popular: 0, religious: 0 }),
        [type]: value
      }
    }));
  };
  
  const handleAddAbility = () => {
    if (newAbility.trim() && !formData.specialAbilities?.includes(newAbility.trim())) {
      setFormData(prev => ({
        ...prev,
        specialAbilities: [
          ...(prev.specialAbilities || []),
          newAbility.trim()
        ]
      }));
      setNewAbility('');
    }
  };
  
  const handleRemoveAbility = (ability: string) => {
    setFormData(prev => ({
      ...prev,
      specialAbilities: prev.specialAbilities?.filter(a => a !== ability) || []
    }));
  };
  
  const handleRelationshipChange = (level: number) => {
    setFormData(prev => ({
      ...prev,
      relationshipLevel: level
    }));
  };
  
  return {
    formData,
    newAbility,
    setNewAbility,
    handleChange,
    handleSelectChange,
    handleInfluenceChange,
    handleAddAbility,
    handleRemoveAbility,
    handleRelationshipChange
  };
};
