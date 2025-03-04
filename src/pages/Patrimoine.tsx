
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EconomieStats } from '@/components/economie/EconomieStats';
import { PropertyCard } from '@/components/proprietes/PropertyCard';
import { PropertyMap } from '@/components/proprietes/PropertyMap';
import { ResourceCard } from '@/components/proprietes/ResourceCard';
import { PropertyManagement } from '@/components/proprietes/PropertyManagement';
import { StorageManagement } from '@/components/proprietes/StorageManagement';
import { ApercuTab } from '@/components/economie/tabs/ApercuTab';
import { RevenusTab } from '@/components/economie/tabs/RevenusTab';
import { DepensesTab } from '@/components/economie/tabs/DepensesTab';
import { ImpotsTab } from '@/components/economie/tabs/ImpotsTab';
import { StatBox } from '@/components/ui-custom/StatBox';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Building, Home, MapPin, Wheat, Church, Landmark } from 'lucide-react';

const Patrimoine = () => {
  return (
    <Layout>
      <PageHeader 
        title="Patrimoine" 
        subtitle="Gérez vos biens, propriétés et finances" 
      />

      <EconomieStats />

      <Tabs defaultValue="proprietes" className="mb-8">
        <TabsList className="border border-rome-gold/30 bg-rome-parchment">
          <TabsTrigger value="proprietes" className="data-[state=active]:bg-white">Propriétés</TabsTrigger>
          <TabsTrigger value="apercu" className="data-[state=active]:bg-white">Aperçu Financier</TabsTrigger>
          <TabsTrigger value="revenus" className="data-[state=active]:bg-white">Revenus</TabsTrigger>
          <TabsTrigger value="depenses" className="data-[state=active]:bg-white">Dépenses</TabsTrigger>
          <TabsTrigger value="impots" className="data-[state=active]:bg-white">Impôts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="proprietes" className="pt-4">
          <PropertyManagement />
          
          <Tabs defaultValue="urbaines" className="mb-8">
            <TabsList className="border border-rome-gold/30 bg-rome-parchment">
              <TabsTrigger value="urbaines" className="data-[state=active]:bg-white">Propriétés Urbaines</TabsTrigger>
              <TabsTrigger value="rurales" className="data-[state=active]:bg-white">Propriétés Rurales</TabsTrigger>
              <TabsTrigger value="stocks" className="data-[state=active]:bg-white">Greniers & Stocks</TabsTrigger>
              <TabsTrigger value="carte" className="data-[state=active]:bg-white">Vue Carte</TabsTrigger>
            </TabsList>
            
            <TabsContent value="urbaines" className="pt-4">
              <div className="grid grid-cols-1 gap-6 mb-6">
                <RomanCard>
                  <RomanCard.Header>
                    <h3 className="font-cinzel text-lg text-rome-navy">Bâtiments d'Habitation</h3>
                  </RomanCard.Header>
                  <RomanCard.Content>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <PropertyCard
                        name="Domus du Palatin"
                        type="domus"
                        size="grand"
                        location="Rome, Colline du Palatin"
                        value="1,200,000 As"
                        status="Excellent"
                        maintenance="2,500 As/an"
                        benefits={["+10 points de prestige", "Logement pour la famille", "Réception de clients"]}
                        imageUrl="/placeholder.svg"
                      />
                      <PropertyCard
                        name="Insula de Subure"
                        type="insulae"
                        size="moyen"
                        location="Rome, Quartier de Subure"
                        value="600,000 As"
                        status="Moyen"
                        maintenance="1,200 As/an"
                        revenue="4,800 As/an"
                        benefits={["+5 points de popularité", "Revenus réguliers", "Logement pour 20 clients"]}
                        imageUrl="/placeholder.svg"
                      />
                      <PropertyCard
                        name="Villa d'Ostie"
                        type="villa"
                        size="moyen"
                        location="Ostie"
                        value="850,000 As"
                        status="Très bon"
                        maintenance="1,800 As/an"
                        benefits={["+5 points de prestige", "Résidence secondaire", "Proximité du port"]}
                        imageUrl="/placeholder.svg"
                      />
                    </div>
                  </RomanCard.Content>
                </RomanCard>

                <RomanCard>
                  <RomanCard.Header>
                    <h3 className="font-cinzel text-lg text-rome-navy">Bâtiments Religieux & Publics</h3>
                  </RomanCard.Header>
                  <RomanCard.Content>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <PropertyCard
                        name="Temple de Jupiter"
                        type="temple"
                        location="Rome, Forum"
                        value="600,000 As"
                        status="Excellent"
                        maintenance="3,000 As/an"
                        benefits={["+15 points de piété", "+10 points de prestige", "Faveur du collège pontifical"]}
                        imageUrl="/placeholder.svg"
                      />
                      <PropertyCard
                        name="Thermes de Claudius"
                        type="thermes"
                        location="Rome, Quartier Esquilin"
                        value="750,000 As"
                        status="Bon"
                        maintenance="5,000 As/an"
                        benefits={["+20 points de popularité", "Influence sur les électeurs", "Prestige local"]}
                        imageUrl="/placeholder.svg"
                      />
                      <PropertyCard
                        name="Statue Honorifique"
                        type="statue"
                        location="Rome, Forum"
                        value="120,000 As"
                        status="Excellent"
                        maintenance="500 As/an"
                        benefits={["+5 points de prestige", "Commémoration familiale", "Visibilité politique"]}
                        imageUrl="/placeholder.svg"
                      />
                    </div>
                  </RomanCard.Content>
                </RomanCard>
              </div>
            </TabsContent>
            
            <TabsContent value="rurales" className="pt-4">
              <div className="grid grid-cols-1 gap-6">
                <RomanCard>
                  <RomanCard.Header>
                    <h3 className="font-cinzel text-lg text-rome-navy">Domaines Agricoles</h3>
                  </RomanCard.Header>
                  <RomanCard.Content>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <PropertyCard
                        name="Domaine de Campanie"
                        type="domaine_cereales"
                        size="grand"
                        location="Campanie"
                        value="900,000 As"
                        status="Excellent"
                        maintenance="4,000 As/an"
                        revenue="12,000 As/an"
                        benefits={["Production: 600 modii de blé/an", "Nourrit 50 clients", "Stocks stratégiques"]}
                        imageUrl="/placeholder.svg"
                      />
                      <PropertyCard
                        name="Vignobles du Latium"
                        type="domaine_vignoble"
                        size="moyen"
                        location="Latium"
                        value="750,000 As"
                        status="Très bon"
                        maintenance="3,500 As/an"
                        revenue="16,000 As/an"
                        benefits={["Production: 80 amphores de vin/an", "Exportation lucrative", "Prestige social"]}
                        imageUrl="/placeholder.svg"
                      />
                      <PropertyCard
                        name="Oliveraies d'Étrurie"
                        type="domaine_oliviers"
                        size="moyen"
                        location="Étrurie"
                        value="680,000 As"
                        status="Bon"
                        maintenance="3,000 As/an"
                        revenue="10,000 As/an"
                        benefits={["Production: 60 amphores d'huile/an", "Demande constante", "Faible maintenance"]}
                        imageUrl="/placeholder.svg"
                      />
                    </div>
                  </RomanCard.Content>
                </RomanCard>

                <RomanCard>
                  <RomanCard.Header>
                    <h3 className="font-cinzel text-lg text-rome-navy">Pâturages et Élevage</h3>
                  </RomanCard.Header>
                  <RomanCard.Content>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <PropertyCard
                        name="Haras de Calabre"
                        type="paturage_equides"
                        size="grand"
                        location="Calabre"
                        value="550,000 As"
                        status="Excellent"
                        maintenance="6,000 As/an"
                        revenue="18,000 As/an"
                        benefits={["Élevage de 30 chevaux/an", "Fourniture pour l'armée", "Prestige militaire"]}
                        imageUrl="/placeholder.svg"
                      />
                      <PropertyCard
                        name="Pâturages d'Apulie"
                        type="paturage_bovins"
                        size="moyen"
                        location="Apulie"
                        value="420,000 As"
                        status="Bon"
                        maintenance="4,000 As/an"
                        revenue="11,000 As/an"
                        benefits={["Élevage de 50 bovins/an", "Production de cuir", "Alimentation urbaine"]}
                        imageUrl="/placeholder.svg"
                      />
                      <PropertyCard
                        name="Bergeries de Sicile"
                        type="paturage_moutons"
                        size="petit"
                        location="Sicile"
                        value="280,000 As"
                        status="Très bon"
                        maintenance="2,000 As/an"
                        revenue="8,000 As/an"
                        benefits={["Production de laine de qualité", "Fromage d'exportation", "Faible coût d'entretien"]}
                        imageUrl="/placeholder.svg"
                      />
                    </div>
                  </RomanCard.Content>
                </RomanCard>
              </div>
            </TabsContent>
            
            <TabsContent value="stocks" className="pt-4">
              <StorageManagement />
            </TabsContent>
            
            <TabsContent value="carte" className="pt-4">
              <PropertyMap />
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="apercu" className="pt-4">
          <ApercuTab />
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
