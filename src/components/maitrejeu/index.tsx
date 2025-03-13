
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MaitreJeu from '@/pages/MaitreJeu';

const MaitreJeuRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<MaitreJeu />} />
    </Routes>
  );
};

export default MaitreJeuRoutes;
