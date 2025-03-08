
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Flame, Book, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { VestaleCandidate } from '@/types/vestale';
import { VestaleCandidateCard } from '../VestaleCandidateCard';

interface VestalesContentProps {
  youngFemales: VestaleCandidate[];
}

export const VestalesContent: React.FC<VestalesContentProps> = ({ youngFemales }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <RomanCard className="h-full">
          <RomanCard.Header>
            <h2 className="font-cinzel text-xl flex items-center gap-2">
              <Flame className="h-4 w-4 text-rome-gold" />
              Candidates Vestales
            </h2>
          </RomanCard.Header>
          <RomanCard.Content>
            <p className="mb-6 text-muted-foreground">
              Les jeunes filles de familles nobles peuvent devenir candidates au sacerdoce des Vestales, protectrices de la flamme sacrée de Rome.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {youngFemales.length > 0 ? (
                youngFemales.map(candidate => (
                  <VestaleCandidateCard key={candidate.id} candidate={candidate} />
                ))
              ) : (
                <div className="col-span-full p-6 text-center text-muted-foreground">
                  <AlertCircle className="h-10 w-10 mx-auto mb-2 text-rome-terracotta/60" />
                  <p>Aucune candidate disponible actuellement.</p>
                </div>
              )}
            </div>
          </RomanCard.Content>
        </RomanCard>
      </div>
      
      <div>
        <RomanCard className="h-full">
          <RomanCard.Header>
            <h2 className="font-cinzel text-lg flex items-center gap-2">
              <Flame className="h-4 w-4 text-rome-gold" />
              Le Collège des Vestales
            </h2>
          </RomanCard.Header>
          <RomanCard.Content>
            <p className="text-sm text-muted-foreground">
              Rejoindre le Collège des Vestales est un grand honneur qui apporte prestige et influence à votre famille. Les Vestales sont sélectionnées entre 6 et 10 ans et servent pendant 30 ans.
            </p>
            
            <Separator className="my-4 border-rome-gold/30" />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Nombre de Vestales:</span>
                <Badge variant="outline" className="bg-rome-gold/10 text-rome-navy border-rome-gold/30">6 / 6</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Prochaine sélection:</span>
                <span className="text-rome-navy">Dans 2 ans</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Bonus de piété:</span>
                <span className="text-rome-terracotta font-bold">+15%</span>
              </div>
            </div>
            
            <Separator className="my-4 border-rome-gold/30" />
            
            <ActionButton 
              label="Histoire des Vestales" 
              variant="outline"
              icon={<Book className="h-4 w-4" />}
              className="w-full mt-2"
            />
          </RomanCard.Content>
        </RomanCard>
      </div>
    </div>
  );
};
