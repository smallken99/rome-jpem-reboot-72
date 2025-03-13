
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Coins } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { toast } from 'sonner';
import { formatMoney } from '@/utils/formatUtils';

export const NewLoanRequest: React.FC = () => {
  const { balance } = usePatrimoine();
  
  // Form state
  const [loanType, setLoanType] = useState<string>("borrow");
  const [amount, setAmount] = useState<number>(5000);
  const [interest, setInterest] = useState<number>(8);
  const [counterparty, setCounterparty] = useState<string>("");
  const [duration, setDuration] = useState<number>(6);
  const [collateral, setCollateral] = useState<string>("");
  const [includeCollateral, setIncludeCollateral] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  
  // Calculate monthly payment (simplified)
  const calculateMonthlyPayment = () => {
    // Simple interest calculation
    const totalInterest = (amount * interest * duration) / 1200; // Convert to monthly and percentage
    const totalAmount = amount + totalInterest;
    return totalAmount / duration; // Monthly payment
  };
  
  const monthlyPayment = calculateMonthlyPayment();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (loanType === "lend" && amount > balance) {
      toast.error("Vous n'avez pas assez de fonds pour accorder ce prêt");
      return;
    }
    
    if (!counterparty) {
      toast.error("Veuillez indiquer un nom de contrepartie");
      return;
    }
    
    toast.success(
      loanType === "borrow" 
        ? "Demande d'emprunt envoyée avec succès" 
        : "Offre de prêt envoyée avec succès"
    );
    
    // Reset form or redirect would happen here in a real app
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {loanType === "borrow" ? "Demande d'emprunt" : "Offre de prêt"}
            </CardTitle>
            <CardDescription>
              {loanType === "borrow" 
                ? "Emprunter des fonds auprès d'un autre citoyen ou d'une institution" 
                : "Prêter des fonds à un autre citoyen ou une institution"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Type de transaction</Label>
                <RadioGroup 
                  value={loanType} 
                  onValueChange={setLoanType}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="borrow" id="borrow" />
                    <Label htmlFor="borrow" className="font-normal">Emprunter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lend" id="lend" />
                    <Label htmlFor="lend" className="font-normal">Prêter</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant</Label>
                  <div className="relative">
                    <Coins className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="pl-8"
                      min={1}
                    />
                  </div>
                  {loanType === "lend" && amount > balance && (
                    <p className="text-xs text-red-500">
                      Ce montant dépasse vos fonds disponibles ({formatMoney(balance)})
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interest">Taux d'intérêt annuel (%)</Label>
                  <Input
                    id="interest"
                    type="number"
                    value={interest}
                    onChange={(e) => setInterest(Number(e.target.value))}
                    min={0}
                    max={20}
                    step={0.5}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="counterparty">
                    {loanType === "borrow" ? "Prêteur" : "Emprunteur"}
                  </Label>
                  <Input
                    id="counterparty"
                    value={counterparty}
                    onChange={(e) => setCounterparty(e.target.value)}
                    placeholder="Nom de la personne ou institution"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Durée (mois)</Label>
                  <Select
                    value={duration.toString()}
                    onValueChange={(value) => setDuration(Number(value))}
                  >
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Sélectionner une durée" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 mois</SelectItem>
                      <SelectItem value="6">6 mois</SelectItem>
                      <SelectItem value="12">1 an</SelectItem>
                      <SelectItem value="24">2 ans</SelectItem>
                      <SelectItem value="36">3 ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-collateral">Inclure une garantie</Label>
                  <Switch
                    id="include-collateral"
                    checked={includeCollateral}
                    onCheckedChange={setIncludeCollateral}
                  />
                </div>
                
                {includeCollateral && (
                  <div className="pt-2">
                    <Label htmlFor="collateral">Description de la garantie</Label>
                    <Input
                      id="collateral"
                      value={collateral}
                      onChange={(e) => setCollateral(e.target.value)}
                      placeholder="Ex: Propriété en Campanie, bijoux, etc."
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes additionnelles</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Conditions particulières, objectif du prêt, etc."
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end pt-4">
                <Button type="submit" className="roman-btn">
                  {loanType === "borrow" ? "Soumettre la demande" : "Proposer le prêt"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Résumé du prêt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Type:</p>
              <p className="font-medium">
                {loanType === "borrow" ? "Emprunt" : "Prêt"}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Montant principal:</p>
              <p className="font-medium">{formatMoney(amount)}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Taux d'intérêt:</p>
              <p className="font-medium">{interest}% par an</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Durée:</p>
              <p className="font-medium">{duration} mois</p>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-muted-foreground">Paiement mensuel estimé:</p>
              <p className="text-xl font-bold">{formatMoney(monthlyPayment)}</p>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-muted-foreground">Montant total à rembourser:</p>
              <p className="text-xl font-bold">
                {formatMoney(monthlyPayment * duration)}
              </p>
              
              <p className="text-sm text-muted-foreground mt-1">
                Intérêts totaux: {formatMoney(monthlyPayment * duration - amount)}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-muted p-4 rounded-md space-y-3">
          <h3 className="font-medium">Informations sur les prêts</h3>
          <p className="text-sm text-muted-foreground">
            Dans la Rome antique, les taux d'intérêt variaient généralement entre 4% et 12%. 
            Les prêts étaient souvent garantis par des propriétés ou d'autres actifs de valeur.
          </p>
          <p className="text-sm text-muted-foreground">
            Le défaut de paiement pouvait entraîner des conséquences graves, y compris la saisie 
            des biens ou même la servitude pour dettes dans certains cas extrêmes.
          </p>
        </div>
      </div>
    </div>
  );
};
