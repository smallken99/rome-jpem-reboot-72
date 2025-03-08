
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ReligionMain } from '@/components/religion/ReligionMain';
import { VestalesPage } from '@/components/religion/pages/VestalesPage';
import { TemplesPage } from '@/components/religion/pages/TemplesPage';
import { CeremoniesPage } from '@/components/religion/pages/CeremoniesPage';
import { AuguresPage } from '@/components/religion/pages/AuguresPage';

const Religion = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ReligionMain />} />
        <Route path="/vestales" element={<VestalesPage />} />
        <Route path="/temples" element={<TemplesPage />} />
        <Route path="/ceremonies" element={<CeremoniesPage />} />
        <Route path="/augures" element={<AuguresPage />} />
        <Route path="*" element={<Navigate to="/religion" replace />} />
      </Routes>
    </Layout>
  );
};

export default Religion;
