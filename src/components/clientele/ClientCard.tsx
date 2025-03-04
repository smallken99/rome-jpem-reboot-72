
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  MapPin, 
  Star, 
  Clock, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';

interface ClientCardProps {
  client: {
    id: number;
    name: string;
    profession: string;
    location: string;
    loyalty: string;
    influence: number;
    lastInteraction: string;
    requests: number;
  };
}

export const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  // Map loyalty to color
  const getLoyaltyColor = (loyalty: string) => {
    switch (loyalty) {
      case 'Très Haute': return 'bg-green-100 text-green-800 border-green-200';
      case 'Haute': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Moyenne': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Basse': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Très Basse': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Render stars based on influence level (1-5)
  const renderInfluence = (level: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < level ? 'text-rome-gold fill-rome-gold' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="roman-card hover:border-rome-gold transition-all duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-cinzel text-lg font-semibold text-rome-navy">{client.name}</h3>
          <Badge className={`${getLoyaltyColor(client.loyalty)} border font-normal`}>
            {client.loyalty}
          </Badge>
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-2 text-rome-navy/70" />
            <span>{client.profession}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-rome-navy/70" />
            <span>{client.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-rome-navy/70" />
            <span>Dernière interaction: {client.lastInteraction}</span>
          </div>
          
          <div className="flex items-center mt-1">
            <div className="text-sm text-muted-foreground mr-2">Influence:</div>
            <div className="flex">
              {renderInfluence(client.influence)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-rome-gold/20">
          {client.requests > 0 ? (
            <Button variant="outline" className="roman-btn-outline text-xs gap-1 py-1 h-8">
              <MessageSquare className="h-3.5 w-3.5" />
              {client.requests} Requêtes
            </Button>
          ) : (
            <span className="text-xs text-muted-foreground">Pas de requêtes</span>
          )}
          
          <Button variant="outline" className="roman-btn-outline text-xs gap-1 py-1 h-8">
            Détails
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
