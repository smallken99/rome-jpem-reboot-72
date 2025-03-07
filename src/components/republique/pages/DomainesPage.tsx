
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Home, Map, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DomainesPublics } from '@/components/republique/domaines/DomainesPublics';
import { AttributionTerres } from '@/components/republique/domaines/AttributionTerres';

export const DomainesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Terres Publiques" 
          description="Gérez l'ager publicus, attribuez des terres aux citoyens et aux colonies romaines."
        />
        <div className="flex gap-2">
          <ActionButton
            variant="default"
            label="Nouvelle Attribution"
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
      
      <Tabs defaultValue="carte" className="space-y-4">
        <TabsList className="bg-white border border-rome-gold/30">
          <TabsTrigger value="carte" className="data-[state=active]:bg-rome-gold/10">
            <Map className="h-4 w-4 mr-2" />
            Carte des Terres
          </TabsTrigger>
          <TabsTrigger value="liste" className="data-[state=active]:bg-rome-gold/10">
            Liste des Terres
          </TabsTrigger>
          <TabsTrigger value="attributions" className="data-[state=active]:bg-rome-gold/10">
            Attributions
          </TabsTrigger>
          <TabsTrigger value="colonies" className="data-[state=active]:bg-rome-gold/10">
            Colonies
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="carte">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Carte des Terres Publiques</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="aspect-video bg-slate-100 flex items-center justify-center">
                <p className="text-muted-foreground">Carte interactive des terres publiques romaines</p>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="liste">
          <DomainesPublics />
        </TabsContent>
        
        <TabsContent value="attributions">
          <AttributionTerres />
        </TabsContent>
        
        <TabsContent value="colonies">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Colonies Romaines</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-6">
                Consultez et gérez l'établissement de colonies romaines sur les terres publiques.
              </p>
              {/* Le contenu des colonies serait ici */}
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
