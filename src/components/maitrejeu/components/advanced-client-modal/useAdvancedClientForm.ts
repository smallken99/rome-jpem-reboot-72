
import { useState } from 'react';
import { Client } from '../../types/clients';
import { ClientInfluence, ClientType } from '@/components/clientele/ClientCard';

const defaultFormData: Partial<Client> = {
  name: '',
  type: 'artisan_commercant',
  subType: '',
  location: '',
  loyalty: 'moyenne',
  influences: {
    political: 0,
    popular: 0,
    religious: 0
  },
  competencePoints: 3,
  specialAbilities: [],
  backstory: '',
  activeStatus: 'active',
  relationshipLevel: 1,
  lastInteraction: new Date().toISOString()
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
  
  const handleInfluenceChange = (type: keyof ClientInfluence, value: number) => {
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
