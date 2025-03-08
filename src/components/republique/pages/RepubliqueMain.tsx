
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RepubliqueStats } from '@/components/republique/RepubliqueStats';
import { MagistratesOverview } from '@/components/republique/MagistratesOverview';
import { RepubliqueFunctions } from '@/components/republique/RepubliqueFunctions';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { currentMagistracy, magistracies } from '@/data/magistracies';

export const RepubliqueMain: React.FC = () => {
  const MagistrateIcon = currentMagistracy.icon;
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="République Romaine" 
        subtitle="Administration et Gouvernance"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <RepubliqueStats />
        </div>
        <div>
          <MagistratesOverview />
        </div>
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <h2 className="font-cinzel text-lg">Bureau de Magistrature</h2>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border border-rome-gold/20">
              <div className={`p-3 rounded-full ${currentMagistracy.iconBgColor}`}>
                <MagistrateIcon className={`h-7 w-7 ${currentMagistracy.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-cinzel text-lg">
                  Bureau du {currentMagistracy.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Accédez à votre bureau pour gérer les fonctions de votre magistrature.
                </p>
              </div>
              <Link to={`/republique/bureaux/${currentMagistracy.id}`}>
                <Button className="roman-btn">
                  Accéder
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {magistracies
                .filter(m => m.id !== currentMagistracy.id)
                .slice(0, 4)
                .map(magistrate => {
                  const MagIcon = magistrate.icon;
                  return (
                    <Link 
                      key={magistrate.id} 
                      to={`/republique/bureaux/${magistrate.id}`} 
                      className="p-3 border rounded-lg hover:bg-muted/20 transition-colors text-center flex flex-col items-center gap-2"
                    >
                      <div className={`p-2 rounded-full ${magistrate.iconBgColor}`}>
                        <MagIcon className={`h-5 w-5 ${magistrate.iconColor}`} />
                      </div>
                      <div className="text-sm font-medium">Bureau du {magistrate.name}</div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </RomanCard.Content>
      </RomanCard>
      
      <RepubliqueFunctions />
    </div>
  );
};
