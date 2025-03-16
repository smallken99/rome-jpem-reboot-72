
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TimeManagement } from './components/TimeManagement';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useMaitreJeu } from './context';
import { CalendarClock, AlertCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const MaitreJeuWelcome: React.FC = () => {
  const { currentDate, currentPhase, evenements, lois } = useMaitreJeu();
  
  const pendingEvenements = evenements.filter(e => !e.resolved);
  const pendingLois = lois.filter(l => l.status === 'proposed' || l.état === 'En délibération');
  
  const handleResolveAll = () => {
    toast.success("Tous les événements en attente ont été résolus automatiquement");
  };
  
  const handlePromulgueLois = () => {
    toast.success("Toutes les lois proposées ont été traitées");
  };
  
  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 gap-3">
        <h2 className="text-3xl font-bold mb-2">Tableau de bord</h2>
        <p className="text-lg text-muted-foreground mb-4">
          Bienvenue dans l'interface de gestion du Maître du Jeu de Rome JPEM
        </p>
      </div>
      
      <TimeManagement />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Événements et actions nécessitant votre attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingEvenements.length > 0 || pendingLois.length > 0 ? (
              <div className="space-y-4">
                {pendingEvenements.length > 0 && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Événements en attente</AlertTitle>
                    <AlertDescription>
                      <p>Il y a {pendingEvenements.length} événements qui nécessitent votre attention.</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => handleResolveAll()}
                      >
                        Résoudre tous les événements
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
                
                {pendingLois.length > 0 && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Lois proposées</AlertTitle>
                    <AlertDescription>
                      <p>Il y a {pendingLois.length} propositions de lois en attente.</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => handlePromulgueLois()}
                      >
                        Gérer les propositions
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Aucune notification en attente</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5" />
              Statut du jeu
            </CardTitle>
            <CardDescription>
              Informations sur l'état actuel du jeu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Date du jeu:</h3>
                <p>{currentDate.year} AUC, {currentDate.season}</p>
              </div>
              
              <div>
                <h3 className="font-medium">Phase actuelle:</h3>
                <p>{currentPhase}</p>
              </div>
              
              <div>
                <h3 className="font-medium">Statistiques rapides:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>{evenements.length} événements créés</li>
                  <li>{lois.length} lois enregistrées</li>
                  <li>{pendingEvenements.length} événements en attente</li>
                </ul>
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => toast.success("Rapport d'état du jeu généré")}
                >
                  Générer un rapport d'état
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
