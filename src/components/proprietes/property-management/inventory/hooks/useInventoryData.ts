
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Resource, ResourceType, Transaction, MarketPrice } from '../data/types';

export const useInventoryData = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  
  const [property, setProperty] = useState<any | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
        const mockResources: Resource[] = [
          {
            id: 'r1',
            name: 'Blé',
            quantity: 1200,
            unit: 'modii',
            value: 24000,
            category: 'Céréales',
            location: 'Grenier principal',
            lastUpdated: '15 Jul 45 AUC'
          },
          {
            id: 'r2',
            name: 'Vin de qualité',
            quantity: 80,
            unit: 'amphores',
            value: 16000,
            category: 'Vin',
            location: 'Cave',
            lastUpdated: '10 Jul 45 AUC'
          },
          {
            id: 'r3',
            name: 'Huile d\'olive',
            quantity: 40,
            unit: 'amphores',
            value: 8000,
            category: 'Huile',
            location: 'Entrepôt',
            lastUpdated: '12 Jul 45 AUC'
          }
        ];
        
        // Transactions
        const mockTransactions: Transaction[] = [
          {
            id: 't1',
            date: '15 Jul 45 AUC',
            type: 'sell',
            resourceName: 'Blé',
            quantity: 500,
            unitPrice: 20,
            total: 10000
          },
          {
            id: 't2',
            date: '10 Jul 45 AUC',
            type: 'buy',
            resourceName: 'Semences',
            quantity: 100,
            unitPrice: 30,
            total: 3000
          },
          {
            id: 't3',
            date: '5 Jul 45 AUC',
            type: 'transfer',
            resourceName: 'Vin',
            quantity: 20,
            unitPrice: 0,
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
            trend: 'up',
            volatility: 0.2
          },
          {
            resourceId: 'r2',
            resourceName: 'Vin',
            basePrice: 190,
            currentPrice: 200,
            trend: 'stable',
            volatility: 0.1
          },
          {
            resourceId: 'r3',
            resourceName: 'Huile d\'olive',
            basePrice: 210,
            currentPrice: 200,
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
