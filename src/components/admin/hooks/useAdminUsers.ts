
import { useState, useEffect } from 'react';
import { User } from '../types/adminTypes';
import { toast } from 'sonner';

// Données fictives pour les utilisateurs
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Marcus Aurelius',
    email: 'marcus.aurelius@spqr.rom',
    role: 'admin',
    status: 'active',
    lastLogin: new Date(Date.now() - 3600000),
    createdAt: new Date(Date.now() - 30 * 24 * 3600000),
    family: 'Aurelii'
  },
  {
    id: '2',
    name: 'Julius Caesar',
    email: 'julius.caesar@spqr.rom',
    role: 'moderator',
    status: 'active',
    lastLogin: new Date(Date.now() - 86400000),
    createdAt: new Date(Date.now() - 60 * 24 * 3600000),
    family: 'Julii'
  },
  {
    id: '3',
    name: 'Cicero',
    email: 'cicero@spqr.rom',
    role: 'user',
    status: 'active',
    lastLogin: new Date(Date.now() - 7 * 86400000),
    createdAt: new Date(Date.now() - 90 * 24 * 3600000),
    family: 'Tullii'
  },
  {
    id: '4',
    name: 'Livia Drusilla',
    email: 'livia.drusilla@spqr.rom',
    role: 'user',
    status: 'inactive',
    lastLogin: new Date(Date.now() - 30 * 86400000),
    createdAt: new Date(Date.now() - 120 * 24 * 3600000),
    family: 'Claudii'
  },
  {
    id: '5',
    name: 'Tiberius Gracchus',
    email: 'tiberius.gracchus@spqr.rom',
    role: 'user',
    status: 'banned',
    lastLogin: null,
    createdAt: new Date(Date.now() - 180 * 24 * 3600000),
    family: 'Sempronii'
  },
];

export const useAdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Statistiques des utilisateurs
  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    admins: users.filter(u => u.role === 'admin').length,
  };
  
  // Charger les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 800));
        setUsers(mockUsers);
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        toast.error('Erreur lors du chargement des utilisateurs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Supprimer un utilisateur
  const deleteUser = async (userId: string): Promise<boolean> => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      toast.success('Utilisateur supprimé avec succès');
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      toast.error('Erreur lors de la suppression de l\'utilisateur');
      return false;
    }
  };
  
  // Activer/désactiver un utilisateur
  const toggleUserStatus = async (userId: string, isActive: boolean): Promise<boolean> => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === userId 
          ? { ...user, status: isActive ? 'active' : 'inactive' } 
          : user
      ));
      
      toast.success(`Utilisateur ${isActive ? 'activé' : 'désactivé'} avec succès`);
      return true;
    } catch (error) {
      console.error('Erreur lors de la modification du statut:', error);
      toast.error('Erreur lors de la modification du statut');
      return false;
    }
  };
  
  // Promouvoir/rétrograder un utilisateur
  const promoteDemoteUser = async (userId: string, role: string): Promise<boolean> => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === userId 
          ? { ...user, role: role as 'admin' | 'moderator' | 'user' } 
          : user
      ));
      
      toast.success(`Rôle de l'utilisateur modifié avec succès`);
      return true;
    } catch (error) {
      console.error('Erreur lors de la modification du rôle:', error);
      toast.error('Erreur lors de la modification du rôle');
      return false;
    }
  };
  
  return {
    users,
    userStats,
    loading,
    deleteUser,
    toggleUserStatus,
    promoteDemoteUser
  };
};
