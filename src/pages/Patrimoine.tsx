
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EconomieStats } from '@/components/economie/EconomieStats';
import { PropertyCard } from '@/components/proprietes/PropertyCard';
import { PropertyMap } from '@/components/proprietes/PropertyMap';
import { ResourceCard } from '@/components/proprietes/ResourceCard';
import { ApercuTab } from '@/components/economie/tabs/ApercuTab';
import { RevenusTab } from '@/components/economie/tabs/RevenusTab';
import { DepensesTab } from '@/components/economie/tabs/DepensesTab';
import { ImpotsTab } from '@/components/economie/tabs/ImpotsTab';
import { StatBox } from '@/components/ui-custom/StatBox';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Building, Home, MapPin, Wheat } from 'lucide-react';

const Patrimoine = () => {
  return (
    <Layout>
      <PageHeader 
        title="Patrimoine" 
        subtitle="Gérez vos biens, propriétés et finances" 
      />

      <EconomieStats />

      <Tabs defaultValue="apercu" className="mb-8">
        <TabsList className="border border-rome-gold/30 bg-rome-parchment">
          <TabsTrigger value="apercu" className="data-[state=active]:bg-white">Aperçu Général</TabsTrigger>
          <TabsTrigger value="proprietes" className="data-[state=active]:bg-white">Propriétés</TabsTrigger>
          <TabsTrigger value="revenus" className="data-[state=active]:bg-white">Revenus</TabsTrigger>
          <TabsTrigger value="depenses" className="data-[state=active]:bg-white">Dépenses</TabsTrigger>
          <TabsTrigger value="impots" className="data-[state=active]:bg-white">Impôts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apercu" className="pt-4">
          <ApercuTab />
        </TabsContent>

        <TabsContent value="proprietes" className="pt-4">
          <Tabs defaultValue="liste" className="mb-8">
            <TabsList className="border border-rome-gold/30 bg-rome-parchment">
              <TabsTrigger value="liste" className="data-[state=active]:bg-white">Vue Liste</TabsTrigger>
              <TabsTrigger value="carte" className="data-[state=active]:bg-white">Vue Carte</TabsTrigger>
            </TabsList>
            
            <TabsContent value="liste" className="pt-4">
              <RomanCard className="mb-6">
                <RomanCard.Header>
                  <h3 className="font-cinzel text-lg text-rome-navy">Propriétés Urbaines</h3>
                </RomanCard.Header>
                <RomanCard.Content>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <PropertyCard
                      name="Domus du Palatin"
                      type="Résidence principale"
                      location="Rome, Colline du Palatin"
                      value="1,200,000 As"
                      status="Excellent"
                      imageUrl="/placeholder.svg"
                    />
                    <PropertyCard
                      name="Insula de Subure"
                      type="Immeuble de rapport"
                      location="Rome, Quartier de Subure"
                      value="600,000 As"
                      status="Bon"
                      imageUrl="/placeholder.svg"
                    />
                    <PropertyCard
                      name="Villa d'Ostie"
                      type="Résidence secondaire"
                      location="Ostie"
                      value="850,000 As"
                      status="Très bon"
                      imageUrl="/placeholder.svg"
                    />
                  </div>
                </RomanCard.Content>
              </RomanCard>

              <RomanCard className="mb-6">
                <RomanCard.Header>
                  <h3 className="font-cinzel text-lg text-rome-navy">Propriétés Rurales</h3>
                </RomanCard.Header>
                <RomanCard.Content>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <PropertyCard
                      name="Domaine de Campanie"
                      type="Villa agricole"
                      location="Campanie"
                      value="900,000 As"
                      status="Excellent"
                      imageUrl="/placeholder.svg"
                    />
                    <PropertyCard
                      name="Vignobles du Latium"
                      type="Exploitation viticole"
                      location="Latium"
                      value="750,000 As"
                      status="Très bon"
                      imageUrl="/placeholder.svg"
                    />
                    <PropertyCard
                      name="Oliveraies d'Étrurie"
                      type="Exploitation oléicole"
                      location="Étrurie"
                      value="680,000 As"
                      status="Bon"
                      imageUrl="/placeholder.svg"
                    />
                  </div>
                </RomanCard.Content>
              </RomanCard>

              <RomanCard>
                <RomanCard.Header>
                  <h3 className="font-cinzel text-lg text-rome-navy">Ressources et Production</h3>
                </RomanCard.Header>
                <RomanCard.Content>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ResourceCard
                      name="Blé"
                      production="120 modii/mois"
                      location="Domaine de Campanie"
                      value="24,000 As/an"
                      trend="stable"
                    />
                    <ResourceCard
                      name="Vin"
                      production="80 amphores/mois"
                      location="Vignobles du Latium"
                      value="48,000 As/an"
                      trend="hausse"
                    />
                    <ResourceCard
                      name="Huile d'olive"
                      production="60 amphores/mois"
                      location="Oliveraies d'Étrurie"
                      value="36,000 As/an"
                      trend="hausse"
                    />
                  </div>
                </RomanCard.Content>
              </RomanCard>
            </TabsContent>
            
            <TabsContent value="carte" className="pt-4">
              <PropertyMap />
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="revenus" className="pt-4">
          <RevenusTab />
        </TabsContent>
        
        <TabsContent value="depenses" className="pt-4">
          <DepensesTab />
        </TabsContent>
        
        <TabsContent value="impots" className="pt-4">
          <ImpotsTab />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Patrimoine;
