
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface AllianceBenefitsProps {
  benefits: string[];
  onNegotiate: () => void;
}

export const AllianceBenefits: React.FC<AllianceBenefitsProps> = ({
  benefits,
  onNegotiate
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Bénéfices potentiels de cette alliance</h3>
        
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="bg-green-100 rounded-full p-0.5 mt-0.5">
                <Check className="h-3.5 w-3.5 text-green-600" />
              </div>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-4">
        <Button className="w-full" onClick={onNegotiate}>
          Proposer l'alliance
        </Button>
      </CardFooter>
    </Card>
  );
};
