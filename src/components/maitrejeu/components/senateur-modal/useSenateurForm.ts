
import { useState } from 'react';
import { SenateurJouable } from '../../types/senateurs';

const defaultSenateur: SenateurJouable = {
  id: '',
  name: '',
  nom: '',
  prenom: '',
  gens: '',
  statut: 'Patricien',
  age: 30,
  joueur: false,
  roles: [],
  richesse: 1000,
  influence: 10,
  popularite: 0,
  militaire: 0,
  piete: 0,
  eloquence: 0,
  competences: {},
  famille: '',
  faction: 'Neutral',
  clientele: 0,
  prestige: 0,
  actif: true,
  allies: [],
  ennemis: [],
  gender: 'male',
  fonction: '',
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
      [name]: name === 'age' || name === 'popularite' || name === 'influence' || 
              name === 'richesse' || name === 'militaire' || name === 'piete' || 
              name === 'eloquence'
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
