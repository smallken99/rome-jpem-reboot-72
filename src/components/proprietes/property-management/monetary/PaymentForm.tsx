import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Coins, Send } from 'lucide-react';
import { formatCurrency } from '@/utils/currencyUtils';
import { Recipient } from '../hooks/useMonetaryManagement';

interface PaymentFormProps {
  makePayment: (recipientId: string, amount: number, description: string, category: string) => boolean;
  recipients: Recipient[];
  balance: number;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  makePayment,
  recipients,
  balance
}) => {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    description: '',
    category: 'Entretien'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.recipient) {
      setError('Veuillez sélectionner un destinataire');
      return;
    }
    
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      setError('Veuillez entrer un montant valide');
      return;
    }
    
    const amount = Number(formData.amount);
    
    if (amount > balance) {
      setError('Fonds insuffisants pour effectuer ce paiement');
      return;
    }
    
    const success = makePayment(
      formData.recipient,
      amount,
      formData.description || 'Paiement',
      formData.category
    );
    
    if (success) {
      setSuccess(`Paiement de ${formatCurrency(amount)} effectué avec succès`);
      setFormData({
        recipient: '',
        amount: '',
        description: '',
        category: 'Entretien'
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Erreur lors du paiement');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-3 bg-muted rounded-md flex items-center justify-between">
        <div className="flex items-center">
          <Coins className="h-5 w-5 text-rome-gold mr-2" />
          <span className="text-sm font-medium">Solde disponible:</span>
        </div>
        <span className="font-bold">{formatCurrency(balance)}</span>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Destinataire</Label>
          <Select value={formData.recipient} onValueChange={value => handleInputChange('recipient', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir un destinataire" />
            </SelectTrigger>
            <SelectContent>
              {recipients.map(recipient => (
                <SelectItem key={recipient.id} value={recipient.id}>
                  <div className="flex items-center gap-2">
                    <span>{recipient.name}</span>
                    <Badge variant="outline" className="ml-2">
                      {recipient.type || recipient.relationship || 'Non spécifié'}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Montant</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0"
            value={formData.amount}
            onChange={e => handleInputChange('amount', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select value={formData.category} onValueChange={value => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choisir une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Entretien">Entretien</SelectItem>
              <SelectItem value="Personnel">Personnel</SelectItem>
              <SelectItem value="Impôts">Impôts</SelectItem>
              <SelectItem value="Cadeaux">Cadeaux</SelectItem>
              <SelectItem value="Investissement">Investissement</SelectItem>
              <SelectItem value="Autre">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description (optionnel)</Label>
          <Input
            id="description"
            placeholder="Raison du paiement"
            value={formData.description}
            onChange={e => handleInputChange('description', e.target.value)}
          />
        </div>
      </div>
      
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-600 rounded-md text-sm">
          {success}
        </div>
      )}
      
      <Button type="submit" className="w-full">
        <Send className="h-4 w-4 mr-2" />
        Effectuer le paiement
      </Button>
    </form>
  );
};
