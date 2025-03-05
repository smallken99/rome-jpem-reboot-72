
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientList } from '@/components/clientele/ClientList';
import { ClientStats } from '@/components/clientele/ClientStats';
import ClientDetail from '@/components/clientele/ClientDetail';
import ClientCreate from '@/components/clientele/ClientCreate';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClienteleRoutes = () => (
  <Routes>
    <Route path="/" element={<ClienteleMain />} />
    <Route path="/client/:id" element={<ClientDetail />} />
    <Route path="/nouveau" element={<ClientCreate />} />
    <Route path="*" element={<Navigate to="/clientele" replace />} />
  </Routes>
);

const ClienteleMain = () => {
  const navigate = useNavigate();
  
  const handleNewClient = () => {
    navigate('/clientele/nouveau');
  };
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <PageHeader 
          title="Clientèle" 
          subtitle="Gérez vos relations et influences auprès de vos clients plébéiens"
        />
        
        <ActionButton
          label="Nouveau Client"
          icon={<UserPlus className="h-4 w-4" />}
          onClick={handleNewClient}
        />
      </div>
      
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
