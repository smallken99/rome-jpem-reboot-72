
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PropertyResource, ResourceType, ResourceTransaction, MarketPrice } from '../data/types';

export const useInventoryData = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  
  const [property, setProperty] = useState<any | null>(null);
  const [resources, setResources] = useState<PropertyResource[]>([]);
  const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([]);
  const [transactions, setTransactions] = useState<ResourceTransaction[]>([]);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Simuler le chargement des données
    const loadData = async () => {
      setLoading(true);
      
      try {
        // Données de la propriété (simulées)
        const mockProperty = {
          id: propertyId,
          name: 'Domaine viticole de Campanie',
          type: 'rural',
          location: 'Campanie'
        };
        
        // Types de ressources
        const mockResourceTypes: ResourceType[] = [
          { id: 'cereal', name: 'Céréales', unit: 'modii', categories: ['Alimentation'] },
          { id: 'wine', name: 'Vin', unit: 'amphores', categories: ['Boisson', 'Luxe'] },
          { id: 'oil', name: 'Huile', unit: 'amphores', categories: ['Alimentation', 'Industrie'] },
          { id: 'fabric', name: 'Tissu', unit: 'rouleaux', categories: ['Habillement', 'Luxe'] },
          { id: 'wood', name: 'Bois', unit: 'stères', categories: ['Construction', 'Chauffage'] },
        ];
        
        // Ressources stockées
        const mockResources: PropertyResource[] = [
          {
            id: 'r1',
            propertyId: propertyId || '',
            name: 'Blé',
            type: 'Céréales',
            quantity: 1200,
            unit: 'modii',
            value: 24000,
            marketValue: 24000,
            category: 'Céréales',
            location: 'Grenier principal',
            lastUpdated: '15 Jul 45 AUC'
          },
          {
            id: 'r2',
            propertyId: propertyId || '',
            name: 'Vin de qualité',
            type: 'Vin',
            quantity: 80,
            unit: 'amphores',
            value: 16000,
            marketValue: 16000,
            category: 'Vin',
            location: 'Cave',
            lastUpdated: '10 Jul 45 AUC'
          },
          {
            id: 'r3',
            propertyId: propertyId || '',
            name: 'Huile d\'olive',
            type: 'Huile',
            quantity: 40,
            unit: 'amphores',
            value: 8000,
            marketValue: 8000,
            category: 'Huile',
            location: 'Entrepôt',
            lastUpdated: '12 Jul 45 AUC'
          }
        ];
        
        // Transactions
        const mockTransactions: ResourceTransaction[] = [
          {
            id: 't1',
            propertyId: propertyId || '',
            date: '15 Jul 45 AUC',
            type: 'sale',
            resourceName: 'Blé',
            quantity: 500,
            price: 20,
            total: 10000
          },
          {
            id: 't2',
            propertyId: propertyId || '',
            date: '10 Jul 45 AUC',
            type: 'purchase',
            resourceName: 'Semences',
            quantity: 100,
            price: 30,
            total: 3000
          },
          {
            id: 't3',
            propertyId: propertyId || '',
            date: '5 Jul 45 AUC',
            type: 'harvest',
            resourceName: 'Vin',
            quantity: 20,
            price: 0,
            total: 0
          }
        ];
        
        // Prix du marché
        const mockMarketPrices: MarketPrice[] = [
          {
            resourceId: 'r1',
            resourceName: 'Blé',
            basePrice: 18,
            currentPrice: 20,
            buyPrice: 22,
            sellPrice: 18,
            trend: 'up',
            volatility: 0.2
          },
          {
            resourceId: 'r2',
            resourceName: 'Vin',
            basePrice: 190,
            currentPrice: 200,
            buyPrice: 220,
            sellPrice: 180,
            trend: 'stable',
            volatility: 0.1
          },
          {
            resourceId: 'r3',
            resourceName: 'Huile d\'olive',
            basePrice: 210,
            currentPrice: 200,
            buyPrice: 220,
            sellPrice: 180,
            trend: 'down',
            volatility: 0.15
          }
        ];
        
        // Mettre à jour l'état avec les données simulées
        setProperty(mockProperty);
        setResourceTypes(mockResourceTypes);
        setResources(mockResources);
        setTransactions(mockTransactions);
        setMarketPrices(mockMarketPrices);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [propertyId]);
  
  return {
    propertyId,
    property,
    resources,
    resourceTypes,
    transactions,
    marketPrices,
    loading
  };
};
