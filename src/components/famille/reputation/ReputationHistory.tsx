
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ReputationEvent {
  year: string;
  event: string;
  change: string;
}

interface ReputationHistoryProps {
  events: ReputationEvent[];
}

export const ReputationHistory: React.FC<ReputationHistoryProps> = ({ events }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Événements Historiques</CardTitle>
        <CardDescription>
          Les événements majeurs qui ont façonné la réputation de votre famille
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute h-full w-0.5 bg-gray-200 left-7 top-0"></div>
          
          <ul className="space-y-5">
            {events.map((event, index) => (
              <li key={index} className="relative pl-16">
                <div className="absolute left-0 rounded-full w-14 text-center py-1 bg-primary/10 text-primary-foreground text-xs">
                  {event.year}
                </div>
                
                <div className="absolute left-7 w-2 h-2 rounded-full bg-primary top-1/2 -translate-y-1/2"></div>
                
                <div className="flex items-center">
                  <div className="flex-1">{event.event}</div>
                  <Badge variant={event.change.startsWith('+') ? 'default' : 'destructive'}>
                    {event.change}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
          
          {events.length === 0 && (
            <div className="py-6 text-center text-muted-foreground">
              Aucun événement historique enregistré.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
