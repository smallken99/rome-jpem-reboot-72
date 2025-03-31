
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { ECONOMIE_TYPES, ECONOMIE_CATEGORIES, ECONOMIE_SOURCE } from '@/components/maitrejeu/types/economie';

// Types pour le service économique
export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense' | 'transfer';
  date: string;
  recipient?: string;
  source?: string;
  tags?: string[];
}

/**
 * Service de gestion économique centralisé
 * Gère les transactions, le solde et les opérations financières
 */
class EconomyService {
  private transactions: Transaction[] = [];
  private balance = 0;
  private transactionsListeners: ((transactions: Transaction[]) => void)[] = [];
  private balanceListeners: ((balance: number) => void)[] = [];

  constructor(initialBalance = 0) {
    this.balance = initialBalance;
  }

  // Ajouter une transaction
  addTransaction(transaction: Omit<Transaction, 'id' | 'date'>): string {
    const newTransaction: Transaction = {
      ...transaction,
      id: uuidv4(),
      date: new Date().toISOString()
    };

    // Mettre à jour le solde
    if (transaction.type === 'income') {
      this.updateBalance(this.balance + transaction.amount);
    } else if (transaction.type === 'expense') {
      this.updateBalance(this.balance - transaction.amount);
    }

    // Ajouter la transaction à la liste
    this.transactions = [newTransaction, ...this.transactions];
    this.notifyTransactionListeners();

    return newTransaction.id;
  }

  // Mettre à jour le solde
  private updateBalance(newBalance: number): void {
    this.balance = newBalance;
    this.notifyBalanceListeners();
  }

  // Supprimer une transaction
  removeTransaction(id: string): boolean {
    const transaction = this.transactions.find(t => t.id === id);
    
    if (!transaction) {
      return false;
    }
    
    // Mettre à jour le solde
    if (transaction.type === 'income') {
      this.updateBalance(this.balance - transaction.amount);
    } else if (transaction.type === 'expense') {
      this.updateBalance(this.balance + transaction.amount);
    }
    
    // Supprimer la transaction
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.notifyTransactionListeners();
    
    return true;
  }

  // Vérifier si on peut se permettre une dépense
  canAfford(amount: number): boolean {
    return this.balance >= amount;
  }

  // Effectuer un paiement
  makePayment(amount: number, recipient: string, category: string, description?: string): boolean {
    if (!this.canAfford(amount)) {
      toast.error("Fonds insuffisants pour effectuer ce paiement");
      return false;
    }
    
    this.addTransaction({
      amount,
      category,
      description: description || `Paiement à ${recipient}`,
      type: 'expense',
      recipient
    });
    
    toast.success(`Paiement de ${amount} As effectué`);
    return true;
  }

  // Recevoir un paiement
  receivePayment(amount: number, source: string, category: string, description?: string): string {
    const id = this.addTransaction({
      amount,
      category,
      description: description || `Paiement reçu de ${source}`,
      type: 'income',
      source
    });
    
    toast.success(`Paiement de ${amount} As reçu`);
    return id;
  }

  // Obtenir le solde actuel
  getBalance(): number {
    return this.balance;
  }

  // Obtenir toutes les transactions
  getTransactions(): Transaction[] {
    return [...this.transactions];
  }

  // Filtrer les transactions par catégorie
  getTransactionsByCategory(category: string): Transaction[] {
    return this.transactions.filter(t => t.category === category);
  }

  // Filtrer les transactions par type
  getTransactionsByType(type: 'income' | 'expense' | 'transfer'): Transaction[] {
    return this.transactions.filter(t => t.type === type);
  }

  // Calculer le total des revenus
  getTotalIncome(): number {
    return this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // Calculer le total des dépenses
  getTotalExpenses(): number {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // S'abonner aux changements de transactions
  subscribeToTransactions(listener: (transactions: Transaction[]) => void): () => void {
    this.transactionsListeners.push(listener);
    return () => {
      this.transactionsListeners = this.transactionsListeners.filter(l => l !== listener);
    };
  }

  // S'abonner aux changements de solde
  subscribeToBalance(listener: (balance: number) => void): () => void {
    this.balanceListeners.push(listener);
    return () => {
      this.balanceListeners = this.balanceListeners.filter(l => l !== listener);
    };
  }

  // Notifier les écouteurs de transactions
  private notifyTransactionListeners(): void {
    this.transactionsListeners.forEach(listener => listener([...this.transactions]));
  }

  // Notifier les écouteurs de solde
  private notifyBalanceListeners(): void {
    this.balanceListeners.forEach(listener => listener(this.balance));
  }

  // Convertir une transaction au format MaitreJeu
  convertToMaitreJeuFormat(transaction: Transaction): any {
    // Mapper les types de transactions
    const typeMap: Record<string, ECONOMIE_TYPES> = {
      'income': ECONOMIE_TYPES.INCOME,
      'expense': ECONOMIE_TYPES.EXPENSE,
      'transfer': ECONOMIE_TYPES.OTHER
    };

    // Mapper les catégories
    const categoryMap: Record<string, ECONOMIE_CATEGORIES> = {
      'Revenus immobiliers': ECONOMIE_CATEGORIES.MAINTENANCE,
      'Vente immobilière': ECONOMIE_CATEGORIES.CONSTRUCTION,
      'Achat immobilier': ECONOMIE_CATEGORIES.CONSTRUCTION,
      'Maintenance': ECONOMIE_CATEGORIES.MAINTENANCE,
      'Commerce': ECONOMIE_CATEGORIES.COMMERCE,
      'Impôts': ECONOMIE_CATEGORIES.IMPOTS,
      'Militaire': ECONOMIE_CATEGORIES.MILITARY,
      'Administration': ECONOMIE_CATEGORIES.ADMINISTRATIVE,
      'Religion': ECONOMIE_CATEGORIES.RELIGION,
      'Esclaves': ECONOMIE_CATEGORIES.SLAVES,
      'Divertissement': ECONOMIE_CATEGORIES.ENTERTAINMENT,
      'Diplomatie': ECONOMIE_CATEGORIES.DIPLOMACY,
      'Autre': ECONOMIE_CATEGORIES.OTHER
    };

    return {
      id: transaction.id,
      amount: transaction.amount,
      description: transaction.description,
      date: new Date(transaction.date),
      type: typeMap[transaction.type] || ECONOMIE_TYPES.OTHER,
      category: categoryMap[transaction.category] || ECONOMIE_CATEGORIES.OTHER,
      source: transaction.source ? ECONOMIE_SOURCE.PRIVATE : ECONOMIE_SOURCE.TREASURY,
      recurring: false,
      tags: transaction.tags || []
    };
  }
}

// Exporter une instance unique du service
export const economyService = new EconomyService(100000);
