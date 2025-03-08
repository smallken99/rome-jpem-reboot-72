
import React from 'react';
import { Card } from '@/components/ui/card';
import { useAdmin } from '../../context/AdminContext';
import { User, UserCheck, UserX, ShieldAlert } from 'lucide-react';

export const UserStats: React.FC = () => {
  const { userStats } = useAdmin();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 flex items-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 mr-4">
          <User className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <h3 className="text-2xl font-bold">{userStats.total}</h3>
        </div>
      </Card>
      
      <Card className="p-4 flex items-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 mr-4">
          <UserCheck className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Actifs</p>
          <h3 className="text-2xl font-bold">{userStats.active}</h3>
        </div>
      </Card>
      
      <Card className="p-4 flex items-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-700 mr-4">
          <UserX className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Inactifs</p>
          <h3 className="text-2xl font-bold">{userStats.inactive}</h3>
        </div>
      </Card>
      
      <Card className="p-4 flex items-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-700 mr-4">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Administrateurs</p>
          <h3 className="text-2xl font-bold">{userStats.admins}</h3>
        </div>
      </Card>
    </div>
  );
};
