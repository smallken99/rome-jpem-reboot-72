
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { DomainesPublics } from '@/components/republique/domaines/DomainesPublics';
import { AttributionTerres } from '@/components/republique/domaines/AttributionTerres';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Users, Wheat, Tractor } from 'lucide-react';

export const DomainesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Terres Publiques" 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DomainesPublics />
        <AttributionTerres />
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <h2 className="font-cinzel text-lg">Gestion de l'Ager Publicus</h2>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <p>
              L'Ager Publicus représente l'ensemble des terres appartenant à la République romaine.
              En tant que magistrat, vous êtes responsable de leur attribution et gestion.
            </p>
            
            <Separator className="my-4 border-rome-gold/30" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/republique/ager">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2">
                  <MapPin className="h-6 w-6 text-rome-navy" />
                  <span className="font-medium">Domaines Publics</span>
                  <span className="text-xs text-muted-foreground">Gérer les terres publiques</span>
                </Button>
              </Link>
              
              <Link to="/republique/ager">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2">
                  <Users className="h-6 w-6 text-amber-700" />
                  <span className="font-medium">Main d'œuvre publique</span>
                  <span className="text-xs text-muted-foreground">Fonctionnaires et esclaves publics</span>
                </Button>
              </Link>
              
              <Link to="/republique/ager">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center justify-center gap-2">
                  <Tractor className="h-6 w-6 text-green-700" />
                  <span className="font-medium">Types de domaines</span>
                  <span className="text-xs text-muted-foreground">Céréales, vignobles, pâturages</span>
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Une distribution équitable des terres publiques contribue à la stabilité sociale et 
              à la prospérité économique de Rome.
            </p>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
