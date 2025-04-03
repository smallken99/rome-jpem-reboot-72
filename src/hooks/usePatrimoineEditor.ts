
import { useState, useCallback } from 'react';
import { usePatrimoine } from './usePatrimoine';
import { useToast } from '@/components/ui/use-toast';
import { Building } from '@/types/buildings';

export const usePatrimoineEditor = () => {
  const patrimoine = usePatrimoine();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Récupérer une propriété par son ID
  const getPropertyById = useCallback((id: string) => {
    return patrimoine.properties.find(prop => prop.id === id) || null;
  }, [patrimoine.properties]);
  
  // Sauvegarder les modifications d'une propriété
  const savePropertyChanges = useCallback((id: string, updates: Partial<Building>) => {
    try {
      patrimoine.updateProperty(id, updates);
      
      toast({
        title: "Modifications enregistrées",
        description: "Les changements ont été sauvegardés avec succès.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
      
      return false;
    }
  }, [patrimoine, toast]);
  
  // Vendre une propriété
  const sellProperty = useCallback((id: string) => {
    const property = getPropertyById(id);
    
    if (!property) {
      toast({
        title: "Propriété introuvable",
        description: "Impossible de trouver la propriété à vendre.",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      // Vendre la propriété
      const result = patrimoine.sellProperty(id);
      
      if (result) {
        toast({
          title: "Vente réussie",
          description: `La propriété a été vendue pour ${property.value.toLocaleString()} As.`,
        });
      }
      
      return result;
    } catch (error) {
      toast({
        title: "Erreur lors de la vente",
        description: "Une erreur est survenue lors de la vente.",
        variant: "destructive",
      });
      
      return false;
    }
  }, [patrimoine, getPropertyById, toast]);
  
  // Acheter une nouvelle propriété
  const purchaseProperty = useCallback((propertyData: Partial<Building>) => {
    if (!propertyData.value || propertyData.value > patrimoine.balance) {
      toast({
        title: "Fonds insuffisants",
        description: "Vous n'avez pas assez d'As pour acheter cette propriété.",
        variant: "destructive",
      });
      
      return false;
    }
    
    try {
      // Ajouter la transaction
      patrimoine.addTransaction({
        amount: -propertyData.value,
        description: `Achat de: ${propertyData.name}`,
        category: "Acquisition immobilière",
        type: "expense"
      });
      
      // Ajouter la propriété
      const id = patrimoine.addProperty({
        ...propertyData,
        id: '',
        acquired: new Date().toISOString(),
      });
      
      toast({
        title: "Acquisition réussie",
        description: `${propertyData.name} a été ajouté à votre patrimoine.`,
      });
      
      return id;
    } catch (error) {
      toast({
        title: "Erreur lors de l'achat",
        description: "Une erreur est survenue lors de l'achat.",
        variant: "destructive",
      });
      
      return false;
    }
  }, [patrimoine, toast]);
  
  // Rénover une propriété
  const renovateProperty = useCallback((id: string, cost: number) => {
    if (cost > patrimoine.balance) {
      toast({
        title: "Fonds insuffisants",
        description: "Vous n'avez pas assez d'As pour cette rénovation.",
        variant: "destructive",
      });
      
      return false;
    }
    
    const property = getPropertyById(id);
    
    if (!property) {
      toast({
        title: "Propriété introuvable",
        description: "Impossible de trouver la propriété à rénover.",
        variant: "destructive",
      });
      
      return false;
    }
    
    try {
      // Ajouter la transaction
      patrimoine.addTransaction({
        amount: -cost,
        description: `Rénovation de: ${property.name}`,
        category: "Entretien immobilier",
        type: "expense"
      });
      
      // Mettre à jour la condition de la propriété
      patrimoine.updateProperty(id, {
        condition: 100, // Rénovation complète
      });
      
      toast({
        title: "Rénovation réussie",
        description: `${property.name} a été entièrement rénové.`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Erreur lors de la rénovation",
        description: "Une erreur est survenue lors de la rénovation.",
        variant: "destructive",
      });
      
      return false;
    }
  }, [patrimoine, getPropertyById, toast]);
  
  return {
    isEditing,
    setIsEditing,
    selectedPropertyId,
    setSelectedPropertyId,
    getPropertyById,
    savePropertyChanges,
    sellProperty,
    purchaseProperty,
    renovateProperty,
    properties: patrimoine.properties,
    balance: patrimoine.balance,
    calculateStats: patrimoine.calculateStats,
  };
};
