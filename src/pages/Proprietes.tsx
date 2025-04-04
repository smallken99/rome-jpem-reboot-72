
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyMap } from '@/components/proprietes/PropertyMap';
import { ResourceCard } from '@/components/proprietes/ResourceCard';
import { StatBox } from '@/components/ui-custom/StatBox';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { PropertyList } from '@/components/proprietes/PropertyList';
import { useBuildingManagement } from '@/hooks/useBuildingManagement';
import { usePatrimoineManager } from '@/hooks/usePatrimoineManager';
import { useNavigate } from 'react-router-dom';
import { Home, Building, MapPin, Wheat, ArrowUp, ArrowDown } from 'lucide-react';

const Proprietes = () => {
  const navigate = useNavigate();
  const { buildings, stats } = useBuildingManagement();
  const { isLoading } = usePatrimoineManager();
  const [activeTab, setActiveTab] = useState('liste');
  
  // Calculer les statistiques de propriétés
  const urbanCount = buildings.filter(b => b.type === 'urban' || b.buildingType === 'urban').length;
  const ruralCount = buildings.filter(b => b.type === 'rural' || b.buildingType === 'rural').length;

  // Calculer les tendances (dans un cas réel, ces données viendraient de l'historique)
  const getRandomTrend = () => {
    const trends = ['up', 'down', 'neutral'];
    return trends[Math.floor(Math.random() * trends.length)];
  };
  
  const propertyTrend = getRandomTrend();
  const incomeTrend = getRandomTrend();

  const handleManageBuilding = (id: string) => {
    navigate(`/patrimoine/proprietes/${id}`);
  };

  const handleAddProperty = () => {
    navigate('/patrimoine/proprietes/market');
  };

  return (
    <Layout>
      <PageHeader 
        title="Propriétés" 
        subtitle="Gérez votre patrimoine immobilier et vos domaines agricoles" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatBox 
          title="Propriétés totales" 
          value={buildings.length.toString()} 
          description={propertyTrend === 'up' ? "Valeur totale en hausse" : propertyTrend === 'down' ? "Valeur totale en baisse" : "Valeur stable"}
          icon={<Building className="h-6 w-6" />}
          trend={propertyTrend}
          trendValue={propertyTrend === 'neutral' ? undefined : propertyTrend === 'up' ? "+2" : "-1"}
        />
        <StatBox 
          title="Domaines urbains" 
          value={urbanCount.toString()} 
          description="Insulae et domus à Rome"
          icon={<Home className="h-6 w-6" />}
        />
        <StatBox 
          title="Domaines ruraux" 
          value={ruralCount.toString()} 
          description="Terres agricoles et villas"
          icon={<MapPin className="h-6 w-6" />}
        />
        <StatBox 
          title="Revenus annuels" 
          value={`${stats.totalIncome.toLocaleString()} As`} 
          description={incomeTrend === 'up' ? "Rendements en hausse" : incomeTrend === 'down' ? "Rendements en baisse" : "Rendements stables"}
          icon={<Wheat className="h-6 w-6" />}
          trend={incomeTrend}
          trendValue={incomeTrend === 'neutral' ? undefined : incomeTrend === 'up' ? "+5%" : "-3%"}
        />
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="border border-rome-gold/30 bg-rome-parchment">
          <TabsTrigger value="liste" className="data-[state=active]:bg-white">Vue Liste</TabsTrigger>
          <TabsTrigger value="carte" className="data-[state=active]:bg-white">Vue Carte</TabsTrigger>
        </TabsList>
        
        <TabsContent value="liste" className="pt-4">
          <PropertyList 
            buildings={buildings} 
            onManageBuilding={handleManageBuilding} 
            onAddProperty={handleAddProperty}
          />

          <RomanCard className="mt-8">
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
