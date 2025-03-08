
import { useState, useEffect } from 'react';
import { SystemStats } from '../types/adminTypes';
import { toast } from 'sonner';

// Données fictives pour les statistiques
const mockStats: SystemStats = {
  usersCount: {
    total: 128,
    newLastMonth: 12,
    activeToday: 43
  },
  serverStats: {
    cpuUsage: 23.5,
    memoryUsage: 42.8,
    diskUsage: 67.2,
    uptime: 15 * 24 * 3600 // 15 jours en secondes
  },
  gameStats: {
    activeFamilies: 18,
    pendingActions: 27,
    lastGameTurn: "703 AUC",
    totalLogins: 4567
  },
  visitStats: {
    today: 145,
    lastWeek: 823,
    lastMonth: 3624,
    totalVisits: 24567
  }
};

export const useAdminStats = () => {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Charger les statistiques
  const fetchStats = async () => {
    setLoading(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Générer des données légèrement variables
      const variableStats = {
        ...mockStats,
        serverStats: {
          ...mockStats.serverStats,
          cpuUsage: mockStats.serverStats.cpuUsage + (Math.random() * 10 - 5),
          memoryUsage: mockStats.serverStats.memoryUsage + (Math.random() * 10 - 5)
        },
        visitStats: {
          ...mockStats.visitStats,
          today: mockStats.visitStats.today + Math.floor(Math.random() * 10)
        }
      };
      
      setStats(variableStats);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
      toast.error('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };
  
  // Charger les statistiques au montage
  useEffect(() => {
    fetchStats();
    
    // Rafraîchir les statistiques toutes les 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Fonction pour rafraîchir manuellement les statistiques
  const refreshStats = () => {
    toast.info('Rafraîchissement des statistiques...');
    fetchStats();
  };
  
  return {
    stats,
    lastUpdated,
    loading,
    refreshStats
  };
};
