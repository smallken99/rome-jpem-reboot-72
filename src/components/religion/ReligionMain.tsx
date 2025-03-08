
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flame, Shield, Star, AlertCircle } from 'lucide-react';
import { VestalesContent } from './tabs/VestalesContent';
import { TemplesContent } from './tabs/TemplesContent';
import { CeremoniesContent } from './tabs/CeremoniesContent';
import { AuguresContent } from './tabs/AuguresContent';
import { VestaleCandidate, characterToVestaleCandidate } from '@/types/vestale';
import { characters } from '@/data/characters';

export const ReligionMain: React.FC = () => {
  const youngFemales = characters
    .filter(character => character.gender === 'female' && character.age >= 6 && character.age <= 10)
    .map(character => characterToVestaleCandidate(character));
  
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Religion Romaine" 
        subtitle="Temples, rites et augures"
      />
      
      <Tabs defaultValue="vestales" className="space-y-4">
        <TabsList className="bg-white border border-rome-gold/30 rounded-md shadow-sm w-full sm:w-auto flex overflow-x-auto">
          <TabsTrigger value="vestales" className="data-[state=active]:bg-rome-gold/10 data-[state=active]:text-rome-terracotta font-cinzel">
            <Flame className="h-4 w-4 mr-2" />
            Vestales
          </TabsTrigger>
          <TabsTrigger value="temples" className="data-[state=active]:bg-rome-gold/10 data-[state=active]:text-rome-terracotta font-cinzel">
            <Shield className="h-4 w-4 mr-2" />
            Temples
          </TabsTrigger>
          <TabsTrigger value="ceremonies" className="data-[state=active]:bg-rome-gold/10 data-[state=active]:text-rome-terracotta font-cinzel">
            <Star className="h-4 w-4 mr-2" />
            Cérémonies
          </TabsTrigger>
          <TabsTrigger value="augures" className="data-[state=active]:bg-rome-gold/10 data-[state=active]:text-rome-terracotta font-cinzel">
            <AlertCircle className="h-4 w-4 mr-2" />
            Augures
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="vestales" className="mt-6 space-y-6">
          <VestalesContent youngFemales={youngFemales} />
        </TabsContent>
        
        <TabsContent value="temples" className="mt-6">
          <TemplesContent />
        </TabsContent>
        
        <TabsContent value="ceremonies" className="mt-6">
          <CeremoniesContent />
        </TabsContent>
        
        <TabsContent value="augures" className="mt-6">
          <AuguresContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
