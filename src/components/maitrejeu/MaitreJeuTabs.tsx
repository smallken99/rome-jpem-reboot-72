
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  UserPlus, 
  Gavel, 
  Scale, 
  Globe, 
  BookText, 
  Coins,
  Building,
  Users2,
  ScrollText,
  Landmark,
  BarChart2
} from 'lucide-react';

interface MaitreJeuTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const MaitreJeuTabs: React.FC<MaitreJeuTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-12 w-full">
        <TabsTrigger value="senateurs" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden md:inline">Sénateurs</span>
        </TabsTrigger>
        <TabsTrigger value="clients" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span className="hidden md:inline">Clients</span>
        </TabsTrigger>
        <TabsTrigger value="familles" className="flex items-center gap-2">
          <Users2 className="h-4 w-4" />
          <span className="hidden md:inline">Familles</span>
        </TabsTrigger>
        <TabsTrigger value="politique" className="flex items-center gap-2">
          <Gavel className="h-4 w-4" />
          <span className="hidden md:inline">Politique</span>
        </TabsTrigger>
        <TabsTrigger value="equilibre" className="flex items-center gap-2">
          <Scale className="h-4 w-4" />
          <span className="hidden md:inline">Équilibre</span>
        </TabsTrigger>
        <TabsTrigger value="provinces" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">Provinces</span>
        </TabsTrigger>
        <TabsTrigger value="histoire" className="flex items-center gap-2">
          <BookText className="h-4 w-4" />
          <span className="hidden md:inline">Histoire</span>
        </TabsTrigger>
        <TabsTrigger value="economie" className="flex items-center gap-2">
          <Coins className="h-4 w-4" />
          <span className="hidden md:inline">Économie</span>
        </TabsTrigger>
        <TabsTrigger value="republique" className="flex items-center gap-2">
          <Landmark className="h-4 w-4" />
          <span className="hidden md:inline">République</span>
        </TabsTrigger>
        <TabsTrigger value="batiments" className="flex items-center gap-2">
          <Building className="h-4 w-4" />
          <span className="hidden md:inline">Bâtiments</span>
        </TabsTrigger>
        <TabsTrigger value="lois" className="flex items-center gap-2">
          <ScrollText className="h-4 w-4" />
          <span className="hidden md:inline">Lois</span>
        </TabsTrigger>
        <TabsTrigger value="statistiques" className="flex items-center gap-2">
          <BarChart2 className="h-4 w-4" />
          <span className="hidden md:inline">Statistiques</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
