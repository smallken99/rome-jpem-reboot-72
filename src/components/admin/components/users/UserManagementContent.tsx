
import React from 'react';
import { UserSearch } from './UserSearch';
import { UsersTable } from './UsersTable';
import { UserStats } from './UserStats';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

export const UserManagementContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Gestion des utilisateurs</h2>
        <Button size="sm" className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      </div>
      
      <UserStats />
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-1/3">
          <UserSearch />
        </div>
      </div>
      
      <div className="border rounded-md">
        <UsersTable />
      </div>
    </div>
  );
};
