
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Home, 
  Users, 
  MapPin, 
  Building, 
  ScrollText, 
  History, 
  Scale, 
  BookOpen, 
  UserCircle,
  FileBarChart,
  Settings,
  Database,
  Landmark,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export interface MaitreJeuSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MaitreJeuSidebar: React.FC<MaitreJeuSidebarProps> = ({
  activeTab,
  setActiveTab
}) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  
  const handleToggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };
  
  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-rome-red text-white">
        <h2 className="text-xl font-bold">Console du Maître du Jeu</h2>
        <p className="text-sm opacity-80">Contrôlez tous les aspects du jeu</p>
      </div>
      
      <div className="p-3 space-y-1">
        <Button
          variant={activeTab === 'accueil' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveTab('accueil')}
        >
          <Home className="mr-2 h-4 w-4" />
          Accueil
        </Button>
        
        <Separator className="my-2" />
        
        <Collapsible open={openSection === 'politique'} onOpenChange={() => handleToggleSection('politique')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <div className="flex items-center">
                <Scale className="mr-2 h-4 w-4" />
                Politique
              </div>
              {openSection === 'politique' ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-6 space-y-1">
            <Button
              variant={activeTab === 'senateurs' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('senateurs')}
            >
              <UserCircle className="mr-2 h-4 w-4" />
              Sénateurs
            </Button>
            <Button
              variant={activeTab === 'lois' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('lois')}
            >
              <ScrollText className="mr-2 h-4 w-4" />
              Lois
            </Button>
            <Button
              variant={activeTab === 'equilibre' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('equilibre')}
            >
              <Scale className="mr-2 h-4 w-4" />
              Équilibre
            </Button>
          </CollapsibleContent>
        </Collapsible>
        
        <Button
          variant={activeTab === 'provinces' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveTab('provinces')}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Provinces
        </Button>
        
        <Button
          variant={activeTab === 'economie' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveTab('economie')}
        >
          <FileBarChart className="mr-2 h-4 w-4" />
          Économie
        </Button>
        
        <Button
          variant={activeTab === 'republique' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveTab('republique')}
        >
          <Landmark className="mr-2 h-4 w-4" />
          République
        </Button>
        
        <Button
          variant={activeTab === 'clients' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveTab('clients')}
        >
          <Users className="mr-2 h-4 w-4" />
          Clients
        </Button>
        
        <Button
          variant={activeTab === 'familles' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveTab('familles')}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Familles
        </Button>
        
        <Button
          variant={activeTab === 'batiments' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveTab('batiments')}
        >
          <Building className="mr-2 h-4 w-4" />
          Bâtiments
        </Button>
        
        <Button
          variant={activeTab === 'histoire' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveTab('histoire')}
        >
          <History className="mr-2 h-4 w-4" />
          Histoire
        </Button>
        
        <Button
          variant={activeTab === 'statistiques' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveTab('statistiques')}
        >
          <FileBarChart className="mr-2 h-4 w-4" />
          Statistiques
        </Button>
        
        <Separator className="my-2" />
        
        <Button
          variant={activeTab === 'database' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveTab('database')}
        >
          <Database className="mr-2 h-4 w-4" />
          Base de données
        </Button>
        
        <Button
          variant={activeTab === 'settings' ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveTab('settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          Paramètres
        </Button>
      </div>
    </div>
  );
};
