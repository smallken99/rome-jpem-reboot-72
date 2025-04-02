
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ChevronRight, ChevronsRight, Crown, GraduationCap, Scroll, Shield, Users } from 'lucide-react';
import { useMaitreJeu } from './context';
import { formatGameDate } from './utils/dateConverter';
import { ProgressBar } from './components/utils/ProgressBar';
import { GameDate } from '@/utils/types/gameDate';

export const MaitreJeuWelcome = () => {
  const { currentDate, equilibre, treasury, senatorsCount, clientsCount, advancePhase, advanceTime } = useMaitreJeu();
  const [isAdvancing, setIsAdvancing] = useState(false);

  // Handle advancing to next phase or time period
  const handleAdvance = async (type: 'phase' | 'time') => {
    setIsAdvancing(true);
    try {
      if (type === 'phase') {
        await advancePhase();
      } else {
        await advanceTime();
      }
    } finally {
      setIsAdvancing(false);
    }
  };

  // Calculate treasury trend (simplified example)
  const treasuryTrend = treasury.balance > (treasury.previousBalance || 0) ? 'positive' : 'negative';
  const treasuryChange = treasury.balance - (treasury.previousBalance || treasury.balance);
  const treasuryChangePercent = treasury.previousBalance 
    ? Math.round((treasuryChange / treasury.previousBalance) * 100) 
    : 0;

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold font-cinzel">Ave, Magister Ludi</h1>
          <p className="text-muted-foreground flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {formatGameDate(currentDate as GameDate)}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => handleAdvance('phase')}
            disabled={isAdvancing}
            className="flex items-center"
          >
            <ChevronRight className="mr-1 h-4 w-4" />
            Phase suivante
          </Button>
          <Button 
            onClick={() => handleAdvance('time')}
            disabled={isAdvancing}
            className="flex items-center"
          >
            <ChevronsRight className="mr-1 h-4 w-4" />
            Saison suivante
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Trésor Public</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{treasury.balance.toLocaleString()} As</div>
            <div className={`text-xs ${treasuryTrend === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
              {treasuryTrend === 'positive' ? '↑' : '↓'} {Math.abs(treasuryChange).toLocaleString()} As ({treasuryChangePercent}%)
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sénateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{senatorsCount}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="mr-2 inline-flex items-center">
                <Users className="h-3 w-3 mr-1" /> Optimates: {equilibre.politique.optimates}%
              </span>
              <span className="inline-flex items-center">
                <Users className="h-3 w-3 mr-1" /> Populares: {equilibre.politique.populares}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientsCount}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="mr-2">Équilibre: {equilibre.politique.populares}% / {equilibre.politique.optimates}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stabilité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equilibre.stabilite.index}/100</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span>Risque de crise: {equilibre.stabilite.crisisRisk}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="equilibre">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="equilibre">Équilibre</TabsTrigger>
          <TabsTrigger value="agenda">Événements</TabsTrigger>
          <TabsTrigger value="decisions">Décisions</TabsTrigger>
          <TabsTrigger value="rapports">Rapports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="equilibre">
          <Card>
            <CardHeader>
              <CardTitle>État de la République</CardTitle>
              <CardDescription>
                Vue d'ensemble de l'équilibre des forces et de la situation actuelle.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center"><Crown className="h-4 w-4 mr-2" /> Politique</span>
                  <span>{equilibre.politique.stability}/100</span>
                </div>
                <ProgressBar value={equilibre.politique.stability} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center"><Scroll className="h-4 w-4 mr-2" /> Économie</span>
                  <span>{equilibre.economie.prosperity}/100</span>
                </div>
                <ProgressBar value={equilibre.economie.prosperity} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center"><Shield className="h-4 w-4 mr-2" /> Militaire</span>
                  <span>{equilibre.militaire.readiness}/100</span>
                </div>
                <ProgressBar value={equilibre.militaire.readiness} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center"><GraduationCap className="h-4 w-4 mr-2" /> Religion</span>
                  <span>{equilibre.religion.piety}/100</span>
                </div>
                <ProgressBar value={equilibre.religion.piety} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agenda">
          <Card>
            <CardHeader>
              <CardTitle>Événements à venir</CardTitle>
              <CardDescription>
                Calendrier des événements importants des prochaines saisons.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-4">
                Aucun événement planifié pour le moment. Utilisez le module Événements pour en créer.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="decisions">
          <Card>
            <CardHeader>
              <CardTitle>Décisions en attente</CardTitle>
              <CardDescription>
                Décisions qui nécessitent votre attention.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-4">
                Aucune décision en attente pour le moment.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rapports">
          <Card>
            <CardHeader>
              <CardTitle>Rapports</CardTitle>
              <CardDescription>
                Rapports des provinces et des légions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-4">
                Aucun rapport récent. Les rapports apparaîtront ici à la fin de chaque saison.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
