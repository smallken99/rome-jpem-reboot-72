
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Settings, FileText, Bell, LogOut, Search, RefreshCw, UserPlus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Exemple de données pour la démonstration
const mockUsers = [
  { id: 1, name: 'Gaius Julius Caesar', email: 'caesar@rome.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Marcus Tullius Cicero', email: 'cicero@rome.com', role: 'user', status: 'active' },
  { id: 3, name: 'Lucius Cornelius Sulla', email: 'sulla@rome.com', role: 'user', status: 'inactive' },
  { id: 4, name: 'Gnaeus Pompeius Magnus', email: 'pompey@rome.com', role: 'moderator', status: 'active' },
  { id: 5, name: 'Marcus Licinius Crassus', email: 'crassus@rome.com', role: 'user', status: 'pending' },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
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
                variant={activeTab === 'users' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('users')}
              >
                <Users className="h-5 w-5 mr-2" />
                Utilisateurs
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
                  {activeTab === 'users' && <Users className="h-5 w-5" />}
                  {activeTab === 'settings' && <Settings className="h-5 w-5" />}
                  {activeTab === 'logs' && <FileText className="h-5 w-5" />}
                  {activeTab === 'notifications' && <Bell className="h-5 w-5" />}
                  
                  {activeTab === 'users' && 'Gestion des Utilisateurs'}
                  {activeTab === 'settings' && 'Paramètres du Système'}
                  {activeTab === 'logs' && 'Journaux d\'Activité'}
                  {activeTab === 'notifications' && 'Notifications'}
                </CardTitle>
                
                <CardDescription>
                  {activeTab === 'users' && 'Gérez les utilisateurs enregistrés dans le système.'}
                  {activeTab === 'settings' && 'Configurez les paramètres généraux de l\'application.'}
                  {activeTab === 'logs' && 'Consultez l\'historique des activités sur la plateforme.'}
                  {activeTab === 'notifications' && 'Gérez les notifications envoyées aux utilisateurs.'}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
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
                        <Button variant="outline" size="icon">
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
                            <th className="py-3 px-4 text-right font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">{user.name}</td>
                              <td className="py-3 px-4">{user.email}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.role === 'admin' 
                                    ? 'bg-rome-terracotta/20 text-rome-terracotta' 
                                    : user.role === 'moderator'
                                    ? 'bg-rome-navy/20 text-rome-navy'
                                    : 'bg-gray-200 text-gray-700'
                                }`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : user.status === 'inactive'
                                    ? 'bg-gray-100 text-gray-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {user.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Paramètres Généraux</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="siteName" className="block text-sm font-medium mb-1">
                            Nom du Site
                          </label>
                          <Input id="siteName" defaultValue="ROME JPEM" />
                        </div>
                        <div>
                          <label htmlFor="siteDescription" className="block text-sm font-medium mb-1">
                            Description
                          </label>
                          <Input id="siteDescription" defaultValue="Jeu de gestion de famille romaine" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Notifications par email</span>
                          <div className="flex h-6 items-center">
                            <input
                              id="email-notifications"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300"
                              defaultChecked
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Notifications système</span>
                          <div className="flex h-6 items-center">
                            <input
                              id="system-notifications"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300"
                              defaultChecked
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'logs' && (
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <div className="p-4 border-b">
                        <p className="text-xs text-muted-foreground">2023-05-15 10:15:22</p>
                        <p className="text-sm">Connexion de l'utilisateur: <strong>Gaius Julius Caesar</strong></p>
                      </div>
                      <div className="p-4 border-b">
                        <p className="text-xs text-muted-foreground">2023-05-15 09:32:45</p>
                        <p className="text-sm">Modification de profil: <strong>Marcus Tullius Cicero</strong></p>
                      </div>
                      <div className="p-4 border-b">
                        <p className="text-xs text-muted-foreground">2023-05-15 08:17:36</p>
                        <p className="text-sm">Nouvel utilisateur inscrit: <strong>Lucius Cornelius Sulla</strong></p>
                      </div>
                      <div className="p-4 border-b">
                        <p className="text-xs text-muted-foreground">2023-05-14 22:45:19</p>
                        <p className="text-sm">Paramètres système modifiés par: <strong>Gaius Julius Caesar</strong></p>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-muted-foreground">2023-05-14 18:30:52</p>
                        <p className="text-sm">Déconnexion de l'utilisateur: <strong>Gnaeus Pompeius Magnus</strong></p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'notifications' && (
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <div className="p-4 border-b">
                        <h4 className="font-medium">Bienvenue sur ROME JPEM</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Message d'accueil envoyé aux nouveaux utilisateurs
                        </p>
                      </div>
                      <div className="p-4 border-b">
                        <h4 className="font-medium">Confirmation d'inscription</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Envoyé après la création d'un compte
                        </p>
                      </div>
                      <div className="p-4 border-b">
                        <h4 className="font-medium">Réinitialisation de mot de passe</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Envoyé lorsqu'un utilisateur demande un nouveau mot de passe
                        </p>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium">Annonces importantes</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Communiqués pour tous les utilisateurs
                        </p>
                      </div>
                    </div>
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
