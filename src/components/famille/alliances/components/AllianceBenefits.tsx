
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Handshake } from 'lucide-react';

interface AllianceBenefitsProps {
  benefits: string[];
  onNegotiate: () => void;
}

export const AllianceBenefits: React.FC<AllianceBenefitsProps> = ({ 
  benefits, 
  onNegotiate 
}) => {
  return (
    <RomanCard className="mt-6">
      <RomanCard.Header>
        <h3 className="font-cinzel flex items-center gap-2">
          <Handshake className="h-5 w-5 text-rome-gold" />
          Bénéfices potentiels de l'alliance
        </h3>
      </RomanCard.Header>
      <RomanCard.Content>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-rome-gold">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 flex justify-end gap-4">
          <ActionButton
            variant="outline"
            label="Annuler"
            to="/famille/alliances"
          />
          <ActionButton
            label="Entamer les négociations"
            icon={<Handshake className="h-4 w-4" />}
            onClick={onNegotiate}
          />
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
