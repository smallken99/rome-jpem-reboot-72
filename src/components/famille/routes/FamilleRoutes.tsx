
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FamilleMain } from '../pages/FamilleMain';
import { FamilyEducation } from '../education/FamilyEducation';
import { ChildEducationDetail } from '../education/ChildEducationDetail';
import { MarriagesAndAlliances } from '../alliances/MarriagesAndAlliances';
import { FamilyTreePage } from '../tree/FamilyTreePage';
import { InheritancePlanning } from '../inheritance/InheritancePlanning';

export const FamilleRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FamilleMain />} />
      <Route path="/education" element={<FamilyEducation />} />
      <Route path="/education/child/:childId" element={<ChildEducationDetail />} />
      <Route path="/alliances" element={<MarriagesAndAlliances />} />
      <Route path="/tree" element={<FamilyTreePage />} />
      <Route path="/inheritance" element={<InheritancePlanning />} />
      <Route path="*" element={<Navigate to="/famille" replace />} />
    </Routes>
  );
};
