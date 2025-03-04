
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import StatBar from '../StatBar';
import { Character } from '@/types/character';
import { useNavigate } from 'react-router-dom';

// This should contain only necessary properties for female characters
type FemaleCharacter = {
  id: string;
  name: string;
  role?: string;
  gender: "female"; // This ensures we only have female characters
  age: number;
};

interface FemaleCardProps {
  female: FemaleCharacter;
  dowryAmount?: number;
  index?: number;
}

export const FemaleCard: React.FC<FemaleCardProps> = ({ female, dowryAmount = 0, index }) => {
  const navigate = useNavigate();
  
  return (
    <Card key={female.id} className="mt-4 border-rome-gold/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-cinzel flex justify-between items-center">
          <span>{female.name}</span>
          <span className="text-sm font-normal">{female.age} ans</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Rôle familial:</span>
            <span className="font-medium">{female.role || "Fille"}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Dot actuelle:</span>
            <span className="font-medium">{dowryAmount.toLocaleString()} As</span>
          </div>
          <div className="mt-4 space-y-2">
            <ActionButton 
              variant="outline" 
              className="w-full roman-btn-outline"
              label="Gérer l'alliance matrimoniale"
              to={`/famille/alliances/manage/${female.id}`}
            />
            <ActionButton 
              variant="outline" 
              className="w-full roman-btn-outline"
              label="Gérer la dot"
              to={`/famille/heritage/dowry/${female.id}`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
