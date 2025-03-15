
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TreasuryStatus, EconomieCreationData } from '../../types/economie';
import { useToast } from '@/components/ui/use-toast';
import { Coins, Building, Users, ReceiptText } from 'lucide-react';

interface TransactionManagementProps {
  onCreateTransaction: (data: EconomieCreationData) => void;
  treasury: TreasuryStatus;
}

export const TransactionManagement: React.FC<TransactionManagementProps> = ({
  onCreateTransaction,
  treasury
}) => {
  const [transactionType, setTransactionType] = useState<string>('income');
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('general');
  const [source, setSource] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (amount <= 0) {
      toast({
        title: "Montant invalide",
        description: "Le montant doit être supérieur à zéro.",
        variant: "destructive"
      });
      return;
    }

    // Adjust negative amounts for expenses
    const adjustedAmount = transactionType === 'expense' ? -Math.abs(amount) : Math.abs(amount);

    // Create transaction data
    const transactionData: EconomieCreationData = {
      amount: adjustedAmount,
      description,
      category,
      type: transactionType as string,
      date: new Date(),
      source: source || 'manual',
      approved: true,
    };

    // Submit transaction
    onCreateTransaction(transactionData);

    // Reset form
    setAmount(0);
    setDescription('');
    setSource('');
    toast({
      title: "Transaction créée",
      description: `Transaction de ${Math.abs(adjustedAmount)} As enregistrée.`
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Coins className="h-5 w-5 mr-2" />
          Nouvelle Transaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="transactionType">Type de transaction</Label>
              <Select 
                value={transactionType} 
                onValueChange={setTransactionType}
              >
                <SelectTrigger id="transactionType">
                  <SelectValue placeholder="Type de transaction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Revenu</SelectItem>
                  <SelectItem value="expense">Dépense</SelectItem>
                  <SelectItem value="tax">Impôt</SelectItem>
                  <SelectItem value="transfer">Transfert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (As)</Label>
              <Input 
                id="amount" 
                type="number" 
                min="0"
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Description détaillée de la transaction"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select 
                value={category} 
                onValueChange={setCategory}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Général</SelectItem>
                  <SelectItem value="military">Militaire</SelectItem>
                  <SelectItem value="buildings">Bâtiments</SelectItem>
                  <SelectItem value="slaves">Esclaves</SelectItem>
                  <SelectItem value="tax">Taxes</SelectItem>
                  <SelectItem value="politics">Politique</SelectItem>
                  <SelectItem value="religion">Religion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="source">Source / Destinataire</Label>
              <Input 
                id="source" 
                placeholder="Nom de la personne ou institution"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <div className="text-sm text-muted-foreground">
              Solde actuel: <span className="font-medium">{treasury.balance.toLocaleString()} As</span>
            </div>
            <Button type="submit">
              {transactionType === 'income' ? 'Enregistrer le revenu' : 'Enregistrer la dépense'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
