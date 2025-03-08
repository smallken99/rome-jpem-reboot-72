
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, Users, ShieldAlert, Settings, Crown } from 'lucide-react';
import { AdminProvider } from './context/AdminContext';
import { DashboardContent } from './components/dashboard/DashboardContent';
import { UserManagementContent } from './components/users/UserManagementContent';
import { ModerationContent } from './components/moderation/ModerationContent';
import { SettingsContent } from './components/settings/SettingsContent';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const AdminTabs: React.FC = () => {
  return (
    <AdminProvider>
      <div className="mb-4 flex justify-end">
        <Button asChild variant="outline" className="gap-2">
          <Link to="/maitre-jeu">
            <Crown className="h-4 w-4" />
            <span>Interface Maître du Jeu</span>
          </Link>
        </Button>
      </div>
      
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
          <DashboardContent />
        </TabsContent>
        
        <TabsContent value="users">
          <UserManagementContent />
        </TabsContent>
        
        <TabsContent value="moderation">
          <ModerationContent />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsContent />
        </TabsContent>
      </Tabs>
    </AdminProvider>
  );
};
