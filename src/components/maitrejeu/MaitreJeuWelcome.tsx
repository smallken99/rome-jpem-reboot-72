
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from './context';
import { Landmark, ChevronsRight, Users, BookOpen, Scroll, Calendar } from 'lucide-react';

export const MaitreJeuWelcome: React.FC = () => {
  const { currentYear, currentSeason, senateurs, lois, histoireEntries } = useMaitreJeu();
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Landmark className="h-10 w-10 text-amber-600" />
        <div>
          <h1 className="text-3xl font-bold">Interface Maître du Jeu</h1>
          <p className="text-muted-foreground">Bienvenue dans l'interface d'administration de RomeJPem</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sénateurs Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{senateurs.length}</div>
            <p className="text-xs text-muted-foreground">
              {senateurs.filter(s => s.joueur).length} contrôlés par des joueurs
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Année Courante</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentYear} AUC</div>
            <p className="text-xs text-muted-foreground">
              Saison: {currentSeason === 'SPRING' ? 'Printemps' : 
                     currentSeason === 'SUMMER' ? 'Été' : 
                     currentSeason === 'FALL' ? 'Automne' : 'Hiver'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lois Actives</CardTitle>
            <Scroll className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lois.filter(l => l.status === "enacted").length}</div>
            <p className="text-xs text-muted-foreground">
              {lois.filter(l => l.status === "proposed").length} lois en délibération
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Évènements Historiques</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{histoireEntries.length}</div>
            <p className="text-xs text-muted-foreground">
              {histoireEntries.filter(e => e.visible).length} évènements publics
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Modules disponibles</CardTitle>
          <CardDescription>
            Gérez tous les aspects du jeu à travers ces différents modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline" className="justify-between h-auto py-3">
              <span>Gestion des Sénateurs</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between h-auto py-3">
              <span>Gestion des Familles</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between h-auto py-3">
              <span>Gestion des Lois</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between h-auto py-3">
              <span>Gestion des Provinces</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between h-auto py-3">
              <span>Gestion des Bâtiments</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between h-auto py-3">
              <span>Gestion de l'Économie</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between h-auto py-3">
              <span>Chroniques Historiques</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between h-auto py-3">
              <span>Avancement du Temps</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="justify-between h-auto py-3">
              <span>Équilibre des Forces</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
