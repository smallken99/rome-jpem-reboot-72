
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientList } from '@/components/clientele/ClientList';
import { ClientStats } from '@/components/clientele/ClientStats';
import ClientDetail from '@/components/clientele/ClientDetail';
import ClientCreate from '@/components/clientele/ClientCreate';

const ClienteleRoutes = () => (
  <Routes>
    <Route path="/" element={<ClienteleMain />} />
    <Route path="/client/:id" element={<ClientDetail />} />
    <Route path="/nouveau" element={<ClientCreate />} />
  </Routes>
);

const ClienteleMain = () => {
  return (
    <Layout>
      <PageHeader 
        title="Clientèle" 
        subtitle="Gérez vos relations et influences auprès de vos clients plébéiens"
      />
      
      <Tabs defaultValue="liste" className="w-full">
        <TabsList className="bg-rome-parchment border border-rome-gold/30 mb-6">
          <TabsTrigger value="liste" className="font-cinzel">Liste des Clients</TabsTrigger>
          <TabsTrigger value="statistiques" className="font-cinzel">Statistiques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="liste" className="space-y-6">
          <ClientList />
        </TabsContent>
        
        <TabsContent value="statistiques" className="space-y-6">
          <ClientStats />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

const Clientele = () => {
  return <ClienteleRoutes />;
};

export default Clientele;
