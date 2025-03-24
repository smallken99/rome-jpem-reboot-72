
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Lender } from './hooks/useLoanManagement';
import { formatCurrency } from '@/utils/currencyUtils';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Coins, Calendar, TrendingUp, Info } from 'lucide-react';

interface NewLoanRequestProps {
  lenders: Lender[];
  onRequestLoan: (amount: number, lenderId: string, duration: number, purpose: string) => void;
  balance: number;
}

export const NewLoanRequest: React.FC<NewLoanRequestProps> = ({ 
  lenders, 
  onRequestLoan,
  balance
}) => {
  const [amount, setAmount] = useState(10000);
  const [selectedLenderId, setSelectedLenderId] = useState('');
  const [duration, setDuration] = useState(1);
  const [purpose, setPurpose] = useState('');
  
  // Trouver le prêteur sélectionné
  const selectedLender = lenders.find(l => l.id === selectedLenderId);
  
  // Calculer le taux d'intérêt (simplifié pour l'exemple)
  const getInterestRate = () => {
    if (!selectedLender) return 0;
    
    const baseRate = selectedLender.baseInterestRate;
    const amountModifier = amount > 50000 ? 2 : 0;
    const durationModifier = duration > 3 ? 1 : 0;
    
    return baseRate + amountModifier + durationModifier;
  };
  
  // Calculer le montant total à rembourser
  const calculateTotalRepayment = () => {
    const interestRate = getInterestRate();
    const interestAmount = amount * (interestRate / 100) * duration;
    return amount + interestAmount;
  };
  
  // Calculer le paiement trimestriel
  const calculateQuarterlyPayment = () => {
    const totalRepayment = calculateTotalRepayment();
    return totalRepayment / (duration * 4); // 4 paiements par an
  };
  
  // Vérifier si la demande est valide
  const isValidRequest = !!selectedLenderId && amount > 0 && duration > 0 && purpose.trim() !== '';
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidRequest) {
      onRequestLoan(amount, selectedLenderId, duration, purpose);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="lender">Sélectionner un prêteur</Label>
              <Select value={selectedLenderId} onValueChange={setSelectedLenderId}>
                <SelectTrigger id="lender">
                  <SelectValue placeholder="Choisir un prêteur" />
                </SelectTrigger>
                <SelectContent>
                  {lenders.map((lender) => (
                    <SelectItem key={lender.id} value={lender.id}>
                      {lender.name} ({lender.baseInterestRate}% de base)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="amount">Montant du prêt</Label>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(amount)}
                </span>
              </div>
              <Slider
                id="amount"
                value={[amount]}
                min={1000}
                max={selectedLender ? selectedLender.maxLoanAmount : 100000}
                step={1000}
                onValueChange={(value) => setAmount(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1,000 As</span>
                <span>{formatCurrency(selectedLender ? selectedLender.maxLoanAmount : 100000)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="duration">Durée (années)</Label>
                <span className="text-sm text-muted-foreground">
                  {duration} an{duration > 1 ? 's' : ''}
                </span>
              </div>
              <Slider
                id="duration"
                value={[duration]}
                min={1}
                max={5}
                step={1}
                onValueChange={(value) => setDuration(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 an</span>
                <span>5 ans</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="purpose">Objet du prêt</Label>
              <Input
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Acquisition de propriété, investissement commercial..."
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {selectedLender && (
            <RomanCard>
              <RomanCard.Header>
                <h4 className="text-lg font-medium">{selectedLender.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedLender.type}</p>
              </RomanCard.Header>
              <RomanCard.Content>
                <p className="text-sm mb-4">{selectedLender.description}</p>
                
                {selectedLender.requirements && (
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 text-sm text-blue-700 flex gap-2">
                    <Info className="h-5 w-5 shrink-0" />
                    <p>{selectedLender.requirements}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Taux d'intérêt</div>
                      <div className="font-medium">{getInterestRate()}%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">Paiements</div>
                      <div className="font-medium">{duration * 4} (trimestriels)</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 bg-muted/20 p-3 rounded-md">
                  <div className="flex justify-between">
                    <span className="text-sm">Montant emprunté:</span>
                    <span className="font-medium">{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Intérêts totaux:</span>
                    <span className="font-medium">{formatCurrency(calculateTotalRepayment() - amount)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-sm font-medium">Montant total à rembourser:</span>
                    <span className="font-bold">{formatCurrency(calculateTotalRepayment())}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-sm">Paiement trimestriel:</span>
                    <span className="font-medium">{formatCurrency(calculateQuarterlyPayment())}</span>
                  </div>
                </div>
              </RomanCard.Content>
            </RomanCard>
          )}
          
          {!selectedLender && (
            <div className="h-full flex items-center justify-center p-8 bg-muted/10 border rounded-md">
              <div className="text-center">
                <Coins className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">
                  Veuillez sélectionner un prêteur pour voir les détails du prêt
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          Solde actuel: <span className="font-medium">{formatCurrency(balance)}</span>
        </div>
        
        <Button 
          type="submit" 
          disabled={!isValidRequest}
          className="roman-btn"
        >
          <Coins className="mr-2 h-4 w-4" />
          Soumettre la demande de prêt
        </Button>
      </div>
    </form>
  );
};
