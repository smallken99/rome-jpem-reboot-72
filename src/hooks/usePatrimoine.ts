import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import { Transaction } from '@/types/EconomyTypes';

// Hook pour gérer le patrimoine (biens, propriétés, argent)
export const usePatrimoine = () => {
  const [patrimoine, setPatrimoine] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0); // Solde initial
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Liste des transactions
  const { toast } = useToast();

  // Charger les données du patrimoine
  useEffect(() => {
    const loadPatrimoine = async () => {
      setLoading(true);
      try {
        // Simuler un appel API
        setTimeout(() => {
          const mockPatrimoine = [
            { id: 'p1', type: 'villa', name: 'Villa Urbana', value: 50000, location: 'Rome' },
            { id: 'p2', type: 'domus', name: 'Domus Aurea', value: 30000, location: 'Rome' },
            { id: 'p3', type: 'fundus', name: 'Fundus Sabinus', value: 20000, location: 'Sabine' }
          ];
          setPatrimoine(mockPatrimoine);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Erreur lors du chargement du patrimoine');
        console.error(err);
        setLoading(false);
      }
    };

    loadPatrimoine();
  }, []);

  // Ajouter un bien au patrimoine
  const addBien = (bien: any) => {
    setPatrimoine([...patrimoine, { ...bien, id: uuidv4() }]);
    toast({
      title: "Nouveau bien acquis!",
      description: `Un(e) ${bien.type} a été ajouté(e) au patrimoine.`,
    });
  };

  // Vendre un bien du patrimoine
  const vendreBien = (id: string, amount: number) => {
    setPatrimoine(patrimoine.filter(bien => bien.id !== id));
    setBalance(prevBalance => prevBalance + amount);
    toast({
      title: "Bien vendu!",
      description: "Un bien a été vendu et le solde a été mis à jour.",
    });
  };

  // Mettre à jour un bien du patrimoine
  const updateBien = (id: string, updates: any) => {
    setPatrimoine(
      patrimoine.map(bien => (bien.id === id ? { ...bien, ...updates } : bien))
    );
    toast({
      title: "Bien mis à jour!",
      description: "Les informations du bien ont été mises à jour.",
    });
  };

  // Supprimer un bien du patrimoine
  const supprimerBien = (id: string) => {
    setPatrimoine(patrimoine.filter(bien => bien.id !== id));
    toast({
      title: "Bien supprimé!",
      description: "Le bien a été supprimé du patrimoine.",
    });
  };

  // Ajouter une transaction
  const addTransaction = useCallback((transaction: any) => {
    const newTransaction = { ...transaction, id: uuidv4(), date: new Date() };
    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prevBalance => prevBalance + transaction.amount);
    toast({
      title: "Nouvelle transaction!",
      description: "Une nouvelle transaction a été enregistrée.",
    });
  }, [setTransactions, setBalance, toast]);

  // Simuler l'achat d'un bâtiment
  const buildingPurchased = (buildingType: string, cost: number) => {
    addTransaction({
      amount: -cost,
      description: `Achat ${buildingType}`,
      category: 'Immobilier'
    });
  };

  // Simuler la vente d'un bâtiment
  const buildingSold = (buildingType: string, value: number) => {
    addTransaction({
      amount: value,
      description: `Vente ${buildingType}`,
      category: 'Immobilier'
    });
  };

  return {
    patrimoine,
    loading,
    error,
    addBien,
    vendreBien,
    updateBien,
    supprimerBien,
    balance,
    setBalance,
    addTransaction,
    transactions,
    buildingPurchased,
    buildingSold
  };
};
