
import React, { useState } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formatCurrency } from '@/utils/currencyUtils';
import { ArrowDown, ArrowUp, Wallet } from 'lucide-react';

// Catégories prédéfinies
const CATEGORIES = [
  "Propriétés", "Investissements", "Commerce", "Agriculture", 
  "Entretien", "Personnel", "Impôts", "Cadeaux", "Politique", 
  "Religion", "Militaire", "Famille", "Divertissement", "Autre"
];

interface PaymentFormProps {
  onPayment: (amount: number, recipient: string, category: string, description?: string) => boolean;
  onReceive: (amount: number, source: string, category: string, description?: string) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onPayment, onReceive }) => {
  const [activeTab, setActiveTab] = useState<'payment' | 'income'>('payment');
  
  // Schéma de validation pour les paiements
  const paymentSchema = z.object({
    amount: z.preprocess(
      (a) => parseFloat(a as string), 
      z.number().positive("Le montant doit être positif")
    ),
    recipient: z.string().min(2, "Le destinataire est requis"),
    category: z.string().min(1, "La catégorie est requise"),
    description: z.string().optional()
  });
  
  // Schéma de validation pour les revenus
  const incomeSchema = z.object({
    amount: z.preprocess(
      (a) => parseFloat(a as string), 
      z.number().positive("Le montant doit être positif")
    ),
    source: z.string().min(2, "La source est requise"),
    category: z.string().min(1, "La catégorie est requise"),
    description: z.string().optional()
  });
  
  // Formulaire pour les paiements
  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: '',
      recipient: '',
      category: '',
      description: ''
    }
  });
  
  // Formulaire pour les revenus
  const incomeForm = useForm<z.infer<typeof incomeSchema>>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      amount: '',
      source: '',
      category: '',
      description: ''
    }
  });
  
  // Gestion de la soumission du paiement
  const handlePaymentSubmit = (values: z.infer<typeof paymentSchema>) => {
    const success = onPayment(
      values.amount, 
      values.recipient, 
      values.category, 
      values.description
    );
    
    if (success) {
      paymentForm.reset();
    }
  };
  
  // Gestion de la soumission du revenu
  const handleIncomeSubmit = (values: z.infer<typeof incomeSchema>) => {
    onReceive(
      values.amount, 
      values.source, 
      values.category, 
      values.description
    );
    
    incomeForm.reset();
  };
  
  return (
    <Tabs 
      defaultValue="payment" 
      value={activeTab} 
      onValueChange={(value) => setActiveTab(value as 'payment' | 'income')}
    >
      <TabsList className="mb-4">
        <TabsTrigger value="payment" className="flex items-center">
          <ArrowDown className="mr-2 h-4 w-4" />
          Effectuer un paiement
        </TabsTrigger>
        <TabsTrigger value="income" className="flex items-center">
          <ArrowUp className="mr-2 h-4 w-4" />
          Enregistrer un revenu
        </TabsTrigger>
      </TabsList>
      
      {/* Onglet de paiement */}
      <TabsContent value="payment">
        <Form {...paymentForm}>
          <form onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={paymentForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type="number" placeholder="0" />
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted-foreground">
                          As
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={paymentForm.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destinataire</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nom du destinataire" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={paymentForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={paymentForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Description du paiement" />
                  </FormControl>
                  <FormDescription>
                    Une brève description de ce paiement
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">
              <ArrowDown className="mr-2 h-4 w-4" />
              Effectuer le paiement
            </Button>
          </form>
        </Form>
      </TabsContent>
      
      {/* Onglet de revenu */}
      <TabsContent value="income">
        <Form {...incomeForm}>
          <form onSubmit={incomeForm.handleSubmit(handleIncomeSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={incomeForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} type="number" placeholder="0" />
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted-foreground">
                          As
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={incomeForm.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Origine du revenu" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={incomeForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={incomeForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Description du revenu" />
                  </FormControl>
                  <FormDescription>
                    Une brève description de ce revenu
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" variant="secondary">
              <ArrowUp className="mr-2 h-4 w-4" />
              Enregistrer le revenu
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
};
