import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useMaitreJeu } from '../../context';
import { Scale, Users2, Landmark, CalendarClock } from 'lucide-react';

export const StatsRepubliqueTab: React.FC = () => {
  const { equilibre, lois, elections, currentDate } = useMaitreJeu();
  
  // Calcul de statistiques
  const loisActives = lois.filter(loi => loi.statut === 'active').length;
  const loisProposees = lois.filter(loi => loi.statut === 'proposée').length;
  const loisRejetees = lois.filter(loi => loi.statut === 'rejetée').length;
  
  const electionsAVenir = elections.filter(e => 
    e.annee > currentDate.year || 
    (e.annee === currentDate.year && e.saison > currentDate.season)
  ).length;
  
  // Équilibre des factions (valeurs par défaut si undefined)
  const populaires = equilibre?.populaires || 33;
  const optimates = equilibre?.optimates || 33;
  const moderates = equilibre?.moderates || 34;
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Statistiques de la République</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" /> Équilibre des factions
            </CardTitle>
            <CardDescription>
              Répartition actuelle des influences au Sénat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Populaires</span>
                  <span className="text-sm text-muted-foreground">{populaires}%</span>
                </div>
                <Progress value={populaires} className="h-2 bg-muted" 
                  indicatorClassName="bg-blue-500" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Optimates</span>
                  <span className="text-sm text-muted-foreground">{optimates}%</span>
                </div>
                <Progress value={optimates} className="h-2 bg-muted"
                  indicatorClassName="bg-red-500" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Modérés</span>
                  <span className="text-sm text-muted-foreground">{moderates}%</span>
                </div>
                <Progress value={moderates} className="h-2 bg-muted"
                  indicatorClassName="bg-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-5 w-5" /> Activité législative
            </CardTitle>
            <CardDescription>
              État des lois et propositions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                <span className="text-2xl font-bold">{loisActives}</span>
                <span className="text-sm text-muted-foreground text-center">Lois actives</span>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                <span className="text-2xl font-bold">{loisProposees}</span>
                <span className="text-sm text-muted-foreground text-center">Propositions</span>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                <span className="text-2xl font-bold">{loisRejetees}</span>
                <span className="text-sm text-muted-foreground text-center">Lois rejetées</span>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Élections à venir</span>
                </div>
                <span className="text-xl font-bold">{electionsAVenir}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
