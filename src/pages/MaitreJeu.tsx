
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MaitreJeuProvider } from '@/components/maitrejeu/context/MaitreJeuContext';
import { MaitreJeuLayout } from '@/components/maitrejeu/layout/MaitreJeuLayout';
import { MaitreJeuContent } from '@/components/maitrejeu/layout/MaitreJeuContent';

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
            <MaitreJeuContent activeTab={activeTab} />
          </MaitreJeuLayout>
        } />
        <Route path="*" element={<Navigate to="/maitre-jeu/" replace />} />
      </Routes>
    </MaitreJeuProvider>
  );
};

export default MaitreJeu;
