
// Types d'utilisateur
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'inactive' | 'banned';
  lastLogin: Date | null;
  createdAt: Date;
  avatar?: string;
  family?: string;
}

// Statistiques du système
export interface SystemStats {
  usersCount: {
    total: number;
    newLastMonth: number;
    activeToday: number;
  };
  serverStats: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    uptime: number;
  };
  gameStats: {
    activeFamilies: number;
    pendingActions: number;
    lastGameTurn: string;
    totalLogins: number;
  };
  visitStats: {
    today: number;
    lastWeek: number;
    lastMonth: number;
    totalVisits: number;
  };
}

// Journal de modération
export interface ModLog {
  id: string;
  actionType: 'ban' | 'warn' | 'delete_content' | 'restore_content';
  userId: string;
  userName: string;
  moderatorId: string;
  moderatorName: string;
  reason: string;
  timestamp: Date;
  duration?: number; // Durée en jours pour les bans temporaires
  contentType?: 'message' | 'post' | 'comment' | 'profile';
  contentId?: string;
}

// Rapport d'utilisateur
export interface UserReport {
  id: string;
  reporterId: string;
  reporterName: string;
  targetId: string;
  targetName: string;
  reason: string;
  contentType: 'message' | 'post' | 'comment' | 'profile';
  contentId: string;
  status: 'pending' | 'resolved' | 'dismissed';
  timestamp: Date;
  notes?: string;
  severity: 'low' | 'medium' | 'high';
}

// Paramètres du site
export interface SiteSettings {
  siteName: string;
  maintenanceMode: boolean;
  registrationOpen: boolean;
  maxUsersPerFamily: number;
  maxFamiliesCount: number;
  currentYear: string;
  currentTurn: number;
  gameSpeed: 'slow' | 'normal' | 'fast';
  announcementBanner: {
    enabled: boolean;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
  };
  policies: {
    maxMessagesPerDay: number;
    maxActionsPerTurn: number;
    maxReportsPerUser: number;
  };
  moderation: {
    autoModEnabled: boolean;
    requireApproval: boolean;
    bannedWords: string[];
  };
}
