
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyCard } from '@/components/proprietes/PropertyCard';
import { PropertyMap } from '@/components/proprietes/PropertyMap';
import { ResourceCard } from '@/components/proprietes/ResourceCard';
import { StatBox } from '@/components/ui-custom/StatBox';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Home, Building, MapPin, Wheat } from 'lucide-react';

const Proprietes = () => {
  return (
    <Layout>
      <PageHeader 
        title="Propriétés" 
        subtitle="Gérez votre patrimoine immobilier et vos domaines agricoles" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatBox 
          title="Propriétés totales" 
          value="12" 
          description="Valeur totale en hausse"
          icon={<Building className="h-6 w-6" />}
          trend="up"
          trendValue="+2"
        />
        <StatBox 
          title="Domaines urbains" 
          value="7" 
          description="Insulae et domus à Rome"
          icon={<Home className="h-6 w-6" />}
        />
        <StatBox 
          title="Domaines ruraux" 
          value="5" 
          description="Nouveaux domaines acquis"
          icon={<MapPin className="h-6 w-6" />}
          trend="up"
          trendValue="+2"
        />
        <StatBox 
          title="Production" 
          value="Optimale" 
          description="Rendements agricoles stables"
          icon={<Wheat className="h-6 w-6" />}
        />
      </div>

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
                <PropertyCard
                  name="Boutiques du Forum"
                  type="Commerces"
                  location="Rome, Forum Romain"
                  value="450,000 As"
                  status="Bon"
                  imageUrl="/placeholder.svg"
                />
                <PropertyCard
                  name="Insula du Champ de Mars"
                  type="Immeuble de rapport"
                  location="Rome, Champ de Mars"
                  value="580,000 As"
                  status="Moyen"
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
                <ResourceCard
                  name="Laine"
                  production="200 kg/mois"
                  location="Domaine d'Apulie"
                  value="15,000 As/an"
                  trend="stable"
                />
                <ResourceCard
                  name="Bois"
                  production="30 tonnes/mois"
                  location="Forêts d'Étrurie"
                  value="18,000 As/an"
                  trend="baisse"
                />
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="carte" className="pt-4">
          <PropertyMap />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Proprietes;
