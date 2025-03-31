
import { useState } from 'react';
import { Client, ClientInfluences } from '../../types/clients';

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
  competences: [],
  specialAbility: '',
  backstory: '',
  activeStatus: 'active',
  relationshipLevel: 1,
  lastInteraction: new Date().toISOString(),
  age: 30
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
  
  const handleInfluenceChange = (type: 'political' | 'popular' | 'religious', value: number) => {
    const influences = formData.influences || { political: 0, popular: 0, religious: 0 };
    
    setFormData(prev => ({
      ...prev,
      influences: {
        ...influences,
        [type]: value
      }
    }));
  };
  
  const handleAddAbility = () => {
    if (newAbility.trim()) {
      setFormData(prev => ({
        ...prev,
        specialAbility: newAbility.trim()
      }));
      setNewAbility('');
    }
  };
  
  const handleRemoveAbility = () => {
    setFormData(prev => ({
      ...prev,
      specialAbility: ''
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
