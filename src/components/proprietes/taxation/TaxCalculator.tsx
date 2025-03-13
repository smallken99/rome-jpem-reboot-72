
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { ArrowRight, Calculator } from 'lucide-react';
import { formatMoney } from '@/utils/formatUtils';

export const TaxCalculator: React.FC = () => {
  const { balance } = usePatrimoine();
  
  // Input values
  const [propertyValue, setPropertyValue] = useState<number>(100000);
  const [annualIncome, setAnnualIncome] = useState<number>(balance * 0.2); // 20% of balance as annual income
  const [patrimonyType, setPatrimonyType] = useState<string>("standard");
  
  // Tax rates - these would come from an API in a real app
  const taxRates = {
    propertyTax: 0.05, // 5%
    incomeTaxStandard: 0.1, // 10%
    incomeTaxEquestrian: 0.08, // 8% - discount for equestrians
    incomeTaxSenatorial: 0.12, // 12% - higher for senators
    wealthTax: 0.02, // 2% wealth tax
  };
  
  // Calculated taxes
  const calculateTaxes = () => {
    // Property tax
    const calculatedPropertyTax = propertyValue * taxRates.propertyTax;
    
    // Income tax based on social status
    let incomeTaxRate = taxRates.incomeTaxStandard;
    if (patrimonyType === "equestrian") {
      incomeTaxRate = taxRates.incomeTaxEquestrian;
    } else if (patrimonyType === "senatorial") {
      incomeTaxRate = taxRates.incomeTaxSenatorial;
    }
    
    const calculatedIncomeTax = annualIncome * incomeTaxRate;
    
    // Wealth tax only applies to senatorial class
    const calculatedWealthTax = patrimonyType === "senatorial" ? 
      (propertyValue + balance) * taxRates.wealthTax : 0;
    
    return {
      propertyTax: calculatedPropertyTax,
      incomeTax: calculatedIncomeTax,
      wealthTax: calculatedWealthTax,
      totalTax: calculatedPropertyTax + calculatedIncomeTax + calculatedWealthTax
    };
  };
  
  const taxResults = calculateTaxes();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Calculateur d'impôts</CardTitle>
            <CardDescription>
              Estimez vos impôts en fonction de votre patrimoine et de vos revenus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="property-value">Valeur de vos propriétés</Label>
              <Input
                id="property-value"
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                La valeur totale de vos biens immobiliers
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="annual-income">Revenus annuels</Label>
              <Input
                id="annual-income"
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Vos revenus totaux de l'année en cours
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="patrimony-type">Statut social</Label>
              <Select
                value={patrimonyType}
                onValueChange={setPatrimonyType}
              >
                <SelectTrigger id="patrimony-type">
                  <SelectValue placeholder="Sélectionnez votre statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plebeian">Plébéien</SelectItem>
                  <SelectItem value="standard">Citoyen standard</SelectItem>
                  <SelectItem value="equestrian">Ordre équestre</SelectItem>
                  <SelectItem value="senatorial">Ordre sénatorial</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Votre statut social affecte certains taux d'imposition
              </p>
            </div>
            
            <Button className="w-full roman-btn mt-4">
              <Calculator className="mr-2 h-4 w-4" />
              Calculer mes impôts
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Résultats de l'estimation</CardTitle>
            <CardDescription>
              Basé sur les valeurs que vous avez saisies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/20 rounded-md">
                <h3 className="text-sm font-medium">Impôts fonciers</h3>
                <div className="flex items-center mt-2">
                  <div className="text-2xl font-bold">{formatMoney(taxResults.propertyTax)}</div>
                  <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    {(taxRates.propertyTax * 100).toFixed(1)}% de {formatMoney(propertyValue)}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-muted/20 rounded-md">
                <h3 className="text-sm font-medium">Impôts sur le revenu</h3>
                <div className="flex items-center mt-2">
                  <div className="text-2xl font-bold">{formatMoney(taxResults.incomeTax)}</div>
                  <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    {patrimonyType === "equestrian" 
                      ? (taxRates.incomeTaxEquestrian * 100).toFixed(1)
                      : patrimonyType === "senatorial"
                        ? (taxRates.incomeTaxSenatorial * 100).toFixed(1)
                        : (taxRates.incomeTaxStandard * 100).toFixed(1)
                    }% de {formatMoney(annualIncome)}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-muted/20 rounded-md">
                <h3 className="text-sm font-medium">Impôts sur la fortune</h3>
                <div className="flex items-center mt-2">
                  <div className="text-2xl font-bold">{formatMoney(taxResults.wealthTax)}</div>
                  <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    {patrimonyType === "senatorial" 
                      ? `${(taxRates.wealthTax * 100).toFixed(1)}% de ${formatMoney(propertyValue + balance)}`
                      : "Non applicable"
                    }
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
                <h3 className="text-sm font-medium text-blue-900">Total des impôts estimés</h3>
                <div className="mt-2">
                  <div className="text-2xl font-bold text-blue-700">{formatMoney(taxResults.totalTax)}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md space-y-4">
              <h3 className="font-medium">Informations importantes</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Impôts fonciers:</span> Taxe appliquée sur la valeur de vos propriétés 
                  urbaines et rurales à un taux de {(taxRates.propertyTax * 100).toFixed(1)}%.
                </p>
                <p>
                  <span className="font-medium">Impôts sur le revenu:</span> Taux variable selon votre statut social, 
                  appliqué sur l'ensemble de vos revenus annuels.
                </p>
                <p>
                  <span className="font-medium">Impôts sur la fortune:</span> Applicable uniquement aux membres de 
                  l'ordre sénatorial, à un taux de {(taxRates.wealthTax * 100).toFixed(1)}% sur l'ensemble du patrimoine.
                </p>
                <p className="text-muted-foreground italic">
                  Cette estimation est fournie à titre indicatif et ne constitue pas un avis fiscal officiel.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
