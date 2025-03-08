
import { useState, useEffect } from 'react';
import { ModLog, UserReport } from '../types/adminTypes';
import { toast } from 'sonner';

// Données fictives pour les journaux de modération
const mockModLogs: ModLog[] = [
  {
    id: 'm1',
    actionType: 'ban',
    userId: '5',
    userName: 'Tiberius Gracchus',
    moderatorId: '1',
    moderatorName: 'Marcus Aurelius',
    reason: 'Incitation à la révolte contre le Sénat',
    timestamp: new Date(Date.now() - 3 * 86400000),
    duration: 30 // Ban de 30 jours
  },
  {
    id: 'm2',
    actionType: 'warn',
    userId: '3',
    userName: 'Cicero',
    moderatorId: '2',
    moderatorName: 'Julius Caesar',
    reason: 'Attaques personnelles contre d\'autres utilisateurs',
    timestamp: new Date(Date.now() - 7 * 86400000)
  },
  {
    id: 'm3',
    actionType: 'delete_content',
    userId: '4',
    userName: 'Livia Drusilla',
    moderatorId: '1',
    moderatorName: 'Marcus Aurelius',
    reason: 'Contenu inapproprié',
    timestamp: new Date(Date.now() - 14 * 86400000),
    contentType: 'message',
    contentId: 'msg-123'
  }
];

// Données fictives pour les rapports d'utilisateurs
const mockUserReports: UserReport[] = [
  {
    id: 'r1',
    reporterId: '3',
    reporterName: 'Cicero',
    targetId: '5',
    targetName: 'Tiberius Gracchus',
    reason: 'Discours séditieux',
    contentType: 'message',
    contentId: 'msg-456',
    status: 'resolved',
    timestamp: new Date(Date.now() - 4 * 86400000),
    severity: 'high'
  },
  {
    id: 'r2',
    reporterId: '4',
    reporterName: 'Livia Drusilla',
    targetId: '3',
    targetName: 'Cicero',
    reason: 'Insultes',
    contentType: 'comment',
    contentId: 'cmt-789',
    status: 'pending',
    timestamp: new Date(Date.now() - 2 * 86400000),
    severity: 'medium'
  },
  {
    id: 'r3',
    reporterId: '2',
    reporterName: 'Julius Caesar',
    targetId: '4',
    targetName: 'Livia Drusilla',
    reason: 'Diffusion de rumeurs',
    contentType: 'post',
    contentId: 'pst-101',
    status: 'pending',
    timestamp: new Date(Date.now() - 1 * 86400000),
    severity: 'low'
  }
];

export const useAdminModeration = () => {
  const [modLogs, setModLogs] = useState<ModLog[]>([]);
  const [userReports, setUserReports] = useState<UserReport[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Nombre de rapports en attente
  const pendingReports = userReports.filter(r => r.status === 'pending').length;
  
  // Charger les journaux de modération et les rapports
  useEffect(() => {
    const fetchModerationData = async () => {
      setLoading(true);
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setModLogs(mockModLogs);
        setUserReports(mockUserReports);
      } catch (error) {
        console.error('Erreur lors du chargement des données de modération:', error);
        toast.error('Erreur lors du chargement des données de modération');
      } finally {
        setLoading(false);
      }
    };
    
    fetchModerationData();
  }, []);
  
  // Ignorer un rapport
  const dismissReport = async (reportId: string): Promise<boolean> => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUserReports(prevReports => prevReports.map(report => 
        report.id === reportId 
          ? { ...report, status: 'dismissed' } 
          : report
      ));
      
      toast.success('Rapport ignoré avec succès');
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'ignorance du rapport:', error);
      toast.error('Erreur lors de l\'ignorance du rapport');
      return false;
    }
  };
  
  // Résoudre un rapport
  const resolveReport = async (reportId: string, action: string, notes?: string): Promise<boolean> => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUserReports(prevReports => prevReports.map(report => 
        report.id === reportId 
          ? { ...report, status: 'resolved', notes: notes } 
          : report
      ));
      
      toast.success('Rapport résolu avec succès');
      return true;
    } catch (error) {
      console.error('Erreur lors de la résolution du rapport:', error);
      toast.error('Erreur lors de la résolution du rapport');
      return false;
    }
  };
  
  return {
    modLogs,
    userReports,
    pendingReports,
    loading,
    dismissReport,
    resolveReport
  };
};
