
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  MapPin, 
  Briefcase,
  LandmarkIcon,
  BookOpen,
  Skull,
  Building,
  Star,
  Heart,
  BookIcon,
  ChevronRight
} from 'lucide-react';

// Définir les types de clients et sous-types
export type ClientType = 'artisan' | 'politicien' | 'religieux' | 'proprietaire' | 'pegre';
export type ClientSubType = string;

// Interface pour les influences
interface ClientInfluence {
  political: number;
  popular: number;
  religious: number;
}

export interface Client {
  id: number;
  name: string;
  type: ClientType;
  subType: ClientSubType;
  location: string;
  loyalty: string;
  influences: ClientInfluence;
}

interface ClientCardProps {
  client: Client;
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

  // Get client type icon
  const getClientTypeIcon = () => {
    switch (client.type) {
      case 'artisan':
        return <Briefcase className="h-5 w-5 text-blue-600" />;
      case 'politicien':
        return <Building className="h-5 w-5 text-purple-600" />;
      case 'religieux':
        return <BookOpen className="h-5 w-5 text-amber-600" />;
      case 'proprietaire':
        return <LandmarkIcon className="h-5 w-5 text-green-600" />;
      case 'pegre':
        return <Skull className="h-5 w-5 text-red-600" />;
      default:
        return <User className="h-5 w-5 text-gray-600" />;
    }
  };

  // Render influence stars based on level (1-10)
  const renderInfluence = (level: number, color: string) => {
    return Array.from({ length: 10 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < level ? `${color} fill-current` : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="roman-card hover:border-rome-gold transition-all duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            {getClientTypeIcon()}
            <h3 className="font-cinzel text-lg font-semibold text-rome-navy">{client.name}</h3>
          </div>
          <Badge className={`${getLoyaltyColor(client.loyalty)} border font-normal`}>
            {client.loyalty}
          </Badge>
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-2 text-rome-navy/70" />
            <span>{client.subType}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-rome-navy/70" />
            <span>{client.location}</span>
          </div>
          
          {/* Afficher les influences */}
          <div className="space-y-1 mt-2 bg-gray-50 p-2 rounded">
            <h4 className="text-sm font-medium mb-1">Influences:</h4>
            
            {client.influences.political > 0 && (
              <div className="flex items-center gap-2">
                <Building className="h-3 w-3 text-purple-600" />
                <div className="flex">
                  {renderInfluence(client.influences.political, 'text-purple-600')}
                </div>
              </div>
            )}
            
            {client.influences.popular > 0 && (
              <div className="flex items-center gap-2">
                <Heart className="h-3 w-3 text-rose-600" />
                <div className="flex">
                  {renderInfluence(client.influences.popular, 'text-rose-600')}
                </div>
              </div>
            )}
            
            {client.influences.religious > 0 && (
              <div className="flex items-center gap-2">
                <BookIcon className="h-3 w-3 text-amber-600" />
                <div className="flex">
                  {renderInfluence(client.influences.religious, 'text-amber-600')}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-end mt-5 pt-4 border-t border-rome-gold/20">
          <Button variant="outline" className="roman-btn-outline text-xs gap-1 py-1 h-8">
            Détails
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

