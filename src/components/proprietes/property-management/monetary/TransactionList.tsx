import React, { useState } from 'react';
import { Transaction } from '../hooks/useMonetaryManagement';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowDownCircle, ArrowUpCircle, Search, Filter, FileDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/currencyUtils';

type TransactionListProps = {
  transactions: Transaction[];
};

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      (transaction.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = 
      filterType === 'all' ||
      transaction.type === filterType;
      
    return matchesSearch && matchesType;
  });
  
  const handleExport = () => {
    // Simuler une exportation
    alert('Exportation des transactions en cours... (Fonctionnalité simulée)');
  };
  
  return (
    <div>
      <div className="mb-4">
        <h3 className="font-cinzel text-lg text-rome-navy mb-2">Historique des transactions</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Consultez et filtrez l'ensemble de vos transactions
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une transaction..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select value={filterType} onValueChange={(value: 'all' | 'income' | 'expense') => setFilterType(value)}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="income">Revenus</SelectItem>
              <SelectItem value="expense">Dépenses</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="roman-btn-outline" onClick={handleExport}>
          <FileDown className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-rome-gold/30 text-left">
              <th className="py-2 px-4 font-cinzel">Date</th>
              <th className="py-2 px-4 font-cinzel">Type</th>
              <th className="py-2 px-4 font-cinzel">Montant</th>
              <th className="py-2 px-4 font-cinzel">Destinataire</th>
              <th className="py-2 px-4 font-cinzel">Catégorie</th>
              <th className="py-2 px-4 font-cinzel">Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center text-muted-foreground">
                  Aucune transaction trouvée
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-rome-gold/10">
                  <td className="py-3 px-4">
                    {format(transaction.date, 'dd MMMM yyyy', { locale: fr })}
                  </td>
                  <td className="py-3 px-4">
                    {transaction.type === 'income' ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        <ArrowDownCircle className="h-3 w-3 mr-1" />
                        Revenu
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-rome-terracotta/30 text-rome-terracotta">
                        <ArrowUpCircle className="h-3 w-3 mr-1" />
                        Dépense
                      </Badge>
                    )}
                  </td>
                  <td className={`py-3 px-4 font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-rome-terracotta'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                  </td>
                  <td className="py-3 px-4">{transaction.recipient || transaction.target || 'Non spécifié'}</td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary" className="font-normal">
                      {transaction.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm">{transaction.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
