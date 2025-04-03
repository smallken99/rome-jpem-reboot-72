
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';

interface EventsModuleProps {
  limit?: number;
  showDescription?: boolean;
}

const EventsModule: React.FC<EventsModuleProps> = ({ limit = 3, showDescription = true }) => {
  const { evenements = [] } = useMaitreJeu();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Événements Récents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {evenements.length > 0 ? (
            <ul className="space-y-2">
              {evenements.slice(0, limit).map((evenement) => (
                <li key={evenement.id} className="border-l-2 border-muted pl-3 py-1">
                  <div className="text-sm font-medium">{evenement.titre || evenement.title}</div>
                  {showDescription && (
                    <div className="text-xs text-muted-foreground">
                      {evenement.description?.substring(0, 100)}
                      {evenement.description && evenement.description.length > 100 ? '...' : ''}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun événement récent.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsModule;
