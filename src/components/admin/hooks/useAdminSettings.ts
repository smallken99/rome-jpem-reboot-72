
import { useState, useEffect } from 'react';
import { SiteSettings } from '../types/adminTypes';
import { toast } from 'sonner';

// Données fictives pour les paramètres du site
const mockSettings: SiteSettings = {
  siteName: 'Rome JPem',
  maintenanceMode: false,
  registrationOpen: true,
  maxUsersPerFamily: 3,
  maxFamiliesCount: 30,
  currentYear: "703 AUC",
  currentTurn: 12,
  gameSpeed: 'normal',
  announcementBanner: {
    enabled: true,
    message: "Bienvenue dans Rome JPem! La prochaine phase de jeu débutera dans 3 jours.",
    type: 'info'
  },
  policies: {
    maxMessagesPerDay: 50,
    maxActionsPerTurn: 5,
    maxReportsPerUser: 3
  },
  moderation: {
    autoModEnabled: true,
    requireApproval: false,
    bannedWords: ['voleur', 'triche', 'menteur']
  }
};

export const useAdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Charger les paramètres
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setSettings(mockSettings);
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
        toast.error('Erreur lors du chargement des paramètres');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  // Mettre à jour les paramètres
  const updateSettings = async (updatedSettings: Partial<SiteSettings>): Promise<boolean> => {
    try {
      // Simuler un appel API
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSettings(prev => prev ? { ...prev, ...updatedSettings } : null);
      
      toast.success('Paramètres mis à jour avec succès');
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres:', error);
      toast.error('Erreur lors de la mise à jour des paramètres');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    settings,
    loading,
    updateSettings
  };
};
