
import React from 'react';
import { DowryForm } from './DowryForm';
import { FamilySelector } from './FamilySelector';

type Family = {
  id: string;
  name: string;
  prestige: string;
  influence: string;
  wealth: string;
};

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
  onSelectFamily: (familyId: string) => void;
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-cinzel text-lg mb-4">Dot et Conditions</h3>
        
        <DowryForm
          dowryAmount={dowryAmount}
          setDowryAmount={setDowryAmount}
          marriageYear={marriageYear}
          setMarriageYear={setMarriageYear}
          negotiationTerms={negotiationTerms}
          setNegotiationTerms={setNegotiationTerms}
          currentYear={currentYear}
        />
      </div>
      
      <FamilySelector
        families={families}
        selectedFamily={selectedFamily}
        onSelectFamily={onSelectFamily}
      />
    </div>
  );
};
