
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Users, 
  Settings, 
  FileText, 
  Bell, 
  LogOut, 
  Search, 
  RefreshCw, 
  UserPlus, 
  Trash2,
  BarChart3,
  MessageSquare,
  AlertTriangle,
  UserCog,
  Activity,
  History,
  Eye,
  Hammer,
  Database
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { formatUserRole, formatUserActivity } from '@/utils/formatUtils';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Exemple de données pour la démonstration
const mockUsers = [
  { id: 1, name: 'Gaius Julius Caesar', email: 'caesar@rome.com', role: 'admin', status: 'active', lastActive: new Date(2023, 4, 15) },
  { id: 2, name: 'Marcus Tullius Cicero', email: 'cicero@rome.com', role: 'moderator', status: 'active', lastActive: new Date(2023, 4, 14) },
  { id: 3, name: 'Lucius Cornelius Sulla', email: 'sulla@rome.com', role: 'player', status: 'inactive', lastActive: new Date(2023, 3, 15) },
  { id: 4, name: 'Gnaeus Pompeius Magnus', email: 'pompey@rome.com', role: 'player', status: 'active', lastActive: new Date(2023, 4, 10) },
  { id: 5, name: 'Marcus Licinius Crassus', email: 'crassus@rome.com', role: 'game_master', status: 'active', lastActive: new Date(2023, 4, 12) },
  { id: 6, name: 'Gaius Marius', email: 'marius@rome.com', role: 'player', status: 'pending', lastActive: new Date(2023, 4, 5) },
];

// Exemple de données pour les statistiques
const mockStats = {
  users: {
    total: 187,
    active: 142,
    inactive: 32,
    pending: 13,
    growth: 12.5
  },
  sessions: {
    daily: 68,
    weekly: 412,
    monthly: 1453,
    avgDuration: 47 // en minutes
  },
  reports: {
    open: 8,
    closed: 27,
    highPriority: 2
  },
  transactions: {
    total: 1243,
    success: 1198,
    failed: 45
  },
  system: {
    uptime: 99.8,
    errors: 12,
    warnings: 34
  }
};

// Exemple de données pour les logs
const mockLogs = [
  { timestamp: '2023-05-15 10:15:22', type: 'auth', message: 'Connexion de l\'utilisateur: Gaius Julius Caesar', severity: 'info' },
  { timestamp: '2023-05-15 09:32:45', type: 'user', message: 'Modification de profil: Marcus Tullius Cicero', severity: 'info' },
  { timestamp: '2023-05-15 08:17:36', type: 'user', message: 'Nouvel utilisateur inscrit: Lucius Cornelius Sulla', severity: 'success' },
  { timestamp: '2023-05-14 22:45:19', type: 'system', message: 'Paramètres système modifiés par: Gaius Julius Caesar', severity: 'warning' },
  { timestamp: '2023-05-14 18:30:52', type: 'auth', message: 'Déconnexion de l\'utilisateur: Gnaeus Pompeius Magnus', severity: 'info' },
  { timestamp: '2023-05-14 15:22:10', type: 'security', message: 'Tentative d\'accès non autorisé depuis 195.24.83.112', severity: 'error' },
  { timestamp: '2023-05-14 12:11:05', type: 'game', message: 'Nouvelle loi proposée par: Marcus Tullius Cicero', severity: 'info' },
  { timestamp: '2023-05-14 08:47:33', type: 'system', message: 'Sauvegarde automatique complétée', severity: 'success' },
];

