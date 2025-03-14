
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameTime } from '@/hooks/useGameTime';
import { characters } from '@/data/characters';
import { Character } from '@/types/character';
import { toast } from 'sonner';
import { AllianceHeader } from './components/AllianceHeader';
import { AllianceLayout } from './components/AllianceLayout';
import { AllianceBenefits } from './components/AllianceBenefits';
import { useAllianceCalculations } from './hooks/useAllianceCalculations';

export const AllianceManagement = () => {
  const { femaleId } = useParams<{ femaleId: string }>();
  const navigate = useNavigate();
  const { year } = useGameTime();
  
  const [female, setFemale] = useState<Character | null>(null);
  const [dowryAmount, setDowryAmount] = useState<number>(10000);
  const [selectedFamily, setSelectedFamily] = useState<string>('');
  const [negotiationTerms, setNegotiationTerms] = useState<string>('');
  const [marriageYear, setMarriageYear] = useState<number>(year + 1);
  
  // Potential families for alliance
  const potentialFamilies = [
    { id: 'cornelia', name: 'Gens Cornelia', prestige: 'Haute', influence: '+++', wealth: '++' },
    { id: 'julia', name: 'Gens Julia', prestige: 'Très haute', influence: '++++', wealth: '+++' },
    { id: 'claudia', name: 'Gens Claudia', prestige: 'Moyenne', influence: '++', wealth: '++++' },
    { id: 'aemilia', name: 'Gens Aemilia', prestige: 'Haute', influence: '+++', wealth: '++' },
    { id: 'valeria', name: 'Gens Valeria', prestige: 'Moyenne', influence: '++', wealth: '+' },
  ];
  
  const { benefits } = useAllianceCalculations(selectedFamily, potentialFamilies);
  
  // Load female character data
  useEffect(() => {
    if (femaleId) {
      const foundFemale = characters.find(char => char.id === femaleId && char.gender === 'female');
      if (foundFemale) {
        setFemale(foundFemale);
      } else {
        toast.error("Personnage féminin non trouvé");
        navigate('/famille/alliances');
      }
    }
  }, [femaleId, navigate]);
  
  // Handle alliance negotiation
  const handleNegotiateAlliance = () => {
    const family = potentialFamilies.find(f => f.id === selectedFamily);
    
    if (!family || !female) {
      toast.error("Veuillez sélectionner une famille");
      return;
    }
    
    if (dowryAmount < 5000) {
      toast.error("La dot est trop faible pour cette alliance");
      return;
    }
    
    toast.success(`Négociations entamées avec la famille ${family.name}`);
    
    // In a real application, we would save this to a database
    setTimeout(() => {
      navigate('/famille/alliances');
    }, 1500);
  };
  
  if (!female) {
    return (
      <div className="p-4 text-center">
        <p>Chargement des informations...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <AllianceHeader female={female} />
      
      <AllianceLayout
        dowryAmount={dowryAmount}
        setDowryAmount={setDowryAmount}
        marriageYear={marriageYear}
        setMarriageYear={setMarriageYear}
        negotiationTerms={negotiationTerms}
        setNegotiationTerms={setNegotiationTerms}
        currentYear={year}
        families={potentialFamilies}
        selectedFamily={selectedFamily}
        onSelectFamily={setSelectedFamily}
      />
      
      {selectedFamily && (
        <AllianceBenefits
          benefits={benefits}
          onNegotiate={handleNegotiateAlliance}
        />
      )}
    </div>
  );
};
