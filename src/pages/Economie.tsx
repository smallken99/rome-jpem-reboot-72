
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaxTable } from '@/components/economie/TaxTable';
import { ResourcesTable } from '@/components/economie/ResourcesTable';
import { ExpenseCard } from '@/components/economie/ExpenseCard';
import { RevenueChart } from '@/components/economie/RevenueChart';
import { 
  Coins, 
  Receipt, 
  TrendingUp, 
  TrendingDown,
  Wallet,
  PiggyBank,
  BarChart3,
  Scale
} from 'lucide-react';

const Economie = () => {
  return (
    <Layout>
      <PageHeader
        title="Économie et Ressources"
        subtitle="Gérez les ressources, les revenus et les dépenses de votre Gens"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatBox 
          label="Fortune totale" 
          value="8,750,000 Sesterces" 
          icon={<Coins className="h-6 w-6" />} 
          trend="up"
        />
        <StatBox 
          label="Revenu mensuel" 
          value="45,000 Sesterces" 
          icon={<TrendingUp className="h-6 w-6" />} 
          trend="up"
        />
        <StatBox 
          label="Dépenses mensuelles" 
          value="32,500 Sesterces" 
          icon={<TrendingDown className="h-6 w-6" />} 
          trend="neutral"
        />
        <StatBox 
          label="Taxes annuelles" 
          value="87,500 Sesterces" 
          icon={<Receipt className="h-6 w-6" />} 
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RomanCard title="Évolution des finances" className="h-full">
            <RevenueChart />
          </RomanCard>
        </div>
        
        <RomanCard title="Trésorerie disponible" className="h-full">
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center justify-center">
              <PiggyBank className="h-16 w-16 text-rome-gold mb-2" />
              <span className="text-3xl font-bold text-rome-navy">350,000</span>
              <span className="text-muted-foreground">Sesterces disponibles</span>
            </div>
            
            <Separator className="bg-rome-gold/30" />
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coffre personnel:</span>
                <span className="font-bold">150,000 Sesterces</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dépôts bancaires:</span>
                <span className="font-bold">200,000 Sesterces</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taux d'intérêt:</span>
                <span className="font-bold">6%</span>
              </div>
            </div>
            
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="outline" className="roman-btn-outline w-full">Déposer des fonds</Button>
              <Button variant="outline" className="roman-btn-outline w-full">Retirer des fonds</Button>
            </div>
          </div>
        </RomanCard>
      </div>

      <Tabs defaultValue="resources" className="mb-8">
        <TabsList className="w-full flex justify-start gap-2 mb-4 border-b border-rome-gold/20 pb-2 overflow-x-auto">
          <TabsTrigger value="resources" className="data-[state=active]:bg-rome-gold/20 data-[state=active]:text-rome-navy data-[state=active]:font-bold rounded font-cinzel">
            <Wallet className="mr-2 h-4 w-4" />
            Ressources
          </TabsTrigger>
          <TabsTrigger value="taxes" className="data-[state=active]:bg-rome-gold/20 data-[state=active]:text-rome-navy data-[state=active]:font-bold rounded font-cinzel">
            <Receipt className="mr-2 h-4 w-4" />
            Taxation
          </TabsTrigger>
          <TabsTrigger value="expenses" className="data-[state=active]:bg-rome-gold/20 data-[state=active]:text-rome-navy data-[state=active]:font-bold rounded font-cinzel">
            <TrendingDown className="mr-2 h-4 w-4" />
            Dépenses
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources" className="space-y-4">
          <RomanCard title="Inventaire des ressources" className="h-full">
            <ResourcesTable />
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="taxes" className="space-y-4">
          <RomanCard title="Taxes et impôts" className="h-full">
            <TaxTable />
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ExpenseCard 
              title="Entretien des propriétés" 
              amount="12,500 Sesterces" 
              period="mensuel" 
              description="Coûts d'entretien pour toutes les propriétés, incluant les réparations et améliorations."
            />
            <ExpenseCard 
              title="Salaires et esclaves" 
              amount="8,000 Sesterces" 
              period="mensuel" 
              description="Coûts pour les esclaves (nourriture, vêtements) et salaires des travailleurs libres."
            />
            <ExpenseCard 
              title="Frais politiques" 
              amount="5,500 Sesterces" 
              period="mensuel" 
              description="Dépenses pour maintenir les relations politiques et réseaux d'influence."
            />
            <ExpenseCard 
              title="Luxe et divertissements" 
              amount="4,500 Sesterces" 
              period="mensuel" 
              description="Banquets, cadeaux, et autres dépenses somptuaires pour maintenir le prestige."
            />
            <ExpenseCard 
              title="Frais militaires" 
              amount="2,000 Sesterces" 
              period="mensuel" 
              description="Équipement et entretien des clients militaires et gardes personnels."
            />
            <ExpenseCard 
              title="Éducation" 
              amount="1,500 Sesterces" 
              period="mensuel" 
              description="Tuteurs et éducation des enfants de la famille."
            />
          </div>
        </TabsContent>
      </Tabs>

      <RomanCard title="Investissements" className="mb-8">
        <div className="p-4 space-y-6">
          <p className="text-muted-foreground">Opportunités d'investissement disponibles pour votre Gens.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-rome-gold/30 rounded-md p-4 hover:border-rome-gold hover:bg-rome-gold/5 transition-all">
              <h4 className="font-cinzel text-lg font-semibold mb-2">Expansion agricole</h4>
              <p className="text-sm text-muted-foreground mb-4">Acquisition de nouvelles terres en Sicile pour la culture du blé.</p>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Coût:</span>
                <span className="text-sm">500,000 Sesterces</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium">Retour estimé:</span>
                <span className="text-sm text-green-600">8% annuel</span>
              </div>
              <Button variant="outline" className="roman-btn-outline w-full text-sm">Investir</Button>
            </div>
            
            <div className="border border-rome-gold/30 rounded-md p-4 hover:border-rome-gold hover:bg-rome-gold/5 transition-all">
              <h4 className="font-cinzel text-lg font-semibold mb-2">Prêt commercial</h4>
              <p className="text-sm text-muted-foreground mb-4">Financement d'une expédition commerciale vers l'Égypte.</p>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Coût:</span>
                <span className="text-sm">200,000 Sesterces</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium">Retour estimé:</span>
                <span className="text-sm text-green-600">12% (risqué)</span>
              </div>
              <Button variant="outline" className="roman-btn-outline w-full text-sm">Investir</Button>
            </div>
            
            <div className="border border-rome-gold/30 rounded-md p-4 hover:border-rome-gold hover:bg-rome-gold/5 transition-all">
              <h4 className="font-cinzel text-lg font-semibold mb-2">Immobilier urbain</h4>
              <p className="text-sm text-muted-foreground mb-4">Construction d'une nouvelle insula à Rome.</p>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Coût:</span>
                <span className="text-sm">350,000 Sesterces</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium">Retour estimé:</span>
                <span className="text-sm text-green-600">6% annuel</span>
              </div>
              <Button variant="outline" className="roman-btn-outline w-full text-sm">Investir</Button>
            </div>
          </div>
        </div>
      </RomanCard>
    </Layout>
  );
};

export default Economie;
