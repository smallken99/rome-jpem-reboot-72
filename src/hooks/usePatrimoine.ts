
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useEconomy } from './useEconomy';

export type Resource = {
  id: string;
  name: string;
  amount: number;
  unit: string;
  value: number; // Valeur par unité en As
};

export type ResourceTransaction = {
  id: number;
  resourceId: string;
  amount: number;
  date: Date;
  type: 'achat' | 'vente' | 'production';
  price: number; // Prix total de la transaction
};

export function usePatrimoine() {
  // Utiliser le système économique centralisé pour la gestion de la trésorerie
  const economy = useEconomy();
  
  // État pour les ressources et les transactions de ressources
  const [resources, setResources] = useState<Resource[]>([
    { id: 'vin', name: 'Vin', amount: 200, unit: 'amphores', value: 50 },
    { id: 'huile_olive', name: "Huile d'olive", amount: 300, unit: 'amphores', value: 40 },
    { id: 'cereales', name: 'Céréales', amount: 500, unit: 'modii', value: 10 },
    { id: 'laine', name: 'Laine', amount: 100, unit: 'balles', value: 30 }
  ]);
  const [resourceTransactions, setResourceTransactions] = useState<ResourceTransaction[]>([]);

  // Récupérer le solde du système économique centralisé
  const balance = economy.balance;
  
  // Fonction pour modifier le solde, délégué au système économique
  const updateBalance = useCallback((amount: number) => {
    if (amount > 0) {
      economy.receivePayment(amount, "Ajustement", "Patrimoine", "Ajustement du patrimoine");
    } else if (amount < 0) {
      economy.makePayment(Math.abs(amount), "Ajustement", "Patrimoine", "Ajustement du patrimoine");
    }
    return true;
  }, [economy]);
  
  // Ajouter une ressource (production des domaines ruraux)
  const addResource = (resourceId: string, amount: number) => {
    const resourceExists = resources.find(r => r.id === resourceId);
    
    if (resourceExists) {
      // Mettre à jour une ressource existante
      setResources(prev => 
        prev.map(resource => 
          resource.id === resourceId 
            ? { ...resource, amount: resource.amount + amount }
            : resource
        )
      );
    } else {
      // Créer une nouvelle ressource
      toast.error("Ressource inconnue");
      return false;
    }
    
    // Ajouter la transaction
    const resource = resources.find(r => r.id === resourceId);
    if (resource) {
      const transaction: ResourceTransaction = {
        id: Math.floor(Math.random() * 10000),
        resourceId,
        amount,
        date: new Date(),
        type: 'production',
        price: amount * resource.value
      };
      
      setResourceTransactions(prev => [...prev, transaction]);
      toast.success(`Production de ${amount} ${resource.unit} de ${resource.name}`);
    }
    
    return true;
  };
  
  // Vendre une ressource
  const sellResource = (resourceId: string, amount: number, pricePerUnit: number) => {
    const resource = resources.find(r => r.id === resourceId);
    
    if (!resource) {
      toast.error("Ressource inconnue");
      return false;
    }
    
    if (resource.amount < amount) {
      toast.error(`Stock insuffisant (${resource.amount} ${resource.unit} disponibles)`);
      return false;
    }
    
    // Mettre à jour le stock
    setResources(prev => 
      prev.map(r => 
        r.id === resourceId 
          ? { ...r, amount: r.amount - amount }
          : r
      )
    );
    
    // Ajouter la transaction
    const totalPrice = amount * pricePerUnit;
    const transaction: ResourceTransaction = {
      id: Math.floor(Math.random() * 10000),
      resourceId,
      amount: -amount, // Négatif car c'est une vente
      date: new Date(),
      type: 'vente',
      price: totalPrice
    };
    
    setResourceTransactions(prev => [...prev, transaction]);
    
    // Mettre à jour le solde via le système économique
    economy.receivePayment(
      totalPrice,
      "Marché commercial",
      "Vente de ressources",
      `Vente de ${amount} ${resource.unit} de ${resource.name}`
    );
    
    toast.success(`Vente de ${amount} ${resource.unit} de ${resource.name} pour ${totalPrice.toLocaleString()} As`);
    return true;
  };
  
  // Acheter une ressource
  const buyResource = (resourceId: string, amount: number, pricePerUnit: number) => {
    const totalPrice = amount * pricePerUnit;
    
    // Vérifier si le solde est suffisant en utilisant le système économique
    if (!economy.canAfford(totalPrice)) {
      toast.error("Fonds insuffisants pour cet achat");
      return false;
    }
    
    const resource = resources.find(r => r.id === resourceId);
    
    if (!resource) {
      toast.error("Ressource inconnue");
      return false;
    }
    
    // Mettre à jour le stock
    setResources(prev => 
      prev.map(r => 
        r.id === resourceId 
          ? { ...r, amount: r.amount + amount }
          : r
      )
    );
    
    // Ajouter la transaction
    const transaction: ResourceTransaction = {
      id: Math.floor(Math.random() * 10000),
      resourceId,
      amount,
      date: new Date(),
      type: 'achat',
      price: -totalPrice // Négatif car c'est une dépense
    };
    
    setResourceTransactions(prev => [...prev, transaction]);
    
    // Mettre à jour le solde via le système économique
    economy.makePayment(
      totalPrice,
      "Fournisseur",
      "Achat de ressources",
      `Achat de ${amount} ${resource.unit} de ${resource.name}`
    );
    
    toast.success(`Achat de ${amount} ${resource.unit} de ${resource.name} pour ${totalPrice.toLocaleString()} As`);
    return true;
  };
  
  return {
    balance,
    updateBalance,
    resources,
    resourceTransactions,
    addResource,
    sellResource,
    buyResource
  };
}
