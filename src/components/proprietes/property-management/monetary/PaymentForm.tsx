
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, AlertCircle } from 'lucide-react';
import { Recipient } from '../hooks/useMonetaryManagement';
import { toast } from 'sonner';

type PaymentFormProps = {
  makePayment: (recipientId: string, amount: number, description: string, category: string) => boolean;
  recipients: Recipient[];
  balance: number;
};

export const PaymentForm: React.FC<PaymentFormProps> = ({ makePayment, recipients, balance }) => {
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Catégories de dépenses prédéfinies
  const categories = [
    'Entretien des propriétés',
    'Personnel',
    'Relations clientèle',
    'Impôts et taxes',
    'Dot matrimoniale',
    'Donations religieuses',
    'Festivités',
    'Achat de biens',
    'Investissements',
    'Divers'
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const numericAmount = parseInt(amount);
      
      if (isNaN(numericAmount)) {
        toast.error('Veuillez saisir un montant valide');
        setIsSubmitting(false);
        return;
      }
      
      if (!recipientId) {
        toast.error('Veuillez sélectionner un destinataire');
        setIsSubmitting(false);
        return;
      }
      
      if (!category) {
        toast.error('Veuillez sélectionner une catégorie');
        setIsSubmitting(false);
        return;
      }
      
      const success = makePayment(recipientId, numericAmount, description, category);
      
      if (success) {
        toast.success(`Paiement de ${numericAmount.toLocaleString()} As effectué avec succès`);
        // Réinitialiser le formulaire
        setRecipientId('');
        setAmount('');
        setDescription('');
        setCategory('');
      }
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors du paiement');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <div className="mb-4">
        <h3 className="font-cinzel text-lg text-rome-navy mb-2">Effectuer un paiement</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Solde disponible: <span className="font-bold">{balance.toLocaleString()} As</span>
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Destinataire</Label>
            <Select value={recipientId} onValueChange={setRecipientId}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un destinataire" />
              </SelectTrigger>
              <SelectContent>
                {recipients.map((recipient) => (
                  <SelectItem key={recipient.id} value={recipient.id}>
                    {recipient.name} ({recipient.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Montant (As)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Montant en As"
              min="1"
              max={balance}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Motif du paiement..."
            rows={3}
          />
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <AlertCircle className="h-4 w-4 mr-2" />
          Les paiements sont définitifs et ne peuvent être annulés.
        </div>
        
        <Button 
          type="submit" 
          className="roman-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Traitement...' : 'Effectuer le paiement'}
        </Button>
      </form>
    </div>
  );
};
