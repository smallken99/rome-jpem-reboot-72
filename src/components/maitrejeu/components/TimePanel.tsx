
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useMaitreJeu } from '../context';
import { formatSeasonDisplay } from '@/utils/timeSystem';

export const TimePanel: React.FC = () => {
  const { currentDate, currentPhase, advanceTime } = useMaitreJeu();
  
  // Formatage de la date actuelle
  const formattedDate = `An ${currentDate.year}, ${formatSeasonDisplay(currentDate.season)}`;
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Avancement du Temps
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Date actuelle</span>
              <span className="font-medium flex items-center mt-1">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                {formattedDate}
              </span>
            </div>
            
            <div className="h-10 w-px bg-gray-200 mx-2 hidden md:block" />
            
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Phase</span>
              <span className="font-medium flex items-center mt-1">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                {currentPhase}
              </span>
            </div>
          </div>
          
          <Button 
            onClick={() => advanceTime()}
            className="flex items-center gap-1"
          >
            Avancer au tour suivant
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
