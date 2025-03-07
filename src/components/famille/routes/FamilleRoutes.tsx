
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FamilleMain } from '@/components/famille/pages/FamilleMain';
import { ArbreGenealogique } from '@/components/famille/pages/ArbreGenealogique';
import { Alliances } from '@/components/famille/pages/Alliances';
import { AllianceManagementPage } from '@/components/famille/pages/AllianceManagementPage';
import { EducationPage } from '@/components/famille/pages/EducationPage';
import { ChildEducationDetailPage } from '@/components/famille/pages/ChildEducationDetailPage';
import { PreceptorDetailPage } from '@/components/famille/pages/PreceptorDetailPage';
import { Heritage } from '@/components/famille/pages/Heritage';
import { InheritanceDetailsPage } from '@/components/famille/pages/InheritanceDetailsPage';
import { DowryManagementPage } from '@/components/famille/pages/DowryManagementPage';

export const FamilleRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FamilleMain />} />
      <Route path="/arbre" element={<ArbreGenealogique />} />
      
      {/* Alliance routes */}
      <Route path="/alliances" element={<Alliances />} />
      <Route path="/alliances/manage/:femaleId" element={<AllianceManagementPage />} />
      
      {/* Education routes */}
      <Route path="/education" element={<EducationPage />} />
      <Route path="/education/child/:childId" element={<ChildEducationDetailPage />} />
      <Route path="/education/preceptors" element={<EducationPage />} />
      <Route path="/education/preceptors/:preceptorId" element={<PreceptorDetailPage />} />
      
      {/* Education tabs routes - redirect to main education page with the correct tab */}
      <Route path="/education/current" element={<Navigate to="/famille/education" replace state={{ tab: 'current' }} />} />
      <Route path="/education/paths" element={<Navigate to="/famille/education" replace state={{ tab: 'paths' }} />} />
      
      {/* Heritage routes */}
      <Route path="/heritage" element={<Heritage />} />
      <Route path="/heritage/heir/:heirId" element={<InheritanceDetailsPage />} />
      <Route path="/heritage/dowry/:femaleId" element={<DowryManagementPage />} />
      
      {/* Default fallback */}
      <Route path="*" element={<Navigate to="/famille" replace />} />
    </Routes>
  );
};
