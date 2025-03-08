
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Gavel, Scale, Globe, Swords, BookText, LogOut, Search, UserPlus, X, AlertTriangle, History, Trophy, Calendar, Crown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { AlertMessage } from '@/components/ui-custom/AlertMessage';
import { StatBox } from '@/components/ui-custom/StatBox';
import { MaitreJeuProvider } from '@/components/maitrejeu/context/MaitreJeuContext';

// Sections du Maître du Jeu
import { GestionSenateurs } from '@/components/maitrejeu/GestionSenateurs';
import { GestionPolitique } from '@/components/maitrejeu/GestionPolitique';
import { GestionEquilibre } from '@/components/maitrejeu/GestionEquilibre';
import { GestionProvinces } from '@/components/maitrejeu/GestionProvinces';
import { GestionHistoire } from '@/components/maitrejeu/GestionHistoire';
import { GestionClients } from '@/components/maitrejeu/GestionClients';

const MaitreJeu = () => {
  const [activeTab, setActiveTab] = useState('senateurs');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt, Maître du Jeu !",
      duration: 3000,
    });
    navigate('/welcome');
  };

  return (
    <MaitreJeuProvider>
      <div className="min-h-screen bg-roman-pattern">
        <header className="py-4 px-6 bg-gradient-to-b from-rome-navy to-rome-navy/90 text-white">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-rome-gold" />
              <h1 className="font-cinzel text-xl">Maître du Jeu - ROME JPEM</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:text-rome-gold" onClick={() => navigate('/admin')}>
                Interface Admin
              </Button>
              <Button variant="ghost" className="text-white hover:text-rome-gold" onClick={handleLogout}>
                <LogOut className="h-5 w-5 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Barre latérale */}
            <aside className="w-full md:w-64 bg-white/90 backdrop-blur-sm border border-rome-gold/30 rounded-lg p-4 shadow-sm">
              <div className="mb-6">
                <div className="w-full h-20 rounded-md bg-gradient-to-br from-rome-terracotta to-rome-terracotta/70 flex items-center justify-center text-white font-cinzel mb-3">
                  <Crown className="h-8 w-8 mr-2" />
                  <span className="text-lg">Maître du Jeu</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Gérez tous les aspects du jeu et façonnez l'histoire de Rome.
                </p>
              </div>
              
              <nav className="space-y-2">
                <Button 
                  variant={activeTab === 'senateurs' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('senateurs')}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Gestion des Sénateurs
                </Button>
                <Button 
                  variant={activeTab === 'clients' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('clients')}
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Gestion des Clients
                </Button>
                <Button 
                  variant={activeTab === 'politique' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('politique')}
                >
                  <Gavel className="h-5 w-5 mr-2" />
                  Influence Politique
                </Button>
                <Button 
                  variant={activeTab === 'equilibre' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('equilibre')}
                >
                  <Scale className="h-5 w-5 mr-2" />
                  Équilibrage du Jeu
                </Button>
                <Button 
                  variant={activeTab === 'provinces' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('provinces')}
                >
                  <Globe className="h-5 w-5 mr-2" />
                  Provinces & Guerres
                </Button>
                <Button 
                  variant={activeTab === 'histoire' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('histoire')}
                >
                  <BookText className="h-5 w-5 mr-2" />
                  Édition de l'Histoire
                </Button>
              </nav>
              
              <div className="mt-8 pt-6 border-t border-rome-gold/20">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">État du jeu</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Année en cours:</span>
                      <span className="font-medium">632 AUC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saison:</span>
                      <span className="font-medium">Printemps</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Joueurs actifs:</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full" onClick={() => toast({ title: "Action simulée", description: "Passage à la saison suivante" })}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Avancer le temps
                  </Button>
                </div>
              </div>
            </aside>
            
            {/* Contenu principal */}
            <div className="flex-1">
              <Card className="shadow-sm bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-cinzel text-rome-navy flex items-center gap-2">
                    {activeTab === 'senateurs' && <Users className="h-5 w-5" />}
                    {activeTab === 'clients' && <UserPlus className="h-5 w-5" />}
                    {activeTab === 'politique' && <Gavel className="h-5 w-5" />}
                    {activeTab === 'equilibre' && <Scale className="h-5 w-5" />}
                    {activeTab === 'provinces' && <Globe className="h-5 w-5" />}
                    {activeTab === 'histoire' && <BookText className="h-5 w-5" />}
                    
                    {activeTab === 'senateurs' && 'Gestion des Sénateurs'}
                    {activeTab === 'clients' && 'Gestion des Clients'}
                    {activeTab === 'politique' && 'Influence Politique'}
                    {activeTab === 'equilibre' && 'Équilibrage du Jeu'}
                    {activeTab === 'provinces' && 'Provinces & Guerres'}
                    {activeTab === 'histoire' && 'Édition de l\'Histoire'}
                  </CardTitle>
                  
                  <CardDescription>
                    {activeTab === 'senateurs' && 'Créez, modifiez ou supprimez des sénateurs et leurs caractéristiques.'}
                    {activeTab === 'clients' && 'Gérez le réseau de clientèle, ajoutez ou supprimez des clients et assignez-les aux sénateurs.'}
                    {activeTab === 'politique' && 'Ajoutez des lois, créez des événements politiques et des crises.'}
                    {activeTab === 'equilibre' && 'Ajustez les richesses, relations et autres paramètres pour équilibrer le jeu.'}
                    {activeTab === 'provinces' && 'Gérez les provinces et lancez des campagnes militaires.'}
                    {activeTab === 'histoire' && 'Enregistrez et modifiez les événements historiques du jeu.'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {activeTab === 'senateurs' && <GestionSenateurs />}
                  {activeTab === 'clients' && <GestionClients />}
                  {activeTab === 'politique' && <GestionPolitique />}
                  {activeTab === 'equilibre' && <GestionEquilibre />}
                  {activeTab === 'provinces' && <GestionProvinces />}
                  {activeTab === 'histoire' && <GestionHistoire />}
                </CardContent>
                
                <CardFooter className="border-t p-4 flex justify-between">
                  <p className="text-xs text-muted-foreground">
                    Vos actions sont enregistrées et visibles par les administrateurs
                  </p>
                  
                  <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                    Voir le jeu côté joueur
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </MaitreJeuProvider>
  );
};

export default MaitreJeu;
