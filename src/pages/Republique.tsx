
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { RepubliqueMain } from '@/components/republique/pages/RepubliqueMain';
import { TresorPage } from '@/components/republique/pages/TresorPage';
import { JusticePage } from '@/components/republique/pages/JusticePage';
import { DomainesPage } from '@/components/republique/pages/DomainesPage';
import { ImpotsPage } from '@/components/republique/impots/ImpotsPage';
import { AgerPublicusPage } from '@/components/republique/ager/AgerPublicusPage';
import { PolitiquePage } from '@/components/republique/pages/PolitiquePage';
import { LoisPage } from '@/components/republique/pages/LoisPage';
import { BatimentsPage } from '@/components/republique/pages/BatimentsPage';
import { BatimentsMilitairesPage } from '@/components/republique/pages/BatimentsMilitairesPage';
import { SecuritePage } from '@/components/republique/pages/SecuritePage';
import { BureauxPage } from '@/components/republique/pages/BureauxPage';

const Republique = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RepubliqueMain />} />
        <Route path="/tresor" element={<TresorPage />} />
        <Route path="/justice" element={<JusticePage />} />
        <Route path="/politique" element={<PolitiquePage />} />
        <Route path="/lois" element={<LoisPage />} />
        <Route path="/domaines" element={<DomainesPage />} />
        <Route path="/impots" element={<ImpotsPage />} />
        <Route path="/ager" element={<AgerPublicusPage />} />
        <Route path="/batiments" element={<BatimentsPage />} />
        <Route path="/batiments-militaires" element={<BatimentsMilitairesPage />} />
        <Route path="/securite" element={<SecuritePage />} />
        <Route path="/bureaux" element={<BureauxPage />} />
        <Route path="/bureaux/:bureau" element={<BureauxPage />} />
        <Route path="*" element={<Navigate to="/republique" replace />} />
      </Routes>
    </Layout>
  );
};

export default Republique;
