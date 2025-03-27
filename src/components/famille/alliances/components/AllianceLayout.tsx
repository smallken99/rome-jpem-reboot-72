
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface Family {
  id: string;
  name: string;
  prestige: string;
  influence: string;
  wealth: string;
}

interface AllianceLayoutProps {
  dowryAmount: number;
  setDowryAmount: (amount: number) => void;
  marriageYear: number;
  setMarriageYear: (year: number) => void;
  negotiationTerms: string;
  setNegotiationTerms: (terms: string) => void;
  currentYear: number;
  families: Family[];
  selectedFamily: string;
  onSelectFamily: (id: string) => void;
}

export const AllianceLayout: React.FC<AllianceLayoutProps> = ({
  dowryAmount,
  setDowryAmount,
  marriageYear,
  setMarriageYear,
  negotiationTerms,
  setNegotiationTerms,
  currentYear,
  families,
  selectedFamily,
  onSelectFamily
}) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div>
          <Label htmlFor="family">Famille pour l'alliance</Label>
          <Select
            value={selectedFamily}
            onValueChange={onSelectFamily}
          >
            <SelectTrigger id="family">
              <SelectValue placeholder="Sélectionnez une famille" />
            </SelectTrigger>
            <SelectContent>
              {families.map(family => (
                <SelectItem key={family.id} value={family.id}>
                  {family.name} (Prestige: {family.prestige})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedFamily && (
          <>
            <div>
              <Label htmlFor="dowry">Montant de la dot: {dowryAmount.toLocaleString()} deniers</Label>
              <Slider
                id="dowry"
                value={[dowryAmount]}
                min={5000}
                max={200000}
                step={5000}
                onValueChange={(value) => setDowryAmount(value[0])}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Une dot plus importante augmente les chances de succès de l'alliance
              </p>
            </div>
            
            <div>
              <Label htmlFor="year">Année du mariage</Label>
              <Select 
                value={marriageYear.toString()} 
                onValueChange={(value) => setMarriageYear(parseInt(value))}
              >
                <SelectTrigger id="year">
                  <SelectValue placeholder="Choisir une année" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={currentYear.toString()}>
                    Cette année ({currentYear})
                  </SelectItem>
                  <SelectItem value={(currentYear + 1).toString()}>
                    L'année prochaine ({currentYear + 1})
                  </SelectItem>
                  <SelectItem value={(currentYear + 2).toString()}>
                    Dans deux ans ({currentYear + 2})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="terms">Termes de négociation (optionnel)</Label>
              <Textarea
                id="terms"
                placeholder="Entrez les termes spécifiques que vous souhaitez proposer..."
                value={negotiationTerms}
                onChange={(e) => setNegotiationTerms(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            {selectedFamily && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Informations sur la famille</h4>
                <div className="grid grid-cols-3 gap-2 text-sm text-blue-700">
                  <div>
                    <span className="font-medium">Prestige:</span>
                    <p>{families.find(f => f.id === selectedFamily)?.prestige}</p>
                  </div>
                  <div>
                    <span className="font-medium">Influence:</span>
                    <p>{families.find(f => f.id === selectedFamily)?.influence}</p>
                  </div>
                  <div>
                    <span className="font-medium">Richesse:</span>
                    <p>{families.find(f => f.id === selectedFamily)?.wealth}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
