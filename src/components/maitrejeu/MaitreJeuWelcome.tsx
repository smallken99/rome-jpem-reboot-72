
import React from 'react';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Users, 
  Map, 
  AlertTriangle, 
  Calendar, 
  Scroll, 
  BarChart, 
  ArrowUpRight,
  ArrowRight,
  Crown,
  Building,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MaitreJeuWelcome: React.FC = () => {
  const { 
    currentDate, 
    currentPhase, 
    senateurs, 
    provinces, 
    evenements, 
    elections,
    lois,
    clients,
    familles,
    economieRecords,
    equilibre
  } = useMaitreJeu();
  
  const navigate = useNavigate();
  
  // Statistiques rapides
  const pendingEvents = evenements.filter(e => !e.resolved).length;
  const upcomingElections = elections.filter(e => e.status === 'scheduled').length;
  const pendingLaws = lois.filter(l => l.état === 'En délibération').length;
  
  // Format de la date
  const formatSeason = (season: string) => {
    const seasonMap: Record<string, string> = {
      'SPRING': 'Printemps',
      'SUMMER': 'Été',
      'AUTUMN': 'Automne',
      'WINTER': 'Hiver'
    };
    return seasonMap[season] || season;
  };
  
  // Navigation
  const navigateTo = (path: string) => {
    navigate(`/maitre-jeu/${path}`);
  };
  
  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">SPQR: Tabula Imperii Romani</h1>
          <p className="text-muted-foreground mt-2">
            Panneau d'administration du Maître du Jeu
          </p>
          <div className="flex mt-4 space-x-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                An {currentDate.year} AUC
              </h3>
              <p className="text-muted-foreground">{formatSeason(currentDate.season)}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <Scroll className="h-5 w-5 mr-2 text-primary" />
                Phase: {currentPhase}
              </h3>
              <p className="text-muted-foreground">État actuel du jeu</p>
            </div>
          </div>
        </div>
        
        {pendingEvents > 0 && (
          <Alert variant="destructive" className="max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Événements en attente</AlertTitle>
            <AlertDescription>
              Vous avez {pendingEvents} événement{pendingEvents > 1 ? 's' : ''} non résolu{pendingEvents > 1 ? 's' : ''} qui require{pendingEvents > 1 ? 'nt' : 't'} votre attention.
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Sénateurs</CardTitle>
            <CardDescription>{senateurs.length} au total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{senateurs.filter(s => s.joueur).length}</div>
            <p className="text-muted-foreground">Sénateurs joueurs</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full flex justify-between items-center" onClick={() => navigateTo('senateurs')}>
              Gérer les sénateurs
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Provinces</CardTitle>
            <CardDescription>{provinces.length} territoires</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {provinces.filter(p => p.stability < 50).length}
            </div>
            <p className="text-muted-foreground">Provinces instables</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full flex justify-between items-center" onClick={() => navigateTo('provinces')}>
              Gérer les provinces
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Familles</CardTitle>
            <CardDescription>{familles.length} lignées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {familles.filter(f => f.statut === 'Patricien').length}
            </div>
            <p className="text-muted-foreground">Familles patriciennes</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full flex justify-between items-center" onClick={() => navigateTo('familles')}>
              Gérer les familles
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Clients</CardTitle>
            <CardDescription>{clients.length} au total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients.filter(c => !c.assignedToSenateurId).length}
            </div>
            <p className="text-muted-foreground">Clients non assignés</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full flex justify-between items-center" onClick={() => navigateTo('clients')}>
              Gérer les clients
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Activités Récentes</CardTitle>
            <CardDescription>
              Derniers événements importants dans la République
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Élections */}
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  <Crown className="h-5 w-5 mr-2 text-amber-500" />
                  Élections
                </h3>
                <div className="mt-2 space-y-3">
                  {elections.slice(0, 3).map(election => (
                    <div key={election.id} className="flex justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{election.magistrature}</p>
                        <p className="text-sm text-muted-foreground">
                          An {election.year || election.annee}, {election.season || election.saison}
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          election.status === 'completed' ? 'bg-green-100 text-green-800' :
                          election.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {election.status === 'completed' ? 'Terminée' :
                           election.status === 'in_progress' ? 'En cours' :
                           'Prévue'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-2 p-0" onClick={() => navigateTo('politique')}>
                  Voir toutes les élections
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              {/* Lois */}
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  <Scroll className="h-5 w-5 mr-2 text-emerald-600" />
                  Lois
                </h3>
                <div className="mt-2 space-y-3">
                  {lois.slice(0, 3).map(loi => (
                    <div key={loi.id} className="flex justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{loi.titre || loi.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Proposée par: {loi.proposeur || loi.proposedBy}
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          loi.état === 'Promulguée' || loi.statut === 'Promulguée' ? 'bg-green-100 text-green-800' :
                          loi.état === 'Rejetée' || loi.statut === 'Rejetée' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {loi.état || loi.statut || 'En délibération'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-2 p-0" onClick={() => navigateTo('lois')}>
                  Voir toutes les lois
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              {/* Économie */}
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  <Building className="h-5 w-5 mr-2 text-indigo-600" />
                  Économie
                </h3>
                <div className="mt-2 space-y-3">
                  {economieRecords.slice(0, 3).map(record => (
                    <div key={record.id} className="flex justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{record.description}</p>
                        <p className="text-sm text-muted-foreground">
                          Source: {record.source}, Catégorie: {record.category}
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          record.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {record.amount.toLocaleString()} As
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-2 p-0" onClick={() => navigateTo('economie')}>
                  Voir l'économie
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Équilibre des Factions</CardTitle>
            <CardDescription>
              État actuel de l'équilibre politique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Populares</h4>
                  <span className="font-semibold">{equilibre?.populares || 0}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-200 rounded-full">
                  <div 
                    className="h-2.5 bg-red-500 rounded-full" 
                    style={{ width: `${equilibre?.populares || 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Optimates</h4>
                  <span className="font-semibold">{equilibre?.optimates || 0}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-200 rounded-full">
                  <div 
                    className="h-2.5 bg-blue-500 rounded-full" 
                    style={{ width: `${equilibre?.optimates || 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Moderates</h4>
                  <span className="font-semibold">{equilibre?.moderates || equilibre?.neutrales || 0}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-200 rounded-full">
                  <div 
                    className="h-2.5 bg-green-500 rounded-full" 
                    style={{ width: `${equilibre?.moderates || equilibre?.neutrales || 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Stabilité Économique</h4>
                  <span className="font-semibold">{equilibre?.economicStability || equilibre?.économie || 0}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-200 rounded-full">
                  <div 
                    className="h-2.5 bg-amber-500 rounded-full" 
                    style={{ width: `${equilibre?.economicStability || equilibre?.économie || 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Puissance Militaire</h4>
                  <span className="font-semibold">{equilibre?.facteurMilitaire || equilibre?.armée || 0}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-200 rounded-full">
                  <div 
                    className="h-2.5 bg-purple-500 rounded-full" 
                    style={{ width: `${equilibre?.facteurMilitaire || equilibre?.armée || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-6" onClick={() => navigateTo('equilibre')}>
              <Shield className="h-4 w-4 mr-2" />
              Gérer l'équilibre
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-start" 
              onClick={() => navigateTo('senateurs')}
            >
              <Users className="h-4 w-4 mr-2" />
              Ajouter un Sénateur
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-start" 
              onClick={() => navigateTo('provinces')}
            >
              <Map className="h-4 w-4 mr-2" />
              Gérer les Provinces
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-start" 
              onClick={() => navigateTo('evenements')}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Créer un Événement
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-start" 
              onClick={() => navigateTo('economie')}
            >
              <BarChart className="h-4 w-4 mr-2" />
              Gérer l'Économie
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Événements à Venir</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingElections > 0 && (
              <Alert className="mb-4">
                <Crown className="h-4 w-4" />
                <AlertTitle>Élections</AlertTitle>
                <AlertDescription>
                  {upcomingElections} élection{upcomingElections > 1 ? 's' : ''} à venir
                </AlertDescription>
              </Alert>
            )}
            
            {pendingLaws > 0 && (
              <Alert className="mb-4">
                <Scroll className="h-4 w-4" />
                <AlertTitle>Lois</AlertTitle>
                <AlertDescription>
                  {pendingLaws} loi{pendingLaws > 1 ? 's' : ''} en délibération
                </AlertDescription>
              </Alert>
            )}
            
            {pendingEvents > 0 && (
              <Alert className="mb-4" variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Événements</AlertTitle>
                <AlertDescription>
                  {pendingEvents} événement{pendingEvents > 1 ? 's' : ''} non résolu{pendingEvents > 1 ? 's' : ''}
                </AlertDescription>
              </Alert>
            )}
            
            {!upcomingElections && !pendingLaws && !pendingEvents && (
              <p className="text-muted-foreground text-center py-4">
                Aucun événement à venir actuellement
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Système</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant={currentPhase === "SENATE" ? "default" : "outline"}
              className="w-full flex items-center justify-start" 
              onClick={() => navigateTo('')}
            >
              <Shield className="h-4 w-4 mr-2" />
              Phase du Sénat
            </Button>
            
            <Button 
              variant={currentPhase === "FORUM" ? "default" : "outline"}
              className="w-full flex items-center justify-start" 
              onClick={() => navigateTo('')}
            >
              <Users className="h-4 w-4 mr-2" />
              Phase du Forum
            </Button>
            
            <Button 
              variant={currentPhase === "COMBAT" ? "default" : "outline"}
              className="w-full flex items-center justify-start" 
              onClick={() => navigateTo('')}
            >
              <Shield className="h-4 w-4 mr-2" />
              Phase de Combat
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-start" 
              onClick={() => navigateTo('statistiques')}
            >
              <BarChart className="h-4 w-4 mr-2" />
              Statistiques
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
