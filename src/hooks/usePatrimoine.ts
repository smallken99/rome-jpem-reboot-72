
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

/**
 * Hook personnalisé pour la gestion des fonctionnalités du patrimoine
 */
export const usePatrimoine = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Fonction pour acheter une propriété
  const buyProperty = (propertyType: string, cost: number) => {
    setIsLoading(true);
    
    // Simulation d'un achat
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Propriété de type ${propertyType} achetée pour ${cost} As`);
    }, 1500);
  };
  
  // Fonction pour construire une nouvelle propriété
  const buildProperty = (propertyType: string, cost: number) => {
    setIsLoading(true);
    
    // Simulation d'une construction
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Construction de ${propertyType} lancée pour ${cost} As`);
    }, 1500);
  };
  
  // Fonction pour entretenir une propriété
  const maintainProperty = (propertyId: string, cost: number) => {
    setIsLoading(true);
    
    // Simulation d'un entretien
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Entretien effectué sur la propriété #${propertyId} pour ${cost} As`);
    }, 1500);
  };
  
  // Fonction pour vendre une propriété
  const sellProperty = (propertyId: string, value: number) => {
    setIsLoading(true);
    
    // Simulation d'une vente
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Propriété #${propertyId} vendue pour ${value} As`);
    }, 1500);
  };
  
  // Fonction pour gérer les dépenses
  const handleExpense = (category: string, amount: number, description: string) => {
    setIsLoading(true);
    
    // Simulation d'une dépense
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Dépense de ${amount} As enregistrée pour: ${description}`);
      navigate('/patrimoine/depenses');
    }, 1000);
  };
  
  // Fonction pour gérer les revenus
  const handleIncome = (source: string, amount: number, description: string) => {
    setIsLoading(true);
    
    // Simulation d'un revenu
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Revenu de ${amount} As enregistré depuis: ${source}`);
      navigate('/patrimoine/revenus');
    }, 1000);
  };
  
  // Fonction pour payer des impôts
  const payTaxes = (taxType: string, amount: number) => {
    setIsLoading(true);
    
    // Simulation d'un paiement d'impôts
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Paiement de ${amount} As pour l'impôt: ${taxType}`);
      navigate('/patrimoine/impots');
    }, 1000);
  };
  
  return {
    isLoading,
    buyProperty,
    buildProperty,
    maintainProperty,
    sellProperty,
    handleExpense,
    handleIncome,
    payTaxes
  };
};
