
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Coins } from 'lucide-react';

interface DowryFormProps {
  dowryAmount: number;
  setDowryAmount: (amount: number) => void;
  marriageYear: number;
  setMarriageYear: (year: number) => void;
  negotiationTerms: string;
  setNegotiationTerms: (terms: string) => void;
  currentYear: number;
}

export const DowryForm: React.FC<DowryFormProps> = ({
  dowryAmount,
  setDowryAmount,
  marriageYear,
  setMarriageYear,
  negotiationTerms,
  setNegotiationTerms,
  currentYear
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="dowry">Montant de la dot (en As)</Label>
        <div className="flex items-center gap-2">
          <Input
            id="dowry"
            type="number"
            value={dowryAmount}
            onChange={(e) => setDowryAmount(parseInt(e.target.value) || 0)}
            min={1000}
            className="flex-1"
          />
          <Coins className="h-5 w-5 text-rome-gold" />
        </div>
        <p className="text-xs text-muted-foreground">
          La dot minimale recommandée est de 5,000 As pour une alliance respectable.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="year">Année de mariage prévue</Label>
        <Input
          id="year"
          type="number"
          value={marriageYear}
          onChange={(e) => setMarriageYear(parseInt(e.target.value) || currentYear)}
          min={currentYear}
          max={currentYear + 5}
        />
        <p className="text-xs text-muted-foreground">
          L'année actuelle est {currentYear} AUC. Le mariage peut être planifié jusqu'à 5 ans dans le futur.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="terms">Termes de négociation additionnels</Label>
        <Textarea
          id="terms"
          value={negotiationTerms}
          onChange={(e) => setNegotiationTerms(e.target.value)}
          placeholder="Conditions spéciales, préférences, ou demandes particulières..."
          className="min-h-[120px]"
        />
      </div>
    </div>
  );
};
