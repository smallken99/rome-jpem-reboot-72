
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { currentMagistracy } from '@/data/magistracies';

export const RepubliqueFunctions: React.FC = () => {
  const MagistrateIcon = currentMagistracy.icon;
  
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-lg">Fonctions Disponibles</h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            En tant que {currentMagistracy.name}, vous avez accès aux fonctions suivantes :
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentMagistracy.bureauAccess?.map((accessPath, index) => (
              <Link key={index} to={`/republique/${accessPath}`} className="block">
                <Button variant="outline" className="w-full justify-start gap-2 py-6">
                  <MagistrateIcon className={`h-5 w-5 ${currentMagistracy.iconColor}`} />
                  <span className="capitalize">{accessPath.replace('-', ' ')}</span>
                </Button>
              </Link>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Link to={`/republique/bureaux/${currentMagistracy.id}`}>
              <Button className="roman-btn">
                Accéder au Bureau du {currentMagistracy.name}
              </Button>
            </Link>
          </div>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
