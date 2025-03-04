
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { RegistreLois } from '@/components/registre/RegistreLois';
import { RegistreHistoire } from '@/components/registre/RegistreHistoire';

const Registre = () => {
  return (
    <Layout>
      <PageHeader 
        title="Registre" 
        subtitle="Consultez l'histoire et les lois de la République" 
      />

      <Tabs defaultValue="lois" className="mb-8">
        <TabsList className="border border-rome-gold/30 bg-rome-parchment">
          <TabsTrigger value="lois" className="data-[state=active]:bg-white">Lois</TabsTrigger>
          <TabsTrigger value="histoire" className="data-[state=active]:bg-white">Histoire</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lois" className="pt-4">
          <RegistreLois />
        </TabsContent>
        
        <TabsContent value="histoire" className="pt-4">
          <RegistreHistoire />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Registre;
