
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MaitreJeuProvider } from '@/components/maitrejeu/context/MaitreJeuContext';
import { MaitreJeuLayout } from '@/components/maitrejeu/layout/MaitreJeuLayout';
import { GestionSenateurs } from '@/components/maitrejeu/GestionSenateurs';
import { GestionProvinces } from '@/components/maitrejeu/GestionProvinces';
import { GestionPolitique } from '@/components/maitrejeu/GestionPolitique';
import { GestionEquilibre } from '@/components/maitrejeu/GestionEquilibre';
import { GestionHistoire } from '@/components/maitrejeu/GestionHistoire';
import { GestionClients } from '@/components/maitrejeu/GestionClients';
import { GestionEconomie } from '@/components/maitrejeu/GestionEconomie';
import { GestionFamilles } from '@/components/maitrejeu/GestionFamilles';
import { GestionRepublique } from '@/components/maitrejeu/GestionRepublique';
import { GestionBatiments } from '@/components/maitrejeu/GestionBatiments';
import { GestionLois } from '@/components/maitrejeu/GestionLois';
import { MaitreJeuWelcome } from '@/components/maitrejeu/MaitreJeuWelcome';
import { MaitreJeuStats } from '@/components/maitrejeu/MaitreJeuStats';

const MaitreJeu = () => {
  const [activeTab, setActiveTab] = useState('accueil');

  return (
    <MaitreJeuProvider>
      <Routes>
        <Route path="/" element={
          <MaitreJeuLayout 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            {activeTab === 'accueil' && <MaitreJeuWelcome />}
            {activeTab === 'senateurs' && <GestionSenateurs />}
            {activeTab === 'provinces' && <GestionProvinces />}
            {activeTab === 'politique' && <GestionPolitique />}
            {activeTab === 'equilibre' && <GestionEquilibre />}
            {activeTab === 'histoire' && <GestionHistoire />}
            {activeTab === 'clients' && <GestionClients />}
            {activeTab === 'economie' && <GestionEconomie />}
            {activeTab === 'familles' && <GestionFamilles />}
            {activeTab === 'republique' && <GestionRepublique />}
            {activeTab === 'batiments' && <GestionBatiments />}
            {activeTab === 'lois' && <GestionLois />}
            {activeTab === 'statistiques' && <MaitreJeuStats />}
          </MaitreJeuLayout>
        } />
        <Route path="*" element={<Navigate to="/maitre-jeu/" replace />} />
      </Routes>
    </MaitreJeuProvider>
  );
};

export default MaitreJeu;
