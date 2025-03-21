
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MaitreJeuProvider } from '@/components/maitrejeu/context/MaitreJeuContext';
import { MaitreJeuLayout } from '@/components/maitrejeu/layout/MaitreJeuLayout';
import { MaitreJeuContent } from '@/components/maitrejeu/layout/MaitreJeuContent';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';

const MaitreJeu = () => {
  const [activeTab, setActiveTab] = useState('accueil');
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Effet d'initialisation
  useEffect(() => {
    if (isFirstLoad) {
      // Mettre un petit délai pour permettre l'animation d'entrée
      const timer = setTimeout(() => {
        setIsFirstLoad(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstLoad]);

  return (
    <MaitreJeuProvider>
      <Toaster richColors position="top-right" />
      <AnimatePresence mode="wait">
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
      </AnimatePresence>
    </MaitreJeuProvider>
  );
};

export default MaitreJeu;
