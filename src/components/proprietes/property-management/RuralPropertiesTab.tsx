import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BuildingDescription } from '@/components/proprietes/hooks/building/types';

const mockRuralProperties: BuildingDescription[] = [
  {
    id: "rural-farm-1",
    name: "Ferme céréalière",
    type: "rural",
    description: "Une ferme produisant des céréales, base de l'alimentation romaine.",
    cost: 3000,
    maintenanceCost: 500,
    income: 1200,
    workers: { required: 10, optimal: 15, maxProfit: 20 },
    slaves: { required: 5, optimal: 10, maxProfit: 15 },
    production: 5000,
    advantages: ["Source stable de nourriture pour la population."],
  },
  {
    id: "rural-vineyard-1",
    name: "Vignoble",
    type: "rural",
    description: "Un vignoble produisant du vin, une boisson populaire à Rome.",
    cost: 5000,
    maintenanceCost: 800,
    income: 2000,
    workers: { required: 8, optimal: 12, maxProfit: 18 },
    slaves: { required: 10, optimal: 15, maxProfit: 20 },
    production: 3000,
    advantages: ["Production de vin pour le commerce et la consommation."],
  },
  {
    id: "rural-olive-grove-1",
    name: "Oliveraie",
    type: "rural",
    description: "Une oliveraie produisant des olives et de l'huile d'olive.",
    cost: 4000,
    maintenanceCost: 600,
    income: 1500,
    workers: { required: 7, optimal: 11, maxProfit: 16 },
    slaves: { required: 8, optimal: 12, maxProfit: 17 },
    production: 4000,
    advantages: ["Production d'huile d'olive pour l'alimentation et l'éclairage."],
  },
  {
    id: "rural-pasture-1",
    name: "Pâturage",
    type: "rural",
    description: "Un pâturage pour l'élevage de bétail, fournissant de la viande et du cuir.",
    cost: 2500,
    maintenanceCost: 400,
    income: 1000,
    workers: { required: 12, optimal: 18, maxProfit: 25 },
    slaves: { required: 0, optimal: 5, maxProfit: 8 },
    production: 6000,
    advantages: ["Source de viande et de cuir."],
  },
  {
    id: "rural-orchard-1",
    name: "Verger",
    type: "rural",
    description: "Un verger produisant des fruits variés.",
    cost: 3500,
    maintenanceCost: 550,
    income: 1300,
    workers: { required: 9, optimal: 14, maxProfit: 19 },
    slaves: { required: 6, optimal: 11, maxProfit: 16 },
    production: 4500,
    advantages: ["Production de fruits pour l'alimentation et le commerce."],
  },
];

const RuralPropertiesTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Propriétés Rurales</CardTitle>
        <CardDescription>
          Gérez vos propriétés rurales : fermes, vignobles, oliveraies et plus.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockRuralProperties.map((property) => (
              <div key={property.id} className="bg-muted rounded-md p-3">
                <h3 className="font-medium">{property.name}</h3>
                <p className="text-sm text-muted-foreground">{property.description}</p>
                <div className="mt-2 text-sm">
                  <p>Coût: {property.cost} deniers</p>
                  <p>Maintenance: {property.maintenanceCost} deniers</p>
                  <p>Revenu: {property.income} deniers</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RuralPropertiesTab;
