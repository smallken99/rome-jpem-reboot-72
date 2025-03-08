
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardSection } from './DashboardSection';
import { UserManagementCard } from './UserManagementCard';
import { LayoutDashboard, Users, ShieldAlert, Settings } from 'lucide-react';

export const AdminTabs: React.FC = () => {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        <TabsTrigger value="dashboard" className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Utilisateurs</span>
        </TabsTrigger>
        <TabsTrigger value="moderation" className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          <span className="hidden sm:inline">Modération</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Paramètres</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <DashboardSection />
      </TabsContent>
      
      <TabsContent value="users">
        <UserManagementCard />
      </TabsContent>
      
      <TabsContent value="moderation">
        <div className="p-4 border rounded-md bg-amber-50 text-amber-800">
          Module de modération en développement.
        </div>
      </TabsContent>
      
      <TabsContent value="settings">
        <div className="p-4 border rounded-md bg-blue-50 text-blue-800">
          Paramètres avancés du site en développement.
        </div>
      </TabsContent>
    </Tabs>
  );
};
