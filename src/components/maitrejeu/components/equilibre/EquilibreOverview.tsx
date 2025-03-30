
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMaitreJeu } from '../../context/MaitreJeuContext';
import { RecentEventsTable } from './RecentEventsTable';
import { 
  TrendingUp, TrendingDown, ChevronUp, ChevronDown, Minus,
  Flag, Chart, AlertCircle, Sword
} from 'lucide-react';
import { Equilibre, PoliticalEvent } from '@/types/equilibre';

export const EquilibreOverview: React.FC = () => {
  const { equilibre, evenements } = useMaitreJeu();
  
  // Filter recent events (last 10)
  const recentEvents = evenements
    .slice(0, 10)
    .map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      impact: event.impact || {},
      type: event.type,
      importance: event.importance
    }));

  // Function to get trend icon based on value and threshold
  const getTrendIcon = (value: number) => {
    if (value > 65) return <TrendingUp className="text-green-500" />;
    if (value < 35) return <TrendingDown className="text-red-500" />;
    return <Minus className="text-yellow-500" />;
  };

  const formatStatusText = (value: number) => {
    if (value > 80) return "Excellent";
    if (value > 65) return "Bon";
    if (value > 50) return "Stable";
    if (value > 35) return "Préoccupant";
    if (value > 20) return "Critique";
    return "Catastrophique";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Politique */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Flag className="mr-2 h-5 w-5" /> Situation Politique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Populaires</span>
                <Badge variant="outline" className="flex items-center">
                  {equilibre.politique.populaires}% {getTrendIcon(equilibre.politique.populaires)}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Optimates</span>
                <Badge variant="outline" className="flex items-center">
                  {equilibre.politique.optimates}% {getTrendIcon(equilibre.politique.optimates)}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Modérés</span>
                <Badge variant="outline" className="flex items-center">
                  {equilibre.politique.moderates}% {getTrendIcon(equilibre.politique.moderates)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Militaire */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Sword className="mr-2 h-5 w-5" /> Forces Militaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Moral</span>
                <Badge variant="outline" className="flex items-center">
                  {equilibre.militaire.moral}% {getTrendIcon(equilibre.militaire.moral)}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Effectifs</span>
                <Badge variant="outline" className="flex items-center">
                  {equilibre.militaire.effectifs}% {getTrendIcon(equilibre.militaire.effectifs)}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Équipement</span>
                <Badge variant="outline" className="flex items-center">
                  {equilibre.militaire.equipement}% {getTrendIcon(equilibre.militaire.equipement)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* État Général */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <AlertCircle className="mr-2 h-5 w-5" /> État de la République
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Threats display would go here */}
              <div className="mt-2">
                <h4 className="text-sm font-medium mb-1">Menaces actuelles</h4>
                <div className="text-sm">
                  <p>Aucune menace immédiate</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle>Événements Récents</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentEventsTable events={recentEvents} />
        </CardContent>
      </Card>
    </div>
  );
};
