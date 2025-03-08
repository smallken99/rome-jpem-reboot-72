
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Star, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const CeremoniesContent: React.FC = () => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-xl flex items-center gap-2">
          <Star className="h-4 w-4 text-rome-gold" />
          Cérémonies religieuses
        </h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="space-y-4">
          <CeremonyItem 
            name="Lupercales" 
            date="15 février" 
            description="Fête de la fertilité et de la purification, où des jeunes hommes courent à moitié nus autour du Palatin."
          />
          <CeremonyItem 
            name="Saturnales" 
            date="17-23 décembre" 
            description="Célébration en l'honneur de Saturne, avec des festins, l'échange de cadeaux et l'inversion temporaire des rôles sociaux."
          />
          <CeremonyItem 
            name="Vestalia" 
            date="7-15 juin" 
            description="Fête en l'honneur de Vesta, où le temple est ouvert aux femmes romaines qui y apportent des offrandes."
          />
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};

interface CeremonyItemProps {
  name: string;
  date: string;
  description: string;
}

export const CeremonyItem: React.FC<CeremonyItemProps> = ({ name, date, description }) => {
  return (
    <div className="border border-rome-gold/30 rounded-md p-4 bg-white hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <h3 className="font-cinzel text-lg text-rome-navy">{name}</h3>
        <Badge variant="outline" className="bg-rome-gold/10 border-rome-gold/30">{date}</Badge>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <Button variant="outline" size="sm" className="mt-3 text-xs roman-btn-outline">
        <Info className="h-3 w-3 mr-1" />
        En savoir plus
      </Button>
    </div>
  );
};
