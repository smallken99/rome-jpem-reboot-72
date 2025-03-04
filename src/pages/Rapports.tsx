
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ReportsInfluence } from '@/components/rapports/ReportsInfluence';
import { ReportsFinance } from '@/components/rapports/ReportsFinance';
import { ReportsFamily } from '@/components/rapports/ReportsFamily';
import { ReportsStrategy } from '@/components/rapports/ReportsStrategy';

const Rapports = () => {
  return (
    <Layout>
      <PageHeader 
        title="Rapports" 
        subtitle="Analysez vos données et prenez des décisions éclairées" 
      />

      <Tabs defaultValue="influence" className="mb-8">
        <TabsList className="border border-rome-gold/30 bg-rome-parchment">
          <TabsTrigger value="influence" className="data-[state=active]:bg-white">Influence</TabsTrigger>
          <TabsTrigger value="finances" className="data-[state=active]:bg-white">Finances</TabsTrigger>
          <TabsTrigger value="famille" className="data-[state=active]:bg-white">Famille</TabsTrigger>
          <TabsTrigger value="strategie" className="data-[state=active]:bg-white">Stratégie</TabsTrigger>
        </TabsList>
        
        <TabsContent value="influence" className="pt-4">
          <ReportsInfluence />
        </TabsContent>
        
        <TabsContent value="finances" className="pt-4">
          <ReportsFinance />
        </TabsContent>
        
        <TabsContent value="famille" className="pt-4">
          <ReportsFamily />
        </TabsContent>
        
        <TabsContent value="strategie" className="pt-4">
          <ReportsStrategy />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Rapports;
