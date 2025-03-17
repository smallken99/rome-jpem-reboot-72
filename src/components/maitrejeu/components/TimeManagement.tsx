
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Season, GamePhase } from '@/components/maitrejeu/types/common';
import { formatSeasonDisplay } from '@/components/maitrejeu/types/common';
import { CalendarClock, ChevronRight, Clock, FastForward } from 'lucide-react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { Separator } from '@/components/ui/separator';

interface TimeManagementProps {
  onAdvance?: () => void;
}

export const TimeManagement: React.FC<TimeManagementProps> = ({ onAdvance }) => {
  const { 
    currentYear, 
    currentSeason, 
    currentPhase, 
    advanceTime, 
    changePhase 
  } = useMaitreJeu();
  
  const [selectedPhase, setSelectedPhase] = useState<GamePhase>(currentPhase);
  
  const handleAdvanceTime = () => {
    advanceTime();
    if (onAdvance) onAdvance();
  };
  
  const handleChangePhase = () => {
    changePhase(selectedPhase);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center">
          <CalendarClock className="h-5 w-5 mr-2 text-primary" />
          <CardTitle>Gestion du Temps</CardTitle>
        </div>
        <CardDescription>
          Contrôlez l'écoulement du temps dans la République
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-muted/50 rounded-md">
          <div>
            <p className="text-muted-foreground text-sm">Année</p>
            <p className="text-2xl font-bold">
              {currentYear} <span className="text-sm font-normal ml-1">AUC</span>
            </p>
          </div>
          
          <div>
            <p className="text-muted-foreground text-sm">Saison</p>
            <p className="text-2xl font-bold">
              {formatSeasonDisplay(currentSeason)}
            </p>
          </div>
          
          <div>
            <p className="text-muted-foreground text-sm">Phase</p>
            <p className="text-xl font-bold">
              {currentPhase === 'ELECTION' ? 'Élections' : 
               currentPhase === 'VOTE' ? 'Vote' :
               currentPhase === 'SENATE' ? 'Sénat' :
               currentPhase === 'ACTIONS' ? 'Actions' :
               currentPhase === 'ECONOMY' ? 'Économie' :
               currentPhase === 'EVENTS' ? 'Événements' :
               currentPhase === 'MILITARY' ? 'Militaire' : 'Autre'}
            </p>
          </div>
        </div>
        
        <Separator className="my-2" />
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Changer de phase</h3>
          
          <div className="flex space-x-2">
            <Select value={selectedPhase} onValueChange={(value: GamePhase) => setSelectedPhase(value)}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Choisir une phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SENATE">Sénat</SelectItem>
                <SelectItem value="ELECTION">Élections</SelectItem>
                <SelectItem value="VOTE">Vote</SelectItem>
                <SelectItem value="ACTIONS">Actions</SelectItem>
                <SelectItem value="ECONOMY">Économie</SelectItem>
                <SelectItem value="EVENTS">Événements</SelectItem>
                <SelectItem value="MILITARY">Militaire</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={handleChangePhase}>
              <Clock className="h-4 w-4 mr-2" />
              Changer
            </Button>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <div className="flex w-full justify-between">
          <Button variant="outline" onClick={handleAdvanceTime}>
            <ChevronRight className="h-4 w-4 mr-2" />
            Saison suivante
          </Button>
          
          <Button variant="default" onClick={handleAdvanceTime}>
            <FastForward className="h-4 w-4 mr-2" />
            Année suivante
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
