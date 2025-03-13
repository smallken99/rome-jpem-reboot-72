
import React from 'react';
import { MaitreJeuHeader } from './MaitreJeuHeader';
import { MaitreJeuSidebar } from './MaitreJeuSidebar';
import { MaitreJeuContent } from './MaitreJeuContent';

interface MaitreJeuLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// Mettons à jour l'interface pour MaitreJeuSidebarProps pour inclure setActiveTab
export interface MaitreJeuSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MaitreJeuLayout: React.FC<MaitreJeuLayoutProps> = ({
  activeTab,
  setActiveTab
}) => {
  return (
    <div className="min-h-screen bg-roman-pattern">
      <MaitreJeuHeader />
      
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <MaitreJeuSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="flex-1 bg-white rounded-lg shadow-md">
            <MaitreJeuContent activeTab={activeTab} />
          </div>
        </div>
      </main>
    </div>
  );
};
