
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, BookOpen, GalleryVerticalEnd, PieChart } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/formatUtils';

interface SenateurJouable {
  id: string;
  nom: string;
  age: number;
  influence: number;
  statut: string;
}

// Données mockées
const joueurs = [
  { id: '1', nom: 'Marcus Tullius', famille: 'Tullii', dernièreConnexion: '2 heures' },
  { id: '2', nom: 'Lucius Cornelius', famille: 'Cornelii', dernièreConnexion: '1 jour' },
  { id: '3', nom: 'Gaius Julius', famille: 'Julii', dernièreConnexion: '10 minutes' },
  { id: '4', nom: 'Quintus Fabius', famille: 'Fabii', dernièreConnexion: '3 jours' }
];

const evenementsRecents = [
  { id: '1', type: 'loi', titre: 'Lex Manlia promulguée', date: '2 jours', description: 'Taxe de 5% sur les affranchissements' },
  { id: '2', type: 'politique', titre: 'Élection des nouveaux consuls', date: '5 jours', description: 'Quintus Fabius et Gaius Julius élus' },
  { id: '3', type: 'bataille', titre: 'Victoire contre les Samnites', date: '10 jours', description: 'La légion IV a repoussé l\'invasion' }
];

export const MaitreJeuWelcome: React.FC = () => {
  const dateActuelle = { year: 753, season: 'Ver' };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Bienvenue, Maître du Jeu</h1>
          <p className="text-muted-foreground">
            Gérez l'univers de RomeJPEM et façonnez le destin de la République
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
            <Calendar className="h-5 w-5" />
            <span className="font-medium">{formatDate(dateActuelle)}</span>
          </div>
          
          <Button className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Avancer le temps</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Joueurs Actifs</span>
            </CardTitle>
            <CardDescription>
              {joueurs.length} sénateurs connectés récemment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {joueurs.map((joueur) => (
                <div key={joueur.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{joueur.nom}</div>
                    <div className="text-sm text-muted-foreground">Famille {joueur.famille}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Il y a {joueur.dernièreConnexion}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span>Événements Récents</span>
            </CardTitle>
            <CardDescription>
              Les derniers événements importants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evenementsRecents.map((evenement) => (
                <div key={evenement.id} className="border-l-4 pl-4 py-1" 
                  style={{ 
                    borderColor: evenement.type === 'loi' ? '#8884d8' : 
                                evenement.type === 'politique' ? '#82ca9d' : '#ff7300'
                  }}
                >
                  <div className="font-medium">{evenement.titre}</div>
                  <div className="text-sm">{evenement.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">Il y a {evenement.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GalleryVerticalEnd className="h-5 w-5" />
              <span>État de la République</span>
            </CardTitle>
            <CardDescription>
              Statistiques générales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Trésor</div>
                  <div className="text-xl font-semibold">{formatCurrency(875000)}</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Légions</div>
                  <div className="text-xl font-semibold">14</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Provinces</div>
                  <div className="text-xl font-semibold">9</div>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="text-sm text-muted-foreground">Lois actives</div>
                  <div className="text-xl font-semibold">37</div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <PieChart className="h-4 w-4" />
                <span>Voir les statistiques détaillées</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>
              Accédez rapidement aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 gap-2">
                <Users className="h-6 w-6" />
                <span>Gérer les Sénateurs</span>
              </Button>
              
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 gap-2">
                <Calendar className="h-6 w-6" />
                <span>Planifier un Événement</span>
              </Button>
              
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 gap-2">
                <BookOpen className="h-6 w-6" />
                <span>Proposer une Loi</span>
              </Button>
              
              <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 gap-2">
                <GalleryVerticalEnd className="h-6 w-6" />
                <span>Avancer le Temps</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
