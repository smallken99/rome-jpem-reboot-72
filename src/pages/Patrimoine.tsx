
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { PropertyManagement } from '@/components/proprietes/PropertyManagement';
import { ImpotsTab } from '@/components/economie/tabs/ImpotsTab';
import { RevenusTab } from '@/components/economie/tabs/RevenusTab';
import { DepensesTab } from '@/components/economie/tabs/DepensesTab';

const PatrimoineMain = () => {
  return (
    <Layout>
      <PageHeader 
        title="Patrimoine" 
        subtitle="Gérez vos propriétés et finances familiales" 
      />
      <PropertyManagement />
    </Layout>
  );
};

const Proprietes = () => {
  return (
    <Layout>
      <PageHeader 
        title="Propriétés"
        subtitle="Gérez vos domaines urbains et ruraux"
      />
      <PropertyManagement />
    </Layout>
  );
};

const Revenus = () => {
  return (
    <Layout>
      <PageHeader 
        title="Revenus"
        subtitle="Suivez l'ensemble des revenus de votre famille"
      />
      <div className="roman-card">
        <RevenusTab />
      </div>
    </Layout>
  );
};

const Depenses = () => {
  return (
    <Layout>
      <PageHeader 
        title="Dépenses"
        subtitle="Contrôlez les dépenses et optimisez votre budget"
      />
      <div className="roman-card">
        <DepensesTab />
      </div>
    </Layout>
  );
};

const Impots = () => {
  return (
    <Layout>
      <PageHeader 
        title="Impôts"
        subtitle="Gérez vos obligations fiscales envers la République"
      />
      <div className="roman-card">
        <ImpotsTab />
      </div>
    </Layout>
  );
};

const Patrimoine = () => {
  return (
    <Routes>
      <Route path="/" element={<PatrimoineMain />} />
      <Route path="/proprietes" element={<Proprietes />} />
      <Route path="/revenus" element={<Revenus />} />
      <Route path="/depenses" element={<Depenses />} />
      <Route path="/impots" element={<Impots />} />
      <Route path="*" element={<Navigate to="/patrimoine" replace />} />
    </Routes>
  );
};

export default Patrimoine;
