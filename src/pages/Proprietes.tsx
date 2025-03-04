
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyCard } from '@/components/proprietes/PropertyCard';
import { ResourceCard } from '@/components/proprietes/ResourceCard';
import { PropertyMap } from '@/components/proprietes/PropertyMap';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Map, 
  Wheat, 
  Users, 
  LandPlot,
  Home,
  Building2
} from 'lucide-react';

const Proprietes = () => {
  return (
    <Layout>
      <PageHeader
        title="Propriétés et Patrimoine"
        subtitle="Gérez vos terres, villas et autres propriétés à travers la République"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatBox 
          label="Valeur totale" 
          value="5,230,000 Sesterces" 
          icon={<Building className="h-6 w-6" />} 
          trend="up"
        />
        <StatBox 
          label="Nombre de propriétés" 
          value="8" 
          icon={<Home className="h-6 w-6" />} 
        />
        <StatBox 
          label="Terres agricoles" 
          value="1250 jugères" 
          icon={<LandPlot className="h-6 w-6" />} 
          trend="up"
        />
        <StatBox 
          label="Esclaves et ouvriers" 
          value="87" 
          icon={<Users className="h-6 w-6" />} 
        />
      </div>

      <div className="mb-8">
        <RomanCard title="Carte des Propriétés" className="mb-8">
          <PropertyMap />
        </RomanCard>
      </div>

      <Tabs defaultValue="villas" className="mb-8">
        <TabsList className="w-full flex justify-start gap-2 mb-4 border-b border-rome-gold/20 pb-2 overflow-x-auto">
          <TabsTrigger value="villas" className="data-[state=active]:bg-rome-gold/20 data-[state=active]:text-rome-navy data-[state=active]:font-bold rounded font-cinzel">
            <Building2 className="mr-2 h-4 w-4" />
            Villas
          </TabsTrigger>
          <TabsTrigger value="insulae" className="data-[state=active]:bg-rome-gold/20 data-[state=active]:text-rome-navy data-[state=active]:font-bold rounded font-cinzel">
            <Building className="mr-2 h-4 w-4" />
            Insulae
          </TabsTrigger>
          <TabsTrigger value="terres" className="data-[state=active]:bg-rome-gold/20 data-[state=active]:text-rome-navy data-[state=active]:font-bold rounded font-cinzel">
            <LandPlot className="mr-2 h-4 w-4" />
            Terres agricoles
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="villas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PropertyCard 
              name="Villa Aurelia" 
              location="Baiae, Campanie" 
              value="1,250,000 Sesterces" 
              type="villa" 
              status="Excellente"
              image="/images/placeholder.svg"
            />
            <PropertyCard 
              name="Villa Rustica" 
              location="Tusculum, Latium" 
              value="850,000 Sesterces" 
              type="villa" 
              status="Bonne"
              image="/images/placeholder.svg"
            />
            <PropertyCard 
              name="Villa Marina" 
              location="Ostie, Latium" 
              value="950,000 Sesterces" 
              type="villa" 
              status="Moyenne"
              image="/images/placeholder.svg"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="insulae" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PropertyCard 
              name="Insula Palatina" 
              location="Rome, Région I" 
              value="600,000 Sesterces" 
              type="insulae" 
              status="Bonne"
              image="/images/placeholder.svg"
            />
            <PropertyCard 
              name="Insula Traiana" 
              location="Rome, Région IV" 
              value="450,000 Sesterces" 
              type="insulae" 
              status="Moyenne"
              image="/images/placeholder.svg"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="terres" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PropertyCard 
              name="Fundus Aurelius" 
              location="Campanie" 
              value="750,000 Sesterces" 
              type="terres" 
              status="Excellente"
              image="/images/placeholder.svg"
            />
            <PropertyCard 
              name="Fundus Caecilius" 
              location="Sicile" 
              value="380,000 Sesterces" 
              type="terres" 
              status="Bonne"
              image="/images/placeholder.svg"
            />
            <PropertyCard 
              name="Terra Vinea" 
              location="Étrurie" 
              value="420,000 Sesterces" 
              type="terres" 
              status="Excellente"
              image="/images/placeholder.svg"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RomanCard title="Ressources Agricoles" className="h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResourceCard 
              name="Blé" 
              quantity="1,200 modii" 
              value="24,000 Sesterces" 
              trend="up"
              icon={<Wheat className="h-5 w-5" />}
            />
            <ResourceCard 
              name="Vin" 
              quantity="80 amphores" 
              value="16,000 Sesterces" 
              trend="neutral"
              icon={<Wheat className="h-5 w-5" />}
            />
            <ResourceCard 
              name="Huile d'olive" 
              quantity="50 amphores" 
              value="12,500 Sesterces" 
              trend="up"
              icon={<Wheat className="h-5 w-5" />}
            />
            <ResourceCard 
              name="Laine" 
              quantity="300 livres" 
              value="9,000 Sesterces" 
              trend="down"
              icon={<Wheat className="h-5 w-5" />}
            />
          </div>
        </RomanCard>
        
        <RomanCard title="Esclaves et Travailleurs" className="h-full">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-rome-gold/20 pb-2">
              <div>
                <h4 className="font-cinzel text-lg font-semibold">Esclaves domestiques</h4>
                <p className="text-muted-foreground text-sm">Pour l'entretien des villas et insulae</p>
              </div>
              <span className="font-bold">24</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-rome-gold/20 pb-2">
              <div>
                <h4 className="font-cinzel text-lg font-semibold">Esclaves agricoles</h4>
                <p className="text-muted-foreground text-sm">Pour le travail des terres et la récolte</p>
              </div>
              <span className="font-bold">45</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-rome-gold/20 pb-2">
              <div>
                <h4 className="font-cinzel text-lg font-semibold">Ouvriers</h4>
                <p className="text-muted-foreground text-sm">Travail libre rémunéré</p>
              </div>
              <span className="font-bold">18</span>
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="outline" className="roman-btn-outline">Gérer les travailleurs</Button>
            </div>
          </div>
        </RomanCard>
      </div>
    </Layout>
  );
};

export default Proprietes;
