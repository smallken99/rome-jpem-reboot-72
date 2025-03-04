import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { StatBox } from '@/components/ui-custom/StatBox';
import { TaxTable } from '@/components/economie/TaxTable';
import { ResourcesTable } from '@/components/economie/ResourcesTable';
import { ExpenseCard } from '@/components/economie/ExpenseCard';
import { RevenueChart } from '@/components/economie/RevenueChart';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Landmark, 
  Banknote, 
  Building, 
  Ship, 
  Coins 
} from 'lucide-react';

const Economie = () => {
  return (
    <Layout>
      <PageHeader 
        title="Économie" 
        subtitle="Gérez les finances et les revenus de votre Gens" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatBox 
          title="Revenus mensuels" 
          value="125,000 As" 
          description="En hausse ce trimestre"
          icon={<TrendingUp className="h-6 w-6" />}
          trend="up"
          trendValue="+8%"
        />
        <StatBox 
          title="Dépenses mensuelles" 
          value="85,000 As" 
          description="En hausse ce trimestre"
          icon={<TrendingDown className="h-6 w-6" />}
          trend="up"
          trendValue="+5%"
        />
        <StatBox 
          title="Fortune totale" 
          value="3,450,000 As" 
          description="Stable ce semestre"
          icon={<Wallet className="h-6 w-6" />}
          trend="neutral"
          trendValue="0%"
        />
        <StatBox 
          title="Impôts annuels" 
          value="45,000 As" 
          description="Réduction fiscale obtenue"
          icon={<Landmark className="h-6 w-6" />}
          trend="up"
          trendValue="-3%"
        />
      </div>

      <Tabs defaultValue="apercu" className="mb-8">
        <TabsList className="border border-rome-gold/30 bg-rome-parchment">
          <TabsTrigger value="apercu" className="data-[state=active]:bg-white">Aperçu</TabsTrigger>
          <TabsTrigger value="revenus" className="data-[state=active]:bg-white">Revenus</TabsTrigger>
          <TabsTrigger value="depenses" className="data-[state=active]:bg-white">Dépenses</TabsTrigger>
          <TabsTrigger value="impots" className="data-[state=active]:bg-white">Impôts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apercu" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RomanCard className="h-full">
              <RomanCard.Header>
                <h3 className="font-cinzel text-lg text-rome-navy">Revenus par Source</h3>
              </RomanCard.Header>
              <RomanCard.Content>
                <RevenueChart />
              </RomanCard.Content>
            </RomanCard>
            
            <RomanCard className="h-full">
              <RomanCard.Header>
                <h3 className="font-cinzel text-lg text-rome-navy">Principales Dépenses</h3>
              </RomanCard.Header>
              <RomanCard.Content>
                <div className="space-y-4">
                  <ExpenseCard 
                    category="Entretien des propriétés" 
                    amount="22,000 As" 
                    percentage={26} 
                    icon={<Building className="h-5 w-5" />} 
                  />
                  <ExpenseCard 
                    category="Patronage politique" 
                    amount="18,000 As" 
                    percentage={21} 
                    icon={<Landmark className="h-5 w-5" />} 
                  />
                  <ExpenseCard 
                    category="Personnel domestique" 
                    amount="15,000 As" 
                    percentage={18} 
                    icon={<Coins className="h-5 w-5" />} 
                  />
                  <ExpenseCard 
                    category="Investissements commerciaux" 
                    amount="12,000 As" 
                    percentage={14} 
                    icon={<Ship className="h-5 w-5" />} 
                  />
                  <ExpenseCard 
                    category="Divertissements et réceptions" 
                    amount="10,000 As" 
                    percentage={12} 
                    icon={<Banknote className="h-5 w-5" />} 
                  />
                </div>
              </RomanCard.Content>
            </RomanCard>
          </div>
        </TabsContent>
        
        <TabsContent value="revenus" className="pt-4">
          <RomanCard className="mb-6">
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg text-rome-navy">Revenus Détaillés</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <ResourcesTable />
            </RomanCard.Content>
          </RomanCard>
          
          <RomanCard className="mb-6">
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg text-rome-navy">Tendances des Revenus</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <RevenueChart />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="depenses" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <ExpenseCard 
                category="Entretien des propriétés" 
                amount="22,000 As" 
                percentage={26} 
                icon={<Building className="h-5 w-5" />} 
              />
              <ExpenseCard 
                category="Patronage politique" 
                amount="18,000 As" 
                percentage={21} 
                icon={<Landmark className="h-5 w-5" />} 
              />
              <ExpenseCard 
                category="Personnel domestique" 
                amount="15,000 As" 
                percentage={18} 
                icon={<Coins className="h-5 w-5" />} 
              />
              <ExpenseCard 
                category="Investissements commerciaux" 
                amount="12,000 As" 
                percentage={14} 
                icon={<Ship className="h-5 w-5" />} 
              />
              <ExpenseCard 
                category="Divertissements et réceptions" 
                amount="10,000 As" 
                percentage={12} 
                icon={<Banknote className="h-5 w-5" />} 
              />
            </div>
            <RomanCard className="h-full">
              <RomanCard.Header>
                <h3 className="font-cinzel text-lg text-rome-navy">Analyse des Dépenses</h3>
              </RomanCard.Header>
              <RomanCard.Content>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Recommandations d'optimisation</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Réduire les dépenses en divertissements de 10%</li>
                      <li>Renégocier les contrats d'entretien des propriétés</li>
                      <li>Optimiser les investissements commerciaux</li>
                      <li>Réorganiser le personnel domestique</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Économies potentielles</h4>
                    <p className="text-sm">Une optimisation des dépenses pourrait générer des économies d'environ 12,000 As par mois, soit 144,000 As par an.</p>
                  </div>
                </div>
              </RomanCard.Content>
            </RomanCard>
          </div>
        </TabsContent>
        
        <TabsContent value="impots" className="pt-4">
          <TaxTable />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Economie;
