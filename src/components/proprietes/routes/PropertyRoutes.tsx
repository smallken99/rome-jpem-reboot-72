
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PropertyManagement from '@/components/proprietes/PropertyManagement';
import { PropertyMap } from '@/components/proprietes/PropertyMap';
import { PropertyDetail } from '@/components/proprietes/property-management/PropertyDetail';

export const PropertyRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PropertyManagement />} />
      <Route path="/:propertyId" element={<PropertyDetail />} />
      <Route path="*" element={<Navigate to="/patrimoine/proprietes" replace />} />
    </Routes>
  );
};
