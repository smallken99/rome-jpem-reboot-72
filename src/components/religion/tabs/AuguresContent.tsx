
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AuguresContent: React.FC = () => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-xl flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rome-gold" />
          Collège des Augures
        </h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Les augures sont des prêtres spécialisés dans l'interprétation des signes divins pour déterminer si les dieux favorisent ou non une action. Leur avis est requis avant toute décision politique ou militaire importante.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
              <h3 className="font-cinzel text-lg text-rome-navy">Types d'augures</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-rome-gold font-bold mt-0.5">•</span>
                  <span><strong>Vol des oiseaux</strong> - Direction, hauteur et cris des oiseaux</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rome-gold font-bold mt-0.5">•</span>
                  <span><strong>Foudre et tonnerre</strong> - Position et direction des éclairs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rome-gold font-bold mt-0.5">•</span>
                  <span><strong>Tripudia</strong> - Appétit des poulets sacrés</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
              <h3 className="font-cinzel text-lg text-rome-navy">Importance politique</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                L'avis des augures peut retarder ou annuler des assemblées, des élections et des décisions militaires. Maîtriser l'art augural confère un pouvoir politique considérable.
              </p>
              <Button variant="outline" size="sm" className="mt-3 text-xs roman-btn-outline">
                <Info className="h-3 w-3 mr-1" />
                Influence politique
              </Button>
            </div>
          </div>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
