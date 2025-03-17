
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  Building, House, Scale, Coins, 
  ShoppingCart, Landmark, Users, ShieldAlert
} from 'lucide-react';

export const EdileFunctions: React.FC = () => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h3 className="text-lg font-cinzel text-rome-navy">Fonctions d'Édile</h3>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="space-y-4">
          <p>
            En tant qu'Édile, vous êtes responsable de la supervision des bâtiments publics, 
            des marchés et de l'ordre public à Rome.
          </p>
          
          <Separator className="my-6 border-rome-gold/30" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center py-4 gap-2"
            >
              <Building className="h-6 w-6 text-rome-navy" />
              <span className="font-medium">Maintenance des édifices</span>
              <span className="text-xs text-muted-foreground">Entretien des bâtiments publics</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center py-4 gap-2"
            >
              <ShoppingCart className="h-6 w-6 text-amber-700" />
              <span className="font-medium">Contrôle des marchés</span>
              <span className="text-xs text-muted-foreground">Supervision des activités commerciales</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center py-4 gap-2"
            >
              <ShieldAlert className="h-6 w-6 text-red-700" />
              <span className="font-medium">Sécurité publique</span>
              <span className="text-xs text-muted-foreground">Maintien de l'ordre dans la ville</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center py-4 gap-2"
            >
              <Scale className="h-6 w-6 text-blue-700" />
              <span className="font-medium">Litiges commerciaux</span>
              <span className="text-xs text-muted-foreground">Règlement des conflits marchands</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center py-4 gap-2"
            >
              <House className="h-6 w-6 text-green-700" />
              <span className="font-medium">Inspection des habitations</span>
              <span className="text-xs text-muted-foreground">Vérification des normes de construction</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto flex flex-col items-center justify-center py-4 gap-2"
            >
              <Users className="h-6 w-6 text-purple-700" />
              <span className="font-medium">Distribution publique</span>
              <span className="text-xs text-muted-foreground">Organisation des distributions alimentaires</span>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Le rôle d'Édile est crucial pour maintenir l'ordre et la qualité de vie 
            dans Rome. Un bon Édile peut grandement augmenter sa popularité auprès du peuple.
          </p>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
