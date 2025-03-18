
import React from 'react';
import { 
  Home, 
  Users, 
  Map, 
  Scale, 
  History, 
  Handshake, 
  Landmark, 
  Building, 
  FileText, 
  ScrollText, 
  BarChart, 
  Shapes, 
  Database 
} from 'lucide-react';

interface MaitreJeuTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MaitreJeuTabs: React.FC<MaitreJeuTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'accueil', name: 'Accueil', icon: <Home className="h-5 w-5" /> },
    { id: 'senateurs', name: 'Sénateurs', icon: <Users className="h-5 w-5" /> },
    { id: 'provinces', name: 'Provinces', icon: <Map className="h-5 w-5" /> },
    { id: 'politique', name: 'Politique', icon: <Landmark className="h-5 w-5" /> },
    { id: 'equilibre', name: 'Équilibre', icon: <Scale className="h-5 w-5" /> },
    { id: 'histoire', name: 'Histoire', icon: <History className="h-5 w-5" /> },
    { id: 'clients', name: 'Clients', icon: <Handshake className="h-5 w-5" /> },
    { id: 'economie', name: 'Économie', icon: <Shapes className="h-5 w-5" /> },
    { id: 'familles', name: 'Familles', icon: <Users className="h-5 w-5" /> },
    { id: 'republique', name: 'République', icon: <FileText className="h-5 w-5" /> },
    { id: 'batiments', name: 'Bâtiments', icon: <Building className="h-5 w-5" /> },
    { id: 'lois', name: 'Lois', icon: <ScrollText className="h-5 w-5" /> },
    { id: 'database', name: 'Base de Données', icon: <Database className="h-5 w-5" /> },
    { id: 'statistiques', name: 'Statistiques', icon: <BarChart className="h-5 w-5" /> },
  ];

  return (
    <div className="flex overflow-x-auto py-2 px-4 bg-muted/30 border-b space-x-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
            activeTab === tab.id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="mr-2">{tab.icon}</span>
          <span>{tab.name}</span>
        </button>
      ))}
    </div>
  );
};
