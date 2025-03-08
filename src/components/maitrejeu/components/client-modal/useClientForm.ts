
import { useState, useEffect } from 'react';
import { ClientCreationData, Client } from '../../types/clients';

export const useClientForm = (client: Client | null) => {
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
    }
  });
  
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
        assignedToSenateurId: client.assignedToSenateurId
      });
    }
  }, [client]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  return {
    isEditMode,
    formData,
    handleChange,
    handleSelectChange,
    handleInfluenceChange
  };
};
