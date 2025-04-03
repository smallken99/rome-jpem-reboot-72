
import { useState, useCallback } from 'react';
import { usePatrimoine } from './usePatrimoine';
import { usePatrimoineEditor } from './usePatrimoineEditor';
import { useRelations } from '@/components/famille/relations/context/RelationsContext';
import { PropertyRelation } from '@/components/famille/relations/types/relationTypes';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';

export const usePatrimoineManager = () => {
  const patrimoine = usePatrimoine();
  const patrimoineEditor = usePatrimoineEditor();
  const { relations, updateRelation } = useRelations();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Action optimisée: Acheter une propriété
  const purchaseProperty = useCallback(async (propertyData, relationId = null) => {
    setIsLoading(true);
    
    try {
      // Vérifier les fonds disponibles
      if (propertyData.value > patrimoine.balance) {
        toast({
          title: "Fonds insuffisants",
          description: `Vous n'avez pas assez d'As pour acheter cette propriété (${propertyData.value} As requis).`,
          variant: "destructive"
        });
        return false;
      }
      
      // Effectuer l'achat
      const propertyId = patrimoineEditor.purchaseProperty(propertyData);
      
      if (propertyId && relationId) {
        // Associer cette propriété à une relation si spécifié
        const relation = relations.find(r => r.id === relationId);
        if (relation) {
          const propertyRelation: PropertyRelation = {
            propertyId,
            propertyName: propertyData.name,
            type: 'shared',
            details: `Propriété partagée avec ${relation.targetName}`,
            value: propertyData.value
          };
          
          const updatedProperties = [...(relation.properties || []), propertyRelation];
          
          updateRelation(relationId, {
            properties: updatedProperties
          });
          
          toast({
            title: "Relation mise à jour",
            description: `Propriété ${propertyData.name} associée à la relation avec ${relation.targetName}.`
          });
        }
      }
      
      return propertyId;
    } catch (error) {
      console.error("Erreur lors de l'achat:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'achat de la propriété.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [patrimoine, patrimoineEditor, relations, updateRelation, toast]);
  
  // Action optimisée: Vendre une propriété
  const sellProperty = useCallback(async (propertyId, options = {}) => {
    setIsLoading(true);
    
    try {
      const property = patrimoineEditor.getPropertyById(propertyId);
      
      if (!property) {
        toast({
          title: "Propriété introuvable",
          description: "Impossible de trouver la propriété à vendre.",
          variant: "destructive"
        });
        return false;
      }
      
      // Vérifier les relations associées à cette propriété
      let propertyRelations = [];
      for (const relation of relations) {
        if (relation.properties) {
          const propRelation = relation.properties.find(p => p.propertyId === propertyId);
          if (propRelation) {
            propertyRelations.push({ relation, propRelation });
          }
        }
      }
      
      // Effectuer la vente
      const result = patrimoineEditor.sellProperty(propertyId);
      
      if (result) {
        // Mettre à jour les relations
        for (const { relation, propRelation } of propertyRelations) {
          const updatedProperties = relation.properties.filter(p => p.propertyId !== propertyId);
          
          updateRelation(relation.id, {
            properties: updatedProperties
          });
          
          // Ajouter une note dans l'historique des relations si nécessaire
          if (options.notifyRelations) {
            toast({
              title: "Relation mise à jour",
              description: `${relation.targetName} a été informé de la vente de ${property.name}.`
            });
          }
        }
      }
      
      return result;
    } catch (error) {
      console.error("Erreur lors de la vente:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la vente de la propriété.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [patrimoineEditor, relations, updateRelation, toast]);
  
  // Action optimisée: Rénovation avec impact sur les relations
  const renovatePropertyWithImpact = useCallback(async (propertyId, amount, options = {}) => {
    setIsLoading(true);
    
    try {
      const property = patrimoineEditor.getPropertyById(propertyId);
      
      if (!property) {
        toast({
          title: "Propriété introuvable",
          description: "Impossible de trouver la propriété à rénover.",
          variant: "destructive"
        });
        return false;
      }
      
      // Vérifier si le montant dépasse le solde disponible
      if (amount > patrimoine.balance) {
        toast({
          title: "Fonds insuffisants",
          description: `Vous n'avez pas assez d'As pour cette rénovation (${amount} As requis).`,
          variant: "destructive"
        });
        return false;
      }
      
      // Effectuer la rénovation
      const result = patrimoineEditor.renovateProperty(propertyId, amount);
      
      if (result && options.improveRelations) {
        // Améliorer les relations liées à cette propriété
        let propertyRelations = [];
        for (const relation of relations) {
          if (relation.properties) {
            const propRelation = relation.properties.find(p => p.propertyId === propertyId);
            if (propRelation) {
              propertyRelations.push({ relation, propRelation });
            }
          }
        }
        
        // Mettre à jour les relations
        for (const { relation } of propertyRelations) {
          // Calculer l'impact de la rénovation sur la relation (5-15% d'amélioration)
          const relationImprovement = Math.floor(Math.random() * 10) + 5;
          const newStrength = Math.min(100, (relation.strength || 50) + relationImprovement);
          
          updateRelation(relation.id, {
            strength: newStrength,
            type: newStrength > 75 ? 'positive' : newStrength < 25 ? 'negative' : 'neutral'
          });
          
          toast({
            title: "Relation améliorée",
            description: `Votre relation avec ${relation.targetName} s'est améliorée suite à la rénovation.`
          });
        }
      }
      
      return result;
    } catch (error) {
      console.error("Erreur lors de la rénovation:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la rénovation.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [patrimoine, patrimoineEditor, relations, updateRelation, toast]);
  
  // Fusionner toutes les fonctionnalités des différents hooks
  return {
    ...patrimoine,
    ...patrimoineEditor,
    isLoading,
    purchaseProperty,
    sellProperty,
    renovatePropertyWithImpact,
    // Fonctions spécifiques pour les boutons d'action optimisés
    actionButtons: {
      renovateProperty: (propertyId: string) => {
        const property = patrimoineEditor.getPropertyById(propertyId);
        if (!property) return;
        
        const cost = Math.round(property.value * 0.1); // 10% de la valeur
        renovatePropertyWithImpact(propertyId, cost, { improveRelations: true });
      },
      improveProperty: (propertyId: string) => {
        const property = patrimoineEditor.getPropertyById(propertyId);
        if (!property) return;
        
        const cost = Math.round(property.value * 0.2); // 20% de la valeur
        
        if (cost > patrimoine.balance) {
          toast({
            title: "Fonds insuffisants",
            description: `Vous n'avez pas assez d'As pour cette amélioration (${cost} As requis).`,
            variant: "destructive"
          });
          return;
        }
        
        // Ajouter la transaction
        patrimoine.addTransaction({
          amount: -cost,
          description: `Amélioration de: ${property.name}`,
          category: "Amélioration immobilière",
          type: "expense"
        });
        
        // Mettre à jour la propriété avec une valeur plus élevée
        const valueIncrease = Math.round(property.value * 0.3); // 30% d'augmentation
        patrimoineEditor.savePropertyChanges(propertyId, {
          value: property.value + valueIncrease,
          condition: 100 // Réinitialiser la condition
        });
        
        toast({
          title: "Propriété améliorée",
          description: `${property.name} a été améliorée et vaut maintenant ${property.value + valueIncrease} As.`
        });
      }
    }
  };
};
