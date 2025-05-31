import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { LifeManagementMenu } from '@/components/lifemanagement/LifeManagementMenu'; // Corrected: LifeManagementMenu is default export in its file
import TodoListPage from '@/components/lifemanagement/TodoListPage';
import PostItNotesPage from '@/components/lifemanagement/PostItNotesPage';
// Removed Religion specific imports

// Placeholder for any context providers if Religion.tsx had them and LifeManagement needs them
// For example: import { SomeContextProvider } from '@/context/SomeContext';

const LifeManagementPage: React.FC = () => {
  return (
    // If Religion.tsx used a specific context provider, wrap it here
    // <SomeContextProvider>
    <Layout>
      <Routes>
        <Route path="/" element={<LifeManagementMenu />} />
        <Route path="todos" element={<TodoListPage />} /> {/* Relative path */}
        <Route path="notes" element={<PostItNotesPage />} /> {/* Relative path */}
        {/* Redirect any unmatched sub-paths under /lifemanagement back to the /lifemanagement base */}
        <Route path="*" element={<Navigate to="/lifemanagement" replace />} />
      </Routes>
    </Layout>
    // </SomeContextProvider>
  );
};

export default LifeManagementPage;
