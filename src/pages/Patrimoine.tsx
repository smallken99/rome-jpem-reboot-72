
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import Layout from '@/components/layout/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import PropertyManagement from '@/components/proprietes/PropertyManagement';
import { EconomieTabs } from '@/components/economie/EconomieTabs';
import { PropertyMap } from '@/components/proprietes/PropertyMap';
import { StorageManagement } from '@/components/proprietes/StorageManagement';

const Patrimoine: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          <>
            <PageHeader 
              title="Patrimoine" 
              subtitle="Gestion des propriétés et des ressources" 
            />
            <div className="roman-card">
              <PropertyManagement />
            </div>
          </>
        } />
        
        <Route path="/proprietes" element={
          <>
            <PageHeader 
              title="Propriétés" 
              subtitle="Gestion détaillée des propriétés" 
            />
            <div className="roman-card">
              <PropertyManagement />
            </div>
          </>
        } />
        
        <Route path="/carte" element={
          <>
            <PageHeader 
              title="Carte des propriétés" 
              subtitle="Visualisation géographique de vos propriétés" 
            />
            <div className="roman-card">
              <PropertyMap />
            </div>
          </>
        } />
        
        <Route path="/economie" element={
          <>
            <PageHeader 
              title="Économie" 
              subtitle="Gestion financière et économique" 
            />
            <div className="roman-card">
              <EconomieTabs />
            </div>
          </>
        } />
        
        <Route path="/stockage" element={
          <>
            <PageHeader 
              title="Stockage" 
              subtitle="Gestion des stocks et des ressources" 
            />
            <div className="roman-card">
              <StorageManagement />
            </div>
          </>
        } />
        
        <Route path="*" element={<Navigate to="/patrimoine" replace />} />
      </Routes>
    </Layout>
  );
};

export default Patrimoine;
