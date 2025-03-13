
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FamilleMain } from '../pages/FamilleMain';
import { ArbreGenealogique } from '../pages/ArbreGenealogique';
import { Alliances } from '../pages/Alliances';
import { AllianceManagementPage } from '../pages/AllianceManagementPage';
import { EducationPage } from '../pages/EducationPage';
import { ChildEducationDetailPage } from '../pages/ChildEducationDetailPage';
import { PreceptorDetailPage } from '../pages/PreceptorDetailPage';
import { Heritage } from '../pages/Heritage';
import { InheritanceDetailsPage } from '../pages/InheritanceDetailsPage';

export const FamilleRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FamilleMain />} />
      <Route path="/arbre-genealogique" element={<ArbreGenealogique />} />
      <Route path="/alliances" element={<Alliances />} />
      <Route path="/alliances/create" element={<AllianceManagementPage />} />
      <Route path="/alliances/edit/:allianceId" element={<AllianceManagementPage />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/education/child/:childId" element={<ChildEducationDetailPage />} />
      <Route path="/education/preceptor/:preceptorId" element={<PreceptorDetailPage />} />
      <Route path="/heritage" element={<Heritage />} />
      <Route path="/heritage/heir/:heirId" element={<InheritanceDetailsPage />} />
    </Routes>
  );
};
