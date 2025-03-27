
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AllianceLayout } from './AllianceLayout';
import { useAllianceCalculations } from '../hooks/useAllianceCalculations';
import { toast } from '@/components/ui-custom/toast';

interface Family {
  id: string;
  name: string;
  prestige: string;
  influence: string;
  wealth: string;
}

// Example families
const potentialFamilies: Family[] = [
  { id: '1', name: 'Cornelii', prestige: 'élevé', influence: '++++', wealth: '+++' },
  { id: '2', name: 'Julii', prestige: 'très élevé', influence: '++++', wealth: '++++' },
  { id: '3', name: 'Claudii', prestige: 'élevé', influence: '+++', wealth: '++' },
  { id: '4', name: 'Aemilii', prestige: 'moyen', influence: '++', wealth: '+++' },
  { id: '5', name: 'Valerii', prestige: 'moyen', influence: '++', wealth: '++' },
];

interface AllianceCreationProps {
  currentYear: number;
  currentSeason: string;
}

export const AllianceCreation: React.FC<AllianceCreationProps> = ({ 
  currentYear,
  currentSeason
}) => {
  const [dowryAmount, setDowryAmount] = useState<number>(50000);
  const [marriageYear, setMarriageYear] = useState<number>(currentYear + 1);
  const [negotiationTerms, setNegotiationTerms] = useState<string>('');
  const [selectedFamily, setSelectedFamily] = useState<string>('');
  const [allianceType, setAllianceType] = useState<string>('matrimoniale');
  
  const { benefits } = useAllianceCalculations(selectedFamily, potentialFamilies);
  
  const handleCreateAlliance = () => {
    if (!selectedFamily) {
      toast.error("Veuillez sélectionner une famille.");
      return;
    }
    
    toast.success("Proposition d'alliance envoyée avec succès.");
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Créer une Nouvelle Alliance</h3>
        <p className="text-sm text-gray-500">
          Proposez une alliance à une autre famille romaine
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="alliance-type">Type d'Alliance</Label>
              <Select 
                value={allianceType} 
                onValueChange={setAllianceType}
              >
                <SelectTrigger id="alliance-type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="matrimoniale">Matrimoniale</SelectItem>
                  <SelectItem value="politique">Politique</SelectItem>
                  <SelectItem value="commerciale">Commerciale</SelectItem>
                  <SelectItem value="militaire">Militaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {allianceType === 'matrimoniale' && (
              <AllianceLayout 
                dowryAmount={dowryAmount}
                setDowryAmount={setDowryAmount}
                marriageYear={marriageYear}
                setMarriageYear={setMarriageYear}
                negotiationTerms={negotiationTerms}
                setNegotiationTerms={setNegotiationTerms}
                currentYear={currentYear}
                families={potentialFamilies}
                selectedFamily={selectedFamily}
                onSelectFamily={setSelectedFamily}
              />
            )}
            
            {allianceType !== 'matrimoniale' && (
              <div className="text-center py-8 text-gray-500 italic">
                Les alliances de type {allianceType} seront disponibles prochainement.
              </div>
            )}
            
            {selectedFamily && (
              <div className="space-y-4">
                <h4 className="font-medium">Bénéfices potentiels de cette alliance</h4>
                <ul className="space-y-1 text-sm list-disc pl-5">
                  {benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex justify-end pt-4">
              <Button onClick={handleCreateAlliance}>
                Envoyer la proposition
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
