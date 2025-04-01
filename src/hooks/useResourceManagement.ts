
import { useState, useCallback } from 'react';
import { Resource, ResourceType, ResourceTransaction, Storage } from '@/components/proprietes/types/resourceTypes';
import { useEconomy } from './useEconomy';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface UseResourceManagementProps {
  initialResources?: Resource[];
  initialStorages?: Storage[];
  initialTransactions?: ResourceTransaction[];
}

export function useResourceManagement({
  initialResources = [],
  initialStorages = [],
  initialTransactions = []
}: UseResourceManagementProps = {}) {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [storages, setStorages] = useState<Storage[]>(initialStorages);
  const [transactions, setTransactions] = useState<ResourceTransaction[]>(initialTransactions);
  
  const { makePayment, receivePayment } = useEconomy();
  
  // Ajouter une ressource
  const addResource = useCallback((resourceData: Omit<Resource, 'id'>) => {
    const newResource: Resource = {
      ...resourceData,
      id: uuidv4()
    };
    
    setResources(prev => [...prev, newResource]);
    
    // Enregistrer la transaction
    const transaction: ResourceTransaction = {
      id: uuidv4(),
      resourceId: newResource.id,
      resourceName: newResource.name,
      type: 'acquisition',
      quantity: newResource.quantity,
      date: new Date(),
      responsible: 'Utilisateur',
      cost: newResource.value * newResource.quantity
    };
    
    setTransactions(prev => [...prev, transaction]);
    
    toast.success(`${newResource.quantity} ${newResource.unit} de ${newResource.name} ajouté(e)s à l'inventaire`);
    
    return newResource.id;
  }, []);
  
  // Mettre à jour une ressource
  const updateResource = useCallback((id: string, updates: Partial<Resource>) => {
    const resource = resources.find(r => r.id === id);
    if (!resource) {
      toast.error("Ressource introuvable");
      return false;
    }
    
    const updatedResource = { ...resource, ...updates };
    
    setResources(prev => 
      prev.map(r => r.id === id ? updatedResource : r)
    );
    
    toast.success(`${resource.name} mis(e) à jour`);
    
    return true;
  }, [resources]);
  
  // Supprimer une ressource
  const deleteResource = useCallback((id: string) => {
    const resource = resources.find(r => r.id === id);
    if (!resource) {
      toast.error("Ressource introuvable");
      return false;
    }
    
    setResources(prev => prev.filter(r => r.id !== id));
    
    // Enregistrer la transaction
    const transaction: ResourceTransaction = {
      id: uuidv4(),
      resourceId: resource.id,
      resourceName: resource.name,
      type: 'consumption',
      quantity: resource.quantity,
      date: new Date(),
      responsible: 'Utilisateur',
      reason: 'Suppression de la ressource'
    };
    
    setTransactions(prev => [...prev, transaction]);
    
    toast.success(`${resource.name} supprimé(e) de l'inventaire`);
    
    return true;
  }, [resources]);
  
  // Acheter une ressource
  const purchaseResource = useCallback((resourceData: Omit<Resource, 'id'>, cost: number) => {
    if (cost > 0) {
      const success = makePayment(
        cost,
        `Achat de ${resourceData.name}`,
        'Achats de ressources',
        `Achat de ${resourceData.quantity} ${resourceData.unit} de ${resourceData.name}`
      );
      
      if (!success) {
        toast.error("Fonds insuffisants pour cet achat");
        return false;
      }
    }
    
    const resourceId = addResource(resourceData);
    
    return resourceId;
  }, [makePayment, addResource]);
  
  // Vendre une ressource
  const sellResource = useCallback((id: string, quantity: number, unitPrice?: number) => {
    const resource = resources.find(r => r.id === id);
    if (!resource) {
      toast.error("Ressource introuvable");
      return false;
    }
    
    if (quantity > resource.quantity) {
      toast.error(`Vous ne possédez que ${resource.quantity} ${resource.unit} de ${resource.name}`);
      return false;
    }
    
    const sellPrice = unitPrice !== undefined ? unitPrice : resource.value;
    const totalAmount = sellPrice * quantity;
    
    // Recevoir le paiement
    receivePayment(
      totalAmount,
      `Vente de ${resource.name}`,
      'Ventes de ressources',
      `Vente de ${quantity} ${resource.unit} de ${resource.name}`
    );
    
    // Mettre à jour la quantité
    if (quantity === resource.quantity) {
      // Supprimer la ressource si toute la quantité est vendue
      setResources(prev => prev.filter(r => r.id !== id));
    } else {
      // Sinon, réduire la quantité
      setResources(prev => 
        prev.map(r => r.id === id ? { ...r, quantity: r.quantity - quantity } : r)
      );
    }
    
    // Enregistrer la transaction
    const transaction: ResourceTransaction = {
      id: uuidv4(),
      resourceId: resource.id,
      resourceName: resource.name,
      type: 'consumption',
      quantity: quantity,
      date: new Date(),
      responsible: 'Utilisateur',
      reason: 'Vente',
      cost: totalAmount
    };
    
    setTransactions(prev => [...prev, transaction]);
    
    toast.success(`${quantity} ${resource.unit} de ${resource.name} vendu(e)s pour ${totalAmount} As`);
    
    return true;
  }, [resources, receivePayment]);
  
  // Transférer une ressource
  const transferResource = useCallback((id: string, quantity: number, destination: string) => {
    const resource = resources.find(r => r.id === id);
    if (!resource) {
      toast.error("Ressource introuvable");
      return false;
    }
    
    if (quantity > resource.quantity) {
      toast.error(`Vous ne possédez que ${resource.quantity} ${resource.unit} de ${resource.name}`);
      return false;
    }
    
    // Enregistrer la transaction
    const transaction: ResourceTransaction = {
      id: uuidv4(),
      resourceId: resource.id,
      resourceName: resource.name,
      type: 'transfer',
      quantity: quantity,
      date: new Date(),
      responsible: 'Utilisateur',
      destination: destination,
      source: 'Inventaire principal'
    };
    
    setTransactions(prev => [...prev, transaction]);
    
    // Mettre à jour la quantité
    if (quantity === resource.quantity) {
      // Supprimer la ressource si toute la quantité est transférée
      setResources(prev => prev.filter(r => r.id !== id));
    } else {
      // Sinon, réduire la quantité
      setResources(prev => 
        prev.map(r => r.id === id ? { ...r, quantity: r.quantity - quantity } : r)
      );
    }
    
    toast.success(`${quantity} ${resource.unit} de ${resource.name} transféré(e)s vers ${destination}`);
    
    return true;
  }, [resources]);
  
  // Ajouter un emplacement de stockage
  const addStorage = useCallback((storageData: Omit<Storage, 'id' | 'resources' | 'usedCapacity'>) => {
    const newStorage: Storage = {
      ...storageData,
      id: uuidv4(),
      resources: [],
      usedCapacity: 0
    };
    
    setStorages(prev => [...prev, newStorage]);
    
    toast.success(`Nouvel emplacement de stockage ${newStorage.name} ajouté`);
    
    return newStorage.id;
  }, []);
  
  // Mettre à jour un emplacement de stockage
  const updateStorage = useCallback((id: string, updates: Partial<Omit<Storage, 'id' | 'resources' | 'usedCapacity'>>) => {
    const storage = storages.find(s => s.id === id);
    if (!storage) {
      toast.error("Emplacement de stockage introuvable");
      return false;
    }
    
    const updatedStorage = { ...storage, ...updates };
    
    setStorages(prev => 
      prev.map(s => s.id === id ? updatedStorage : s)
    );
    
    toast.success(`Emplacement de stockage ${storage.name} mis à jour`);
    
    return true;
  }, [storages]);
  
  // Supprimer un emplacement de stockage
  const deleteStorage = useCallback((id: string) => {
    const storage = storages.find(s => s.id === id);
    if (!storage) {
      toast.error("Emplacement de stockage introuvable");
      return false;
    }
    
    if (storage.resources.length > 0) {
      toast.error("Impossible de supprimer un emplacement de stockage qui contient des ressources");
      return false;
    }
    
    setStorages(prev => prev.filter(s => s.id !== id));
    
    toast.success(`Emplacement de stockage ${storage.name} supprimé`);
    
    return true;
  }, [storages]);
  
  // Obtenir les ressources d'un emplacement de stockage
  const getStorageResources = useCallback((storageId: string) => {
    const storage = storages.find(s => s.id === storageId);
    if (!storage) {
      return [];
    }
    
    return storage.resources;
  }, [storages]);
  
  // Obtenir les transactions d'une ressource
  const getResourceTransactions = useCallback((resourceId: string) => {
    return transactions.filter(t => t.resourceId === resourceId);
  }, [transactions]);
  
  // Calculer la capacité totale de stockage
  const getTotalStorageCapacity = useCallback(() => {
    return storages.reduce((total, storage) => total + storage.capacity, 0);
  }, [storages]);
  
  // Calculer la capacité utilisée
  const getUsedStorageCapacity = useCallback(() => {
    return resources.reduce((total, resource) => total + resource.quantity, 0);
  }, [resources]);
  
  // Calculer la valeur totale des ressources
  const getTotalResourceValue = useCallback(() => {
    return resources.reduce((total, resource) => total + (resource.value * resource.quantity), 0);
  }, [resources]);
  
  return {
    resources,
    storages,
    transactions,
    addResource,
    updateResource,
    deleteResource,
    purchaseResource,
    sellResource,
    transferResource,
    addStorage,
    updateStorage,
    deleteStorage,
    getStorageResources,
    getResourceTransactions,
    getTotalStorageCapacity,
    getUsedStorageCapacity,
    getTotalResourceValue
  };
}
