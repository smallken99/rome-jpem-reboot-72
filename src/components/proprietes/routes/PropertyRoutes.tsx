
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PropertyManagement from '@/components/proprietes/PropertyManagement';
import { PropertyMap } from '@/components/proprietes/PropertyMap';
import { PropertyDetail } from '@/components/proprietes/property-management/PropertyDetail';
import { ProfitabilityTab } from '@/components/proprietes/property-management/profitability/ProfitabilityTab';

export const PropertyRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PropertyManagement />} />
      <Route path="/map" element={<PropertyMap />} />
      <Route path="/:propertyId" element={<PropertyDetail />} />
      <Route path="/:propertyId/profitability" element={<ProfitabilityTab />} />
      <Route path="*" element={<Navigate to="/patrimoine/proprietes" replace />} />
    </Routes>
  );
};
