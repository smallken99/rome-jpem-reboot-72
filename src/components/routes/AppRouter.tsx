
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Famille from '@/pages/Famille';
import { ProvideCharacters } from '@/components/famille/hooks/useCharacters';

export const AppRouter: React.FC = () => {
  return (
    <ProvideCharacters>
      <Routes>
        <Route path="/famille/*" element={<Famille />} />
        <Route path="/" element={<Navigate to="/famille" replace />} />
      </Routes>
    </ProvideCharacters>
  );
};
