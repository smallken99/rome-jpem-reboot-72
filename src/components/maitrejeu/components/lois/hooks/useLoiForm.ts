
import { useState, useEffect } from 'react';
import { Loi } from '../../../types/lois';
import { v4 as uuidv4 } from 'uuid';
import { useMaitreJeu } from '../../../context';

export const useLoiForm = (editLoi: Loi | null | undefined, onSave: (loi: Loi) => void) => {
  const { currentDate } = useMaitreJeu();
  
  const initialFormState: Omit<Loi, 'id'> = {
    titre: '',
    nom: '',
    description: '',
    proposeur: '',
    type: 'civile',
    catégorie: 'Agraire',
    date: currentDate,
    dateProposition: currentDate,
    état: 'En délibération',
    importance: 'normale',
    votesPositifs: 0,
    votesNégatifs: 0,
    votesAbstention: 0,
    clauses: [],
    impacts: [],
    effets: {}
  };
  
  const [formData, setFormData] = useState<Omit<Loi, 'id'>>(initialFormState);
  
  useEffect(() => {
    if (editLoi) {
      // Pré-remplir le formulaire avec les données de la loi à éditer
      const { id, ...loiData } = editLoi;
      setFormData(loiData);
    } else {
      setFormData(initialFormState);
    }
  }, [editLoi, currentDate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEffetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      effets: {
        ...prev.effets,
        [name]: parseInt(value) || 0
      }
    }));
  };
  
  const resetForm = () => {
    setFormData(initialFormState);
  };
  
  const handleSubmit = () => {
    const loi: Loi = {
      id: editLoi?.id || uuidv4(),
      ...formData
    };
    onSave(loi);
  };
  
  return {
    formData,
    handleInputChange,
    handleSelectChange,
    handleEffetChange,
    resetForm,
    handleSubmit
  };
};
