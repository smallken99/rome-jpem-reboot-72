
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, SystemStats, ModLog, SiteSettings } from '../types/adminTypes';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { useAdminStats } from '../hooks/useAdminStats';
import { useAdminModeration } from '../hooks/useAdminModeration';
import { useAdminSettings } from '../hooks/useAdminSettings';

interface AdminContextType {
  // État des utilisateurs
  users: User[];
  filteredUsers: User[];
  searchTerm: string;
  userStats: {
    total: number;
    active: number;
    inactive: number;
    admins: number;
  };
  
  // État des statistiques
  stats: SystemStats | null;
  lastUpdated: Date | null;
  
  // État de la modération
  modLogs: ModLog[];
  pendingReports: number;
  
  // État des paramètres
  settings: SiteSettings | null;
  
  // Actions
  setSearchTerm: (term: string) => void;
  deleteUser: (userId: string) => Promise<boolean>;
  toggleUserStatus: (userId: string, isActive: boolean) => Promise<boolean>;
  promoteDemoteUser: (userId: string, role: string) => Promise<boolean>;
  dismissReport: (reportId: string) => Promise<boolean>;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<boolean>;
  refreshStats: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Utiliser les hooks personnalisés
  const { 
    users, 
    userStats, 
    deleteUser, 
    toggleUserStatus, 
    promoteDemoteUser 
  } = useAdminUsers();
  
  const { stats, lastUpdated, refreshStats } = useAdminStats();
  
  const { modLogs, pendingReports, dismissReport } = useAdminModeration();
  
  const { settings, updateSettings } = useAdminSettings();
  
  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <AdminContext.Provider value={{
      users,
      filteredUsers,
      searchTerm,
      userStats,
      stats,
      lastUpdated,
      modLogs,
      pendingReports,
      settings,
      setSearchTerm,
      deleteUser,
      toggleUserStatus,
      promoteDemoteUser,
      dismissReport,
      updateSettings,
      refreshStats
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
