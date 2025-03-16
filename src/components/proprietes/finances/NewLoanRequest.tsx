
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  Form, FormControl, FormDescription, FormField, 
  FormItem, FormLabel, FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertCircle, Check, Coins, HelpCircle, Info, 
  Percent, ShieldAlert, AlertTriangle
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/utils/currencyUtils';
import { Lender } from './hooks/useLoanManagement';

interface NewLoanRequestProps {
  lenders: Lender[];
  onRequestLoan: (amount: number, lenderId: string, duration: number, purpose: string) => void;
  balance: number;
}

// Schéma de validation du formulaire
const loanRequestSchema = z.object({
  amount: z.number()
    .min(5000, { message: 'Le montant minimum est de 5,000 As' })
    .max(200000, { message: 'Le montant maximum est de 200,000 As' }),
  lenderId: z.string({ required_error: 'Veuillez sélectionner un prêteur' }),
  duration: z.number()
    .min(0.5, { message: 'La durée minimale est de 6 mois' })
    .max(5, { message: 'La durée maximale est de 5 ans' }),
  purpose: z.string()
    .min(5, { message: 'Veuillez fournir une description d\'au moins 5 caractères' })
    .max(200, { message: 'La description ne doit pas dépasser 200 caractères' })
});

export const NewLoanRequest: React.FC<NewLoanRequestProps> = ({ 
  lenders, 
  onRequestLoan,
  balance
}) => {
  const [selectedLenderId, setSelectedLenderId] = useState<string>('');
  
  const form = useForm<z.infer<typeof loanRequestSchema>>({
    resolver: zodResolver(loanRequestSchema),
    defaultValues: {
      amount: 20000,
      lenderId: '',
      duration: 1,
      purpose: ''
    }
  });
  
  const watchedAmount = form.watch('amount');
  const watchedDuration = form.watch('duration');
  const watchedLenderId = form.watch('lenderId');
  
  // Obtenir le prêteur sélectionné
  const selectedLender = lenders.find(l => l.id === watchedLenderId);
  
  // Calculer le taux d'intérêt appliqué
  const getAppliedRate = (): number => {
    if (!selectedLender) return 0;
    
    const baseRate = selectedLender.baseInterestRate;
    // Ajuster le taux en fonction du montant
    const amountAdjustment = watchedAmount > 50000 ? 2 : 0;
    // Ajuster le taux en fonction de la durée
    const durationAdjustment = watchedDuration > 2 ? 1 : 0;
    
    return baseRate + amountAdjustment + durationAdjustment;
  };
  
  // Calculer le coût total du prêt
  const calculateTotalCost = (): number => {
    const amount = watchedAmount || 0;
    const duration = watchedDuration || 0;
    const rate = getAppliedRate();
    
    return amount + (amount * rate / 100 * duration);
  };
  
  // Calculer le paiement trimestriel
  const calculateQuarterlyPayment = (): number => {
    const amount = watchedAmount || 0;
    const duration = watchedDuration || 0;
    const totalCost = calculateTotalCost();
    
    // 4 paiements par an
    const totalPayments = duration * 4;
    
    return Math.round(totalCost / totalPayments);
  };
  
  const onSubmit = (data: z.infer<typeof loanRequestSchema>) => {
    onRequestLoan(data.amount, data.lenderId, data.duration, data.purpose);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Coins className="h-4 w-4 mr-2 text-muted-foreground" />
              Solde actuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
            <p className="text-xs text-muted-foreground mt-1">Fonds disponibles pour garantir le prêt</p>
          </CardContent>
        </Card>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nouvelle demande de prêt</CardTitle>
              <CardDescription>
                Complétez le formulaire ci-dessous pour soumettre une demande de prêt.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="lenderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prêteur</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedLenderId(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un prêteur" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {lenders.map((lender) => (
                          <SelectItem key={lender.id} value={lender.id}>
                            {lender.name} ({lender.baseInterestRate}%)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {selectedLender && (
                <div className="bg-stone-50 p-3 rounded-md border text-sm space-y-2">
                  <p className="font-medium">{selectedLender.name}</p>
                  <p>{selectedLender.description}</p>
                  {selectedLender.requirements && (
                    <div className="flex items-start gap-2 text-amber-700 bg-amber-50 p-2 rounded border border-amber-200 mt-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs">{selectedLender.requirements}</p>
                    </div>
                  )}
                </div>
              )}
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant du prêt</FormLabel>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                          />
                        </FormControl>
                        <span className="ml-2 text-sm font-medium">As</span>
                      </div>
                      <Slider
                        value={[field.value]}
                        min={5000}
                        max={200000}
                        step={1000}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5,000 As</span>
                        <span>200,000 As</span>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durée du prêt (en années)</FormLabel>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormControl>
                          <Input
                            type="number"
                            step="0.5"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <span className="ml-2 text-sm font-medium">
                          {watchedDuration > 1 ? 'années' : 'année'}
                        </span>
                      </div>
                      <Slider
                        value={[field.value]}
                        min={0.5}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>6 mois</span>
                        <span>5 ans</span>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objet du prêt</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez la raison pour laquelle vous demandez ce prêt..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Soyez précis dans votre demande pour augmenter vos chances d'obtenir le prêt.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {selectedLender && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Percent className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-medium">Taux d'intérêt appliqué</span>
                    </div>
                    <span className="font-bold text-lg">{getAppliedRate()}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Coins className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-medium">Coût total du prêt</span>
                    </div>
                    <span className="font-bold text-lg">{formatCurrency(calculateTotalCost())}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-medium">Paiement trimestriel</span>
                    </div>
                    <span className="font-bold text-lg">{formatCurrency(calculateQuarterlyPayment())}</span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4 mt-0.5" />
                <p>
                  Les prêts doivent être remboursés trimestriellement. 
                  Une pénalité s'applique en cas de retard de paiement.
                </p>
              </div>
              <Button type="submit" disabled={!selectedLender}>
                Soumettre la demande
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
