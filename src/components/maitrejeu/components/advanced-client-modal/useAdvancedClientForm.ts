
import { useState, useEffect } from 'react';
import { ClientCreationData, Client } from '../../types/clients';

export const useAdvancedClientForm = (client: Client | null) => {
  const isEditMode = !!client;
  
  const [formData, setFormData] = useState<ClientCreationData>({
    name: '',
    type: 'artisan_commercant',
    subType: '',
    location: 'Forum',
    loyalty: 'moyenne',
    influences: {
      political: 1,
      popular: 1,
      religious: 1
    },
    competencePoints: 3,
    specialAbilities: [],
    backstory: '',
    activeStatus: 'active',
    relationshipLevel: 1
  });
  
  const [newAbility, setNewAbility] = useState('');
  
  useEffect(() => {
    // Initialize form with client data in edit mode
    if (client) {
      setFormData({
        name: client.name,
        type: client.type,
        subType: client.subType,
        location: client.location,
        loyalty: client.loyalty,
        influences: { ...client.influences },
        assignedToSenateurId: client.assignedToSenateurId,
        competencePoints: client.competencePoints || 3,
        specialAbilities: client.specialAbilities || [],
        backstory: client.backstory || '',
        activeStatus: client.activeStatus || 'active',
        relationshipLevel: client.relationshipLevel || 1,
        lastInteraction: client.lastInteraction
      });
    }
  }, [client]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleInfluenceChange = (type: keyof ClientCreationData['influences'], value: string) => {
    setFormData(prev => ({
      ...prev,
      influences: {
        ...prev.influences,
        [type]: parseInt(value) || 1
      }
    }));
  };
  
  const handleAddAbility = () => {
    if (newAbility.trim() && !formData.specialAbilities?.includes(newAbility.trim())) {
      setFormData(prev => ({
        ...prev,
        specialAbilities: [...(prev.specialAbilities || []), newAbility.trim()]
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
  
  const handleRelationshipChange = (value: number[]) => {
    setFormData(prev => ({
      ...prev,
      relationshipLevel: value[0]
    }));
  };
  
  return {
    isEditMode,
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
