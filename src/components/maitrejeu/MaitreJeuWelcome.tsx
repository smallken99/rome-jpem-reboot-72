
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from './context';
import { ArrowRight, Calendar, Users, Landmark, Globe, Coins } from 'lucide-react';
import { formatDate } from '@/utils/formatUtils';

export const MaitreJeuWelcome: React.FC = () => {
  const { 
    currentDate, 
    currentPhase,
    senateurs,
    provinces,
    lois,
    equilibre,
    familles,
    economieRecords,
    advanceTime
  } = useMaitreJeu();
  
  const stats = [
    {
      title: 'Sénateurs Actifs',
      value: senateurs.filter(s => s.status === 'active').length,
      total: senateurs.length,
      icon: <Users className="h-8 w-8 text-rome-gold" />,
      color: 'bg-rome-gold/10'
    },
    {
      title: 'Provinces',
      value: provinces.filter(p => p.status === 'peaceful').length,
      total: provinces.length,
      icon: <Globe className="h-8 w-8 text-rome-navy" />,
      color: 'bg-rome-navy/10'
    },
    {
      title: 'Lois Actives',
      value: lois.filter(l => l.état === 'adoptée' || l.état === 'Promulguée').length,
      total: lois.length,
      icon: <Landmark className="h-8 w-8 text-rome-red" />,
      color: 'bg-rome-red/10'
    },
    {
      title: 'Trésor Public',
      value: economieRecords.reduce((acc, record) => 
        record.type === 'income' ? acc + record.amount : acc - record.amount, 0),
      suffix: ' as',
      icon: <Coins className="h-8 w-8 text-green-600" />,
      color: 'bg-green-600/10'
    }
  ];
  
  const recentEvents = [
    { id: '1', title: 'Élection des Consuls', date: 'Il y a 2 jours', type: 'politique' },
    { id: '2', title: 'Révolte dans la province de Gaule', date: 'Il y a 5 jours', type: 'militaire' },
    { id: '3', title: 'Nouvelle alliance avec Athènes', date: 'Il y a 1 semaine', type: 'diplomatique' },
    { id: '4', title: 'Sécheresse touchant les récoltes en Italie', date: 'Il y a 2 semaines', type: 'économique' }
  ];
  
  const pendingActions = [
    { id: '1', title: 'Valider les candidatures au Sénat', priority: 'haute' },
    { id: '2', title: 'Finaliser la nouvelle loi agraire', priority: 'moyenne' },
    { id: '3', title: 'Résoudre les conflits entre familles patriciennes', priority: 'moyenne' },
    { id: '4', title: 'Mettre à jour les revenus des provinces', priority: 'basse' }
  ];
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Bienvenue, Maître du Jeu</h1>
          <p className="text-muted-foreground mt-1">
            Panneau de contrôle principal de la République Romaine
          </p>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-right mb-2">
            <p className="text-sm text-muted-foreground">Date actuelle</p>
            <p className="text-xl font-medium">{formatDate(currentDate)}</p>
          </div>
          
          <Button onClick={() => advanceTime()} className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Avancer le temps
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                      {stat.suffix}
                    </h3>
                    {stat.total && (
                      <span className="text-sm text-muted-foreground ml-2">
                        sur {stat.total}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Événements récents</CardTitle>
            <CardDescription>
              Derniers événements importants qui ont affecté la République
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map(event => (
                <div key={event.id} className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      event.type === 'politique' ? 'bg-blue-100 text-blue-800' :
                      event.type === 'militaire' ? 'bg-red-100 text-red-800' :
                      event.type === 'diplomatique' ? 'bg-purple-100 text-purple-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                Voir tous les événements
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Actions en attente</CardTitle>
            <CardDescription>
              Tâches qui requièrent votre attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingActions.map(action => (
                <div key={action.id} className="flex items-start p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-1.5 mr-3 ${
                    action.priority === 'haute' ? 'bg-red-500' :
                    action.priority === 'moyenne' ? 'bg-amber-500' :
                    'bg-green-500'
                  }`} />
                  <div>
                    <h4 className="font-medium">{action.title}</h4>
                    <p className="text-xs text-muted-foreground capitalize">Priorité {action.priority}</p>
                  </div>
                </div>
              ))}
              
              <Button variant="default" className="w-full flex items-center gap-2">
                <span>Gérer toutes les actions</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Balance des factions</CardTitle>
            <CardDescription>
              Équilibre actuel du pouvoir au sein de la République
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-between text-sm mb-1">
                  <span>Optimates</span>
                  <span>{equilibre?.optimates || 0}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${equilibre?.optimates || 0}%` }}
                  />
                </div>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-between text-sm mb-1">
                  <span>Populares</span>
                  <span>{equilibre?.populares || 0}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-red-600 rounded-full"
                    style={{ width: `${equilibre?.populares || 0}%` }}
                  />
                </div>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <div className="flex justify-between text-sm mb-1">
                  <span>Moderates</span>
                  <span>{equilibre?.moderates || 0}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-green-600 rounded-full"
                    style={{ width: `${equilibre?.moderates || 0}%` }}
                  />
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                Gérer l'équilibre politique
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Familles influentes</CardTitle>
            <CardDescription>
              Les familles les plus puissantes de Rome
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {familles.slice(0, 5).map((famille, index) => (
                <div key={famille.id} className="flex items-center justify-between p-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="font-cinzel font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full bg-muted">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">Gens {famille.nom}</h4>
                      <p className="text-xs text-muted-foreground">
                        {famille.membres || 5} membres • {famille.influence || 'Moyenne'} influence
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                Voir toutes les familles
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
