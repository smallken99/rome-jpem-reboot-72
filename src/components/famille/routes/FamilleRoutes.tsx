
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FamilyTree } from '../FamilyTree';
import { EducationManagement } from '../education/EducationManagement';
import { MarriagesAndAlliances } from '../alliances/MarriagesAndAlliances';
import { Inheritance } from '../Inheritance';
import { FamilleMenu } from './FamilleMenu';
import { AllianceManagement } from '../alliances/AllianceManagement';
import { FamilyReputation } from '../reputation/FamilyReputation';
import { EducationDetail } from '../education/EducationDetail';

export const FamilleRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FamilleMenu />} />
      <Route path="/tree" element={<FamilyTree />} />
      <Route path="/education" element={<EducationManagement />} />
      <Route path="/education/:childId" element={<EducationDetail />} />
      <Route path="/alliances" element={<MarriagesAndAlliances />} />
      <Route path="/alliance/:femaleId" element={<AllianceManagement />} />
      <Route path="/inheritance" element={<Inheritance />} />
      <Route path="/reputation" element={<FamilyReputation />} />
      <Route path="*" element={<Navigate to="/famille" replace />} />
    </Routes>
  );
};
