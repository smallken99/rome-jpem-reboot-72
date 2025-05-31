
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Famille from '@/pages/Famille';
import Patrimoine from '@/pages/Patrimoine';
import { Rapports } from '@/pages/Rapports';
import { ProvideCharacters } from '@/components/famille/hooks/useCharacters';
import { RelationsProvider } from '@/components/famille/relations/context/RelationsContext';
import LifeManagementMenu from '@/components/lifemanagement/LifeManagementMenu'; // Added
import TodoListPage from '@/components/lifemanagement/TodoListPage';
import PostItNotesPage from '@/components/lifemanagement/PostItNotesPage';

export const AppRouter: React.FC = () => {
  return (
    <ProvideCharacters>
      <RelationsProvider>
        <Routes>
          <Route path="/famille/*" element={<Famille />} />
          <Route path="/patrimoine/*" element={<Patrimoine />} />
          <Route path="/rapports/*" element={<Rapports />} />
          <Route path="/lifemanagement" element={<LifeManagementMenu />} /> {/* Added */}
          <Route path="/lifemanagement/todos" element={<TodoListPage />} />
          <Route path="/lifemanagement/notes" element={<PostItNotesPage />} />
          <Route path="/" element={<Navigate to="/famille" replace />} />
        </Routes>
      </RelationsProvider>
    </ProvideCharacters>
  );
};
