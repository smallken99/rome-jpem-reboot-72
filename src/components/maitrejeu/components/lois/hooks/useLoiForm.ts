
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Loi, LoiType, LoiStatut } from '../../../types/lois';
import { Clause } from '../../../types/lois';

export interface LoiFormData {
  titre: string;
  nom: string;
  description: string;
  proposeur: string;
  type: LoiType;
  catégorie: string;
  date: {
    year: number;
    season: string;
  };
  dateProposition: {
    year: number;
    season: string;
  };
  état: LoiStatut;
  importance: 'mineure' | 'normale' | 'majeure';
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  votes: {
    pour: number;
    contre: number;
    abstention: number;
  };
  effets: Record<string, any> | string[];
  clauses: Clause[] | string[];
  commentaires?: string;
}

export const useLoiForm = (currentYear: number, currentSeason: string) => {
  const defaultLoi: LoiFormData = {
    titre: '',
    nom: '',
    description: '',
    proposeur: '',
    type: 'civile',
    catégorie: '',
    date: {
      year: currentYear,
      season: currentSeason
    },
    dateProposition: {
      year: currentYear,
      season: currentSeason
    },
    état: 'proposée',
    importance: 'normale',
    votesPositifs: 0,
    votesNégatifs: 0,
    votesAbstention: 0,
    votes: {
      pour: 0,
      contre: 0,
      abstention: 0
    },
    effets: {},
    clauses: []
  };

  const [formData, setFormData] = useState<LoiFormData>(defaultLoi);

  const resetForm = () => {
    setFormData(defaultLoi);
  };

  const loadLoi = (loi: Loi) => {
    // Adaptation du type Loi vers LoiFormData
    const loiFormData: LoiFormData = {
      titre: loi.titre,
      nom: loi.nom || '',
      description: loi.description,
      type: loi.type,
      catégorie: loi.catégorie || '',
      proposeur: loi.proposeur,
      dateProposition: loi.dateProposition,
      date: loi.date,
      état: loi.état,
      importance: loi.importance || 'normale',
      votesPositifs: loi.votesPositifs,
      votesNégatifs: loi.votesNégatifs,
      votesAbstention: loi.votesAbstention,
      votes: loi.votes,
      effets: loi.effets,
      clauses: loi.clauses || [],
      commentaires: loi.commentaires
    };
    
    setFormData(loiFormData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof LoiFormData
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSelectChange = (
    value: string,
    field: keyof LoiFormData
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const createLoi = (): Loi => {
    return {
      id: uuidv4(),
      titre: formData.titre,
      nom: formData.nom,
      description: formData.description,
      proposeur: formData.proposeur,
      type: formData.type,
      catégorie: formData.catégorie,
      date: formData.date,
      dateProposition: formData.dateProposition,
      état: formData.état,
      importance: formData.importance,
      votesPositifs: formData.votesPositifs,
      votesNégatifs: formData.votesNégatifs,
      votesAbstention: formData.votesAbstention,
      votes: formData.votes,
      effets: formData.effets,
      clauses: formData.clauses as Clause[],
      commentaires: formData.commentaires
    };
  };

  return {
    formData,
    setFormData,
    resetForm,
    loadLoi,
    handleInputChange,
    handleSelectChange,
    createLoi
  };
};
