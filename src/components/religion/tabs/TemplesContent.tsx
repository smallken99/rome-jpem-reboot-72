
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Shield, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TemplesContent: React.FC = () => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-xl flex items-center gap-2">
          <Shield className="h-4 w-4 text-rome-gold" />
          Temples de Rome
        </h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TempleCard 
            name="Temple de Jupiter Capitolin" 
            deity="Jupiter" 
            location="Colline du Capitole"
            image="/images/temple-jupiter.jpg"
          />
          <TempleCard 
            name="Temple de Vesta" 
            deity="Vesta" 
            location="Forum Romain"
            image="/images/temple-vesta.jpg"
          />
          <TempleCard 
            name="Temple de Mars" 
            deity="Mars" 
            location="Champ de Mars"
            image="/images/temple-mars.jpg"
          />
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};

interface TempleCardProps {
  name: string;
  deity: string;
  location: string;
  image?: string;
}

export const TempleCard: React.FC<TempleCardProps> = ({ name, deity, location, image }) => {
  return (
    <div className="border border-rome-gold/30 rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="aspect-video bg-rome-gold/10 flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="object-cover w-full h-full" />
        ) : (
          <Shield className="h-12 w-12 text-rome-gold/50" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-cinzel text-lg text-rome-navy">{name}</h3>
        <div className="text-sm text-muted-foreground mt-1 space-y-1">
          <p><span className="font-medium">Divinité:</span> {deity}</p>
          <p><span className="font-medium">Emplacement:</span> {location}</p>
        </div>
        <Button variant="outline" size="sm" className="mt-3 w-full text-xs roman-btn-outline">
          <Info className="h-3 w-3 mr-1" />
          Détails
        </Button>
      </div>
    </div>
  );
};
