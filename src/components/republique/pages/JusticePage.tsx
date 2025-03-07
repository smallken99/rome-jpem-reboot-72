
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Home, Gavel, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JudiciaryStats } from '@/components/republique/justice/JudiciaryStats';
import { ProcesTable } from '@/components/republique/justice/ProcesTable';

export const JusticePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Système Judiciaire" 
          description="Supervisez les tribunaux romains, présidez les procès et rendez la justice au nom du Sénat et du Peuple Romain."
        />
        <div className="flex gap-2">
          <ActionButton
            variant="default"
            label="Nouveau Procès"
            icon={<Plus className="h-4 w-4" />}
          />
          <ActionButton
            variant="outline"
            label="Retour"
            to="/republique"
            icon={<Home className="h-4 w-4" />}
          />
        </div>
      </div>
      
      <JudiciaryStats />
      
      <Tabs defaultValue="en-cours" className="space-y-4">
        <TabsList className="bg-white border border-rome-gold/30">
          <TabsTrigger value="en-cours" className="data-[state=active]:bg-rome-gold/10">
            <Gavel className="h-4 w-4 mr-2" />
            Procès en cours
          </TabsTrigger>
          <TabsTrigger value="a-venir" className="data-[state=active]:bg-rome-gold/10">
            Procès à venir
          </TabsTrigger>
          <TabsTrigger value="jugements" className="data-[state=active]:bg-rome-gold/10">
            Jugements récents
          </TabsTrigger>
          <TabsTrigger value="archives" className="data-[state=active]:bg-rome-gold/10">
            Archives
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="en-cours">
          <ProcesTable status="en-cours" />
        </TabsContent>
        
        <TabsContent value="a-venir">
          <ProcesTable status="a-venir" />
        </TabsContent>
        
        <TabsContent value="jugements">
          <ProcesTable status="juge" />
        </TabsContent>
        
        <TabsContent value="archives">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Archives Judiciaires</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-6">
                Consultez les archives des procès historiques et des précédents juridiques importants.
              </p>
              {/* Le contenu des archives serait ici */}
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
