import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GAME_PHASES, EVENT_STATUS } from './constants/gamePhases';

export const MaitreJeuWelcome: React.FC = () => {
  const { 
    senateurs, 
    provinces, 
    evenements, 
    elections, 
    histoireEntries,
    currentYear,
    currentSeason,
    currentPhase,
    equilibre
  } = useMaitreJeu();
  
  // Filtrer les sénateurs joueurs
  const joueurs = senateurs.filter(sen => sen.joueur);
  
  // Trier les événements par date
  const upcomingEvents = evenements
    .filter(event => event.status === EVENT_STATUS.SCHEDULED)
    .sort((a, b) => a.year - b.year);
  
  // Sélectionner les 5 dernières entrées d'histoire
  const recentHistory = histoireEntries.slice(0, 5);
  
  // Trouver la prochaine élection
  const nextElection = elections.find(election => election.year === currentYear);
  
  // Trouver les provinces avec faible stabilité
  const unstableProvinces = provinces.filter(province => province.stabilite < 50);
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Bienvenue, Maître du Jeu</h1>
      <p className="text-muted-foreground">
        Aperçu rapide de la République romaine - Année {currentYear} {currentSeason}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Sénateurs Joueurs</CardTitle>
            <CardDescription>
              {joueurs.length} sénateurs actifs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[150px] w-full space-y-2">
              {joueurs.map(joueur => (
                <div key={joueur.id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${joueur.id}`} />
                    <AvatarFallback>{joueur.nom[0]}{joueur.prenom[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{joueur.nom}, {joueur.prenom}</p>
                    <p className="text-sm text-muted-foreground">
                      {joueur.statut} - {joueur.appartenance}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Prochaines Élections</CardTitle>
            <CardDescription>
              Élections consulaires de {nextElection?.year || currentYear + 1}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {nextElection ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Poste:</span>
                  <span>{nextElection.poste}</span>
                </div>
                <div className="flex justify-between">
                  <span>Candidats:</span>
                  <span>{nextElection.candidats.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Favori:</span>
                  <span>{nextElection.candidats[0]}</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Aucune élection planifiée pour le moment.
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Provinces Instables</CardTitle>
            <CardDescription>
              {unstableProvinces.length} provinces nécessitant une attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[150px] w-full space-y-2">
              {unstableProvinces.map(province => (
                <div key={province.id} className="flex items-center justify-between">
                  <span>{province.nom}</span>
                  <Badge variant="destructive">
                    {province.stabilite}%
                  </Badge>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Événements à Venir</CardTitle>
            <CardDescription>
              {upcomingEvents.length} événements nécessitant une résolution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Année</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingEvents.map(event => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.year}</TableCell>
                      <TableCell>{event.title}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            event.status === EVENT_STATUS.COMPLETED
                              ? "success"
                              : event.status === EVENT_STATUS.IN_PROGRESS
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {event.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Chroniques Récentes</CardTitle>
            <CardDescription>
              Dernières entrées dans les annales de Rome
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full">
              <div className="divide-y divide-border">
                {recentHistory.map(entry => (
                  <div key={entry.id} className="py-4">
                    <p className="text-sm font-medium leading-none">{entry.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {entry.year} - {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Phase Actuelle</CardTitle>
            <CardDescription>
              Phase de jeu en cours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentPhase}
            </div>
            <p className="text-muted-foreground">
              La République est actuellement en phase de {currentPhase}.
            </p>
            
            <div className="mt-4">
              {currentPhase === GAME_PHASES.FORUM && (
                <p className="text-green-500">
                  Le Forum est ouvert pour les débats et les décisions.
                </p>
              )}
              
              {currentPhase === GAME_PHASES.COMBAT && (
                <p className="text-red-500">
                  Les armées sont en mouvement, la guerre fait rage.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Équilibre des Factions</CardTitle>
            <CardDescription>
              Répartition des forces politiques dans la République
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Populares:</span>
                <span>{equilibre?.populaires}%</span>
              </div>
              <div className="flex justify-between">
                <span>Optimates:</span>
                <span>{equilibre?.optimates}%</span>
              </div>
              <div className="flex justify-between">
                <span>Moderates:</span>
                <span>{equilibre?.moderates}%</span>
              </div>
            </div>
            
            <div className="mt-4">
              {equilibre?.populaires > 60 && (
                <p className="text-red-500">
                  Les Populares dominent le Sénat, attention à la plèbe.
                </p>
              )}
              
              {equilibre?.populaires < 40 && (
                <p className="text-green-500">
                  Les Optimates ont le contrôle, mais la tension monte.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
