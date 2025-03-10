
import React, { useState } from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Home } from 'lucide-react';

// Données fictives - à remplacer par des données réelles
const familyProperties = [
  { id: 1, family: 'Julii', propertyCount: 12, totalValue: 1200000, prestigeScore: 85 },
  { id: 2, family: 'Cornelii', propertyCount: 15, totalValue: 1500000, prestigeScore: 90 },
  { id: 3, family: 'Claudii', propertyCount: 9, totalValue: 980000, prestigeScore: 75 },
  { id: 4, family: 'Fabii', propertyCount: 7, totalValue: 850000, prestigeScore: 65 },
  { id: 5, family: 'Aemilii', propertyCount: 11, totalValue: 1100000, prestigeScore: 80 },
];

const propertyDetails = {
  'Julii': [
    { id: 1, name: 'Villa du Palatin', type: 'Urbaine', value: 350000, condition: 90 },
    { id: 2, name: 'Domaine de Campanie', type: 'Rurale', value: 420000, condition: 85 },
    { id: 3, name: 'Insula près du Forum', type: 'Urbaine', value: 180000, condition: 70 },
  ],
  'Cornelii': [
    { id: 1, name: 'Villa sur l\'Aventin', type: 'Urbaine', value: 380000, condition: 95 },
    { id: 2, name: 'Domaine en Sicile', type: 'Rurale', value: 520000, condition: 80 },
  ],
  'Claudii': [
    { id: 1, name: 'Maison près du Circus Maximus', type: 'Urbaine', value: 290000, condition: 88 },
    { id: 2, name: 'Ferme en Étrurie', type: 'Rurale', value: 340000, condition: 92 },
  ],
  'Fabii': [
    { id: 1, name: 'Villa à Ostie', type: 'Urbaine', value: 310000, condition: 83 },
  ],
  'Aemilii': [
    { id: 1, name: 'Villa sur le Quirinal', type: 'Urbaine', value: 370000, condition: 91 },
    { id: 2, name: 'Domaine près de Capoue', type: 'Rurale', value: 420000, condition: 87 },
  ]
};

export const FamilyPropertiesTabContent: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<string>('Julii');
  
  const getConditionColor = (condition: number) => {
    if (condition >= 80) return 'bg-green-500';
    if (condition >= 50) return 'bg-yellow-500';
    if (condition >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  const formatMoney = (amount: number) => {
    return `${amount.toLocaleString()} As`;
  };

  return (
    <RomanCard>
      <RomanCard.Header>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-rome-navy" />
          <h2 className="font-cinzel text-lg">Propriétés par Famille</h2>
        </div>
      </RomanCard.Header>
      <RomanCard.Content>
        <p className="text-muted-foreground mb-6">
          Visualisez la répartition des propriétés entre les grandes familles de Rome.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-medium mb-3">Distribution des propriétés</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Famille</TableHead>
                  <TableHead>Nb. Propriétés</TableHead>
                  <TableHead>Valeur Totale</TableHead>
                  <TableHead>Prestige</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {familyProperties.map((family) => (
                  <TableRow 
                    key={family.id}
                    className={selectedFamily === family.family ? "bg-muted/30" : ""}
                    onClick={() => setSelectedFamily(family.family)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell className="font-medium">{family.family}</TableCell>
                    <TableCell>{family.propertyCount}</TableCell>
                    <TableCell>{formatMoney(family.totalValue)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={family.prestigeScore} className="h-2" />
                        <span className="text-xs">{family.prestigeScore}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Détail des propriétés</h3>
              <Select value={selectedFamily} onValueChange={setSelectedFamily}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sélectionner une famille" />
                </SelectTrigger>
                <SelectContent>
                  {familyProperties.map((family) => (
                    <SelectItem key={family.id} value={family.family}>
                      {family.family}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Propriété</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Valeur</TableHead>
                    <TableHead>État</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertyDetails[selectedFamily as keyof typeof propertyDetails]?.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.name}</TableCell>
                      <TableCell>{property.type}</TableCell>
                      <TableCell>{formatMoney(property.value)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={property.condition} 
                            className={`h-2 ${getConditionColor(property.condition)}`}
                          />
                          <span className="text-xs">{property.condition}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