// Exemple de données pour les notifications
const mockNotifications = [
  { id: 1, title: 'Bienvenue sur ROME JPEM', description: 'Message d\'accueil envoyé aux nouveaux utilisateurs', status: 'active' },
  { id: 2, title: 'Confirmation d\'inscription', description: 'Envoyé après la création d\'un compte', status: 'active' },
  { id: 3, title: 'Réinitialisation de mot de passe', description: 'Envoyé lorsqu\'un utilisateur demande un nouveau mot de passe', status: 'active' },
  { id: 4, title: 'Annonces importantes', description: 'Communiqués pour tous les utilisateurs', status: 'inactive' },
  { id: 5, title: 'Alertes de maintenance', description: 'Notification avant maintenance planifiée', status: 'active' },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState('admin');
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
      duration: 3000,
    });
    navigate('/welcome');
  };

  const handleAddUser = () => {
    toast({
      title: "Action simulée",
      description: "L'ajout d'utilisateur serait implémenté ici",
      duration: 3000,
    });
  };

  const handleDeleteUser = (id: number) => {
    toast({
      title: "Action simulée",
      description: `L'utilisateur #${id} serait supprimé ici`,
      duration: 3000,
    });
  };

  const handleRefreshData = () => {
    toast({
      title: "Actualisation des données",
      description: "Les données ont été actualisées",
      duration: 2000,
    });
  };

  const handleChangeUserRole = (userId: number, newRole: string) => {
    toast({
      title: "Rôle modifié",
      description: `Le rôle de l'utilisateur #${userId} a été modifié à ${newRole}`,
      duration: 2000,
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Les modifications ont été enregistrées avec succès",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-roman-pattern">
      <header className="py-4 px-6 bg-gradient-to-b from-rome-navy to-rome-navy/90 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-rome-gold" />
            <h1 className="font-cinzel text-xl">Administration ROME JPEM</h1>
          </div>
          
          <Button variant="ghost" className="text-white hover:text-rome-gold" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white/90 backdrop-blur-sm border border-rome-gold/30 rounded-lg p-4 shadow-sm">
            <nav className="space-y-2">
              <Button 
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('dashboard')}
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Tableau de bord
              </Button>
              
              <Button 
                variant={activeTab === 'users' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('users')}
              >
                <Users className="h-5 w-5 mr-2" />
                Utilisateurs
              </Button>
              
              <Button 
                variant={activeTab === 'moderation' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('moderation')}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Modération
              </Button>
              
              <Button 
                variant={activeTab === 'settings' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-5 w-5 mr-2" />
                Paramètres
              </Button>
              
              <Button 
                variant={activeTab === 'logs' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('logs')}
              >
                <FileText className="h-5 w-5 mr-2" />
                Journaux
              </Button>
              
              <Button 
                variant={activeTab === 'notifications' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </Button>
            </nav>
            
            <div className="mt-8 pt-6 border-t border-rome-gold/20">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rome-terracotta to-rome-terracotta/70 flex items-center justify-center text-white font-cinzel mr-3">
                  GJ
                </div>
                <div>
                  <p className="font-medium text-sm">Gaius Julius</p>
                  <p className="text-xs text-muted-foreground">Administrateur</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full justify-start border-rome-navy/30 text-rome-navy hover:bg-rome-navy/10" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </aside>
          
          {/* Main content */}
          <div className="flex-1">
            <Card className="shadow-sm bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-cinzel text-rome-navy flex items-center gap-2">
                  {activeTab === 'dashboard' && <BarChart3 className="h-5 w-5" />}
                  {activeTab === 'users' && <Users className="h-5 w-5" />}
                  {activeTab === 'moderation' && <MessageSquare className="h-5 w-5" />}
                  {activeTab === 'settings' && <Settings className="h-5 w-5" />}
                  {activeTab === 'logs' && <FileText className="h-5 w-5" />}
                  {activeTab === 'notifications' && <Bell className="h-5 w-5" />}
                  
                  {activeTab === 'dashboard' && 'Tableau de bord'}
                  {activeTab === 'users' && 'Gestion des Utilisateurs'}
                  {activeTab === 'moderation' && 'Modération du Contenu'}
                  {activeTab === 'settings' && 'Paramètres du Système'}
                  {activeTab === 'logs' && 'Journaux d\'Activité'}
                  {activeTab === 'notifications' && 'Notifications'}
                </CardTitle>
                
                <CardDescription>
                  {activeTab === 'dashboard' && 'Statistiques et métriques générales du système.'}
                  {activeTab === 'users' && 'Gérez les utilisateurs enregistrés dans le système.'}
                  {activeTab === 'moderation' && 'Modérez les interactions et signalez les abus.'}
                  {activeTab === 'settings' && 'Configurez les paramètres généraux de l\'application.'}
                  {activeTab === 'logs' && 'Consultez l\'historique des activités sur la plateforme.'}
                  {activeTab === 'notifications' && 'Gérez les notifications envoyées aux utilisateurs.'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    {/* Aperçu rapide */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <Users className="h-4 w-4 mr-2 text-rome-navy" />
                            Utilisateurs
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-baseline">
                            <span className="text-3xl font-bold">{mockStats.users.total}</span>
                            <span className={`text-sm ${mockStats.users.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {mockStats.users.growth > 0 ? '+' : ''}{mockStats.users.growth}%
                            </span>
                          </div>
                          <div className="mt-4 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Actifs</span>
                              <span>{mockStats.users.active}</span>
                            </div>
                            <Progress value={(mockStats.users.active / mockStats.users.total) * 100} className="h-1" />
                            
                            <div className="flex justify-between text-xs mt-2">
                              <span>Inactifs</span>
                              <span>{mockStats.users.inactive}</span>
                            </div>
                            <Progress value={(mockStats.users.inactive / mockStats.users.total) * 100} className="h-1" />
                            
                            <div className="flex justify-between text-xs mt-2">
                              <span>En attente</span>
                              <span>{mockStats.users.pending}</span>
                            </div>
                            <Progress value={(mockStats.users.pending / mockStats.users.total) * 100} className="h-1" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <Activity className="h-4 w-4 mr-2 text-rome-navy" />
                            Sessions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-baseline">
                            <span className="text-3xl font-bold">{mockStats.sessions.daily}</span>
                            <span className="text-sm text-muted-foreground">aujourd'hui</span>
                          </div>
                          <div className="mt-4 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Cette semaine</span>
                              <span>{mockStats.sessions.weekly}</span>
                            </div>
                            <Progress value={(mockStats.sessions.daily / (mockStats.sessions.weekly/7)) * 100} className="h-1" />
                            
                            <div className="flex justify-between text-xs mt-2">
                              <span>Ce mois</span>
                              <span>{mockStats.sessions.monthly}</span>
                            </div>
                            <Progress value={(mockStats.sessions.weekly / (mockStats.sessions.monthly/4)) * 100} className="h-1" />
                            
                            <div className="flex justify-between text-xs mt-2">
                              <span>Durée moyenne</span>
                              <span>{mockStats.sessions.avgDuration} min</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-rome-navy" />
                            Rapports
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-baseline">
                            <span className="text-3xl font-bold">{mockStats.reports.open}</span>
                            <span className="text-sm text-amber-600">à traiter</span>
                          </div>
                          <div className="mt-4 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Haute priorité</span>
                              <span className="text-red-600">{mockStats.reports.highPriority}</span>
                            </div>
                            <Progress value={(mockStats.reports.highPriority / mockStats.reports.open) * 100} className="h-1 bg-red-100" indicatorClassName="bg-red-600" />
                            
                            <div className="flex justify-between text-xs mt-2">
                              <span>Résolus récemment</span>
                              <span>{mockStats.reports.closed}</span>
                            </div>
                            <Progress value={(mockStats.reports.open / (mockStats.reports.closed + mockStats.reports.open)) * 100} className="h-1" />
                            
                            <div className="mt-2 text-xs text-right">
                              <Button variant="link" className="p-0 h-auto text-xs">
                                Voir tous les rapports
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Logs récents */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Activité récente</h3>
                        <Button variant="ghost" size="sm" onClick={handleRefreshData}>
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Actualiser
                        </Button>
                      </div>
                      
                      <div className="rounded-md border overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-muted/50">
                              <th className="py-2 px-4 text-left font-medium">Timestamp</th>
                              <th className="py-2 px-4 text-left font-medium">Type</th>
                              <th className="py-2 px-4 text-left font-medium">Message</th>
                              <th className="py-2 px-4 text-center font-medium">Sévérité</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockLogs.slice(0, 5).map((log, index) => (
                              <tr key={index} className="border-b hover:bg-muted/50">
                                <td className="py-2 px-4 text-xs text-muted-foreground">{log.timestamp}</td>
                                <td className="py-2 px-4">
                                  <span className="px-2 py-1 rounded-full text-xs bg-gray-100">
                                    {log.type}
                                  </span>
                                </td>
                                <td className="py-2 px-4">{log.message}</td>
                                <td className="py-2 px-4 text-center">
                                  <span className={`inline-block w-2 h-2 rounded-full ${
                                    log.severity === 'error' ? 'bg-red-500' :
                                    log.severity === 'warning' ? 'bg-amber-500' :
                                    log.severity === 'success' ? 'bg-green-500' :
                                    'bg-blue-500'
                                  }`}></span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="text-right">
                        <Button variant="link" className="text-sm" onClick={() => setActiveTab('logs')}>
                          Voir tous les journaux
                          <FileText className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Statistiques système */}
                    <div className="space-y-2">
                      <h3 className="font-medium">État du système</h3>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Disponibilité</div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold">{mockStats.system.uptime}%</span>
                                <span className="text-xs text-green-600">stable</span>
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Erreurs (24h)</div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold">{mockStats.system.errors}</span>
                                <span className="text-xs text-amber-600">+3 depuis hier</span>
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Avertissements</div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold">{mockStats.system.warnings}</span>
                                <span className="text-xs text-muted-foreground">dernières 24h</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
                
                {activeTab === 'users' && (
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Rechercher un utilisateur..."
                          className="pl-9"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={handleRefreshData}>
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleAddUser}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Ajouter
                        </Button>
                      </div>
                    </div>
                    
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="py-3 px-4 text-left font-medium">Nom</th>
                            <th className="py-3 px-4 text-left font-medium">Email</th>
                            <th className="py-3 px-4 text-left font-medium">Rôle</th>
                            <th className="py-3 px-4 text-left font-medium">Statut</th>
                            <th className="py-3 px-4 text-left font-medium">Dernière activité</th>
                            <th className="py-3 px-4 text-right font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">{user.name}</td>
                              <td className="py-3 px-4">{user.email}</td>
                              <td className="py-3 px-4">
                                <Select
                                  value={user.role}
                                  onValueChange={(value) => handleChangeUserRole(user.id, value)}
                                >
                                  <SelectTrigger className="w-[130px] h-7 text-xs">
                                    <SelectValue>
                                      <span className={`px-2 py-1 rounded-full text-xs ${formatUserRole(user.role).className}`}>
                                        {formatUserRole(user.role).label}
                                      </span>
                                    </SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">Administrateur</SelectItem>
                                    <SelectItem value="moderator">Modérateur</SelectItem>
                                    <SelectItem value="game_master">Maître du Jeu</SelectItem>
                                    <SelectItem value="player">Joueur</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : user.status === 'inactive'
                                    ? 'bg-gray-100 text-gray-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {user.status === 'active' ? 'Actif' : 
                                   user.status === 'inactive' ? 'Inactif' : 'En attente'}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={formatUserActivity(user.lastActive).className}>
                                  {formatUserActivity(user.lastActive).text}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <UserCog className="h-4 w-4 text-muted-foreground" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {activeTab === 'moderation' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <Card className="flex-1">
                        <CardHeader>
                          <CardTitle className="text-base">Rapports récents</CardTitle>
                          <CardDescription>Signalements nécessitant une attention</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                              <div className="flex justify-between">
                                <span className="font-medium text-red-800">Message inapproprié</span>
                                <span className="text-xs text-muted-foreground">Il y a 2 heures</span>
                              </div>
                              <p className="mt-1 text-sm">Signalement de Marcus Cato contre Gaius Marius</p>
                              <div className="mt-2 flex justify-end gap-2">
                                <Button variant="outline" size="sm">Ignorer</Button>
                                <Button variant="destructive" size="sm">Modérer</Button>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                              <div className="flex justify-between">
                                <span className="font-medium text-amber-800">Comportement suspect</span>
                                <span className="text-xs text-muted-foreground">Il y a 5 heures</span>
                              </div>
                              <p className="mt-1 text-sm">Activité suspecte détectée pour l'utilisateur Lucius Sulla</p>
                              <div className="mt-2 flex justify-end gap-2">
                                <Button variant="outline" size="sm">Ignorer</Button>
                                <Button variant="default" size="sm">Examiner</Button>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                              <div className="flex justify-between">
                                <span className="font-medium text-blue-800">Demande de vérification</span>
                                <span className="text-xs text-muted-foreground">Il y a 1 jour</span>
                              </div>
                              <p className="mt-1 text-sm">Demande de vérification d'un contenu par un modérateur</p>
                              <div className="mt-2 flex justify-end gap-2">
                                <Button variant="outline" size="sm">Ignorer</Button>
                                <Button variant="default" size="sm">Vérifier</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="flex-1">
                        <CardHeader>
                          <CardTitle className="text-base">Options de modération</CardTitle>
                          <CardDescription>Configurer les règles de modération</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="auto-mod" className="font-medium">Modération automatique</Label>
                                <p className="text-xs text-muted-foreground">Filtrer automatiquement les contenus inappropriés</p>
                              </div>
                              <Switch id="auto-mod" defaultChecked />
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="report-threshold" className="font-medium">Seuil d'alerte</Label>
                                <p className="text-xs text-muted-foreground">Nombre de signalements avant alerte</p>
                              </div>
                              <Select defaultValue="3">
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="5">5</SelectItem>
                                  <SelectItem value="10">10</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="notify-admins" className="font-medium">Notifications des administrateurs</Label>
                                <p className="text-xs text-muted-foreground">Alerter les administrateurs des problèmes graves</p>
                              </div>
                              <Switch id="notify-admins" defaultChecked />
                            </div>
                            
                            <Separator />
                            
                            <Button className="w-full">Appliquer les paramètres</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Historique de modération</CardTitle>
                        <CardDescription>Actions récentes des modérateurs</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="py-2 px-4 text-left font-medium">Date</th>
                                <th className="py-2 px-4 text-left font-medium">Modérateur</th>
                                <th className="py-2 px-4 text-left font-medium">Action</th>
                                <th className="py-2 px-4 text-left font-medium">Utilisateur concerné</th>
                                <th className="py-2 px-4 text-right font-medium">Détails</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b hover:bg-muted/50">
                                <td className="py-2 px-4 text-xs text-muted-foreground">2023-05-15 08:42</td>
                                <td className="py-2 px-4">Marcus Cicero</td>
                                <td className="py-2 px-4">
                                  <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                    Avertissement
                                  </span>
                                </td>
                                <td className="py-2 px-4">Lucius Catiline</td>
                                <td className="py-2 px-4 text-right">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-3 w-3 mr-1" />
                                    Voir
                                  </Button>
                                </td>
                              </tr>
                              <tr className="border-b hover:bg-muted/50">
                                <td className="py-2 px-4 text-xs text-muted-foreground">2023-05-14 14:23</td>
                                <td className="py-2 px-4">Gaius Julius</td>
                                <td className="py-2 px-4">
                                  <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                                    Suppression
                                  </span>
                                </td>
                                <td className="py-2 px-4">Gnaeus Pompey</td>
                                <td className="py-2 px-4 text-right">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-3 w-3 mr-1" />
                                    Voir
                                  </Button>
                                </td>
                              </tr>
                              <tr className="border-b hover:bg-muted/50">
                                <td className="py-2 px-4 text-xs text-muted-foreground">2023-05-13 09:11</td>
                                <td className="py-2 px-4">Marcus Cicero</td>
                                <td className="py-2 px-4">
                                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                    Validation
                                  </span>
                                </td>
                                <td className="py-2 px-4">Marcus Crassus</td>
                                <td className="py-2 px-4 text-right">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-3 w-3 mr-1" />
                                    Voir
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Paramètres généraux</CardTitle>
                          <CardDescription>Configuration de base du système</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="siteName">Nom du jeu</Label>
                            <Input id="siteName" defaultValue="ROME JPEM" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="siteDescription">Description</Label>
                            <Input id="siteDescription" defaultValue="Jeu de rôle de la Rome Antique" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="gameVersion">Version du jeu</Label>
                            <Input id="gameVersion" defaultValue="1.0.0" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Mécanique de jeu</CardTitle>
                          <CardDescription>Ajustement des règles et paramètres</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="difficultyLevel">Niveau de difficulté</Label>
                            <Select defaultValue="normal">
                              <SelectTrigger id="difficultyLevel">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="easy">Facile</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="hard">Difficile</SelectItem>
                                <SelectItem value="expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="startingResources">Ressources de départ</Label>
                            <Select defaultValue="normal">
                              <SelectTrigger id="startingResources">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="scarce">Rares</SelectItem>
                                <SelectItem value="normal">Normales</SelectItem>
                                <SelectItem value="abundant">Abondantes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="eventFrequency">Fréquence des événements</Label>
                            <Select defaultValue="medium">
                              <SelectTrigger id="eventFrequency">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Faible</SelectItem>
                                <SelectItem value="medium">Moyenne</SelectItem>
                                <SelectItem value="high">Élevée</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Sécurité et accès</CardTitle>
                        <CardDescription>Contrôlez l'accès et les politiques de sécurité</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="registration" className="font-medium">Inscriptions ouvertes</Label>
                            <p className="text-xs text-muted-foreground">Permettre aux nouveaux joueurs de s'inscrire</p>
                          </div>
                          <Switch id="registration" defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="moderation" className="font-medium">Validation des inscriptions</Label>
                            <p className="text-xs text-muted-foreground">Approuver manuellement les nouvelles inscriptions</p>
                          </div>
                          <Switch id="moderation" />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="maintenance" className="font-medium">Mode maintenance</Label>
                            <p className="text-xs text-muted-foreground">Fermer temporairement l'accès au jeu</p>
                          </div>
                          <Switch id="maintenance" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Base de données</CardTitle>
                        <CardDescription>Gestion des données du jeu</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Sauvegarde automatique</h4>
                            <p className="text-xs text-muted-foreground">Dernière sauvegarde: 15 mai 2023, 08:00</p>
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center">
                            <Database className="h-4 w-4 mr-2" />
                            Sauvegarder maintenant
                          </Button>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Restauration</h4>
                            <p className="text-xs text-muted-foreground">Restaurer à partir d'une sauvegarde précédente</p>
                          </div>
                          <Button variant="outline" size="sm">Restaurer</Button>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Réinitialisation</h4>
                            <p className="text-xs text-muted-foreground text-red-600">Attention: cette action est irréversible</p>
                          </div>
                          <Button variant="destructive" size="sm">Réinitialiser</Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Annuler</Button>
                      <Button onClick={handleSaveSettings}>Enregistrer les modifications</Button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'logs' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            <SelectItem value="auth">Authentification</SelectItem>
                            <SelectItem value="user">Utilisateurs</SelectItem>
                            <SelectItem value="system">Système</SelectItem>
                            <SelectItem value="game">Jeu</SelectItem>
                            <SelectItem value="security">Sécurité</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Sévérité" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toutes</SelectItem>
                            <SelectItem value="info">Information</SelectItem>
                            <SelectItem value="success">Succès</SelectItem>
                            <SelectItem value="warning">Avertissement</SelectItem>
                            <SelectItem value="error">Erreur</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button variant="outline" size="sm" onClick={handleRefreshData}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Actualiser
                      </Button>
                    </div>
                    
                    <div className="rounded-md border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="py-2 px-4 text-left font-medium">Timestamp</th>
                            <th className="py-2 px-4 text-left font-medium">Type</th>
                            <th className="py-2 px-4 text-left font-medium">Message</th>
                            <th className="py-2 px-4 text-center font-medium">Sévérité</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockLogs.map((log, index) => (
                            <tr key={index} className="border-b hover:bg-muted/50">
                              <td className="py-2 px-4 text-xs text-muted-foreground">{log.timestamp}</td>
                              <td className="py-2 px-4">
                                <span className="px-2 py-1 rounded-full text-xs bg-gray-100">
                                  {log.type}
                                </span>
                              </td>
                              <td className="py-2 px-4">{log.message}</td>
                              <td className="py-2 px-4 text-center">
                                <span className={`inline-block w-2 h-2 rounded-full ${
                                  log.severity === 'error' ? 'bg-red-500' :
                                  log.severity === 'warning' ? 'bg-amber-500' :
                                  log.severity === 'success' ? 'bg-green-500' :
                                  'bg-blue-500'
                                }`} title={log.severity}></span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm" disabled>
                        Plus ancien
                      </Button>
                      <span className="text-sm text-muted-foreground">Page 1 sur 5</span>
                      <Button variant="outline" size="sm">
                        Plus récent
                      </Button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'notifications' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Templates de notifications</h3>
                      <Button size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Nouvelle notification
                      </Button>
                    </div>
                    
                    <div className="rounded-md border">
                      {mockNotifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b last:border-b-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{notification.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                notification.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {notification.status === 'active' ? 'Actif' : 'Inactif'}
                              </span>
                              <Button variant="ghost" size="sm">Éditer</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Paramètres de notifications</CardTitle>
                        <CardDescription>Configurer les préférences de notifications</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-notifications" className="font-medium">Notifications par email</Label>
                            <p className="text-xs text-muted-foreground">Envoi de notifications par email</p>
                          </div>
                          <Switch id="email-notifications" defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="system-notifications" className="font-medium">Notifications système</Label>
                            <p className="text-xs text-muted-foreground">Affichage dans l'interface utilisateur</p>
                          </div>
                          <Switch id="system-notifications" defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="admin-notifications" className="font-medium">Notifier les administrateurs</Label>
                            <p className="text-xs text-muted-foreground">Pour les événements importants</p>
                          </div>
                          <Switch id="admin-notifications" defaultChecked />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="border-t p-4 flex justify-between">
                <p className="text-xs text-muted-foreground">
                  Version du système: 1.0.0
                </p>
                
                <Button variant="outline" size="sm">
                  Aide
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
