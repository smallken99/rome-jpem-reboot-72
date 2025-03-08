
import { useState } from 'react';
import { SenateurJouable } from '../../types/senateurs';

const defaultSenateur: SenateurJouable = {
  id: '',
  nom: '',
  prenom: '',
  gens: '',
  statut: 'Patricien',
  age: 30,
  joueur: false,
  roles: [],
  richesse: 1000,
  influence: 10,
  competences: {
    diplomatie: 1,
    guerre: 1,
    administration: 1,
    eloquence: 1
  },
  famille: '',
  fonction: '',
  popularite: 0,
  appartenance: 'Neutral'
};

export const useSenateurForm = (senateur: SenateurJouable | null) => {
  const [formData, setFormData] = useState<SenateurJouable>(
    senateur ? {...senateur} : defaultSenateur
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'popularite' || name === 'influence' || name === 'richesse' 
        ? Number(value) 
        : value
    }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return {
    formData,
    setFormData,
    handleChange,
    handleSelectChange
  };
};
