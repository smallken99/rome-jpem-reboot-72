
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { FamilleWelcome } from '../welcome/FamilleWelcome';
import { Inheritance } from '../Inheritance';
import { FamilleMain } from '../pages/FamilleMain';
import { Education } from '../Education';
import { EducationProvider } from '../education/context/EducationContext';

export const FamilleRoutes: React.FC = () => {
  return (
    <Layout>
      <PageHeader 
        title="Famille"
        subtitle="Gérez les membres de votre famille, les alliances et l'héritage"
      />
      
      <Routes>
        <Route path="/" element={<FamilleWelcome />} />
        <Route path="/arbre-genealogique" element={<FamilleMain />} />
        <Route path="/heritage" element={<Inheritance />} />
        <Route path="/education/*" element={
          <EducationProvider>
            <Education />
          </EducationProvider>
        } />
        <Route path="/alliances" element={<FamilleMain />} />
        <Route path="*" element={<Navigate to="/famille" replace />} />
      </Routes>
    </Layout>
  );
};
