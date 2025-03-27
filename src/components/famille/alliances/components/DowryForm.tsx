
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/utils/formatters';

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
    <div className="space-y-4 border rounded-md p-4">
      <div className="space-y-2">
        <Label htmlFor="dowry">Montant de la Dot</Label>
        <div className="flex justify-between items-center">
          <Slider
            id="dowry-slider"
            value={[dowryAmount]} 
            min={10000}
            max={200000}
            step={5000}
            onValueChange={(values) => setDowryAmount(values[0])}
            className="w-3/4 mr-4"
          />
          <Input
            type="number"
            value={dowryAmount}
            onChange={(e) => setDowryAmount(Number(e.target.value))}
            className="w-1/4"
          />
        </div>
        <div className="text-sm text-gray-500">
          {formatCurrency(dowryAmount)}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="marriage-year">Année Prévue du Mariage</Label>
        <div className="flex justify-between items-center">
          <Slider
            id="year-slider"
            value={[marriageYear]} 
            min={currentYear}
            max={currentYear + 5}
            step={1}
            onValueChange={(values) => setMarriageYear(values[0])}
            className="w-3/4 mr-4"
          />
          <Input
            type="number"
            value={marriageYear}
            onChange={(e) => setMarriageYear(Number(e.target.value))}
            className="w-1/4"
          />
        </div>
        <div className="text-sm text-gray-500">
          An {marriageYear} (dans {marriageYear - currentYear} an{marriageYear - currentYear > 1 ? 's' : ''})
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="terms">Termes de la Négociation</Label>
        <Textarea
          id="terms"
          value={negotiationTerms}
          onChange={(e) => setNegotiationTerms(e.target.value)}
          placeholder="Détaillez les conditions que vous souhaitez proposer pour cette alliance..."
          rows={4}
        />
      </div>
    </div>
  );
};
