
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { currentMagistracy } from '@/data/magistracies';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

export const RepubliqueFunctions: React.FC = () => {
  const MagistrateIcon = currentMagistracy.icon;
  
  const handleFunctionClick = (functionName: string) => {
    toast.info(`Accès à la fonction: ${functionName}`);
  };
  
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
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 py-6 hover:bg-amber-50 hover:border-amber-200 transition-colors"
                  onClick={() => handleFunctionClick(accessPath.replace('-', ' '))}
                >
                  <MagistrateIcon className={`h-5 w-5 ${currentMagistracy.iconColor}`} />
                  <span className="capitalize">{accessPath.replace('-', ' ')}</span>
                </Button>
              </Link>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Link to={`/republique/bureaux/${currentMagistracy.id}`}>
              <Button className="roman-btn group flex items-center gap-2">
                Accéder au Bureau du {currentMagistracy.name}
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
