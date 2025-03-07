
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Home, BarChart3, Receipt } from 'lucide-react';
import { TresorStats } from '@/components/republique/tresor/TresorStats';
import { TresorTable } from '@/components/republique/tresor/TresorTable';
import { TresorChart } from '@/components/republique/tresor/TresorChart';

export const TresorPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Trésor Public" 
          description="Gérez les finances de la République Romaine. Consultez les revenus, les dépenses et le budget de l'État."
        />
        <ActionButton
          variant="outline"
          label="Retour"
          to="/republique"
          icon={<Home className="h-4 w-4" />}
        />
      </div>
      
      <TresorStats />
      
      <Tabs defaultValue="apercu" className="space-y-4">
        <TabsList className="bg-white border border-rome-gold/30">
          <TabsTrigger value="apercu" className="data-[state=active]:bg-rome-gold/10">
            Aperçu
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-rome-gold/10">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="rapports" className="data-[state=active]:bg-rome-gold/10">
            <BarChart3 className="h-4 w-4 mr-2" />
            Rapports
          </TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-rome-gold/10">
            <Receipt className="h-4 w-4 mr-2" />
            Budget
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="apercu" className="space-y-4">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">État du Trésor Public</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="mb-6">
                <TresorChart />
              </div>
              <Separator className="my-4 border-rome-gold/30" />
              <TresorTable />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="transactions">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Transactions Récentes</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-6">
                Consultez et approuvez les dernières transactions effectuées par le Trésor Public de Rome.
              </p>
              {/* Le contenu des transactions serait ici */}
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="rapports">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Rapports Financiers</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-6">
                Analysez les rapports financiers détaillés et les tendances économiques de la République.
              </p>
              {/* Le contenu des rapports serait ici */}
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="budget">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Gestion du Budget</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-6">
                Définissez et ajustez le budget de la République pour l'année en cours.
              </p>
              {/* Le contenu de la gestion du budget serait ici */}
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
