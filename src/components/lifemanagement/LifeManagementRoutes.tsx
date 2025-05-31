import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LifeManagementMenu from '@/components/lifemanagement/LifeManagementMenu'; // Corrected import
import TodoListPage from '@/components/lifemanagement/TodoListPage'; // Corrected import
import PostItNotesPage from '@/components/lifemanagement/PostItNotesPage'; // Corrected import

export const LifeManagementRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LifeManagementMenu />} />
      <Route path="todos" element={<TodoListPage />} /> {/* Relative path */}
      <Route path="notes" element={<PostItNotesPage />} /> {/* Relative path */}
      {/* Optional: Redirect any unmatched sub-paths back to the base or a default sub-page */}
      <Route path="*" element={<Navigate to="." replace />} /> {/* Navigate relative to current route */}
    </Routes>
  );
};
