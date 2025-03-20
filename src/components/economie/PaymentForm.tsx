
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface PaymentFormProps {
  onSubmit?: (paymentData: any) => void;
  categories?: string[];
  title?: string;
  defaultType?: 'income' | 'expense';
  // Nouvelles propriétés pour la compatibilité
  onPayment?: (amount: number, recipient: string, category: string, description?: string) => boolean;
  onReceive?: (amount: number, source: string, category: string, description?: string) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  onSubmit,
  onPayment,
  onReceive,
  categories = ['Personnel', 'Impôts', 'Entretien', 'Divers', 'Investissement', 'Commerce'],
  title = "Enregistrer une transaction",
  defaultType = 'expense'
}) => {
  const [category, setCategory] = useState(categories[0] || '');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'income' | 'expense'>(defaultType);
  const [source, setSource] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!category || !amount || !description || !source) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    // Si nous avons la nouvelle interface onPayment/onReceive
    if ((type === 'expense' && onPayment) || (type === 'income' && onReceive)) {
      if (type === 'expense' && onPayment) {
        const success = onPayment(amount, source, category, description);
        if (success) {
          resetForm();
        }
        return;
      } else if (type === 'income' && onReceive) {
        onReceive(amount, source, category, description);
        resetForm();
        return;
      }
    }

    // Interface originale
    if (onSubmit) {
      const paymentData = {
        category,
        amount: Number(amount),
        description,
        type,
        source,
        isRecurring,
        date: {
          year: new Date().getFullYear(),
          season: 'SPRING'
        }
      };
  
      onSubmit(paymentData);
      resetForm();
    }
  };

  const resetForm = () => {
    // Réinitialiser le formulaire
    setCategory(categories[0] || '');
    setAmount(0);
    setDescription('');
    setSource('');
    setIsRecurring(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type de transaction</Label>
              <Select value={type} onValueChange={(value: 'income' | 'expense') => setType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Revenu</SelectItem>
                  <SelectItem value="expense">Dépense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source">Source / Destinataire</Label>
              <Input 
                id="source" 
                placeholder="Ex: Commerces, Armée..." 
                value={source} 
                onChange={(e) => setSource(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (en As)</Label>
              <Input 
                id="amount" 
                type="number" 
                placeholder="Montant" 
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
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="recurring"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="recurring">Transaction récurrente</Label>
          </div>
          
          <Button type="submit" className="w-full">
            Enregistrer la transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
