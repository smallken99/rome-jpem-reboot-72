
import React from 'react';
import { ClientTypeBadge } from './card/ClientTypeBadge';
import { LoyaltyBadge } from './card/LoyaltyBadge';
import { ClientDetails } from './card/ClientDetails';
import { ClientInfluences } from './card/ClientInfluences';
import { CardActions } from './card/CardActions';
import { useNavigate } from 'react-router-dom';

// Définir les types de clients et sous-types
export type ClientType = 'artisan_commercant' | 'politicien' | 'religieux' | 'proprietaire' | 'pegre';
export type ClientSubType = string;

// Interface pour les influences
export interface ClientInfluence {
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
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/clientele/client/${client.id}`);
  };
  
  return (
    <div 
      className="roman-card hover:border-rome-gold transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <ClientTypeBadge type={client.type} />
            <h3 className="font-cinzel text-lg font-semibold text-rome-navy">{client.name}</h3>
          </div>
          <LoyaltyBadge loyalty={client.loyalty} />
        </div>
        
        <ClientDetails subType={client.subType} location={client.location} />
        
        <ClientInfluences influences={client.influences} />
        
        <CardActions clientId={client.id} />
      </div>
    </div>
  );
};
