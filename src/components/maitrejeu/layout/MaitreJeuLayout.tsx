
import React, { ReactNode } from 'react';
import { MaitreJeuHeader } from './MaitreJeuHeader';
import { MaitreJeuSidebar, MaitreJeuSidebarProps } from './MaitreJeuSidebar';

interface MaitreJeuLayoutProps extends MaitreJeuSidebarProps {
  children: ReactNode;
}

export const MaitreJeuLayout: React.FC<MaitreJeuLayoutProps> = ({
  activeTab,
  setActiveTab,
  children
}) => {
  return (
    <div className="min-h-screen bg-roman-pattern">
      <MaitreJeuHeader />
      
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <MaitreJeuSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
