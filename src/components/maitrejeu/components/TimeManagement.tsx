
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GamePhase } from '../types/common';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useMaitreJeu } from '../context';

export const TimeManagement: React.FC = () => {
  const { currentYear, currentSeason, currentPhase, advanceTime, changePhase } = useMaitreJeu();
  const [selectedPhase, setSelectedPhase] = useState<GamePhase>(currentPhase as GamePhase);
  
  const seasonName = {
    'SPRING': 'Ver (Printemps)',
    'SUMMER': 'Aestas (Été)',
    'AUTUMN': 'Autumnus (Automne)',
    'WINTER': 'Hiems (Hiver)'
  };
  
  const handlePhaseChange = () => {
    if (selectedPhase) {
      changePhase(selectedPhase);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Date et Phase Actuelle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="text-blue-800 text-sm font-medium">Année</div>
              <div className="text-2xl font-bold mt-1">{currentYear} AUC</div>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <div className="text-green-800 text-sm font-medium">Saison</div>
              <div className="text-2xl font-bold mt-1">{seasonName[currentSeason]}</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-md">
              <div className="text-amber-800 text-sm font-medium">Phase</div>
              <div className="text-2xl font-bold mt-1">{currentPhase}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Avancer le Temps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Avancez le temps à la saison suivante. Cela déclenchera les événements programmés pour la prochaine saison.
              </p>
              <Button 
                className="w-full"
                onClick={advanceTime}
              >
                Avancer à la saison suivante
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Changer de Phase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Select
                  value={selectedPhase}
                  onValueChange={(value) => setSelectedPhase(value as GamePhase)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une phase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SETUP">Configuration</SelectItem>
                    <SelectItem value="ELECTION">Élections</SelectItem>
                    <SelectItem value="SENAT">Sénat</SelectItem>
                    <SelectItem value="ACTION">Actions</SelectItem>
                    <SelectItem value="EVENEMENT">Événements</SelectItem>
                    <SelectItem value="ADMINISTRATION">Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handlePhaseChange}
                disabled={selectedPhase === currentPhase}
              >
                Passer à la phase {selectedPhase}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimeManagement;
