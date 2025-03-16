
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingInventory } from '../hooks/building/useBuildingInventory';
import { Calculator, Calendar, Coins, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/currencyUtils';
import { toast } from 'sonner';

export const TaxationOverview: React.FC = () => {
  const { balance, addTransaction, properties } = usePatrimoine();
  const { ownedBuildings } = useBuildingInventory();
  
  // Simplified tax calculation
  const propertyTaxRate = 0.05; // 5%
  const incomeTaxRate = 0.1; // 10%
  
  // Calculated taxes - this would come from a proper API in a real app
  const propertyValue = properties.reduce((sum, p) => sum + p.value, 0) + 
                        ownedBuildings.reduce((sum, b) => sum + (b.maintenanceCost * 10), 0);
  const propertyTax = Math.round(propertyValue * propertyTaxRate);
  const incomeTax = Math.round(balance * 0.2 * incomeTaxRate); // Assuming 20% of balance is annual income
  const totalTaxDue = propertyTax + incomeTax;
  
  // Tax payment status - would be tracked properly in a real app
  const taxesPaid = Math.round(totalTaxDue * 0.4); // 40% of taxes paid for example
  const taxesRemaining = totalTaxDue - taxesPaid;
  const paymentProgress = (taxesPaid / totalTaxDue) * 100;
  
  // Next payment date - would come from a real app
  const nextPaymentDate = new Date();
  nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
  
  const handlePayTaxes = () => {
    // Vérifier si le joueur a les fonds suffisants
    if (taxesRemaining > balance) {
      toast.error(`Fonds insuffisants pour payer les impôts (manque ${formatCurrency(taxesRemaining - balance)})`);
      return;
    }
    
    // Enregistrer le paiement des impôts
    addTransaction({
      amount: -taxesRemaining,
      description: "Paiement des impôts",
      category: "Impôts et taxes",
      type: "expense"
    });
    
    toast.success(`Paiement d'impôts de ${formatCurrency(taxesRemaining)} effectué avec succès`);
    
    // Dans une vraie application, il faudrait mettre à jour l'état de paiement des impôts
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Impôts sur la propriété</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(propertyTax)}</div>
            <p className="text-xs text-muted-foreground">
              Basé sur une valeur estimée de {formatCurrency(propertyValue)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Impôts sur le revenu</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(incomeTax)}</div>
            <p className="text-xs text-muted-foreground">
              Basé sur vos revenus annuels estimés
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Prochain versement</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {nextPaymentDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
            </div>
            <p className="text-xs text-muted-foreground">
              Montant estimé: {formatCurrency(Math.round(totalTaxDue / 4))}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Statut des paiements d'impôts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Progression des paiements</span>
                <span className="text-sm font-medium">{Math.round(paymentProgress)}%</span>
              </div>
              <Progress value={paymentProgress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-md">
                <div>
                  <h3 className="font-medium">Impôts payés</h3>
                  <p className="text-xl font-semibold mt-1">{formatCurrency(taxesPaid)}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-red-50/50 rounded-md">
                <div>
                  <h3 className="font-medium text-red-800">Montant restant dû</h3>
                  <p className="text-xl font-semibold mt-1 text-red-700">{formatCurrency(taxesRemaining)}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button className="roman-btn" onClick={handlePayTaxes} disabled={taxesRemaining <= 0}>
                Payer les impôts dus
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
        <h3 className="flex items-center gap-2 font-medium text-amber-800">
          <AlertTriangle className="h-5 w-5" />
          Rappel de paiement d'impôts
        </h3>
        <p className="mt-2 text-sm text-amber-700">
          Les citoyens romains sont tenus de s'acquitter de leurs impôts dans les délais prévus 
          par la loi. Tout retard ou défaut de paiement peut entraîner des pénalités, 
          voir la confiscation de vos biens.
        </p>
      </div>
    </div>
  );
};
